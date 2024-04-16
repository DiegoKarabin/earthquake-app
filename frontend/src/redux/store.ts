import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { commentsApi } from 'src/redux/services/comments'
import { featuresApi } from 'src/redux/services/features'
import UIReducer from 'src/redux/features/ui/ui-slice'
import MapReducer from 'src/redux/features/map/map-slice'

export const store = configureStore({
  reducer: {
    [featuresApi.reducerPath]: featuresApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    UI: UIReducer,
    map: MapReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(featuresApi.middleware, commentsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
