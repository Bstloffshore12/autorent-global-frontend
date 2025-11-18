'use client'

import {
  Map,
  useMap,
  MapControl,
  APIProvider,
  AdvancedMarker,
  useMapsLibrary,
  ControlPosition,
  useAdvancedMarkerRef,
  type MapCameraChangedEvent,
  type MapCameraProps,
} from '@vis.gl/react-google-maps'
import { useState, useEffect, useRef, useCallback } from 'react'

const INITIAL_CAMERA = {
  center: { lat: 40.7, lng: -74 },
  zoom: 12,
}

const GoogleMap = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null)
  const [markerRef, marker] = useAdvancedMarkerRef()

  const [cameraProps, setCameraProps] = useState<MapCameraProps>(INITIAL_CAMERA)
  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => setCameraProps(ev.detail),
    []
  )

  return (
    <div data-lenis-prevent>
      <APIProvider
        data-lenis-prevent
        solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      >
        <div className="autocomplete-control">
          <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
        </div>

        <Map
          className="h-96 w-full"
          {...cameraProps}
          onCameraChanged={handleCameraChange}
        ></Map>

        <MapControl position={ControlPosition.TOP_LEFT}>
          .. any component here will be added to the control-containers of the
          google map instance ..
        </MapControl>

        <Map
          className="h-96 w-full"
          defaultCenter={{ lat: 40.7, lng: -74 }}
          defaultZoom={12}
        ></Map>
        <Map
          data-lenis-prevent
          // defaultZoom={8}
          className="h-96 w-full"
          // disableDefaultUI={true}
          // gestureHandling={'grcooperativeeedy'}
          // mapId={'bf51a910020fa25a'}
          // defaultCenter={{ lat: 22.54992, lng: 0 }}
        >
          <AdvancedMarker ref={markerRef} position={null} />
        </Map>
        <MapControl position={ControlPosition.TOP}>
          <div className="autocomplete-control">
            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
          </div>
        </MapControl>
        <MapHandler place={selectedPlace} marker={marker} />
      </APIProvider>
    </div>
  )
}

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null
  marker: google.maps.marker.AdvancedMarkerElement | null
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
  const map = useMap()

  useEffect(() => {
    if (!map || !place || !marker) return

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport)
    }
    marker.position = place.geometry?.location
  }, [map, place, marker])

  return null
}

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const places = useMapsLibrary('places')

  useEffect(() => {
    if (!places || !inputRef.current) return

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    }

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options))
  }, [places])

  useEffect(() => {
    if (!placeAutocomplete) return

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace())
    })
  }, [onPlaceSelect, placeAutocomplete])

  return (
    <div className="autocomplete-container">
      <input ref={inputRef} />
    </div>
  )
}

export default GoogleMap
