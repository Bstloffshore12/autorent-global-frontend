import { MdAccessTime } from 'react-icons/md'
import { getTranslations } from 'next-intl/server'
import { BiCalendar, BiMapPin, BiTachometer } from 'react-icons/bi'
import { MdCategory } from 'react-icons/md'
import { PiCarProfileBold } from 'react-icons/pi'


import Card from '@/components/common/Card'
import { formatDate, formatTime } from '@/futils'
import { type BookingDetailData } from '@/model/UserModel'

interface RentalDetailsProps {
  className?: string
  order: BookingDetailData['order']
  leaseDetails?: BookingDetailData['lease_details']
}

const RentalDetails = async ({ order, className, leaseDetails }: RentalDetailsProps) => {
  const t = await getTranslations()

  return (
    <Card className={className}>
      <p className="flex items-center gap-2 text-lg font-medium text-primary">
        <BiCalendar /> <span>{t('Rental Information')}</span>
      </p>
      <div className="grid gap-2 xl:grid-cols-2">
        {/* Pickup Details */}
        <div className="space-y-2">
          <h3 className="font-normal">{t('Pickup')}</h3>
          <div className="grid grid-cols-[16px_auto] items-start gap-2">
            <BiCalendar className="mt-1" />
            <p>
              {formatDate(order.pickup_date)} - {formatTime(order.pickup_date)}
            </p>
          </div>
          <div className="grid grid-cols-[16px_auto] items-start gap-2">
            <BiMapPin className="mt-0.5 size-4" />
            <p>{order.locations.pickup || 'Location not specified'}</p>
          </div>
        </div>

        {/* Return Details */}
        <div className="space-y-2">
          <h3 className="font-normal">{t('Return')}</h3>
          <div className="grid grid-cols-[16px_auto] items-start gap-2">
            <BiCalendar className="mt-1" />
            <p>
              {formatDate(order.dropoff_date)} -{' '}
              {formatTime(order.dropoff_date)}
            </p>
          </div>
          <div className="grid grid-cols-[16px_auto] items-start gap-2">
            <BiMapPin className="mt-1" />
            <p>{order.locations.dropoff || 'Location not specified'}</p>
          </div>
        </div>
      </div>


      {leaseDetails && (leaseDetails.type === 'personal' || leaseDetails.type === 'monthly') ? (
        <>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-light p-2">
            <MdAccessTime />
            <p className="text-sm">
              <span className="font-medium">{t('Duration')}:</span> {leaseDetails.duration_title}{' '}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-light p-2">
            <BiTachometer />
            <p className="text-sm">
              <span className="font-medium">Kilometre Allowance :</span> {leaseDetails.kilometer_title}{' '}
            </p>
          </div>
          {/* Lease Type */}
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-light p-2">
            <MdCategory />
            <p className="text-sm">
              <span className="font-medium">Lease Type :</span>{' '}
              {leaseDetails.type}
            </p>
          </div>

          {/* Lease Year */}
          {/* <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-light p-2">
            <PiCarProfileBold />
            <p className="text-sm">
              <span className="font-medium">Car Model :</span>{' '}
              {leaseDetails.year_title}
            </p>
          </div> */}
        </>
      ) :
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-light p-2">
          <MdAccessTime />
          <p className="text-sm">
            <span className="font-medium">{t('Duration')}:</span> {order.duration}{' '}
            {order.duration === 1 ? 'day' : 'days'} ({order.pricemode})
          </p>
        </div>}
    </Card>
  )
}

export default RentalDetails
