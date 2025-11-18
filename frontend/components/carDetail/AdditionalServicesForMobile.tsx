'use client'

import { useTranslations } from 'next-intl'
import { Label } from 'react-aria-components'
import { Fragment, useEffect, useMemo } from 'react'

import { useAppStore } from '@/store/provider'
import { classnames, includeTax } from '@/futils'
import Checkbox from '@/components/common/Checkbox'
import { type RentalAdditional } from '@/model/CarModel'

type AdditionalServicesFormMobileProps = {
  className?: string
  rentalAdditional: RentalAdditional[]
}

type PriceChipProps = {
  price: string
  isActive: boolean
}

export const PriceChip = ({ price, isActive }: PriceChipProps) => {
  const { tax } = useAppStore((state) => state.general)

  return (
    <p
      className={classnames(
        'hidden text-right font-medium',
        isActive && '!block text-primary'
      )}
    >
      {tax.taxIncluded ? includeTax({ tax, price }).toFixed(2) : price}
    </p>
  )
}

const AdditionalServicesFormMobile = ({
  className,
  rentalAdditional,
}: AdditionalServicesFormMobileProps) => {
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

  const handleAddonSelect = (id: RentalAdditional['id']) => {
    const isAlreadySelected = selectedIds.includes(id)

    const z = isAlreadySelected
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id]

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
    <div className={className}>
      {filteredRentalAdditional.map(
        (
          {
            id,
            daily,
            title,
            weekly,
            warning,
            monthly,
            mandatory,
            description,
          },
          i
        ) => (
          <Fragment key={id}>
            {!i && (
              <div className="mb-1 flex justify-between font-medium text-black">
                <p className="text-left">{t('Details')}</p>
                <p>
                  {t('Price')} ({currency.abbreviation})
                </p>
              </div>
            )}
            <Label
              className={classnames(
                'grid cursor-pointer grid-cols-[auto_70px] items-center gap-1 border-b border-dashed p-2 duration-150',
                selectedIds.includes(id) ? 'bg-primary-light' : ''
              )}
            >
              <div className="text-left">
                <div
                  className={classnames(
                    'flex items-center gap-2 font-normal duration-150',
                    selectedIds.includes(id) ? 'text-primary' : ''
                  )}
                >
                  <Checkbox
                    isReadOnly={!!mandatory}
                    isSelected={selectedIds.includes(id)}
                    onChange={() => handleAddonSelect(id)}
                  />
                  {title}
                </div>
                <p className="text-sm">
                  {description}

                  {warning && (
                    <span className="mb-4 mt-2 block rounded-lg border border-dashed border-orange-400 bg-orange-50 p-2 text-sm text-orange-600">
                      {warning}
                    </span>
                  )}
                </p>
              </div>
              <PriceChip price={daily} isActive={pricingMode === 'daily'} />
              <PriceChip
                price={weekly || daily}
                isActive={pricingMode === 'weekly'}
              />
              <PriceChip
                price={monthly || daily}
                isActive={pricingMode === 'monthly'}
              />
            </Label>
          </Fragment>
        )
      )}
    </div>
  )
}

export default AdditionalServicesFormMobile
