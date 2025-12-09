'use client'

import { useTranslations } from 'next-intl'
import { Label } from 'react-aria-components'
import { Fragment, useEffect, useMemo } from 'react'

import { useAppStore } from '@/store/provider'
import { classnames, includeTax } from '@/futils'
import Checkbox from '@/components/common/Checkbox'
import { type RentalAdditional } from '@/model/CarModel'
import { BsSpeedometer } from 'react-icons/bs'
import DropoffChargeDisplay from '@/components/carDetail/DropOffChargeDisplay'

type AdditionalServicesFormMobileProps = {
  className?: string
  rentalAdditional: RentalAdditional[]
  summary?: string
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
  summary,
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

  const extraKmServices = filteredRentalAdditional.filter(
    (x) => x.service_type === 'extra_kilometer'
  )

  const otherServices = filteredRentalAdditional.filter(
    (x) => x.service_type !== 'extra_kilometer'
  )

  const handleExtraKmSelect = (id: RentalAdditional['id']) => {
    const extraKmIds = extraKmServices.map((s) => s.id)

    // ⭐ If user clicks already selected option → unselect it
    if (selectedExtraKmId === id) {
      const newSelected = selectedIds.filter((sid) => !extraKmIds.includes(sid))
      const SelectedAddOns = rentalAdditional.filter((x) =>
        newSelected.includes(x.id)
      )
      setAdditionalServices(SelectedAddOns)
      return
    }

    // ⭐ Normal selection (remove all + add selected)
    const newSelected = [
      ...selectedIds.filter((sid) => !extraKmIds.includes(sid)),
      id,
    ]

    const SelectedAddOns = rentalAdditional.filter((x) =>
      newSelected.includes(x.id)
    )
    setAdditionalServices(SelectedAddOns)
  }

  useEffect(() => {
    // Auto-select only mandatory services (mandatory: 1)
    const mandatoryServices = filteredRentalAdditional.filter(
      (s) => s.mandatory === 1
    )

    setAdditionalServices(mandatoryServices)
  }, [filteredRentalAdditional, setAdditionalServices])
  const selectedExtraKmId = useMemo(() => {
    const extraKmIds = extraKmServices.map((s) => s.id)
    return selectedIds.find((id) => extraKmIds.includes(id)) ?? null
  }, [selectedIds, extraKmServices])

  return (
    <div className={className}>
      {otherServices.map(
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
      <DropoffChargeDisplay />
      {summary && (
        <p className="mt-2 flex items-center gap-2 rounded bg-primary-light px-2 py-1 text-sm font-normal text-primary">
          <BsSpeedometer />
          {summary}
        </p>
      )}
      {/* EXTRA KM SECTION */}
      <div className="mt-3">
        <p className="col-span-2 font-semibold text-gray-900">
          Extra Kilometers
        </p>

        <div className="mt-2 grid grid-cols-2 gap-3">
          {extraKmServices.map((srv) => {
            const isSelected = selectedExtraKmId === srv.id
            const price =
              pricingMode === 'daily'
                ? srv.daily
                : pricingMode === 'weekly'
                  ? srv.weekly
                  : srv.monthly

            if (!price || Number(price) === 0) return null

            return (
              <div
                key={srv.id}
                onClick={() => handleExtraKmSelect(srv.id)}
                className={classnames(
                  'flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm shadow-sm transition-all',
                  isSelected
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-blue-200'
                    : 'border-gray-300 bg-white hover:border-blue-300'
                )}
              >
                {/* Left side: radio + title */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="extraKmOption"
                    checked={isSelected}
                    onChange={() => handleExtraKmSelect(srv.id)}
                    className="h-4 w-4 cursor-pointer accent-blue-600"
                  />
                  <span className="font-medium">{srv.title}</span>
                </div>

                {/* Right side: price */}
                <span
                  className={classnames(
                    'text-sm font-semibold',
                    isSelected ? 'text-blue-700' : 'text-gray-800'
                  )}
                >
                  {price}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdditionalServicesFormMobile
