'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import { type RentalGuideData } from '@/model/CmsModel'
import RentalGuideListCard from '@/components/rentalGuide/RentalGuideListCard'

interface RentalGuideSliderProps {
  rentalGuides: RentalGuideData[]
}

const RentalGuideSlider = ({ rentalGuides }: RentalGuideSliderProps) => {
  return (
    <Swiper
      loop
      dir="ltr"
      spaceBetween={24}
      autoplay={{ delay: 4000 }}
      modules={[Pagination, Autoplay]}
      pagination={{ dynamicBullets: true }}
      breakpoints={{
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      }}
    >
      {rentalGuides.map((rentalGuide) => (
        <SwiperSlide key={rentalGuide.id} className="mb-4">
          <RentalGuideListCard {...rentalGuide} />
        </SwiperSlide>
      ))}
      {rentalGuides.map((rentalGuide) => (
        <SwiperSlide key={rentalGuide.id}>
          <RentalGuideListCard {...rentalGuide} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default RentalGuideSlider
