import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MapState {
  zoom: number
  center: [number, number]
}

const initialState: MapState = {
  zoom: 3,
  center: [0, 0]
}

interface SetCenterPayload {
  longitude: number
  latitude: number
  zoom: number
}

export const MapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<SetCenterPayload>) => {
      const payload = action.payload
      state.center = [payload.latitude, payload.longitude]
      state.zoom = payload.zoom
    }
  }
})

export const { setCenter } = MapSlice.actions

export default MapSlice.reducer
