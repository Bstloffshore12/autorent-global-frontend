'use client'

import { useTranslations } from 'next-intl'
import { Label } from 'react-aria-components'
import { Fragment, useMemo, useEffect } from 'react'

import { classnames } from '@/futils'
import { useAppStore } from '@/store/provider'
import Checkbox from '@/components/common/Checkbox'
import { type RentalAdditional } from '@/model/CarModel'

type AdditionalServices = {
  className?: string
  rentalAdditional: RentalAdditional[]
}

type ActivePriceProps = {
  text: string
  isActive: boolean
}

const ActivePrice = ({ text, isActive }: ActivePriceProps) => {
  return (
    <p
      className={classnames(
        'duration-300',
        isActive && 'font-medium text-primary'
      )}
    >
      {text}
    </p>
  )
}

const AdditionalServices = ({
  className,
  rentalAdditional,
}: AdditionalServices) => {
  const t = useTranslations()

  const {
    general: { currency },
    setOrder: { setAdditionalServices },
    order: {
      pricingMode,
      additionalServices: addOns,
      officePickupLocation,
      officeDropoffLocation,
    },
  } = useAppStore((state) => state)

  const selectedIds = useMemo(() => addOns.map((z) => z.id), [addOns])

  // Check if airport location is selected for pickup or dropoff
  const isAirportPickupSelected = useMemo(() => {
    return officePickupLocation?.type === 'airport'
  }, [officePickupLocation?.type])

  const isAirportDropoffSelected = useMemo(() => {
    return officeDropoffLocation?.type === 'airport'
  }, [officeDropoffLocation?.type])

  // Filter additional services based on new backend logic
  const filteredRentalAdditional = useMemo(() => {
    const filtered = rentalAdditional.filter((service) => {
      // Show all default:1 services as usual
      if (service.default === 1) {
        // For map conditional services, apply special logic
        if (service.conditional === 'map') {
          if (service.service_type === 'delivery') {
            // Hide delivery charges when pickup location is airport
            return !isAirportPickupSelected
          }
          if (service.service_type === 'collection') {
            // Hide collection charges when dropoff location is airport
            return !isAirportDropoffSelected
          }
        }
        return true
      }

      // For default:0 services (airport services), show based on location type
      if (service.default === 0) {
        if (service.conditional === 'airport') {
          if (service.service_type === 'delivery') {
            // Show airport delivery fee only when pickup location is airport
            return isAirportPickupSelected
          }
          if (service.service_type === 'collection') {
            // Show airport pickup fee only when dropoff location is airport
            return isAirportDropoffSelected
          }
        }
      }

      return false
    })

    return filtered
  }, [rentalAdditional, isAirportPickupSelected, isAirportDropoffSelected])

  const handleAddonSelect = (addOn: RentalAdditional) => {
    const z = selectedIds.includes(addOn.id)
      ? selectedIds.filter((s) => s !== addOn.id)
      : [...selectedIds, addOn.id]

    const SelectedAddOns = rentalAdditional.filter((x) => z.includes(x.id))
    setAdditionalServices(SelectedAddOns)
  }

  useEffect(() => {
    // Auto-select only mandatory services (mandatory: 1)
    const mandatoryServices = filteredRentalAdditional.filter(
      (s) => s.mandatory === 1
    )

    setAdditionalServices(mandatoryServices)
  }, [filteredRentalAdditional, setAdditionalServices])

  return (
    <div className={classnames('space-y-1', className)}>
      {filteredRentalAdditional.map((addOn, i) => (
        <Fragment key={addOn.id}>
          {!i && (
            <div className="mb-1 grid grid-cols-[auto_100px_90px_90px_90px_20px] items-center gap-4 px-2 text-right font-medium text-black">
              <p className="text-left">{t('Title')}</p>
              <p>
                {t('Price')} ({currency.abbreviation})
              </p>
              <ActivePrice isActive={pricingMode === 'daily'} text="Daily" />
              <ActivePrice isActive={pricingMode === 'weekly'} text="Weekly" />
              <ActivePrice
                isActive={pricingMode === 'monthly'}
                text="Monthly"
              />
            </div>
          )}
          <Label
            className={classnames(
              'grid cursor-pointer grid-cols-[auto_90px_90px_90px_20px] items-center gap-4 rounded-lg px-2 py-2 text-right duration-150',
              selectedIds.includes(addOn.id) ? 'bg-primary-light' : ''
            )}
          >
            <div className="text-left">
              <p
                className={classnames(
                  'font-medium duration-150',
                  selectedIds.includes(addOn.id) ? 'text-primary' : ''
                )}
              >
                {addOn.title}
              </p>
              <p>{addOn.description}</p>
            </div>
            <ActivePrice
              isActive={pricingMode === 'daily'}
              text={addOn.daily}
            />
            <ActivePrice
              isActive={pricingMode === 'weekly'}
              text={addOn.weekly || addOn.daily}
            />
            <ActivePrice
              isActive={pricingMode === 'monthly'}
              text={addOn.monthly || addOn.daily}
            />

            <Checkbox
              isReadOnly={!!addOn.mandatory}
              isSelected={selectedIds.includes(addOn.id)}
              onChange={() => handleAddonSelect(addOn)}
            />
          </Label>
        </Fragment>
      ))}
    </div>
  )
}

export default AdditionalServices
