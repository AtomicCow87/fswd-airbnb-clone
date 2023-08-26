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