json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.property_id booking.property_id
    json.user_id booking.user_id
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.is_paid booking.is_paid?
  end
end

json.properties do
  json.array! @properties do |property|
    json.id property.id
    json.title property.title
    json.city property.city
    json.country property.country
    json.property_type property.property_type
    json.price_per_night property.price_per_night
    json.user_id property.user_id
    if property.image.attached?
      json.image_url url_for(property.image)
    else
      json.image_url nil
    end
  end
end

json.users do
  json.array! @users do |user|
    json.id user.id
    json.username user.username
  end
end