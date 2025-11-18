'use client'

import Image from 'next/image'
import { PiSeat } from 'react-icons/pi'
import { GoGear } from 'react-icons/go'
import { useTranslations } from 'next-intl'
import { FaWhatsapp } from 'react-icons/fa6'
import { RiGasStationLine } from 'react-icons/ri'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Card from '@/components/common/Card'
import { useAppStore } from '@/store/provider'
import { type CarData } from '@/model/CarModel'
import LinkButton from '@/components/common/LinkButton'
import PriceChips2 from '@/components/carDetail/PriceChips2'
import { checkIfRentable, classnames, getAvailablePricingMode } from '@/futils'

interface CarListCard2Props {
  car: CarData
  leadMode?: boolean
  className?: string
  enquiryLink?: string
  isDailyPriceActive: boolean
  isWeeklyPriceActive: boolean
  isMonthlyPriceActive: boolean
}

const CarListCard2 = ({
  leadMode,
  className,
  enquiryLink,
  isDailyPriceActive,
  isWeeklyPriceActive,
  isMonthlyPriceActive,
  car: {
    seat,
    slug,
    media,
    title,
    daily,
    weekly,
    monthly,
    fueltype,
    transmission,
    book_now: bookNow,
    dailysale: dailySale,
    weeklysale: weeklySale,
    car_category: category,
    monthlysale: monthlySale,
    rental_car_link: rentalCarLink,
  },
}: CarListCard2Props) => {
  const t = useTranslations()

  const {
    general: {
      contact: {
        whatsapp: { number, text },
      },
    },
    order: { pricingMode },
  } = useAppStore((state) => state)

  const isRentable = checkIfRentable({
    bookNow,
    leadMode,
    pricingMode,
    isDailyPriceActive,
    isWeeklyPriceActive,
    isMonthlyPriceActive,
  })

  // get available pricing modes based on the active pricing modes
  // [daily, weekly, monthly]
  const availableModes = getAvailablePricingMode({
    isDailyPriceActive,
    isWeeklyPriceActive,
    isMonthlyPriceActive,
  })

  return (
    <Card className={classnames('!p-0 shadow-lg shadow-primary/10', className)}>
      <div className="group grid h-full grid-rows-[208px_auto] overflow-hidden rounded-lg">
        <div className="relative">
          {!leadMode && (
            <LinkButton
              target="_blank"
              ariaLabel="WhatsApp Share Link"
              href={`https://wa.me/${number}?text=${text} \n ${rentalCarLink}`}
              className="absolute right-2 top-2 z-30 !size-9 !rounded-full border-0 !bg-green-600 !p-0 text-white"
            >
              <FaWhatsapp size={20} />
            </LinkButton>
          )}
          {category && (
            <span className="absolute left-2 top-2 z-10 flex h-6 items-center rounded-xl bg-secondary px-2 text-sm font-normal text-secondary-light">
              {category}
            </span>
          )}
          <Link
            href={isRentable ? `${routes.carDetail(slug)}` : '#'}
            className={classnames(
              'relative block overflow-hidden after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:z-10 after:bg-black/20 after:opacity-0 after:duration-300 group-hover:after:opacity-100',
              !isRentable && 'pointer-events-none'
            )}
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

        <div className="flex h-full flex-col space-y-2 p-4">
          <p className="line-clamp-1 text-lg font-medium">{title}</p>

          <div className="!mb-2 !mt-0 w-full">
            <PriceChips2
              interactive
              daily={daily}
              weekly={weekly}
              monthly={monthly}
              dailySale={dailySale}
              weeklySale={weeklySale}
              monthlySale={monthlySale}
              itemClassname="!gap-0 h-min"
              classname="!h-24 items-center"
              availableModes={availableModes}
            />
          </div>

          <p className="!mt-auto flex flex-wrap gap-2 border-y py-2 text-sm font-normal">
            <span className="flex items-center gap-1">
              <RiGasStationLine />
              {fueltype}
            </span>
            <span className="flex items-center gap-1">
              <GoGear />
              {transmission}
            </span>
            <span className="flex items-center gap-1">
              <PiSeat />
              {seat} {t('Seats')}
            </span>
          </p>

          <div
            className={classnames(
              'flex duration-300',
              isRentable ? 'gap-3' : 'gap-0'
            )}
          >
            <LinkButton
              size="small"
              theme="secondary"
              className="w-full"
              href={enquiryLink || `${routes.webform.rentCarsEnquiry}/${slug}`}
            >
              {t('Enquire Now')}
            </LinkButton>

            {/* if the car is not rentable, prevent proceeding to the booking by hiding the button */}
            <LinkButton
              size="small"
              theme="primary"
              className={classnames(
                'w-full !min-w-0',
                isRentable
                  ? 'max-w-72'
                  : 'pointer-events-none max-w-0 overflow-hidden border-0 !px-0'
              )}
              href={`${routes.carDetail(slug)}`}
            >
              {t('Rent Now')}
            </LinkButton>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CarListCard2
