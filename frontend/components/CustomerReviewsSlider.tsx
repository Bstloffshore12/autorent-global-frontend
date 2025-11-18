'use client'

import Image from 'next/image'
import { FaStar } from 'react-icons/fa6'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import routes from '@/routes'
import Card from '@/components/common/Card'
import { Testimonial } from '@/model/CmsModel'

const CustomerReviewsCard = ({ reviews }: { reviews: Testimonial }) => {
  const { name, media, rating, description, created_at: createdAt } = reviews

  return (
    <Card className="mb-12 min-h-60 space-y-4">
      <div className="flex items-center gap-4 rtl:flex-row-reverse">
        {media ? (
          <Image
            width={48}
            height={48}
            alt={name}
            src={routes.bucketUrlClient + media?.path}
            className="size-12 rounded-full border shadow-lg shadow-primary/20"
          />
        ) : (
          <p className="flex size-12 items-center justify-center rounded-full bg-primary-light text-3xl font-medium text-primary shadow-md shadow-primary/20">
            {name?.[0]}
          </p>
        )}

        <div className="grid flex-1 gap-1">
          <p className="font-medium capitalize text-primary rtl:text-right">
            {name}
          </p>
          <div className="flex items-center justify-between gap-2 rtl:flex-row-reverse">
            <p className="flex w-min">
              <span className="flex items-center justify-between">
                {Array(rating)
                  .fill(1)
                  .map((_, i) => (
                    <FaStar key={i} className="text-[#febe00]" />
                  ))}
              </span>
            </p>
            <p className="text-sm text-neutral-500">
              {new Date(createdAt).toDateString()}
            </p>
          </div>
        </div>
      </div>
      <p className="line-clamp-5 rtl:text-right">{description}</p>
    </Card>
  )
}

const CustomerReviewsSlider = ({ reviews }: { reviews: Testimonial[] }) => {
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
      {reviews.map((review) => (
        <SwiperSlide key={review.id}>
          <CustomerReviewsCard reviews={review} />
        </SwiperSlide>
      ))}
      {reviews.map((review) => (
        <SwiperSlide key={review.id}>
          <CustomerReviewsCard reviews={review} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CustomerReviewsSlider
