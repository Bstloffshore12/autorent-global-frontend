'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

import routes from '@/routes'
import Container from '@/components/common/Container'
import LinkButton from '@/components/common/LinkButton'
import { type HomeBannersData } from '@/model/CmsModel'

const HomeSlider = ({ banners }: { banners: HomeBannersData[] }) => {
  return (
    <Swiper
      dir="ltr"
      className="h-screen max-h-[1080px] min-h-40 overflow-hidden"
    >
      {banners.map(({ id, media, title, subtitle }) => (
        <SwiperSlide
          key={id}
          className="h-full after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:z-10 after:h-full after:w-full after:bg-black/20"
        >
          <Image
            alt={title}
            width={1920}
            height={1080}
            title={title}
            className="absolute h-full w-full object-cover"
            src={
              media?.path
                ? `${routes.bucketUrlClient}${media?.path}`
                : '/assets/images/placeholder.svg'
            }
          />

          <Container className="z-20 mt-20 flex items-center text-white drop-shadow md:pt-40">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-4xl font-bold md:text-7xl">{title}</h2>
              <div className="flex flex-wrap items-center gap-6 text-lg font-normal">
                <span className="flex max-w-[600px] items-center gap-2">
                  {subtitle}
                </span>
              </div>
              <LinkButton
                size="big"
                href={routes.listing}
                className="w-28 border-0 !font-medium md:h-12 md:w-40"
              >
                Explore More
              </LinkButton>
            </div>
          </Container>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HomeSlider
