'use client'

import { useState } from 'react'
import { useLenis } from 'lenis/react'
import { useTranslations } from 'next-intl'
import { IoLocationOutline } from 'react-icons/io5'
import { Button, TooltipTrigger } from 'react-aria-components'

import {
  type OfficeLocationData,
  type OfficeLocationGroupByStateData,
} from '@/model/CmsModel'
import Tooltip from '@/components/common/Tooltip'
import LoadingSpinner from '@/icons/LoadingSpinner'
import { type GetLocationsResult } from '@/model/StaticModel'
import LocationContactModal from '@/modal/LocationContactModal'

interface OnClickProps {
  locationArea: string | number
  emiratesKey: keyof GetLocationsResult
}

type LocationListProps = {
  locations: OfficeLocationGroupByStateData
}

const LocationList = ({ locations }: LocationListProps) => {
  const t = useTranslations()

  const lenis = useLenis()

  const [location, setLocation] = useState<OfficeLocationData>({
    id: 0,
    fax: '',
    city: '',
    title: '',
    phone: '',
    email: '',
    address: '',
    mapframe: '',
  })

  const [isLocationContactModalOpen, setLocationContactModalState] =
    useState(false)

  const onClick = ({ locationArea, emiratesKey }: OnClickProps) => {
    const selectedLocation = locations[emiratesKey].find(
      (l) => l.title === locationArea
    )

    if (selectedLocation) {
      const uniqueId = `${selectedLocation.city}-${selectedLocation.id}-${selectedLocation.title}`

      setLocation({
        id: selectedLocation.id,
        fax: selectedLocation.fax,
        city: selectedLocation.city,
        title: selectedLocation.title,
        email: selectedLocation.email,
        phone: selectedLocation.phone,
        address: selectedLocation.address,
        mapframe: selectedLocation.mapframe,
      })
      setLocationContactModalState(true)

      lenis?.scrollTo(`#${uniqueId.replaceAll(' ', '-')}`)
    }
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">{t('Address')}:</h3>

      <LocationContactModal
        {...location}
        isLocationContactModalOpen={isLocationContactModalOpen}
        setLocationContactModalState={setLocationContactModalState}
      />

      <div className="space-y-4">
        {Object.keys(locations).map((emiratesKey: keyof typeof locations) => (
          <div key={emiratesKey} className="space-y-2">
            <p className="text-sm font-medium capitalize">{emiratesKey}</p>

            {locations[emiratesKey].map(({ id, title, mapframe, address }) => (
              <TooltipTrigger key={id}>
                <Button
                  onPress={() => onClick({ emiratesKey, locationArea: title })}
                  className="flex items-center gap-1 border-b border-neutral-700 text-sm font-normal"
                >
                  <IoLocationOutline />
                  {title}
                </Button>
                <Tooltip>
                  <div className="relative w-60">
                    <p className="absolute flex h-full w-full flex-col items-center justify-center gap-2">
                      <LoadingSpinner />
                      <span className="text-xs font-light">
                        {t('Loading Map')}...
                      </span>
                    </p>
                    <p className="mb-2 text-xs font-light">{address}</p>
                    <iframe
                      title={title}
                      loading="lazy"
                      src={mapframe}
                      className="size-60 rounded-lg"
                    />
                  </div>
                </Tooltip>
              </TooltipTrigger>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LocationList
