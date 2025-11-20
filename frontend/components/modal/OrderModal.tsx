'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

import {
  classnames,
  toastErrors,
  PricingCalculator,
  calculateAdditionalServiceCost,
  getPayAtCounterAmount,
} from '@/futils'
import routes from '@/routes'
import useOrder from '@/hooks/useOrder'
import { useRouter } from '@/i18n/routing'
import Modal from '@/components/common/Modal'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import usePickUpDropOff from '@/hooks/usePickUpDropOff'
import { type PaymentMethod } from '@/model/PaymentModel'
import postOrderAction from '@/actions/order/postOrderAction'
import PaymentOptions from '@/components/carDetail/PaymentOptions'

type BasePrices = {
  daily: string
  weekly: string
  monthly: string
  fixed?: string
}

type OrderModalProps = {
  isRentable: boolean
  basePrices: BasePrices
  paymentOptions: PaymentMethod[]
}

export interface PriceDefaultValue {
  total: string
  rental: string
  discount: string
  taxAmount: string
  additionalServices: string
  totalWithoutDiscount: string
  payAtCounterAmount: string
}

export const priceDefaultValue = {
  total: '0.00',
  rental: '0.00',
  discount: '0.00',
  taxAmount: '0.00',
  additionalServices: '0.00',
  totalWithoutDiscount: '0.00',
  payAtCounterAmount: '0.00',
}

const OrderModal = ({
  isRentable,
  basePrices,
  paymentOptions,
}: OrderModalProps) => {
  const t = useTranslations()

  const router = useRouter()

  const {
    order: {
      coupon,
      duration,
      pickupTime,
      pricingMode,
      dropoffTime,
      paymentMethod,
      isOrderModalOpen,
      additionalServices,
      leaseType,
      dropoffCharge,
    },
    auth: { isLoggedIn },
    general: { currency, tax, pay_at_counter_percentage },
    setAuth: { setIsAuthModalOpen },
    setOrder: { setIsOrderModalOpen },
  } = useAppStore((state) => state)

  const { getOrderPayload, redirectToPayment } = useOrder()
  const { decrementDropoffTime, incrementDropoffTime } = usePickUpDropOff()

  const [price, setPrice] = useState<PriceDefaultValue>(priceDefaultValue)

  const [isSubmitting, setIsSubmitting] = useState(false)
  let mode: 'daily' | 'weekly' | 'monthly' | 'fixed' = basePrices.fixed
    ? 'fixed'
    : pricingMode
  const postOrder = async () => {
    if (!paymentMethod) {
      toast.warning('Select a payment method')
      return null
    }

    const payload = getOrderPayload()

    if (!payload) {
      toast.error('Unable to proceed to payment, contact to Support')
      return null
    }
    if (payload.lease_type === 'regular') {
      payload.lease_type = null
    }
    // console.log(payload, 'payload')
    const res = await postOrderAction(payload)
    // console.log(res, 'order res')

    if (res.success) {
      if (
        paymentMethod?.method === 'nbo' ||
        paymentMethod?.method === 'ccavenue' ||
        paymentMethod?.method === 'clickpay' ||
        paymentMethod?.method === 'credimax'
      ) {
        const { order_id: orderId, payment_id: paymentId } = res.data
        const redirectSuccess = await redirectToPayment({ orderId, paymentId })

        if (!redirectSuccess)
          toast.error(
            'Unable to proceed to payment. Contact support to proceed with payment'
          )
      } else if (paymentMethod?.method === 'cod') {
        toast.success('Order has been placed')
        router.push(routes.user.bookingStaticSuccess)
      }

      setIsOrderModalOpen(false)
    } else toastErrors(res.errors)
  }

  const onSubmit = async () => {
    setIsSubmitting(true)
    if (isLoggedIn) await postOrder()
    else setIsAuthModalOpen(true)

    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000)
  }

  useEffect(() => {
    const priceValue = basePrices.fixed ?? basePrices[pricingMode]
    mode = basePrices.fixed ? 'fixed' : pricingMode
    const dropoffChargeAmount = dropoffCharge
      ? parseFloat(dropoffCharge.charge_amount)
      : 0
    const p = PricingCalculator({
      tax,
      coupon,
      duration,
      pricingMode: mode,
      additionalServices,
      basePrice: priceValue,
      dropoffChargeAmount,
      pay_at_counter_percentage:
        paymentMethod?.method === 'cod' ? pay_at_counter_percentage : 0,
    })

    setPrice(p)
  }, [
    tax,
    coupon,
    duration,
    basePrices,
    pickupTime,
    dropoffTime,
    pricingMode,
    additionalServices,
    pay_at_counter_percentage,
    paymentMethod,
    dropoffCharge,
  ])

  return (
    <Modal
      isOpen={isOrderModalOpen}
      className="w-full max-w-3xl"
      setOpen={() => setIsOrderModalOpen(false)}
    >
      <div className="rounded-lg bg-primary-light p-2">
        {dropoffTime && pickupTime && (
          <div className="space-y-1 rounded-lg bg-white p-2 font-normal shadow shadow-primary/10">
            <p className="flex items-center justify-between">
              <span>{t('Durations')}</span>

              <span className="flex items-center gap-2 text-sm">
                <BiChevronDown
                  size={20}
                  onClick={() => {
                    if (leaseType !== 'monthly' && leaseType !== 'personal')
                      decrementDropoffTime()
                  }}
                  className={classnames(
                    'rounded border bg-primary-light',
                    leaseType === 'personal' || leaseType === 'monthly'
                      ? 'cursor-not-allowed opacity-50'
                      : ''
                  )}
                />
                {duration} {duration === 1 ? t('Day') : t('Days')}
                <BiChevronUp
                  size={20}
                  onClick={() => {
                    if (leaseType !== 'monthly' && leaseType !== 'personal')
                      incrementDropoffTime()
                  }}
                  className={classnames(
                    'rounded border bg-primary-light',
                    leaseType === 'personal' || leaseType === 'monthly'
                      ? 'cursor-not-allowed opacity-50'
                      : ''
                  )}
                />
              </span>
            </p>

            <p className="flex items-center justify-between text-sm capitalize text-neutral-500">
              <span>
                {t('Amount')}
                {basePrices.fixed ? '' : ` (${pricingMode})`}
              </span>
              <span>
                {basePrices.fixed ?? basePrices[pricingMode]}{' '}
                {currency.abbreviation}
              </span>
            </p>
            <p className="flex items-center justify-between text-sm capitalize text-neutral-500">
              <span>
                {t('Sub Total')} ({duration} {duration === 1 ? 'Day' : 'Days'})
              </span>
              <span>
                {price.rental} {currency.abbreviation}
              </span>
            </p>
            <p className="flex items-center justify-between border-t pt-1">
              <span className="text-sm text-neutral-500">
                {t('From')}: {pickupTime.toDate().toDateString()}
              </span>
              <span className="text-sm text-neutral-500">
                {t('To')}: {dropoffTime.toDate().toDateString()}
              </span>
            </p>

            {/* display message if car is not rentable */}
            <p
              className={classnames(
                'overflow-hidden border-dashed px-2 text-sm text-orange-600 duration-300',
                isRentable
                  ? 'mt-0 max-h-0 rounded-none border-0 border-white bg-transparent py-0'
                  : 'mt-4 max-h-10 rounded-lg border border-orange-400 bg-orange-50 py-2'
              )}
            >
              {t('This car is not rentable for')} {t(pricingMode)} {t('rental')}
              .
            </p>
          </div>
        )}

        <div
          className={classnames(
            'overflow-hidden rounded-lg bg-white px-2 shadow shadow-primary/10 duration-300',
            additionalServices.length ? 'mt-2 py-2' : 'mt-0 !h-0 p-0'
          )}
          style={{
            height: `${(additionalServices.length + 1) * 24 + 28}px`,
          }}
        >
          <p className="mb-2 flex items-center justify-between font-normal">
            <span>{t('Additional Services')}</span>
            <span className="text-sm capitalize">
              {mode == 'fixed' ? 'Fixed' : t(mode)} {t('charges')}
            </span>
          </p>
          {additionalServices.map((addOn, i) => (
            <p
              key={addOn.id}
              className={classnames(
                'flex items-center justify-between rounded-md border-dashed py-0.5 text-sm text-neutral-500',
                i && 'border-t'
              )}
            >
              <span>{addOn.title}</span>
              <p>
                {mode == 'fixed'
                  ? Number(addOn['daily'])
                  : calculateAdditionalServiceCost(
                      addOn[pricingMode] || addOn.daily,
                      pricingMode,
                      duration,
                      addOn.title,
                      addOn.service_type
                    )}{' '}
                {currency.abbreviation}
              </p>
            </p>
          ))}
        </div>

        <div className="mt-2 rounded-lg bg-white p-2 font-normal text-neutral-500 shadow shadow-primary/10">
          <p
            className={classnames(
              'flex items-center justify-between overflow-hidden duration-300',
              additionalServices.length ? 'h-6' : 'mt-0 h-0'
            )}
          >
            <span>{t('Additional Services Total')}</span>
            <span>
              {price.additionalServices} {currency.abbreviation}
            </span>
          </p>

          <p className="flex items-center justify-between">
            <span>{t('Rental Price')}</span>
            <span>
              {price.rental} {currency.abbreviation}
            </span>
          </p>
          {dropoffCharge && (
            <p className="flex items-center justify-between">
              <span className="text-sm">{dropoffCharge.title}</span>
              <p>
                {dropoffCharge.charge_amount} {currency.abbreviation}
              </p>
            </p>
          )}

          {coupon && (
            <p className="flex items-center justify-between">
              <span>
                {t('Discount')}{' '}
                <span className="text-sm">
                  ({t('Coupon')}:{' '}
                  <span className="text-secondary">{coupon.code}</span>)
                </span>
              </span>
              <span>
                {price.discount} {currency.abbreviation}
              </span>
            </p>
          )}

          {tax?.taxStatus && (
            <p className="flex items-center justify-between">
              <span>
                {tax.taxLabel}{' '}
                <span className="text-sm">
                  (<span className="text-secondary">{tax.taxRate}%</span>)
                </span>
              </span>
              <span>
                {price.taxAmount} {currency.abbreviation}
              </span>
            </p>
          )}
          {paymentMethod?.method === 'cod' && pay_at_counter_percentage > 0 && (
            <p className="flex items-center justify-between">
              <span>
                Pay at Counter{' '}
                <span className="text-sm">
                  (
                  <span className="text-secondary">
                    {pay_at_counter_percentage}%
                  </span>
                  )
                </span>
              </span>
              <span>
                {price.payAtCounterAmount} {currency.abbreviation}
              </span>
            </p>
          )}

          <p className="mt-1 flex items-center justify-between border-y border-neutral-300 py-1 font-medium text-black">
            <span>{t('Total Price')}</span>
            <span>
              {coupon && (
                <sup className="font-normal text-secondary line-through">
                  {price.totalWithoutDiscount} {currency.abbreviation}
                </sup>
              )}{' '}
              {price.total} {currency.abbreviation}
            </span>
          </p>
        </div>

        <div className="mt-2 space-y-1 rounded-lg bg-white p-2 font-normal shadow shadow-primary/10">
          <PaymentOptions
            methods={paymentOptions}
            total={Number(price.total)}
          />

          <Button
            size="small"
            theme="primary"
            className="mt-4 w-full"
            isPending={isSubmitting}
            isDisabled={isSubmitting || !isRentable}
            onPress={isRentable ? onSubmit : () => {}}
          >
            {isSubmitting ? t('Submitting Your Order') : t('Place Order')}{' '}
            <BsArrowRight />
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default OrderModal
