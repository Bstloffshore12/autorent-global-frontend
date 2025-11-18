'use client'

import Image from 'next/image'
import { PiSeat } from 'react-icons/pi'
import { GoGear } from 'react-icons/go'
import { BsImage } from 'react-icons/bs'
import { FaWhatsapp } from 'react-icons/fa6'
import { RiGasStationLine } from 'react-icons/ri'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Price from '@/components/Price'
import Chip from '@/components/common/Chip'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import { type CarData } from '@/model/CarModel'
import LinkButton from '@/components/common/LinkButton'

interface CarListCardProps {
  car: CarData
}

const CarListCard = ({
  car: {
    year,
    slug,
    media,
    title,
    daily,
    weekly,
    monthly,
    bodytype,
    fueltype,
    dailysale,
    mediacount,
    weeklysale,
    monthlysale,
    transmission,
    rental_car_link: rentalCarLink,
  },
}: CarListCardProps) => {
  const {
    general: {
      contact: {
        whatsapp: { number, text },
      },
    },
  } = useAppStore((state) => state)

  return (
    <div className="group overflow-hidden rounded-lg border border-neutral-200">
      <div className="relative">
        <div className="absolute z-10 flex w-full gap-2 p-2">
          <div className="contents">
            {/* {isFeatured && <Chip>Featured</Chip>} */}
            <Chip className="flex items-center gap-2 !bg-neutral-600/40">
              <BsImage />
              {mediacount}
            </Chip>
          </div>
          <Chip className="ml-auto">{year}</Chip>
        </div>
        <Link
          href={`${routes.carDetail(slug)}`}
          className="relative block overflow-hidden after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:z-10 after:bg-black/20 after:opacity-0 after:duration-300 group-hover:after:opacity-100"
        >
          <Image
            width={400}
            height={400}
            alt={media?.alt || title}
            title={media?.title || title}
            src={
              media?.path
                ? `${routes.bucketUrlClient}${media?.path}`
                : '/assets/images/placeholder.svg'
            }
            className="h-52 w-full object-cover duration-300 group-hover:scale-110"
          />
        </Link>
      </div>

      <div className="space-y-1 p-4">
        <p className="text-sm font-medium text-primary">{bodytype}</p>
        <p className="line-clamp-1 text-lg font-medium">{title}</p>
        <p className="flex flex-wrap gap-2 text-sm font-normal">
          <span className="flex items-center gap-1">
            <RiGasStationLine />
            {fueltype}
          </span>
          <span className="flex items-center gap-1">
            <GoGear />
            {transmission}
          </span>
          <span className="flex items-center gap-1">
            <PiSeat />4 Seats
          </span>
        </p>
        <div className="griad justify-between gap-4 py-4 md:grid-cols-3">
          <div className="grid grid-cols-[80px_auto] gap-2">
            <p className="font-normal text-black">Per Day</p>
            <Price
              className="flex items-center gap-2"
              salesPrice={dailysale}
              price={daily}
            />
          </div>
          <div className="grid grid-cols-[80px_auto] gap-2">
            <p className="font-normal text-black">Per Week</p>
            <Price
              className="flex items-center gap-2"
              salesPrice={weeklysale}
              price={weekly}
            />
          </div>
          <div className="grid grid-cols-[80px_auto] gap-2">
            <p className="font-normal text-black">Per Month</p>
            <Price
              className="flex items-center gap-2"
              salesPrice={monthlysale}
              price={monthly}
            />
          </div>
        </div>
        <div className="flex justify-between border-t border-neutral-300 pt-5">
          <div className="flex items-center gap-2">
            <Link
              target="_blank"
              href={`https://wa.me/${number}?text=${text} \n ${rentalCarLink}`}
            >
              <Button
                size="small"
                theme="primaryLight"
                className="!bg-green-100 !p-2 !text-green-800 hover:!border-green-800 hover:!bg-green-800 hover:!text-green-100"
              >
                <FaWhatsapp size={20} />
              </Button>
            </Link>
            <LinkButton
              size="small"
              theme="primaryLight"
              href={`${routes.webform.rentCarsEnquiry}/${slug}`}
            >
              Enquire
            </LinkButton>
          </div>
          <LinkButton
            size="small"
            theme="primary"
            href={`${routes.carDetail(slug)}`}
          >
            View Car
          </LinkButton>
        </div>
      </div>
    </div>
  )
}

export default CarListCard
