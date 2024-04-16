import moment from 'moment'

import Comment from 'src/types/Comment'

interface Props {
  comment: Comment
}
const CommentsListItem = ({ comment }: Props) => {
  return (
    <div className='comments-list-item'>
      <p>{comment.body}</p>
      <span className='created-at'>{moment(comment.created_at).fromNow()}</span>
    </div>
  )
}

export default CommentsListItem
