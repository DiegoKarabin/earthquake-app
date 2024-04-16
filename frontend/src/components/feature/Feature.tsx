import FeatureType from 'src/types/Feature'

interface Props {
  feature: FeatureType
}
const Feature = ({ feature }: Props) => (
  <div>
    <p>{feature.attributes.title}</p>
  </div>
)

export default Feature
