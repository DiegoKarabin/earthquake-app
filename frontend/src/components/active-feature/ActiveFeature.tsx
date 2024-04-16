import Feature from 'src/types/Feature'
import FeatureInfo from 'src/components/feature-info/FeatureInfo'
import CommentsSection from 'src/components/comments-section/CommentsSection'

interface Props {
  feature: Feature
}
const ActiveFeature = ({ feature }: Props) => (
  <div>
    <FeatureInfo feature={feature} />
    <hr />
    <CommentsSection />
  </div>
)

export default ActiveFeature
