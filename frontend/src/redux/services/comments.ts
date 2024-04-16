import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Comment from 'src/types/Comment'
import PaginatedResponse from 'src/types/PaginatedResponse'
import { FEATURES_API_BASE_URL } from 'src/consts'

interface GetFeatureCommentsPageQueryParams {
  feature_id: number
  page: number
}

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${FEATURES_API_BASE_URL}/features/` }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getFeatureCommentsPage: builder.query<PaginatedResponse<Comment>, GetFeatureCommentsPageQueryParams>({
      query: (params) => `${params.feature_id}/comments?page=${params.page}&per_page=5`,
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ id }) => ({ type: 'Comments', id } as const)),
            { type: 'Comments', id: 'LIST' },
          ]
          : [{ type: 'Comments', id: 'LIST' }],
    }),
    addComment: builder.mutation<Comment, Partial<Comment>>({
      query: (data) => {
        const { feature_id, ...body } = data

        return {
          url: `${feature_id}/comments`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Comments', id: 'LIST' }]
    })
  }),
})

export const {
  useGetFeatureCommentsPageQuery,
  useAddCommentMutation,
} = commentsApi
