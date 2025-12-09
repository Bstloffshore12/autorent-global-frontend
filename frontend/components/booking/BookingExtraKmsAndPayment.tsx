'use client'

import { useState } from 'react'
import { type PaymentMethod } from '@/model/PaymentModel'
import Card from '@/components/common/Card'
import { classnames } from '@/futils'
import BookingPaymentInterface from './BookingPaymentInterface'
import { useAppStore } from '@/store/provider'

interface BookingExtraKmsAndPaymentProps {
  carSlug: string
  currency: string
  pricingMode: 'daily' | 'weekly' | 'monthly'
  orderId: string
  totalAmount: string
  extraKms: any[]
  paymentMethods: PaymentMethod[]
}

const BookingExtraKmsAndPayment = ({
  currency,
  pricingMode,
  orderId,
  extraKms,
  paymentMethods,
}: BookingExtraKmsAndPaymentProps) => {
  const {
    operatingCountry: { activeId, list: operatingCountryList },
  } = useAppStore((state) => state)
  const activeCountry = operatingCountryList.find(
    (c: any) => c.id === activeId
  )
  const [selectedExtraKmId, setSelectedExtraKmId] = useState<number | null>(
    null
  )

  if (!activeCountry || activeCountry.extra_kilometer_service !== 1) {
    return null
  }


  const selectedExtraKm = extraKms.find((km) => km.id === selectedExtraKmId)
  const selectedPrice = selectedExtraKm
    ? pricingMode === 'daily'
      ? selectedExtraKm.daily
      : pricingMode === 'weekly'
        ? selectedExtraKm.weekly
        : selectedExtraKm.monthly
    : '0'

  const handleExtraKmSelect = (id: number) => {
    setSelectedExtraKmId(selectedExtraKmId === id ? null : id)
  }

  return (
    <Card className="space-y-6">
      {/* Extra KMS Section */}
      {extraKms && extraKms.length > 0 && (
        <div>
          <h3 className="mb-3 font-semibold text-gray-900">Extra Kilometers</h3>
          <div className="grid grid-cols-2 gap-3">
            {extraKms.map((srv: any) => {
              const price =
                pricingMode === 'daily'
                  ? srv.daily
                  : pricingMode === 'weekly'
                    ? srv.weekly
                    : srv.monthly

              if (!price || Number(price) === 0) return null

              const isSelected = selectedExtraKmId === srv.id

              return (
                <div
                  key={srv.id}
                  onClick={() => handleExtraKmSelect(srv.id)}
                  className={classnames(
                    'flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm shadow-sm transition-all',
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-blue-200'
                      : 'border-gray-300 bg-white hover:border-blue-300'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="extraKmOption"
                      checked={isSelected}
                      onChange={() => handleExtraKmSelect(srv.id)}
                      className="h-4 w-4 cursor-pointer accent-blue-600"
                    />
                    <span className="font-medium">{srv.title}</span>
                  </div>
                  <span
                    className={classnames(
                      'text-sm font-semibold',
                      isSelected ? 'text-blue-700' : 'text-gray-800'
                    )}
                  >
                    {price} {currency}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Payment Methods Section */}
      {selectedExtraKmId && (
        <div>
          <h3 className="mb-3 font-semibold text-gray-900">Payment Methods</h3>
          <BookingPaymentInterface
            paymentMethods={paymentMethods}
            orderId={orderId}
            currency={currency}
            totalAmount={selectedPrice}
          />
        </div>
      )}
    </Card>
  )
}

export default BookingExtraKmsAndPayment
