json.property do
  json.id @property.id
  json.title @property.title
  json.city @property.city
  json.images do
    json.array! @property.images do |image|
      json.image_url url_for(image)
    end
  end
end