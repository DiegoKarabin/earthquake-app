import { useRef } from 'react'
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { RootState } from 'src/redux/store'
import { useAddCommentMutation } from 'src/redux/services/comments'
import { setReloadComments } from 'src/redux/features/ui/ui-slice'
import Comment from 'src/types/Comment'

const CommentsForm = () => {
  const dispatch = useAppDispatch()
  const active_feature = useAppSelector((state: RootState) => state.UI.active_feature)
  const [addComment, { isLoading }] = useAddCommentMutation()

  const initialValues: Comment = { body: '' }
  const validationSchema = Yup.object().shape({
    body: Yup.string().min(10).max(100).required('Comment is required')
  })

  const formikRef = useRef<FormikProps<Comment>>(null)

  const submitCallback = async (values: Comment, helpers: FormikHelpers<Comment>) => {
    try {
      await addComment({
        ...values,
        feature_id: active_feature?.id
      }).unwrap()
      dispatch(setReloadComments(true))
      helpers.resetForm()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitCallback}
        innerRef={formikRef}
        validateOnMount
        validateOnChange
      >
        {({
          getFieldProps,
          isSubmitting,
          isValid,
        }: FormikProps<Comment>) => {
          return (
            <Form>
              <div>
                <div>
                  <input
                    type='text'
                    placeholder='Write a comment'
                    {...getFieldProps('body')}
                  />
                  <button type='submit' disabled={ isLoading || isSubmitting || !isValid }>
                    Post
                  </button>
                </div>
                <ErrorMessage name='body' component='span' className='comments-form-error' />
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default CommentsForm
