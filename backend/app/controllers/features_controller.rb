class FeaturesController < ApplicationController
  include PaginationConcern

  rescue_from InvalidPerPageError, with: :render_bad_request
  rescue_from InvalidMagTypeError, with: :render_bad_request

  # GET /api/features
  def index
    per_page = validate_per_page(params[:per_page])
    mag_type = validate_mag_type(params[:mag_type])

    @pagy, @features = pagy(
      fetch_features(mag_type),
      page: params[:page],
      items: per_page
    )

    render json: { data: @features, pagination: pagination_info(@pagy) }
  end

  private

  def fetch_features(mag_type)
    return Feature.all if mag_type.blank?

    if mag_type.kind_of?(Array)
      return Feature.where('mag_type LIKE ANY (array[?])', mag_type)
    end

    Feature.where(mag_type:)
  end

  def validate_per_page(per_page)
    return PaginationConcern::DEFAULT_PER_PAGE_ITEMS if per_page.blank?

    per_page = per_page.to_i

    raise(
      InvalidPerPageError,
      'Invalid per_page value. Must be between 1 and 1000.'
    ) if per_page <= 0 || per_page > 1000

    per_page
  end

  def validate_mag_type(mag_type)
    return if mag_type.blank?

    valid_mag_types = %w[md ml ms mw me mi mb mlg]

    # Multiple mag_types validation
    if mag_type.kind_of?(Array)
      downcased_mag_types = mag_type.map(&:downcase)
      invalid_mag_types = downcased_mag_types - valid_mag_types

      raise(
        InvalidMagTypeError,
        "Invalid mag_types: #{invalid_mag_types.join(', ')}"
      ) if invalid_mag_types.any?

      return downcased_mag_types
    end

    # Single mag_type validation
    downcased_mag_type = mag_type.downcase

    return downcased_mag_type if valid_mag_types.include?(downcased_mag_type)

    raise InvalidMagTypeError, "Invalid mag_type: #{mag_type}"
  end

  def render_bad_request(exception)
    render json: { error: exception.message }, status: :bad_request
  end
end
