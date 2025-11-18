'use client'

import {
  useRef,
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from 'react'
import {
  Map,
  useMap,
  MapControl,
  APIProvider,
  AdvancedMarker,
  useMapsLibrary,
  ControlPosition,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'

import Modal from '@/components/common/Modal'
import { useAppStore } from '@/store/provider'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''

type GoogleLocationPickerModalProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  selectedPlace: google.maps.places.PlaceResult | null
  setSelectedPlace: (place: google.maps.places.PlaceResult | null) => void
}
const GoogleLocationPickerModal = ({
  isOpen,
  setIsOpen,
  selectedPlace,
  setSelectedPlace,
}: GoogleLocationPickerModalProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef()

  const removeOverlay = () => {
    return setTimeout(() => {
      const overlay = document.querySelector('div[aria-roledescription="map"]')
      if (overlay) overlay.classList.add('hidden')
    }, 1000)
  }

  useEffect(() => {
    const timer = removeOverlay()
    return () => clearTimeout(timer)
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setIsOpen}
      className="w-full max-w-3xl !p-0"
    >
      <div
        data-lenis-prevent
        className="h-[600px] w-full"
        onMouseEnter={removeOverlay}
      >
        <APIProvider
          apiKey={API_KEY}
          solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
        >
          <Map
            defaultZoom={10}
            disableDefaultUI
            data-lenis-prevent
            mapId={'google-map-modal'}
            gestureHandling={'greedy'}
            defaultCenter={{ lat: 25.2048, lng: 55.2708 }}
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
    </Modal>
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
  const {
    operatingCountry: { activeId, list },
  } = useAppStore((state) => state)

  const places = useMapsLibrary('places')

  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!places || !inputRef.current) return

    const options = {
      fields: ['geometry', 'name', 'formatted_address', 'place_id'],
    }

    const currentCountrySlug = list.find((c) => c.id === activeId)?.iso2 || ''

    const result = new places.Autocomplete(inputRef.current, options)
    result.setComponentRestrictions({ country: [currentCountrySlug] })
    setPlaceAutocomplete(result)
  }, [places, list, activeId])

  useEffect(() => {
    if (!placeAutocomplete) return

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace())
    })
  }, [onPlaceSelect, placeAutocomplete])

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        className={
          'ml-4 mt-4 block w-96 rounded-lg border border-neutral-200 px-4 py-2 font-normal duration-300 placeholder:text-neutral-500'
        }
      />
    </div>
  )
}

export default GoogleLocationPickerModal
