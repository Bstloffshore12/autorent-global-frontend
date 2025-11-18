'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import { type PartnerData } from '@/model/CmsModel'

const PartnerSlider = ({ partners }: { partners: PartnerData[] }) => {
  return (
    <Swiper
      loop
      freeMode
      dir="ltr"
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
        992: { slidesPerView: 5 },
      }}
    >
      {partners.map(({ id, media, title, subtitle }) => (
        <SwiperSlide key={id} className="mb-12 pt-2 text-center">
          <Link
            target="_blank"
            href={subtitle || '#'}
            rel="noopener noreferrer"
            className="m-auto block h-20"
          >
            <Image
              width={384}
              height={100}
              title={media?.title}
              alt={media?.alt || title}
              className="m-auto h-full max-h-20 w-full max-w-96 scale-95 object-contain duration-300 hover:scale-100"
              src={
                media?.path
                  ? `${routes.bucketUrlClient}${media?.path}`
                  : '/assets/images/placeholder.svg'
              }
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default PartnerSlider
