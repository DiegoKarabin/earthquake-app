class Comment < ApplicationRecord
  belongs_to :feature
  validates :body, presence: true, length: { minimum: 1, maximum: 400 }
end
