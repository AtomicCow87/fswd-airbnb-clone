json.booking do
  json.id @booking.id
  json.property_id @booking.property_id
  json.user_id @booking.user_id
  json.start_date @booking.start_date
  json.end_date @booking.end_date
  json.is_paid @booking.is_paid?
end

json.property do
  json.id @property.id
  json.title @property.title
  json.description @property.description
  json.city @property.city
  json.country @property.country
  json.property_type @property.property_type
  json.price_per_night @property.price_per_night
  json.max_guests @property.max_guests
  json.bedrooms @property.bedrooms
  json.beds @property.beds
  json.baths @property.baths
  json.image_url url_for(@property.image) if @property.image.attached?

  json.user do
    json.id @property.user.id
    json.username @property.user.username
  end
end

json.charge do
  json.amount @charge.amount
end

json.propertyuser do
  json.id @propertyuser.id
  json.username @propertyuser.username
end

json.bookinguser do
  json.id @bookinguser.id
  json.username @bookinguser.username
end