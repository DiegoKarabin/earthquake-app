class Feature < ApplicationRecord
  include ActiveModel::Serializers::JSON

  has_many :comments

  def as_json
    {
      'id' => id,
      'type' => 'feature',
      'attributes' => {
        'external_id' => external_id,
        'magnitude' => magnitude,
        'place' => place,
        'time' => time,
        'tsunami' => tsunami,
        'mag_type' => mag_type,
        'title' => title,
        'coordinates' => {
           'longitude' => longitude,
           'latitude' => latitude,
        },
      },
      'links' => {
        'external_url' => external_url,
      }
    }
  end
end
