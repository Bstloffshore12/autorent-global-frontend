'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { Link } from '@/i18n/routing'
import { FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '../../lib/utils'
import type { PersonalLeaseCarDetail as CarData } from '@/model/PersonalLeaseModel' // ✅ import type
import ProceedToPayment from '../carDetail/ProceedToPayment'
import { type PaymentMethod } from '@/model/PaymentModel'
import { type ZonedDateTime } from '@internationalized/date'
import { useAppStore } from '@/store/provider'
import AdditionalServicesFormMobile from '../carDetail/AdditionalServicesForMobile'
import { RentalAdditional } from '@/model/CarModel'
import DropoffChargeDisplay from '../carDetail/DropOffChargeDisplay'
interface CarRentalBookingProps {
  carData: CarData
  paymentOptions: PaymentMethod[]
}

export function PersonalLeaseCarDetail({
  carData,
  paymentOptions,
}: CarRentalBookingProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedDuration, setSelectedDuration] = useState(
    carData.personal_lease_pricing.pricing_matrix[0].durations[0].duration_id
  )
  const [selectedKilometers, setSelectedKilometers] = useState(
    carData.personal_lease_pricing.pricing_matrix[0].durations[0]
      .kilometer_pricing[0].kilometer_id
  )
  const [selectedYear, setSelectedYear] = useState(
    carData.personal_lease_pricing.pricing_matrix[
      carData.personal_lease_pricing.pricing_matrix.length - 1
    ].year_id
  )
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showVehicleDetails, setShowVehicleDetails] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)

  const {
    setOrder: {
      setDropoffTime,
      setYearId,
      setDurationId,
      setKilometerId,
      setLeaseType,
      setPricingMode,
    },
    order: { pickupTime },
  } = useAppStore((state) => state)

  const currentYear = carData.personal_lease_pricing.pricing_matrix.find(
    (year) => year.year_id === selectedYear
  )
  const currentDuration = currentYear?.durations.find(
    (duration) => duration.duration_id === selectedDuration
  )
  const currentPrice =
    currentDuration?.kilometer_pricing.find(
      (km) => km.kilometer_id === selectedKilometers
    )?.price || '0.00'

  const nextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === carData.media.length - 1 ? 0 : prev + 1
    )
  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? carData.media.length - 1 : prev - 1
    )
  const allowedServiceTypes = [
    'registration',
    'gps',
    'delivery',
    'collection',
    'no_deposit',
    'orange_card',
  ] as const

  // ✅ Normalize carData.rental_additional safely using useMemo
  const normalizedRentalAdditional: RentalAdditional[] = useMemo(() => {
    if (!carData?.rental_additional) return []

    return carData.rental_additional.map((item) => ({
      ...item,
      mandatory: item.mandatory === 1 ? 1 : 0,
      default: item.default === 1 ? 1 : 0,
      type: item.type?.toLowerCase() === 'multiple' ? 'multiple' : 'single',
      conditional: (['other', 'map', 'airport'].includes(item.conditional)
        ? item.conditional
        : undefined) as 'other' | 'map' | 'airport' | undefined,
      service_type: allowedServiceTypes.includes(item.service_type as any)
        ? (item.service_type as RentalAdditional['service_type'])
        : undefined,
    }))
  }, [carData?.rental_additional])
  useEffect(() => {
    setPricingMode('monthly')
  }, [setPricingMode])

  // When user changes year
  useEffect(() => {
    setYearId(selectedYear)
  }, [selectedYear, setYearId])

  // When user changes duration
  useEffect(() => {
    setDurationId(selectedDuration)
  }, [selectedDuration, setDurationId])

  // When user changes kilometers
  useEffect(() => {
    setKilometerId(selectedKilometers)
  }, [selectedKilometers, setKilometerId])

  useEffect(() => {
    if (carData.personal_lease_pricing?.enabled) {
      setLeaseType('personal')
    } else {
      setLeaseType('regular')
    }
  }, [carData.personal_lease_pricing, setLeaseType])

  useEffect(() => {
    return () => {
      setLeaseType('regular')
    }
  }, [])

  useEffect(() => {
    const durationObj = currentYear?.durations.find(
      (d) => d.duration_id === selectedDuration
    )

    if (durationObj && pickupTime) {
      // Extract number of months from the title (e.g. "12 Months" → 12)
      const match = durationObj.duration_title.match(/(\d+)\s*Months?/)
      if (match) {
        const months = parseInt(match[1], 10)
        const newDropoff: ZonedDateTime = pickupTime.add({ months })
        setDropoffTime(newDropoff)
      }
    }
  }, [selectedDuration, pickupTime, currentYear, setDropoffTime])

  return (
    <div className="mx-auto max-w-7xl bg-white p-4 md:px-[40px]">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => router.back()}
        >
          <FaChevronLeft className="h-5 w-5" />
          <span className="text-gray-600">Back To Listing</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-7">
          {/* Carousel */}
          <div className="relative">
            <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
              <img
                src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${carData.media[currentImageIndex].path}`}
                alt={carData.media[currentImageIndex]?.alt}
                className="h-full w-full object-contain"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
              >
                <FaChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
              >
                <FaChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-2">
              {carData.media.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    'h-16 w-20 overflow-hidden rounded-lg border-2',
                    currentImageIndex === index
                      ? 'border-red-500'
                      : 'border-gray-200'
                  )}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${image.path}`}
                    alt={image.alt}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Car Info */}
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {carData.title.toUpperCase()}
            </h1>
            <div className="mb-4 flex gap-4 text-sm text-gray-600">
              <span>{currentYear?.year_title}</span>
              <span>{carData.fueltype}</span>
              <span>{carData.transmission}</span>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h3 className="mb-2 font-medium text-red-500">
                Vehicle Features
              </h3>
              <p className="text-sm text-gray-600">
                {carData.carattributes_attr.features
                  .map((f) => f.title)
                  .join(', ')}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="mb-2 font-medium text-red-500">
                Vehicle Description
              </h3>
              <p className="text-sm text-gray-600">{carData.description}</p>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <button
                    onClick={() => setShowVehicleDetails(!showVehicleDetails)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="font-medium">Vehicle Details</span>
                    <FaChevronRight
                      className={cn(
                        'h-4 w-4 transition-transform',
                        showVehicleDetails && 'rotate-90'
                      )}
                    />
                  </button>
                  {showVehicleDetails && (
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Transmission</span>
                        <p className="font-medium">{carData.transmission}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Fuel</span>
                        <p className="font-medium">{carData.fueltype}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Doors</span>
                        <p className="font-medium">{carData.door}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Seats</span>
                        <p className="font-medium">{carData.seat}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <button
                    onClick={() => setShowFeatures(!showFeatures)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="font-medium">Features</span>
                    <FaChevronRight
                      className={cn(
                        'h-4 w-4 transition-transform',
                        showFeatures && 'rotate-90'
                      )}
                    />
                  </button>
                  {showFeatures && (
                    <div className="mt-4 space-y-2 text-sm">
                      {carData.carattributes_attr.features.map((f) => (
                        <div key={f.id} className="flex items-center gap-2">
                          <FaCheck className="h-4 w-4 text-green-500" />
                          <span>{f.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Column - Booking */}
        <div className="space-y-6 lg:col-span-5">
          <div className="sticky top-8 space-y-6">
            <Card>
              <CardContent className="px-6">
                <h2 className="mb-6 text-lg font-semibold">Rental Plan</h2>

                {/* Duration */}
                <div className="mb-6 grid grid-cols-3 gap-2">
                  {currentYear?.durations.map((duration) => (
                    <Button
                      key={duration.duration_id}
                      variant={
                        selectedDuration === duration.duration_id
                          ? 'default'
                          : 'outline'
                      }
                      className={cn(
                        'h-12',
                        selectedDuration === duration.duration_id
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'border-gray-300'
                      )}
                      onClick={() => setSelectedDuration(duration.duration_id)}
                    >
                      {duration.duration_title}
                    </Button>
                  ))}
                </div>

                {/* Kilometer Allowance */}
                <div className="mb-6">
                  <h3 className="mb-3 font-medium">Yearly KM Allowance</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {currentDuration?.kilometer_pricing.map((km) => (
                      <Button
                        key={km.kilometer_id}
                        variant={
                          selectedKilometers === km.kilometer_id
                            ? 'default'
                            : 'outline'
                        }
                        className={cn(
                          'h-12',
                          selectedKilometers === km.kilometer_id
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'border-gray-300'
                        )}
                        onClick={() => setSelectedKilometers(km.kilometer_id)}
                      >
                        {km.kilometer_title}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Vehicle Model & Years */}
                <div className="mb-4 border-b border-gray-200 pb-2">
                  <h3 className="mb-3 font-medium">Vehicle Model</h3>

                  <div className="flex flex-wrap gap-2">
                    {carData.personal_lease_pricing.pricing_matrix.map(
                      (year) => (
                        <Button
                          key={year.year_id}
                          variant={
                            selectedYear === year.year_id
                              ? 'default'
                              : 'outline'
                          }
                          className={cn(
                            'h-10 px-3 text-sm',
                            selectedYear === year.year_id
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'border-gray-300'
                          )}
                          onClick={() => setSelectedYear(year.year_id)}
                        >
                          {year.year_title}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">
                      {currentPrice} AED
                    </span>
                  </div>
                </div>

                {/* Additional services */}
                <AdditionalServicesFormMobile
                  className="my-4"
                  rentalAdditional={normalizedRentalAdditional}
                />
                <DropoffChargeDisplay />

                <ProceedToPayment
                  basePrices={{
                    daily: currentPrice,
                    weekly: currentPrice,
                    monthly: currentPrice,
                    fixed: currentPrice,
                  }}
                  carId={carData.id}
                  bookNow={1}
                  message={''}
                  paymentOptions={paymentOptions}
                  isDailyPriceActive={false} // to determine if car is rentable for daily mode
                  isWeeklyPriceActive={false} // to determine if car is rentable for daily mode
                  isMonthlyPriceActive={true} // to determine if car is rentable for daily mode
                />

                <p className="mt-2 text-xs text-gray-500">
                  Prices are not inclusive of VAT.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
