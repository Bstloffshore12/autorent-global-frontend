'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { type PaymentMethod } from '@/model/PaymentModel'
import Button from '@/components/common/Button'
import { classnames } from '@/futils'
import getPaymentUrlAction from '@/actions/getPaymentUrlAction'

interface BookingPaymentInterfaceProps {
  paymentMethods: PaymentMethod[]
  orderId: string
  currency: string
  totalAmount: string
}

const PaymentIcon = ({
  method,
  type,
  name,
}: {
  method: string
  type: string
  name: string
}) => {
  if (
    (method === 'ccavenue' ||
      method === 'nbo' ||
      method == 'clickpay' ||
      method === 'credimax') &&
    type === 'full'
  )
    return (
      <Image
        alt={name}
        width={40}
        height={36}
        className="h-9 w-min object-contain pr-2"
        src="/assets/images/card-full-payment-icon.png"
      />
    )
  else if (
    (method === 'ccavenue' ||
      method === 'nbo' ||
      method == 'clickpay' ||
      method === 'credimax') &&
    type === 'partial'
  )
    return (
      <Image
        alt={name}
        width={40}
        height={36}
        className="h-9 w-min object-contain pr-2"
        src="/assets/images/card-partial-payment-icon.png"
      />
    )
  return (
    <Image
      alt={name}
      width={40}
      height={36}
      className="h-9 w-min object-contain pr-2"
      src="/assets/images/cash-full-payment-icon.png"
    />
  )
}

const BookingPaymentInterface = ({
  paymentMethods,
  orderId,
  currency,
  totalAmount,
}: BookingPaymentInterfaceProps) => {
  const router = useRouter()
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePayment = async () => {
    if (!selectedPaymentId) {
      toast.warning('Please select a payment method')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await getPaymentUrlAction({
        orderId: orderId,
        paymentId: selectedPaymentId.toString(),
      })

      if (res.success) {
        router.push(res.data)
      } else {
        toast.error(res.message || 'Payment initiation failed')
      }
    } catch (error) {
      toast.error('An error occurred while processing payment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {paymentMethods?.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedPaymentId(method.id)}
            className={classnames(
              'flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 transition-all',
              selectedPaymentId === method.id
                ? 'border-primary bg-primary-light/10 ring-1 ring-primary'
                : 'border-gray-200 hover:border-primary/50'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={classnames(
                  'flex h-5 w-5 items-center justify-center rounded-full border',
                  selectedPaymentId === method.id
                    ? 'border-primary'
                    : 'border-gray-300'
                )}
              >
                {selectedPaymentId === method.id && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                )}
              </div>
              <div>
                <span className="font-medium text-gray-900">{method.name}</span>
                <p className="text-sm text-neutral-500">{method.description}</p>
              </div>
            </div>
            <PaymentIcon
              name={method.name}
              type={method.type}
              method={method.method}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-lg font-semibold">
          Total: {totalAmount} {currency}
        </div>
        <Button
          theme="primary"
          isDisabled={!selectedPaymentId || isSubmitting}
          isPending={isSubmitting}
          onPress={handlePayment}
          className="min-w-[120px]"
        >
          Pay Now
        </Button>
      </div>
    </div>
  )
}

export default BookingPaymentInterface
