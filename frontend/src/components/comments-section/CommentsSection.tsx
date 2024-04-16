import { useSelector } from 'react-redux'
import type { RootState } from 'src/redux/store'
import CommentsList from 'src/components/comments-list/CommentsList'
import CommentsForm from 'src/components/comments-form/CommentsForm'

const CommentsSection = () => {
  const active_feature = useSelector((state: RootState) => state.UI.active_feature)

  return (
    <>
      <h4>Comments</h4>
      <CommentsForm />
      <CommentsList feature_id={(active_feature?.id as number)} />
    </>
  )
}

export default CommentsSection
