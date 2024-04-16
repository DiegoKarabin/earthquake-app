import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Feature from 'src/types/Feature'
import PaginatedResponse from 'src/types/PaginatedResponse'
import { FEATURES_API_BASE_URL } from 'src/consts'

export const featuresApi = createApi({
  reducerPath: 'featuresApi',
  baseQuery: fetchBaseQuery({ baseUrl: FEATURES_API_BASE_URL }),
  endpoints: (builder) => ({
    getFeaturesPage: builder.query<PaginatedResponse<Feature>, number>({
      query: (page) => `features?page=${page}`,
    }),
  }),
})

export const { useGetFeaturesPageQuery } = featuresApi
