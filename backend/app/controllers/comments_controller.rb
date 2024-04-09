class CommentsController < ApplicationController
  include PaginationConcern

  before_action :set_feature

  # GET /api/features/:feature_id/comments
  def index
    @pagy, @comments = pagy(@feature.comments)

    render json: { data: @comments, pagination: pagination_info(@pagy) }
  end

  # POST /api/features/:feature_id/comments
  def create
    comment = @feature.comments.new(comment_params)

    return render json: comment, status: :created if comment.save

    render(
      json: { errors: comment.errors.full_messages },
      status: :unprocessable_entity
    )
  end

  private

  def set_feature
    @feature = Feature.find(params[:feature_id])
  end

  def comment_params
    params.permit(:body)
  end
end
