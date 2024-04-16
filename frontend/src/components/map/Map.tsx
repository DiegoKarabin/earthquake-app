import { useSelector } from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { RootState } from 'src/redux/store'
import FeatureInfo from 'src/components/feature-info/FeatureInfo'

import 'leaflet/dist/leaflet.css'

const Map = () => {
  const { zoom, center } = useSelector((state: RootState) => state.map)
  const active_feature = useSelector((state: RootState) => state.UI.active_feature)

  return (
    <MapContainer key={`${center[0]}-${center[1]}-${zoom}`} center={center} zoom={zoom} className='map-container'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {active_feature && (
        <Marker position={center}>
          <Popup>
            <FeatureInfo feature={active_feature} />
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default Map
