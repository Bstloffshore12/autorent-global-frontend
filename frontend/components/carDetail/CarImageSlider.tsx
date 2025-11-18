'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, type SwiperClass, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import routes from '@/routes'
import { classnames } from '@/futils'
import useTopOffset from '@/hooks/useTopOffset'
import { type CarDetail } from '@/model/CarModel'

type CarImageSliderProps = {
  media: CarDetail['media']
}

const CarImageSlider = ({ media }: CarImageSliderProps) => {
  const { offset } = useTopOffset()
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)

  return (
    <div
      className={classnames(
        offset > 300 && 'md:pt-[100px]',
        'sticky top-0 space-y-6 duration-500'
      )}
    >
      <Swiper
        dir="ltr"
        spaceBetween={10}
        modules={[FreeMode, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {media?.map(({ title, alt, path }) => (
          <SwiperSlide className="pt-2" key={title}>
            <Image
              alt={alt}
              width={1088}
              height={600}
              title={title}
              src={
                path
                  ? `${routes.bucketUrlClient}${path}`
                  : '/assets/images/placeholder.svg'
              }
              className="mx-auto h-full w-full rounded-2xl object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        dir="ltr"
        freeMode={true}
        slidesPerView={4}
        watchSlidesProgress={true}
        onSwiper={setThumbsSwiper}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {media?.map(({ title, alt, path }, i) => (
          <SwiperSlide key={title}>
            <Image
              alt={alt}
              width={200}
              height={200}
              title={title}
              src={
                path
                  ? `${routes.bucketUrlClient}${path}`
                  : '/assets/images/placeholder.svg'
              }
              className={classnames(
                'mx-auto mb-1 h-full max-h-24 w-full cursor-pointer border border-l-0 border-primary/20 object-contain p-1',
                !i && '!border-l'
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarImageSlider
