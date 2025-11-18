import Image from 'next/image'
import { BsClock } from 'react-icons/bs'
import { useTranslations } from 'next-intl'
import { BiMapPin, BiCalendar, BiChevronDown } from 'react-icons/bi'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Card from '@/components/common/Card'
import Chip from '@/components/common/Chip'
import LinkButton from '@/components/common/LinkButton'
import PageHeading from '@/components/common/PageHeading'
import { type BookingDetailData } from '@/model/UserModel'
import {
  classnames,
  formatDate,
  formatTime,
  calculateAdditionalServiceCost,
} from '@/futils'
import CarAttributesSection2 from '@/components/carDetail/CarAttributesSection2'

const OrderSuccess = ({ bookingData }: { bookingData: BookingDetailData }) => {
  const t = useTranslations()

  const basePrices = {
    daily: bookingData.car.dailysale || bookingData.car.daily,
    weekly: bookingData.car.weeklysale || bookingData.car.weekly,
    monthly: bookingData.car.monthlysale || bookingData.car.monthly,
  }

  return (
    <div>
      {/* Status Header */}
      <div className="mb-8 flex flex-col items-center justify-center gap-6 text-center md:flex-row md:justify-between">
        <div>
          <PageHeading className="">
            {t('Booking Successfully Made')}!
          </PageHeading>
          <p className="mt-2 text-xl">
            {t('Thank you for choosing our service')}
          </p>
        </div>

        <div className="mb-4 rounded-2xl border border-neutral-100 p-6 shadow-lg shadow-primary/20">
          <p className="text-center">
            Your booking reference is{' '}
            <span className="text-lg font-bold">
              {bookingData.order.booking_id}
            </span>
          </p>
          <p className="mt-1 text-center text-sm">
            {t('Please save this reference for future communications')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Car Details and Rental Information */}
        <div className="space-y-6 md:col-span-2">
          {/* Car Details */}
          <Card>
            <div className="flex flex-col gap-6 md:flex-row">
              <Link
                className="md:w-1/2"
                href={routes.carDetail(bookingData.car.slug)}
              >
                <Image
                  width={500}
                  height={500}
                  alt={bookingData.car.media?.alt || bookingData.car.title}
                  title={bookingData.car.media?.title || bookingData.car.title}
                  src={
                    bookingData.car.media?.path
                      ? `${routes.bucketUrl}${bookingData.car.media.path}`
                      : '/assets/images/placeholder.svg'
                  }
                  className="rounded-md object-cover"
                />
              </Link>
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold">
                  {bookingData.car.title}
                </h3>
                <div className="mb-3 mt-1 flex gap-2">
                  <Chip>{bookingData.car.make}</Chip>
                  <Chip>{bookingData.car.bodytype}</Chip>
                </div>
                <div>
                  <CarAttributesSection2
                    make={bookingData.car.make}
                    door={bookingData.car.door}
                    seat={bookingData.car.seat}
                    year={bookingData.car.year}
                    color={bookingData.car.color}
                    model={bookingData.car.model}
                    warranty={bookingData.car.warranty}
                    bodyType={bookingData.car.bodyType}
                    fuelType={bookingData.car.fuelType}
                    cylinder={bookingData.car.cylinder}
                    transmission={bookingData.car.transmission}
                    bodyCondition={bookingData.car.bodyCondition}
                    regionalSpecification={
                      bookingData.car.regionalSpecification
                    }
                  />
                </div>

                <div className="mt-4">
                  <div className="mb-1 flex justify-between font-medium text-black">
                    <p className="text-left">Features</p>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                    {bookingData.car.carattributes.features.map((feature) => (
                      <Chip
                        key={feature.id}
                        theme="primaryLight"
                        className="flex items-center gap-1 !text-sm font-normal text-primary"
                      >
                        {feature.title}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            {bookingData.additional_charges.length > 0 && (
              <div className="mt-4">
                <p className="font-medium">{t('Additional Services')}</p>
                {bookingData.additional_charges.map((addOn) => (
                  <div key={addOn.id}>
                    <div
                      className={classnames(
                        'grid cursor-pointer grid-cols-[auto_100px] items-center gap-1 border-b border-dashed p-2 duration-150'
                      )}
                    >
                      <div className="text-left">
                        <div
                          className={classnames(
                            'flex items-center gap-2 font-normal duration-150'
                          )}
                        >
                          {addOn.title}
                        </div>
                        <p className="text-sm">{addOn.description}</p>
                      </div>
                      <p className="text-right font-normal">
                        {calculateAdditionalServiceCost(
                          addOn.price,
                          bookingData.order.pricemode,
                          bookingData.order.duration,
                          addOn.title
                        )}{' '}
                        {bookingData.order.currency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Rental Details */}
          <Card>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Pickup Details */}
              <div className="space-y-3">
                <h3 className="font-semibold">{t('Pickup')}</h3>
                <div className="flex items-start gap-2">
                  <BiCalendar className="mt-0.5 h-4 w-4" />
                  <div>
                    <p className="font-medium">
                      {formatDate(bookingData.order.pickup_date)}
                    </p>
                    <p className="text-sm">
                      {formatTime(bookingData.order.pickup_date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <BiMapPin className="mt-0.5 h-4 w-4" />
                  <p>
                    {bookingData.order.locations.pickup ||
                      t('Location not specified')}
                  </p>
                </div>
              </div>

              {/* Return Details */}
              <div className="space-y-3">
                <h3 className="font-semibold">{t('Return')}</h3>
                <div className="flex items-start gap-2">
                  <BiCalendar className="mt-0.5 h-4 w-4" />
                  <div>
                    <p className="font-medium">
                      {formatDate(bookingData.order.dropoff_date)}
                    </p>
                    <p className="text-sm">
                      {formatTime(bookingData.order.dropoff_date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <BiMapPin className="mt-0.5 h-4 w-4" />
                  <p>
                    {bookingData.order.locations.dropoff ||
                      t('Location not specified')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-md bg-gray-50 p-3">
              <BsClock className="h-4 w-4" />
              <p className="text-sm">
                <span className="font-medium">{t('Duration:')}</span>{' '}
                {bookingData.order.duration}{' '}
                {bookingData.order.duration === 1 ? t('day') : t('days')} (
                {bookingData.order.pricemode})
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column - Payment Summary and Actions */}
        <div className="space-y-6">
          {/* Payment Summary */}

          <div className="rounded-lg bg-primary-light p-2">
            <div className="mt-2 space-y-1 rounded-lg bg-white p-2 font-normal shadow shadow-primary/10">
              <p className="flex items-center justify-between">
                <span>{t('Durations')}</span>

                <span className="flex items-center gap-2 text-sm">
                  {bookingData.order.duration}{' '}
                  {bookingData.order.duration === 1 ? 'Day' : 'Days'}
                </span>
              </p>

              <p className="flex items-center justify-between text-sm capitalize text-neutral-500">
                <span>
                  {t('Amount')} ({bookingData.order.pricemode})
                </span>
                <span>
                  {basePrices[bookingData.order.pricemode]}{' '}
                  {bookingData.order.currency}
                </span>
              </p>
              <p className="flex items-center justify-between text-sm capitalize text-neutral-500">
                <span>
                  {t('Sub Total')} ({bookingData.order.duration}{' '}
                  {bookingData.order.duration === 1 ? 'Day' : 'Days'})
                </span>
                <span>
                  {bookingData.order.car_total_price}{' '}
                  {bookingData.order.currency}
                </span>
              </p>
              <p className="flex items-center justify-between border-t pt-1">
                <span className="text-sm text-neutral-500">
                  {t('From')}: {formatDate(bookingData.order.pickup_date)}
                </span>
                <span className="text-sm text-neutral-500">
                  {t('To')}: {formatDate(bookingData.order.dropoff_date)}
                </span>
              </p>
            </div>

            <div
              className={classnames(
                'striped overflow-hidden rounded-lg bg-white px-2 shadow shadow-primary/10 duration-300',
                bookingData.additional_charges.length
                  ? 'mt-2 py-2'
                  : 'mt-0 !h-0 p-0'
              )}
              style={{
                height: `${(bookingData.additional_charges.length + 1) * 24 + 28}px`,
              }}
            >
              <p className="mb-2 flex justify-between font-normal">
                <span>{t('Additional Services')}</span>
                <BiChevronDown />
              </p>
              {bookingData.additional_charges.map((addOn) => (
                <p
                  key={addOn.id}
                  className="flex items-center justify-between rounded-md px-2 py-0.5 text-sm text-neutral-500"
                >
                  <span>{addOn.title}</span>
                  <span>
                    {calculateAdditionalServiceCost(
                      addOn.price,
                      bookingData.order.pricemode,
                      bookingData.order.duration,
                      addOn.title
                    )}{' '}
                    {bookingData.order.currency}
                  </span>
                </p>
              ))}
            </div>

            <div className="mt-2 rounded-lg bg-white p-2 font-normal text-neutral-500 shadow shadow-primary/10">
              <p
                className={classnames(
                  'flex items-center justify-between overflow-hidden duration-300',
                  bookingData.additional_charges.length ? 'h-6' : 'mt-0 h-0'
                )}
              >
                <span>{t('Additional Services Total')}</span>
                <span>
                  {bookingData.order.additional_total}{' '}
                  {bookingData.order.currency}
                </span>
              </p>

              <p className="flex items-center justify-between">
                <span>{t('Rental Price')}</span>
                <span>
                  {bookingData.order.car_total_price}{' '}
                  {bookingData.order.currency}
                </span>
              </p>

              {bookingData.order.coupon_price && (
                <p className="flex items-center justify-between">
                  <span>{t('Discount')}</span>
                  <span>
                    {bookingData.order.coupon_price}{' '}
                    {bookingData.order.currency}
                  </span>
                </p>
              )}

              {bookingData.order.tax_amount && (
                <p className="flex items-center justify-between">
                  <span>
                    {bookingData.order.tax_label}{' '}
                    <span className="text-sm">
                      (
                      <span className="text-secondary">
                        {bookingData.order.tax_rate}%
                      </span>
                      )
                    </span>
                  </span>
                  <span>
                    {bookingData.order.tax_amount} {bookingData.order.currency}
                  </span>
                </p>
              )}

              <p className="mt-1 flex items-center justify-between border-y border-neutral-300 py-1 font-medium text-black">
                <span>{t('Total Price')}</span>
                <span>
                  {bookingData.order.total_amount} {bookingData.order.currency}
                </span>
              </p>
            </div>
          </div>

          {/* Booking Details */}
          <Card>
            <div className="space-y-2">
              <p>
                <span className="font-medium">{t('Booking ID')}:</span>{' '}
                {bookingData.order.booking_id}
              </p>
              <p>
                <span className="font-medium">{t('Order ID')}:</span>{' '}
                {bookingData.order.order_id}
              </p>
              <p>
                <span className="font-medium">{t('Created Date')}:</span>{' '}
                {formatDate(bookingData.order.created_date)} {t('at')}{' '}
                {formatTime(bookingData.order.created_date)}
              </p>
              <p>
                <span className="font-medium">{t('Status')}:</span>{' '}
                <span style={{ color: bookingData.order.status_color }}>
                  {bookingData.order.status_name}
                </span>
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8 flex justify-between">
        <LinkButton theme="primaryLight" href={routes.home}>
          {t('Go to Home')}
        </LinkButton>
        <LinkButton theme="primaryLight" href={routes.user.bookings}>
          {t('View All Bookings')}
        </LinkButton>
      </div>
    </div>
  )
}

export default OrderSuccess
