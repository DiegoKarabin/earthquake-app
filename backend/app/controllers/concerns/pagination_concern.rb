module PaginationConcern
    extend ActiveSupport::Concern

    included do
      include Pagy::Backend
    end

    DEFAULT_PER_PAGE_ITEMS = 10

    private

    def pagination_info(pagy)
      {
        current_page: pagy.page,
        total: pagy.count,
        per_page: pagy.items
      }
    end
  end
