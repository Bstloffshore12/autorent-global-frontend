'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Card from '@/components/common/Card'
import { type MakeData } from '@/model/CarModel'

const BrandCarousel = ({ brands }: { brands: MakeData[] }) => {
  return (
    <Swiper
      loop
      dir="ltr"
      freeMode
      speed={5000}
      spaceBetween={24}
      autoplay={{ delay: 0 }}
      centerInsufficientSlides
      className="linear-swiper"
      modules={[Pagination, Autoplay]}
      pagination={{ dynamicBullets: true }}
      breakpoints={{
        320: { slidesPerView: 2 },
        576: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
        1200: { slidesPerView: 6 },
      }}
    >
      {brands.map(({ id, media, title, car_count: quantity }) => (
        <SwiperSlide
          style={{ transitionTimingFunction: 'linear' }}
          key={title}
          className="mb-8 pb-6 pt-2 text-center"
        >
          <Link href={`${routes.listing}/?make[]=${id}`} aria-label={title}>
            <Card className="space-y-2 shadow-lg shadow-primary/10">
              <Image
                alt={title}
                width={200}
                height={200}
                className="mx-auto h-14 w-24 object-contain md:h-16"
                src={
                  media
                    ? `${routes.bucketUrlClient}${media}`
                    : '/assets/images/placeholder.svg'
                }
              />
              <p className="text-base font-semibold duration-300">{title}</p>
              <p className="text-sm font-normal text-neutral-500">
                {quantity} Model{quantity > 1 ? 's' : ''}
              </p>
            </Card>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default BrandCarousel
