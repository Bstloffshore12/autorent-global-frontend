'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RadioGroup } from 'react-aria-components'
import Modal from '@/components/common/Modal'
import { classnames } from '@/futils'
import Radio from '@/components/common/Radio'
import { useAppStore } from '@/store/provider'
import { type PaymentMethod } from '@/model/PaymentModel'

type PaymentIconProps = {
  type: PaymentMethod['type']
  name: PaymentMethod['name']
  method: PaymentMethod['method']
}

const PaymentIcon = ({ method, type, name }: PaymentIconProps) => {
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

type PaymentOptionsProps = {
  methods: PaymentMethod[]
  total?: number
}

const PaymentOptions = ({ methods, total }: PaymentOptionsProps) => {
  const [showModal, setShowModal] = useState(false)
  const {
    general: { currency, tax, pay_at_counter_percentage },
    setOrder: { setPaymentMethod },
    order: { paymentMethod },
  } = useAppStore((state) => state)

  const onChange = (value: string) => {
    const selectedMethod = methods.find(({ id }) => id.toString() === value)
    if (selectedMethod?.method === 'cod' && pay_at_counter_percentage > 0) {
      setShowModal(true)
    }

    setPaymentMethod(selectedMethod || null)
  }

  return (
    <>
      <div className="space-y-4">
        <RadioGroup
          onChange={onChange}
          aria-label="Payment Method"
          value={paymentMethod?.id.toString()}
        >
          {methods.map(
            ({ id, name, method, type, description, percentage }) => (
              <div
                key={id}
                className={classnames(
                  'flex items-center justify-between gap-3 border-b',
                  paymentMethod?.id === id && 'bg-primary-light'
                )}
              >
                <div className="p-2">
                  <Radio
                    label={name}
                    className="w-full"
                    value={id.toString()}
                  />
                  <p className="px-6 text-sm font-normal text-neutral-500">
                    {description}
                    {type === 'partial' &&
                      paymentMethod?.id === id &&
                      total &&
                      percentage && (
                        <span className="ml-2 font-semibold text-primary">
                          {percentage}% (
                          {((total * Number(percentage)) / 100).toFixed(2)} )
                          AED
                        </span>
                      )}
                  </p>
                </div>
                <PaymentIcon name={name} type={type} method={method} />
              </div>
            )
          )}
        </RadioGroup>
      </div>
      {showModal && (
        <Modal isOpen={showModal} setOpen={setShowModal}>
          <div
            onClick={(e) => e.stopPropagation()} // 🚫 Stop the click from closing the outer modal
          >
            <p className="text-sm text-neutral-700">
              You’ve selected <strong>Pay at Counter</strong> – An additional{' '}
              {pay_at_counter_percentage}% fee applies to the rental amount.
            </p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium"
              >
                Accept it
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default PaymentOptions
