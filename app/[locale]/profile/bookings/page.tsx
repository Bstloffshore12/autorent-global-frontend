'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import { type CSSProperties, useEffect } from 'react'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Card from '@/components/common/Card'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import { classnames, formatDate } from '@/futils'
import LoadingSpinner from '@/icons/LoadingSpinner'
import getOrdersAction from '@/actions/user/getOrdersAction'
import SectionHeading from '@/components/common/SectionHeading'

interface ListProps {
  title: string
  value: string
  style?: CSSProperties | undefined
}

const List = ({ title, value, style }: ListProps) => (
  <div style={style} className="flex items-center gap-2 lg:block">
    <p className="font-normal text-primary"> {title}</p>
    <p>{value}</p>
  </div>
)

const MyBookingsPage = () => {
  const t = useTranslations()

  const {
    user: { bookings },
    setUser: { setBookings },
  } = useAppStore((state) => state)

  const { isPending, refetch, isFetching } = useQuery({
    queryKey: ['getOrders'],
    queryFn: async () => {
      const res = await getOrdersAction()
      if (res.success) {
        setBookings(res.data)
        return res.data
      }

      return null
    },
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className="space-y-4 rounded-lg border-primary-light shadow-primary/10 md:border md:p-6 md:shadow-md">
      <SectionHeading className="!text-2xl text-primary">
        {t('Booking History')}
      </SectionHeading>

      {isPending && (
        <p className="flex items-center justify-center gap-4 font-normal">
          <LoadingSpinner /> {t('Loading Bookings')}...
        </p>
      )}
      {bookings.map((booking) => (
        <Link
          className="z-0 block hover:z-10"
          key={booking.order_id}
          href={routes.user.bookingDetails(booking.order_id)}
        >
          <div
            className={classnames(isFetching ? 'opacity-50' : 'opacity-100')}
          >
            <Card className="grid items-center gap-2 !p-4 sm:grid-cols-[160px_auto] lg:grid-cols-[320px_auto] xl:grid-cols-[400px_auto] xl:!p-0">
              <div className="grid grid-cols-2 items-center gap-2 sm:grid-cols-1 md:!p-0 lg:grid-cols-2">
                <Image
                  width={200}
                  height={122}
                  alt={booking.car_title}
                  title={booking.car_title}
                  src={
                    booking.car_media?.path
                      ? `${routes.bucketUrlClient}${booking.car_media.path}`
                      : '/assets/images/placeholder.svg'
                  }
                  className="h-full max-h-28 w-full object-contain"
                />
                <div className="text-right sm:text-left">
                  <p className="font-medium">{booking.car_title}</p>
                  <p className="text-neutral-500e text-sm">
                    {booking.car_make} {booking.car_model}
                  </p>
                  <Button
                    size="small"
                    theme="primaryLight"
                    className="ml-auto mt-2 !h-8 md:ml-0"
                  >
                    {t('View Details')}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col text-sm lg:p-2">
                <div className="grid gap-1 pb-1 lg:grid-cols-4 lg:gap-2 lg:border-b">
                  <List title={`${t('Ref ID')}: `} value={booking.booking_id} />
                  <List title={`${t('Car')}: `} value={booking.car_model} />
                  <List title={`${t('Total')}: `} value={booking.order_price} />
                  <List
                    title={`${t('Payment Status')}: `}
                    value={booking.status_name}
                    style={{ color: booking.status_color }}
                  />
                </div>
                <div className="grid gap-1 lg:grid-cols-4 lg:gap-2 lg:pt-1">
                  <List
                    title={`${t('From')}: `}
                    value={formatDate(booking.order_pickupdate)}
                  />
                  <List
                    title={`${t('Pickup Locaion')}: `}
                    value={booking.office_locations.pickup}
                  />
                  <List
                    title={`${t('To')}: `}
                    value={formatDate(booking.dropoff_date)}
                  />
                  <List
                    title={`${t('Dropoff Location')}: `}
                    value={booking.office_locations.dropoff}
                  />
                </div>
              </div>
            </Card>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MyBookingsPage
