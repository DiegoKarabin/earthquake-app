import { useEffect, useState } from 'react'
import FeatureType from 'src/types/Feature'
import FeaturesListItem from 'src/components/features-list-item/FeaturesListItem'
import Feature from 'src/components/feature/Feature'
import ActiveFeature from 'src/components/active-feature/ActiveFeature'
import type { RootState } from 'src/redux/store'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { useGetFeaturesPageQuery } from 'src/redux/services/features'
import { setActiveFeature } from 'src/redux/features/ui/ui-slice'
import { setCenter } from 'src/redux/features/map/map-slice'

const FeaturesList = () => {
  const dispatch = useAppDispatch()

  const active_feature = useAppSelector((state: RootState) => state.UI.active_feature)

  const [currentPage, setCurrentPage] = useState(1)
  const [allFeatures, setAllFeatures] = useState<FeatureType[]>([])
  const { data: response, isLoading, isFetching } = useGetFeaturesPageQuery(currentPage)

  useEffect(() => {
    if (response?.data) {
      setAllFeatures((prevFeatures: FeatureType[]) => [...prevFeatures, ...response.data])
    }
  }, [response])

  const handleLoadMoreFeatures = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handleActivateFeature = (feature: FeatureType) => {
    const longitude = Number(feature.attributes.coordinates.longitude)
    const latitude = Number(feature.attributes.coordinates.latitude)
    const zoom = 12

    dispatch(setActiveFeature(feature))
    dispatch(setCenter({ longitude, latitude, zoom }))
  }

  const isFetchingFeatures = isLoading || isFetching
  const buttonText = isFetchingFeatures ? 'Loading more features...' : 'Load more features'

  return (
    <div className='features-list'>
      <FeaturesListItem>
        <h3>Recent features</h3>
      </FeaturesListItem>
      {allFeatures.map(
        (feature: FeatureType) =>
          active_feature?.id === feature.id
            ? (
              <FeaturesListItem
                key={feature.id}
              >
                <ActiveFeature feature={feature} />
              </FeaturesListItem>
            )
            : (
              <FeaturesListItem
                key={feature.id}
                onClick={() => { handleActivateFeature(feature) }}
                hoverable
              >
                <Feature feature={feature} />
              </FeaturesListItem>
            )
      )}
      <FeaturesListItem>
        <button
          onClick={handleLoadMoreFeatures}
          disabled={isFetchingFeatures}
        >
          {buttonText}
        </button>
      </FeaturesListItem>
    </div>
  )
}

export default FeaturesList
