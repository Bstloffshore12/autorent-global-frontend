'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Card from '@/components/common/Card'
import { type BodyTypeData } from '@/model/CarModel'

const FleetCard = ({ bodyType }: { bodyType: BodyTypeData }) => {
  const { id, media, title, count, web_link } = bodyType

  const ListingLink = `${routes.listing}?bodyType[]=${id}`
  const link = count ? ListingLink : web_link || ListingLink

  return (
    <Link href={link}>
      <Card className="mb-12 space-y-4 bg-primary-light text-center text-lg font-normal">
        <Image
          src={
            media
              ? `${routes.bucketUrlClient}${media}`
              : '/assets/images/placeholder.svg'
          }
          width={400}
          height={200}
          alt={`Check our ${title} listings`}
          className="w-full object-contain md:h-48"
        />
        <p>{title}</p>
      </Card>
    </Link>
  )
}

const FleetSlider = ({ fleets }: { fleets: BodyTypeData[] }) => {
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
      {fleets.map((fleet) => (
        <SwiperSlide key={fleet.id}>
          <FleetCard bodyType={fleet} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default FleetSlider
