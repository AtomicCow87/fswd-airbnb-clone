class Property < ApplicationRecord
  belongs_to :user
  has_many :bookings
  has_many_attached :images

  validates :title, presence: true, length: { maximum: 70 }
  validates :description, presence: false, length: { maximum: 2000 }
  validates :city, presence: true, length: { maximum: 200 }
  validates :country, presence: true, length: { maximum: 200 }
  validates :property_type, presence: false, length: { maximum: 200 }
  validates :price_per_night, presence: false, numericality: { only_integer: true, greater_than: 0, less_than: 99999, allow_blank: true }
  validates :max_guests, presence: false, numericality: { only_integer: true, greater_than: 0, less_than: 20, allow_blank: true }
  validates :bedrooms, presence: false, numericality: { only_integer: true, less_than: 20, allow_blank: true }
  validates :beds, presence: false, numericality: { only_integer: true, less_than: 20, allow_blank: true }
  validates :baths, presence: false, numericality: { only_integer: true, less_than: 20, allow_blank: true }
  validates :user, presence: true
end