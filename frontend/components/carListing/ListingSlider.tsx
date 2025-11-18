'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Grid } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'

import { CarData } from '@/model/CarModel'
import CarListCard2 from '@/components/carListing/CarListCard2'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

interface CarListCardProps {
  rows?: number
  cars: CarData[]
  leadMode?: boolean
  enquiryLink?: string
  isGlobalDailyPriceActive: GetOperatingCountriesData['daily_price_active']
  isGlobalWeeklyPriceActive: GetOperatingCountriesData['weekly_price_active']
  isGlobalMonthlyPriceActive: GetOperatingCountriesData['monthly_price_active']
}

const LinstingSlider = ({
  cars,
  leadMode,
  rows = 1,
  enquiryLink,
  isGlobalDailyPriceActive,
  isGlobalWeeklyPriceActive,
  isGlobalMonthlyPriceActive,
}: CarListCardProps) => {
  return (
    <Swiper
      loop
      dir="ltr"
      spaceBetween={24}
      autoplay={{ delay: 4000 }}
      style={{ paddingBottom: 48 }}
      modules={[Pagination, Autoplay, Grid]}
      pagination={{ dynamicBullets: true }}
      breakpoints={{
        768: { slidesPerView: 2, grid: { rows, fill: 'row' } },
        1024: { slidesPerView: 3, grid: { rows, fill: 'row' } },
        1536: { slidesPerView: 4, grid: { rows, fill: 'row' } },
      }}
    >
      {cars.map((car) => (
        <SwiperSlide key={car.id}>
          <CarListCard2
            car={car}
            leadMode={leadMode}
            enquiryLink={enquiryLink}
            isDailyPriceActive={!!(isGlobalDailyPriceActive && car.dailyactive)}
            isWeeklyPriceActive={
              !!(isGlobalWeeklyPriceActive && car.weeklyactive)
            }
            isMonthlyPriceActive={
              !!(isGlobalMonthlyPriceActive && car.monthlyactive)
            }
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default LinstingSlider
