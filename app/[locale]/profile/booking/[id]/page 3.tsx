import Image from 'next/image'
import { LuCalendarCheck2 } from 'react-icons/lu'
import { MdOutlineLocationOn } from 'react-icons/md'

import routes from '@/routes'
import {
  compareDate,
  toZonedDateTime,
  calculateAdditionalServiceCost,
} from '@/futils'
import getBookingDetailAction from '@/actions/user/getBookingDetailAction'

interface BookingDetailPageProps {
  params: Promise<{ id: string }>
}

const BookingDetailPage = async ({ params }: BookingDetailPageProps) => {
  const { id } = await params
  const res = await getBookingDetailAction(id)

  if (res.success && res.data) {
    const booking = res.data

    const currency = booking.order.currency

    const getDuration = () => {
      const date1 = toZonedDateTime(booking.order.pickup_date)
      const date2 = toZonedDateTime(booking.order.dropoff_date)
      return compareDate({ ending: date2, starting: date1 })
    }

    const duration = getDuration()

    return (
      <div className="space-y-4 rounded-lg border-primary-light shadow-primary/10 md:border md:p-6 md:shadow-md">
        <div className="center grid grid-cols-[300px_auto] gap-4">
          <Image
            width={300}
            height={300}
            alt={booking.car.title}
            title={booking.car.title}
            src={
              booking.car.media
                ? `${routes.bucketUrl}${booking.car.media.path}`
                : '/assets/images/placeholder.svg'
            }
            className="h-full max-h-44 w-full max-w-72 rounded-lg object-contain"
          />

          <div className="h-full">
            <h3 className="text-lg font-semibold">{booking.car.title}</h3>

            <p className="grid grid-cols-[200px_auto] border-b py-1 font-normal">
              <span>Status: </span>{' '}
              <span className="text-right font-medium">
                {booking.order.status_name}
              </span>
            </p>
            <p className="grid grid-cols-[200px_auto] border-b py-1 font-normal">
              <span>Payment Mode:</span>{' '}
              <span className="text-right font-medium">Pay on Counter</span>
            </p>
            <p className="grid grid-cols-[200px_auto] border-b py-1 font-normal">
              <span>Date of Booking: </span>{' '}
              <span className="text-right font-medium">
                {booking.order.created_date}
              </span>
            </p>
            <p className="grid grid-cols-[200px_auto] border-b py-1 font-normal">
              <span>Booking ID:</span>{' '}
              <span className="text-right font-medium">
                {booking.order.booking_id}
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[300px_600px_auto] gap-4">
          <div className="space-y-4">
            <div>
              <p className="mb-1 w-max border-b font-medium text-primary">
                Pick Up Details
              </p>
              <p className="flex items-center gap-2">
                <MdOutlineLocationOn /> Musaffah Industrial Area
              </p>
              <p className="flex items-center gap-2">
                <LuCalendarCheck2 /> {booking.order.pickup_date}
              </p>
            </div>
            <div>
              <p className="mb-1 w-max border-b font-medium text-primary">
                Drop Off Details
              </p>
              <p className="flex items-center gap-2">
                <MdOutlineLocationOn /> Musaffah Industrial Area
              </p>
              <p className="flex items-center gap-2">
                <LuCalendarCheck2 /> {booking.order.dropoff_date}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-1 w-max border-b font-medium text-primary">
              Pricing
            </p>
            <p className="grid grid-cols-[200px_auto] border-b py-1 font-normal">
              <span>Duration:</span>{' '}
              <span className="text-right font-medium">
                {duration} {duration < 2 ? 'Day' : 'Days'}
              </span>
            </p>
            <p className="grid grid-cols-[200px_auto] border-b py-1 font-normal">
              <span>Rental Charges:</span>{' '}
              <span className="text-right font-medium">
                {booking.order.car_total_price} {currency}
              </span>
            </p>
            <p className="grid grid-cols-[200px_auto] border-b py-1 font-normal">
              <span>Extra Service Charges: </span>{' '}
              <span className="text-right font-medium">
                {booking.order.additional_total} {currency}
              </span>
            </p>
            <p className="grid grid-cols-[200px_auto] border-b py-1 font-normal">
              <span>Total:</span>{' '}
              <span className="text-right font-medium">
                {booking.order.total_amount} {currency}
              </span>
            </p>
          </div>

          <div>
            <p className="mb-1 w-max border-b font-medium text-primary">
              Additional Services
            </p>
            {booking.additional_charges.map((addOn) => (
              <div
                key={addOn.title}
                className="flex justify-between gap-4 border-b py-1"
              >
                <p className="font-normal">{addOn.title}</p>
                <p className="font-medium">
                  {calculateAdditionalServiceCost(
                    addOn.price,
                    booking.order.pricemode,
                    duration,
                    addOn.title
                  )}{' '}
                  {currency}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default BookingDetailPage
