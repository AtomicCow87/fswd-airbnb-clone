json.property do
  json.id @property.id
  json.title @property.title
  json.city @property.city
  json.image_url url_for(@property.image) if @property.image.attached?
end