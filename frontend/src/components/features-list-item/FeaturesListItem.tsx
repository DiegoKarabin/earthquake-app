import { ReactElement } from 'react'

interface Props {
  children: ReactElement
  hoverable?: boolean
  onClick?: () => void
}
const FeaturesListItem = ({ children, hoverable, onClick }: Props) => (
  <div className={`features-list-item ${hoverable ? 'hoverable' : ''}`} onClick={onClick}>
    {children}
  </div>
)

export default FeaturesListItem
