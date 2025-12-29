'use state'

import moment from 'moment'
import { useEffect, useState } from 'react'
import { type ZonedDateTime } from '@internationalized/date'

import { useAppStore } from '@/store/provider'
import { compareDate, getPricingMode, getCountryTimezone } from '@/futils'
import { OfficeLocationOption } from '@/model/CmsModel'
import { type RentalAdditional } from '@/model/CarModel'

type Location = OfficeLocationOption | null | google.maps.places.PlaceResult

type TimeConstraints = { hours: { min: number; max: number; step: number } }

const PickupAdditionalId = '5'
const DropoffAdditionalId = '6'

const usePickUpDropOff = (): {
  pickupLocation: Location
  dropoffLocation: Location
  decrementDropoffTime: () => void
  incrementDropoffTime: () => void
  pickupTime: ZonedDateTime | null
  dropoffTime: ZonedDateTime | null
  timeConstraints: TimeConstraints
  pickupTimeConstraints: TimeConstraints
  pickupLocationType: 'self' | 'office'
  dropoffLocationType: 'self' | 'office'
} => {
  const {
    order: {
      duration,
      pickupTime,
      dropoffTime,
      additionalServices,
      selfPickupLocation,
      selfDropoffLocation,
      officePickupLocation,
      officeDropoffLocation,
    },
    general: {
      isGlobalDailyPriceActive,
      isGlobalWeeklyPriceActive,
      isGlobalMonthlyPriceActive,
    },
    car: { isDailyActive, isWeeklyActive, isMonthlyActive },
    setOrder: { setDuration, setDropoffTime, setPricingMode },
    operatingCountry: { activeId },
  } = useAppStore((state) => state)

  const timezone = getCountryTimezone(activeId)

  const [additionalServicesIds, setAdditionalServicesIds] = useState<
    RentalAdditional['additional_id'][]
  >([])

  const decrementDropoffTime = () => {
    if (pickupTime && dropoffTime && duration - 1)
      setDropoffTime(dropoffTime.add({ days: -1 }))
  }

  const timeConstraints = { hours: { min: 8, max: 21, step: 1 } }

  const pickupTimeConstraints = moment(pickupTime?.toDate()).isAfter(
    moment.tz(timezone).add(1, 'day')
  )
    ? timeConstraints
    : {
        hours: {
          min: new Date().getHours() + 1,
          max: timeConstraints.hours.max,
          step: timeConstraints.hours.step,
        },
      }

  const incrementDropoffTime = () =>
    dropoffTime && setDropoffTime(dropoffTime.add({ days: 1 }))

  useEffect(() => {
    setAdditionalServicesIds(additionalServices.map((a) => a.additional_id))
  }, [additionalServices])

  // update pricing mode
  useEffect(() => {
    if (dropoffTime && pickupTime) {
      setPricingMode(
        getPricingMode({
          pickupTime,
          dropoffTime,
        })
      )
      setDuration(compareDate({ starting: pickupTime, ending: dropoffTime }))
    }
  }, [
    pickupTime,
    dropoffTime,
    setDuration,
    setPricingMode,
    isDailyActive,
    isWeeklyActive,
    isMonthlyActive,
    isGlobalDailyPriceActive,
    isGlobalWeeklyPriceActive,
    isGlobalMonthlyPriceActive,
  ])

  return {
    pickupTime,
    dropoffTime,
    timeConstraints,
    pickupTimeConstraints,
    decrementDropoffTime,
    incrementDropoffTime,
    pickupLocation: additionalServicesIds.includes(PickupAdditionalId)
      ? selfPickupLocation
      : officePickupLocation,
    dropoffLocation: additionalServicesIds.includes(DropoffAdditionalId)
      ? selfDropoffLocation
      : officeDropoffLocation,
    pickupLocationType: additionalServicesIds.includes(PickupAdditionalId)
      ? 'self'
      : 'office',
    dropoffLocationType: additionalServicesIds.includes(DropoffAdditionalId)
      ? 'self'
      : 'office',
  }
}

export default usePickUpDropOff
