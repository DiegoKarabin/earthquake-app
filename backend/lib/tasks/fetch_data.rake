require 'json'
require 'net/http'
require 'uri'

task fetch_data: [:environment] do
  # Fetching data
  url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
  response = Net::HTTP.get_response(URI.parse(url))
  data = JSON.parse(response.body)

  # Filtering existing features
  features = data['features']
  external_ids = features.map { |feature| feature['id'] }
  existing_features_external_ids = Feature.where(external_id: external_ids).pluck(:external_id)
  new_features = features.reject { |feature| existing_features_external_ids.include?(feature['id']) }

  # Saving new features
  new_features_data = new_features.map do |feature|
    properties = feature['properties']
    coordinates = feature['geometry']['coordinates']

    {
      external_id: feature['id'],
      magnitude: properties['mag'],
      place: properties['place'],
      time: properties['time'],
      tsunami: properties['tsunami'],
      mag_type: properties['magType'],
      title: properties['title'],
      longitude: coordinates[0],
      latitude: coordinates[1],
      external_url: properties['url'],
    }
  end

  Feature.insert_all(new_features_data)
end
