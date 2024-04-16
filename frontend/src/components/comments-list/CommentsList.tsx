import { useEffect, useState } from 'react'

import CommentType from 'src/types/Comment'
import { useGetFeatureCommentsPageQuery } from 'src/redux/services/comments'
import CommentsListItem from 'src/components/comments-list-item/CommentsListItem'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { RootState } from 'src/redux/store'
import { setReloadComments } from 'src/redux/features/ui/ui-slice'

interface Props {
  feature_id: number
}
const CommentsList = ({ feature_id }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [allComments, setAllComments] = useState<CommentType[]>([])
  const dispatch = useAppDispatch()
  const { data: response, isLoading, isFetching } = useGetFeatureCommentsPageQuery({
    feature_id,
    page: currentPage
  })
  const reload_comments = useAppSelector((state: RootState) => state.UI.reload_comments)
  const totalComments = response?.pagination?.total
  const endReached = allComments.length >= Number(totalComments)

  // Handling pagination
  useEffect(() => {
    if (!response?.data) {
      return
    }

    if (currentPage === 1) {
      setAllComments([...response.data])
      return
    }

    setAllComments((prevComments: CommentType[]) => [...prevComments, ...response.data])
  }, [response])

  // Reloading comments when one is created
  useEffect(() => {
    if (reload_comments === true) {
      setCurrentPage(1)
      dispatch(setReloadComments(false))
    }
  }, [reload_comments, dispatch])

  const loadMoreComments = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1)
  }

  return (
    <>
      {
        (isLoading || isFetching)
          ? <p>Loading comments...</p>
          : (
            <>
              {
                allComments.map(
                  (comment: CommentType) =>
                    <CommentsListItem key={comment.id} comment={comment} />
                )
              }
              {!endReached && (
                <div>
                  <button onClick={loadMoreComments}>
                    View previous comments
                  </button>
                </div>
              )}
            </>
          )
      }
    </>
  )
}

export default CommentsList
