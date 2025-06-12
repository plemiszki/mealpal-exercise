class Guest < ApplicationRecord

  validates :name, presence: true
  validates :phone, presence: true, length: { minimum: 10, maximum: 11 }, format: { with: /\d+/ }

  validate :name_at_least_two_words

  private

  def name_at_least_two_words
    errors.add(:name, "must be at least two words") unless name.split(' ').length >= 2
  end

end
