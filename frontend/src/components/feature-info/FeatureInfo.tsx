import { Feature } from 'src/types/Feature'

interface Props {
  feature: Feature
}
const FeatureInfo = ({ feature }: Props) => (
  <>
    <p>{feature.attributes.title}</p>
    <br />
    <p>
      <strong>Magnitude:</strong>
      &nbsp;
      {feature.attributes.magnitude}
    </p>
    <p>
      <strong>Place:</strong>
      &nbsp;
      {feature.attributes.place}
    </p>
    <p>
      <strong>Time:</strong>
      &nbsp;
      {feature.attributes.time}
    </p>
    <p>
      <strong>Tsunami:</strong>
      &nbsp;
      {feature.attributes.tsunami ? 'Yes' : 'No'}
    </p>
    <p>
      <strong>Magnitude type:</strong>
      &nbsp;
      {feature.attributes.mag_type}
    </p>
    <p>
      <strong>Coordinates:</strong>
      &nbsp;
      [{feature.attributes.coordinates.longitude}, {feature.attributes.coordinates.latitude}]
    </p>
    <p>
      <a href={feature.links.external_url}>
        External URL
      </a>
    </p>
  </>
)

export default FeatureInfo
