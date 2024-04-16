interface FeatureCoordinates {
  longitude: string
  latitude: string
}

interface FeatureAttributes {
  external_id: string
  magnitude: string
  place: string
  time: string
  tsunami: boolean
  mag_type: string
  title: string
  coordinates: FeatureCoordinates
}

interface FeatureLinks {
  external_url: string
}

export default interface Feature {
  id: number
  type: string
  attributes: FeatureAttributes
  links: FeatureLinks
}
