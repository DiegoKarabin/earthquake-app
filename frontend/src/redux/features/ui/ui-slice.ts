import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import Feature from 'src/types/Feature'

export interface UIState {
  active_feature?: Feature
  reload_comments: boolean
}

const initialState: UIState = {
  active_feature: undefined,
  reload_comments: false
}

export const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setActiveFeature: (state, action: PayloadAction<Feature>) => {
      state.active_feature = action.payload
    },
    setReloadComments: (state, action: PayloadAction<boolean>) => {
      state.reload_comments = action.payload
    },
  },
})

export const { setActiveFeature, setReloadComments } = UISlice.actions

export default UISlice.reducer
