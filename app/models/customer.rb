class Customer < ApplicationRecord

  validates :name, presence: true
  validates :phone, presence: true, length: { minimum: 10, maximum: 11 }, format: { with: /\d+/ }

end
