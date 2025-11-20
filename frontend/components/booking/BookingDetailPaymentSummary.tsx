'use client'

import { MdPayment } from 'react-icons/md'
import { useTranslations } from 'next-intl'

import Card from '@/components/common/Card'
import useTopOffset from '@/hooks/useTopOffset'
import {
  classnames,
  formatDate,
  calculateAdditionalServiceCost,
} from '@/futils'
import { type BookingDetailData } from '@/model/UserModel'

interface BookingDetailPaymentSummaryProps {
  className?: string
  basePrice: string
  order: BookingDetailData['order']
  additionalCharges: BookingDetailData['additional_charges']
  location_dropoff_charge?: {
    title: string
    amount: string
  }
}

const BookingDetailPaymentSummary = ({
  order,
  basePrice,
  className,
  additionalCharges,
  location_dropoff_charge,
}: BookingDetailPaymentSummaryProps) => {
  const t = useTranslations()

  const { offset } = useTopOffset()

  return (
    <Card
      className={classnames(
        'z-10 duration-500',
        offset > 200 && 'mt-0 lg:mt-20',
        className
      )}
    >
      <p className="mb-2 flex items-center gap-2 text-lg font-medium text-primary">
        <MdPayment /> <span>{t('Payment Summary')}</span>
      </p>
      <div className="space-y-1 font-normal">
        <p className="flex items-center justify-between">
          <span>{t('Durations')}</span>

          <span className="flex items-center gap-2 text-sm">
            {order.duration} {order.duration === 1 ? 'Day' : 'Days'}
          </span>
        </p>

        <p className="flex items-center justify-between text-sm capitalize">
          <span>
            {t('Amount')}{' '}
            {order.lease_type === 'personal' ? null : `(${order.pricemode})`}
          </span>
          <span>
            {order.lease_type === 'personal'
              ? `${order.car_total_price}`
              : `(${basePrice})`}{' '}
            {order.currency}
          </span>
        </p>
        <p className="flex items-center justify-between text-sm capitalize">
          <span>
            {t('Sub Total')} ({order.duration}{' '}
            {order.duration === 1 ? 'Day' : 'Days'})
          </span>
          <span>
            {order.car_total_price} {order.currency}
          </span>
        </p>
        <p className="flex items-center justify-between border-y pt-1">
          <span className="text-sm">
            {t('From')}: {formatDate(order.pickup_date)}
          </span>
          <span className="text-sm">
            {t('To')}: {formatDate(order.dropoff_date)}
          </span>
        </p>
      </div>

      {!!additionalCharges.length && (
        <div className="mt-2 py-2">
          <div className="flex justify-between gap-2 font-normal">
            <p className="mb-2">{t('Additional Services')}</p>
            <p className="text-sm capitalize">
              {order.lease_type === 'personal' ? 'Fixed' : order.pricemode}{' '}
              {t('charges')}
            </p>
          </div>
          {additionalCharges.map((addOn) => (
            <p
              key={addOn.id}
              className="flex items-center justify-between rounded-md py-0.5 text-sm"
            >
              <span>{addOn.title}</span>
              <span>
                {addOn.price} {order.currency}
              </span>
            </p>
          ))}
        </div>
      )}
      {location_dropoff_charge && (
        <div className="py-2">
          <div className="flex items-center justify-between border-b border-dashed pb-1 text-sm">
            <span>{location_dropoff_charge.title}</span>
            <span>
              {location_dropoff_charge.amount} {order.currency}
            </span>
          </div>
        </div>
      )}

      <div className="mt-2">
        <p className="mb-2 font-normal">{t('Summary')}</p>
        <p
          className={classnames(
            'flex items-center justify-between overflow-hidden duration-300',
            additionalCharges.length ? 'h-6' : 'mt-0 h-0'
          )}
        >
          <span>{t('Additional Services Total')}</span>
          <span>
            {Number(order.additional_total).toFixed(2)} {order.currency}
          </span>
        </p>

        <p className="flex items-center justify-between">
          <span>{t('Rental Price')}</span>
          <span>
            {order.car_total_price} {order.currency}
          </span>
        </p>

        {order.coupon_price && (
          <p className="flex items-center justify-between">
            <span>{t('Discount')}</span>
            <span>
              {order.coupon_price} {order.currency}
            </span>
          </p>
        )}

        {!!Number(order.tax_amount) && (
          <p className="flex items-center justify-between">
            <span>
              {order.tax_label}{' '}
              <span className="text-sm">
                (<span className="text-secondary">{order.tax_rate}%</span>)
              </span>
            </span>
            <span>
              {order.tax_amount} {order.currency}
            </span>
          </p>
        )}
        {!!Number(order.pay_at_counter_fee) && (
          <p className="flex items-center justify-between">
            <span>
              {order.pay_at_counter_fee_label}{' '}
              <span className="text-sm">
                (
                <span className="text-secondary">
                  {order.pay_at_counter_percentage}%
                </span>
                )
              </span>
            </span>
            <span>
              {order.pay_at_counter_fee} {order.currency}
            </span>
          </p>
        )}

        <p className="mt-1 flex items-center justify-between border-y border-neutral-300 py-1 font-medium text-black">
          <span>{t('Total Price')}</span>
          <span>
            {order.total_amount} {order.currency}
          </span>
        </p>
      </div>
    </Card>
  )
}

export default BookingDetailPaymentSummary
