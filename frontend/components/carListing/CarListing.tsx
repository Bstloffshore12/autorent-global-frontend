'use client'

import { useTranslations } from 'next-intl'
import { SlEqualizer } from 'react-icons/sl'

import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import type { CarPagination, CarData } from '@/model/CarModel'
import CarListCard2 from '@/components/carListing/CarListCard2'
import SectionHeading from '@/components/common/SectionHeading'
import { type OfficeLocationDropdownData } from '@/model/CmsModel'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'
import CarListingPagination from '@/components/carListing/CarListingPagination'
import PickUpDropOffSelector2 from '@/components/carListing/PickUpDropOffSelector2'
import CarsPerPageSelector from '@/components/carListing/CarsListingPerPageSelector'
import CarsListingSortBySelector from '@/components/carListing/CarsListingSortBySelector'

interface CarListing {
  cars: CarData[]
  pagination: CarPagination
  officeLocationsContent: OfficeLocationDropdownData
  isGlobalDailyPriceActive: GetOperatingCountriesData['daily_price_active']
  isGlobalWeeklyPriceActive: GetOperatingCountriesData['weekly_price_active']
  isGlobalMonthlyPriceActive: GetOperatingCountriesData['monthly_price_active']
}

const CarListing = ({
  cars,
  pagination,
  officeLocationsContent,
  isGlobalDailyPriceActive,
  isGlobalWeeklyPriceActive,
  isGlobalMonthlyPriceActive,
}: CarListing) => {
  const t = useTranslations()

  const { setIsListingFilterDrawerOpen } = useAppStore((state) => state)
  const openModal = () => setIsListingFilterDrawerOpen(true)

  return (
    <section className="space-y-6">
      <PickUpDropOffSelector2 officeLocationsContent={officeLocationsContent} />

      <div className="flex items-center justify-between gap-4">
        <SectionHeading className="grid items-end md:flex md:gap-4">
          <span>{t('Listings')} </span>
          <span className="text-sm text-primary">
            ({pagination.total} {t('cars found')})
          </span>
        </SectionHeading>

        <div className="flex items-center gap-2">
          <CarsPerPageSelector className="hidden md:block" />
          <CarsListingSortBySelector />

          <Button
            size="small"
            theme="primaryLight"
            onPress={openModal}
            className="border-0 lg:hidden"
          >
            {t('Filter')} <SlEqualizer />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cars.map((car) => (
          <CarListCard2
            car={car}
            key={car.id}
            isDailyPriceActive={!!(isGlobalDailyPriceActive && car.dailyactive)}
            isWeeklyPriceActive={
              !!(isGlobalWeeklyPriceActive && car.weeklyactive)
            }
            isMonthlyPriceActive={
              !!(isGlobalMonthlyPriceActive && car.monthlyactive)
            }
          />
        ))}
      </div>

      <CarListingPagination pagination={pagination} />
    </section>
  )
}

export default CarListing
