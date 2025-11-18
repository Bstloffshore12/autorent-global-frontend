'use client'

import type React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useMemo, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  FaChevronDown,
  FaMapMarkerAlt,
  FaCamera,
  FaBluetooth,
  FaCar,
  FaCheck,
} from 'react-icons/fa'
import Image from 'next/image'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useAppStore } from '@/store/provider'

import type { MonthlyLeaseCarData as CarData } from '@/model/MonthlyLeaseModel'

interface CarRentalListingProps {
  cars: CarData[]
}
const BOOK_NOW_PATH = '/checkout'
const LEASE_TYPE = 'monthly'
const getFeatureIcon = (featureTitle: string) => {
  const title = featureTitle.toLowerCase()
  if (title.includes('bluetooth')) return <FaBluetooth className="h-4 w-4" />
  if (title.includes('camera')) return <FaCamera className="h-4 w-4" />
  if (title.includes('parking')) return <FaMapMarkerAlt className="h-4 w-4" />
  return <FaCar className="h-4 w-4" />
}

export default function MonthlyLeaseListing({ cars }: CarRentalListingProps) {
  const pathname = usePathname()
  const router = useRouter()
  const {
    setOrder: { setCarId, setLeaseType },
    order: { pickupTime, dropoffTime },
  } = useAppStore((state) => state)

  const [sortBy, setSortBy] = useState('price-low')
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const filterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element

      // Don't close if clicking on a dropdown button or inside a dropdown
      if (
        target.closest('[data-dropdown-button]') ||
        target.closest('[data-dropdown]')
      ) {
        return
      }

      // Close any open dropdown
      if (openDropdown) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdown])

  useEffect(() => {
    if (mounted) {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time: number) {
        lenisRef.current?.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => lenisRef.current?.destroy()
    }
  }, [mounted])

  const filterData = useMemo(() => {
    const makes = [...new Set(cars.map((car) => car.make))].sort()
    const seats = [...new Set(cars.map((car) => car.seat))].sort()
    const years = [...new Set(cars.map((car) => car.year))].sort().reverse()
    const bodyTypes = [...new Set(cars.map((car) => car.bodytype))].sort()
    const allFeatures = cars.flatMap((car) =>
      car.carattributes_attr.features.map((feature) => feature.title)
    )
    const features = [...new Set(allFeatures)].sort()
    return { makes, seats, years, bodyTypes, features }
  }, [cars])

  const handleMultiSelectToggle = (
    value: string,
    selectedValues: string[],
    setSelectedValues: (values: string[]) => void
  ) => {
    setSelectedValues(
      selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value]
    )
  }

  const handleFeatureToggle = (feature: string) => {
    handleMultiSelectToggle(feature, selectedFeatures, setSelectedFeatures)
  }

  const handleBookNow = (car: CarData) => {
    if (!pickupTime || !dropoffTime) {
      alert('Please select pickup and dropoff dates first.') // Or handle more gracefully
      return
    }
    setCarId(car.id)
    setLeaseType('personal')
    router.push(BOOK_NOW_PATH)
  }

  const filteredAndSortedCars = useMemo(() => {
    const filtered = cars.filter((car) => {
      const matchesMake =
        selectedMakes.length === 0 ||
        selectedMakes.some(
          (make) => car.make.toLowerCase() === make.toLowerCase()
        )
      const matchesSeats =
        selectedSeats.length === 0 || selectedSeats.includes(car.seat)
      const matchesYear =
        selectedYears.length === 0 || selectedYears.includes(car.year)
      const matchesBodyType =
        selectedBodyTypes.length === 0 ||
        selectedBodyTypes.some(
          (type) => car.bodytype.toLowerCase() === type.toLowerCase()
        )

      const monthlyPrice = Number.parseFloat(car.monthlysale ?? '0')
      let matchesPrice = selectedPriceRanges.length === 0
      if (selectedPriceRanges.length > 0) {
        matchesPrice = selectedPriceRanges.some((range) => {
          if (range === 'under-1200') return monthlyPrice < 1200
          if (range === '1200-1300')
            return monthlyPrice >= 1200 && monthlyPrice <= 1300
          if (range === 'over-1300') return monthlyPrice > 1300
          return false
        })
      }

      let matchesFeatures = true
      if (selectedFeatures.length > 0) {
        const carFeatures = car.carattributes_attr.features.map((f) => f.title)
        matchesFeatures = selectedFeatures.every((selectedFeature) =>
          carFeatures.some((carFeature) =>
            carFeature.toLowerCase().includes(selectedFeature.toLowerCase())
          )
        )
      }

      return (
        matchesMake &&
        matchesSeats &&
        matchesYear &&
        matchesBodyType &&
        matchesPrice &&
        matchesFeatures
      )
    })

    filtered.sort((a, b) => {
      const priceA = Number.parseFloat(a.monthlysale ?? '0')
      const priceB = Number.parseFloat(b.monthlysale ?? '0')
      switch (sortBy) {
        case 'price-low':
          return priceA - priceB
        case 'price-high':
          return priceB - priceA
        case 'year-new':
          return Number.parseInt(b.year) - Number.parseInt(a.year)
        case 'year-old':
          return Number.parseInt(a.year) - Number.parseInt(b.year)
        case 'make':
          return a.make.localeCompare(b.make)
        default:
          return 0
      }
    })

    return filtered
  }, [
    cars,
    sortBy,
    selectedMakes,
    selectedSeats,
    selectedPriceRanges,
    selectedYears,
    selectedBodyTypes,
    selectedFeatures,
  ])

  const latestYear = Math.max(
    ...filteredAndSortedCars.flatMap((car) =>
      car.monthly_pricing_data.map((p) => Number(p.year_title))
    )
  )

  const FeaturesFilter = () => {
    const isOpen = openDropdown === 'features'
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
    const [positioned, setPositioned] = useState(false)
    const buttonRef = useRef<HTMLDivElement | null>(null)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const touchStartY = useRef<number | null>(null)

    const getDisplayText = () => {
      if (selectedFeatures.length === 0) return 'Features'
      if (selectedFeatures.length === 1)
        return `Features: ${selectedFeatures[0]}`
      return `Features: ${selectedFeatures[0]} +${selectedFeatures.length - 1}`
    }

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setPosition({
          top: rect.bottom,
          left: rect.left,
          width: rect.width,
        })
        setPositioned(true)
      }
    }

    const toggleDropdown = () => {
      if (isOpen) {
        setOpenDropdown(null)
        setPositioned(false)
      } else {
        setPositioned(false)
        updatePosition()
        setOpenDropdown('features')
      }
    }

    useEffect(() => {
      if (!isOpen) return
      updatePosition()
      const handler = () => updatePosition()
      window.addEventListener('resize', handler)
      lenisRef.current?.on('scroll', handler)
      return () => {
        window.removeEventListener('resize', handler)
        lenisRef.current?.off('scroll', handler)
      }
    }, [isOpen])

    const handleWheel = (e: React.WheelEvent) => {
      const element = dropdownRef.current
      if (!element) return

      const { scrollTop, scrollHeight, clientHeight } = element
      const isScrollingUp = e.deltaY < 0
      const isScrollingDown = e.deltaY > 0

      // Prevent global scroll if we're scrolling within bounds
      if (
        (isScrollingUp && scrollTop > 0) ||
        (isScrollingDown && scrollTop < scrollHeight - clientHeight)
      ) {
        e.stopPropagation()
      }
    }

    const handleTouchStart = (e: React.TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!touchStartY.current || !dropdownRef.current) return

      const currentY = e.touches[0].clientY
      const deltaY = touchStartY.current - currentY
      const element = dropdownRef.current
      const { scrollTop, scrollHeight, clientHeight } = element

      // Prevent global scroll if we're scrolling within bounds
      if (
        (deltaY < 0 && scrollTop > 0) ||
        (deltaY > 0 && scrollTop < scrollHeight - clientHeight)
      ) {
        e.stopPropagation()
      }
    }

    const dropdown = (
      <div
        data-dropdown
        className="z-[9999] rounded-md border border-gray-200 bg-white shadow-lg"
        style={{
          position: 'fixed',
          top: position.top + 4,
          left: position.left,
          width: Math.max(position.width, 280),
          visibility: positioned ? 'visible' : 'hidden',
          opacity: positioned ? 1 : 0,
        }}
      >
        <div className="p-4">
          <h3 className="mb-3 font-medium text-gray-900">Features</h3>

          <div
            ref={dropdownRef}
            className="max-h-64 space-y-3 overflow-y-auto overscroll-contain"
            style={{ WebkitOverflowScrolling: 'touch' }}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {filterData.features.map((feature) => (
              <label
                key={feature}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
              >
                <span className="text-sm text-gray-700">{feature}</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="sr-only"
                  />
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                      selectedFeatures.includes(feature)
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedFeatures.includes(feature) && (
                      <FaCheck className="h-3 w-3 text-white" />
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>

          <Button
            className="mt-4 w-full bg-red-500 text-white hover:bg-red-600"
            onClick={() => setOpenDropdown(null)}
          >
            Done
          </Button>
        </div>
      </div>
    )

    return (
      <div className="relative" ref={buttonRef}>
        <Button
          data-dropdown-button
          variant="outline"
          className={`flex items-center gap-2 ${
            selectedFeatures.length > 0
              ? 'bg-black text-white hover:bg-gray-800'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={toggleDropdown}
        >
          {getDisplayText()}
          <FaChevronDown className="h-4 w-4" />
        </Button>

        {isOpen &&
          mounted &&
          positioned &&
          createPortal(dropdown, document.body)}
      </div>
    )
  }

  const FilterButton = ({
    label,
    value,
    selectedValues,
    options,
    onChange,
    onMultiChange,
    icon: Icon,
    dropdownKey,
    isMultiSelect = false,
  }: any) => {
    const isOpen = openDropdown === dropdownKey
    const buttonRef = useRef<HTMLDivElement | null>(null)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
    const [positioned, setPositioned] = useState(false)

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setPosition({
          top: rect.bottom,
          left: rect.left,
          width: rect.width,
        })
        setPositioned(true)
      }
    }

    const toggleDropdown = () => {
      if (isOpen) {
        setOpenDropdown(null)
        setPositioned(false)
      } else {
        setPositioned(false)
        updatePosition()
        setOpenDropdown(dropdownKey)
      }
    }

    useEffect(() => {
      if (!isOpen) return
      updatePosition()
      const handler = () => updatePosition()
      window.addEventListener('resize', handler)
      lenisRef.current?.on('scroll', handler)
      return () => {
        window.removeEventListener('resize', handler)
        lenisRef.current?.off('scroll', handler)
      }
    }, [isOpen])

    const getDisplayText = () => {
      if (isMultiSelect && selectedValues) {
        if (selectedValues.length === 0) return label
        if (selectedValues.length === 1) {
          const option = options.find(
            (opt: any) => opt.value === selectedValues[0]
          )
          return `${label}: ${option?.label || selectedValues[0]}`
        }
        const firstOption = options.find(
          (opt: any) => opt.value === selectedValues[0]
        )
        return `${label}: ${firstOption?.label || selectedValues[0]} +${selectedValues.length - 1}`
      }

      if (!value) return label
      const option = options.find((opt: any) => opt.value === value)
      return option ? option.label : value
    }

    const isActive = isMultiSelect ? selectedValues?.length > 0 : !!value

    const handleOptionClick = (optionValue: string) => {
      if (isMultiSelect && onMultiChange && selectedValues) {
        handleMultiSelectToggle(optionValue, selectedValues, onMultiChange)
      } else if (onChange) {
        onChange(optionValue)
        setOpenDropdown(null)
      }
    }

    const touchStartY = useRef<number | null>(null)

    const handleWheel = (e: React.WheelEvent) => {
      if (!isMultiSelect) return

      const element = dropdownRef.current
      if (!element) return

      const { scrollTop, scrollHeight, clientHeight } = element
      const isScrollingUp = e.deltaY < 0
      const isScrollingDown = e.deltaY > 0

      // Prevent global scroll if we're scrolling within bounds
      if (
        (isScrollingUp && scrollTop > 0) ||
        (isScrollingDown && scrollTop < scrollHeight - clientHeight)
      ) {
        e.stopPropagation()
      }
    }

    const handleTouchStart = (e: React.TouchEvent) => {
      if (!isMultiSelect) return
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isMultiSelect || !touchStartY.current || !dropdownRef.current) return

      const currentY = e.touches[0].clientY
      const deltaY = touchStartY.current - currentY
      const element = dropdownRef.current
      const { scrollTop, scrollHeight, clientHeight } = element

      // Prevent global scroll if we're scrolling within bounds
      if (
        (deltaY < 0 && scrollTop > 0) ||
        (deltaY > 0 && scrollTop < scrollHeight - clientHeight)
      ) {
        e.stopPropagation()
      }
    }

    const dropdown = (
      <div
        data-dropdown
        className="z-[9999] rounded-md border border-gray-200 bg-white shadow-lg"
        style={{
          position: 'fixed',
          top: position.top + 4,
          left: position.left,
          minWidth: Math.max(position.width, 160),
          width: isMultiSelect
            ? Math.max(position.width, 280)
            : Math.max(position.width, 160),
          visibility: positioned ? 'visible' : 'hidden',
          opacity: positioned ? 1 : 0,
        }}
      >
        {isMultiSelect ? (
          <div className="p-4">
            <h3 className="mb-3 font-medium text-gray-900">{label}</h3>
            <div
              ref={dropdownRef}
              className="max-h-64 space-y-2 overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: 'touch' }}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              {options.map((option: any) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                >
                  <span className="text-sm text-gray-700">{option.label}</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedValues?.includes(option.value) || false}
                      onChange={() => handleOptionClick(option.value)}
                      className="sr-only"
                    />
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                        selectedValues?.includes(option.value)
                          ? 'border-red-500 bg-red-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedValues?.includes(option.value) && (
                        <FaCheck className="h-3 w-3 text-white" />
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <Button
              className="mt-4 w-full bg-red-500 text-white hover:bg-red-600"
              onClick={() => setOpenDropdown(null)}
            >
              Done
            </Button>
          </div>
        ) : (
          <div className="py-1">
            <button
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
              onClick={() => handleOptionClick('')}
            >
              All {label}
            </button>
            {options.map((option: any) => (
              <button
                key={option.value}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )

    return (
      <div className="relative" ref={buttonRef}>
        <Button
          data-dropdown-button
          variant="outline"
          className={`flex items-center gap-2 ${
            isActive
              ? 'bg-black text-white hover:bg-gray-800'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={toggleDropdown}
        >
          {getDisplayText()}
          {Icon && <Icon className="h-4 w-4" />}
        </Button>

        {isOpen &&
          mounted &&
          positioned &&
          createPortal(dropdown, document.body)}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Choose your wheels
      </h1>

      <div className="mb-8 flex flex-wrap gap-3">
        <FilterButton
          label="Sort By"
          value={sortBy}
          options={[
            { value: 'price-low', label: 'Price: Low to High' },
            { value: 'price-high', label: 'Price: High to Low' },
            { value: 'year-new', label: 'Year: Newest First' },
            { value: 'year-old', label: 'Year: Oldest First' },
            { value: 'make', label: 'Make: A to Z' },
          ]}
          onChange={setSortBy}
          icon={FaChevronDown}
          dropdownKey="sort"
          isMultiSelect={false}
        />
        <FilterButton
          label="Make & Brand"
          selectedValues={selectedMakes}
          options={filterData.makes.map((make) => ({
            value: make,
            label: make,
          }))}
          onMultiChange={setSelectedMakes}
          icon={FaChevronDown}
          dropdownKey="make"
          isMultiSelect={true}
        />
        <FilterButton
          label="No. of Seats"
          selectedValues={selectedSeats}
          options={filterData.seats.map((seat) => ({
            value: seat,
            label: `${seat} Seats`,
          }))}
          onMultiChange={setSelectedSeats}
          icon={FaChevronDown}
          dropdownKey="seats"
          isMultiSelect={true}
        />
        <FilterButton
          label="Price"
          selectedValues={selectedPriceRanges}
          options={[
            { value: 'under-1200', label: 'Under 1,200 AED' },
            { value: '1200-1300', label: '1,200 AED - 1,300 AED' },
            { value: 'over-1300', label: 'Over 1,300 AED' },
          ]}
          onMultiChange={setSelectedPriceRanges}
          icon={FaChevronDown}
          dropdownKey="price"
          isMultiSelect={true}
        />
        <FilterButton
          label="Model Year"
          selectedValues={selectedYears}
          options={filterData.years.map((year) => ({
            value: year,
            label: year,
          }))}
          onMultiChange={setSelectedYears}
          icon={FaChevronDown}
          dropdownKey="year"
          isMultiSelect={true}
        />
        <FilterButton
          label="Body Types"
          selectedValues={selectedBodyTypes}
          options={filterData.bodyTypes.map((type) => ({
            value: type,
            label: type,
          }))}
          onMultiChange={setSelectedBodyTypes}
          icon={FaChevronDown}
          dropdownKey="bodytype"
          isMultiSelect={true}
        />
        <FeaturesFilter />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredAndSortedCars.length} of {cars.length} vehicles
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredAndSortedCars.length > 0 ? (
          filteredAndSortedCars.map((car) => (
            <Card
              key={car.id}
              className="overflow-hidden border border-gray-200 transition-shadow hover:shadow-lg"
            >
              <Link
                href={`${pathname}/${car.slug}`}
                className="relative block aspect-[16/9] cursor-pointer bg-gray-100"
              >
                {car.monthly_pricing_data.some(
                  (p) => Number(p.year_title) === latestYear
                ) && (
                  <Badge className="absolute left-3 top-3 z-20 bg-secondary text-white hover:bg-red-600">
                    Brand New
                  </Badge>
                )}

                {car.media && car.media[0] ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${car.media[0].path}`}
                    alt={car.media[0].alt}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <FaCar className="h-16 w-16" />
                  </div>
                )}
              </Link>

              <CardContent className="px-4 py-0">
                <h3 className="mb-1 text-lg font-bold text-gray-900">
                  {car.make.toUpperCase()} {car.model.toUpperCase()}
                </h3>

                <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                  <span>
                    {
                      car.monthly_pricing_data.reduce((latest, current) =>
                        Number(current.year_title) > Number(latest.year_title)
                          ? current
                          : latest
                      ).year_title
                    }
                  </span>
                  <span>{car.fueltype}</span>
                  <span>{car.transmission}</span>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
                  {car.carattributes_attr.features
                    .slice(0, 4)
                    .map((feature, index) => (
                      <div key={feature.id} className="flex items-center gap-1">
                        {getFeatureIcon(feature.title)}
                        <span className="text-xs">
                          {index === 0
                            ? 'A'
                            : index === 1
                              ? 'AC'
                              : index === 2
                                ? 'A'
                                : 'AC'}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="border-t pt-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-red-500">
                      {Number.parseFloat(
                        car.monthly_pricing_data.reduce((latest, current) =>
                          Number(current.year_title) > Number(latest.year_title)
                            ? current
                            : latest
                        ).durations[0]?.kilometer_pricing[0]?.price ?? '0'
                      ).toLocaleString()}
                      .00 AED
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href={`${pathname}/${car.slug}`}
                    className="inline-block w-full transform cursor-pointer rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg active:translate-y-0.5 active:scale-95 active:shadow-inner"
                  >
                    View Details
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            <FaCar className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <p className="text-lg font-medium">
              No cars found matching your filters.
            </p>
            <p className="text-sm text-gray-400">
              Try adjusting your filters to see available cars.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
