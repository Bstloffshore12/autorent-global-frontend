'use client'

import moment from 'moment'
import Datetime from 'react-datetime'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { now } from '@internationalized/date'
import { Form, type Key } from 'react-aria-components'

import {
  compareDate,
  toZonedDateTime,
  getOfficeLocationsDropdownOptions,
} from '@/futils'
import GroupedDropdown, {
  type GroupedOption,
} from '@/components/common/GroupedSelect'
import { useAppStore } from '@/store/provider'
import usePickUpDropOff from '@/hooks/usePickUpDropOff'
import InputField from '@/components//common/InputField'
import { type OfficeLocationDropdownData } from '@/model/CmsModel'
import GoogleLocationPickerModal from '@/modal/GoogleLocationPickerModal'

const Label = ({ label }: { label: string }) => (
  <span className="font-medium text-primary">{label}</span>
)

type PickUpDropOffSelectorProps = {
  officeLocationsContent: OfficeLocationDropdownData | Record<string, any>
}

const PickUpDropOffSelector = ({
  officeLocationsContent,
}: PickUpDropOffSelectorProps) => {
  const t = useTranslations()

  const {
    setOrder: {
      setPickupTime,
      setDropoffTime,
      setSelfPickupLocation,
      setSelfDropoffLocation,
      setOfficePickupLocation,
      setOfficeDropoffLocation,
    },
    order: {
      pickupTime,
      dropoffTime,
      selfPickupLocation,
      selfDropoffLocation,
      officePickupLocation,
      officeDropoffLocation,
      leaseType
    },
  } = useAppStore((state) => state)

  const {
    timeConstraints,
    pickupLocationType,
    dropoffLocationType,
    pickupTimeConstraints,
  } = usePickUpDropOff()

  const [isPickUpMapOpen, setIsPickUpMapOpen] = useState(false)
  const [isDropOffMapOpen, setIsDropOffMapOpen] = useState(false)
  const [locations, setLocations] = useState<GroupedOption[]>([])

  const handlePickupSelectionChange = (selectedId: Key) => {
    const selectedLocation = locations.find(
      (location) => location.id.toString() === selectedId
    )

    if (selectedLocation) {
      setOfficePickupLocation({
        id: selectedLocation.id as number,
        title: selectedLocation.title as string,
        type: selectedLocation.type,
      })
    }
  }

  const handleDropoffSelectionChange = (selectedId: Key) => {
    const selectedLocation = locations.find(
      (location) => location.id.toString() === selectedId
    )

    if (selectedLocation) {
      setOfficeDropoffLocation({
        id: selectedLocation.id as number,
        title: selectedLocation.title as string,
        type: selectedLocation.type,
      })
    }
  }

  const handleSetPickupTime = (value: string | moment.Moment) => {
    const date = toZonedDateTime(value.toString())

    if (date) {
      const d = compareDate({ ending: date, starting: now('Etc/GMT-4') })
      if (d >= 0) setPickupTime(date)
    }

    if (dropoffTime && date) {
      const d = compareDate({ starting: date, ending: dropoffTime })
      if (d < 1) setDropoffTime(date.add({ days: 1 }))
    }
  }

  const handleSetDropoffTime = (value: string | moment.Moment) => {
    const date = toZonedDateTime(value.toString())

    if (pickupTime && value && date) {
      const d = compareDate({ starting: pickupTime, ending: date })
      if (d > 0) setDropoffTime(date)
    }
  }

  useEffect(() => {
    if (
      !officeLocationsContent ||
      Object.keys(officeLocationsContent).length === 0
    ) {
      setLocations([])
      return
    }

    const l = getOfficeLocationsDropdownOptions(officeLocationsContent)
    setLocations(l)
  }, [officeLocationsContent])

  return (
    <Form
      id="PickUpDropOffSelectorForm"
      className="z-50 h-fit space-y-6 rounded-2xl border border-neutral-200 p-4 font-normal shadow-lg shadow-primary/10"
    >
      <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <Label
            label={
              pickupLocationType === 'self'
                ? t('Delivery location')
                : t('Pick up location')
            }
          />

          {pickupLocationType === 'self' ? (
            <>
              <GoogleLocationPickerModal
                isOpen={isPickUpMapOpen}
                setIsOpen={setIsPickUpMapOpen}
                selectedPlace={selfPickupLocation}
                setSelectedPlace={setSelfPickupLocation}
              />

              <div onClick={() => setIsPickUpMapOpen(true)}>
                <InputField
                  isRequired
                  size="small"
                  onChange={() => { }}
                  placeholder={t('Delivery location')}
                  errorMessage={t('Please self select pickup location')}
                  inputClassName="mt-2 h-[40px] rounded-lg border border-primary px-2"
                  value={
                    selfPickupLocation
                      ? `${selfPickupLocation.name} ${selfPickupLocation.formatted_address}`
                      : ''
                  }
                />
              </div>
            </>
          ) : (
            <GroupedDropdown
              isRequired
              size="small"
              options={locations}
              placeholder={t('Pick up location')}
              onSelectionChange={handlePickupSelectionChange}
              errorMessage={t('Please select pickup location')}
              selectedKeys={officePickupLocation?.id?.toString() || ''}
              buttonClassName="mt-2 rounded-lg border border-primary px-2 h-[40px]"
            />
          )}
        </div>
        <div className="z-20 space-y-2">
          <Label label={t('Pick Up time and date')} />

          <Datetime
            value={pickupTime?.toDate()}
            onChange={handleSetPickupTime}
            inputProps={{ required: true }}
            timeConstraints={pickupTimeConstraints}
            className="cust-date-time-picker text-sm"
            isValidDate={(c) => c.isAfter(moment().subtract(1, 'day'))}
          />
        </div>
        <div className="space-y-2">
          <Label
            label={
              dropoffLocationType === 'self'
                ? t('Collection location')
                : t('Drop off location')
            }
          />
          {dropoffLocationType === 'self' ? (
            <>
              <GoogleLocationPickerModal
                isOpen={isDropOffMapOpen}
                setIsOpen={setIsDropOffMapOpen}
                selectedPlace={selfDropoffLocation}
                setSelectedPlace={setSelfDropoffLocation}
              />

              <div onClick={() => setIsDropOffMapOpen(true)}>
                <InputField
                  isRequired
                  size="small"
                  onChange={() => { }}
                  placeholder={t('Collection location')}
                  errorMessage={t('Please select self drop off location')}
                  inputClassName="mt-2 h-[40px] rounded-lg border border-primary px-2"
                  value={
                    selfDropoffLocation
                      ? `${selfDropoffLocation.name} ${selfDropoffLocation.formatted_address}`
                      : ''
                  }
                />
              </div>
            </>
          ) : (
            <GroupedDropdown
              isRequired
              size="small"
              options={locations}
              placeholder={t('Drop off location')}
              onSelectionChange={handleDropoffSelectionChange}
              errorMessage={t('Please select drop off location')}
              selectedKeys={officeDropoffLocation?.id?.toString() || ''}
              buttonClassName="mt-2 rounded-lg border border-primary px-2 h-[40px]"
            />
          )}
        </div>
        <div className="space-y-2">
          <Label label={t('Drop off time and date')} />
          {['personal', 'monthly'].includes(leaseType ?? '') ? (
            // READ-ONLY DROP OFF DATE (disabled)
            <input
              value={dropoffTime?.toDate()?.toLocaleString() ?? ''}
              readOnly
              disabled
              className="mt-2 h-[40px] w-full rounded-lg border border-neutral-300 bg-neutral-100 px-2 text-sm cursor-not-allowed"
            />
          ) : (
            <Datetime
              value={dropoffTime?.toDate()}
              onChange={handleSetDropoffTime}
              inputProps={{ required: true }}
              timeConstraints={timeConstraints}
              className="cust-date-time-picker text-sm"
              isValidDate={(c) => c.isAfter(pickupTime?.toDate())}
            />)}
        </div>
      </div>
    </Form>
  )
}
export default PickUpDropOffSelector
