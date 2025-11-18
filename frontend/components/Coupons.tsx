'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { Form } from 'react-aria-components'
import { type FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import { type CarDetail } from '@/model/CarModel'
import { checkIfRentable, classnames } from '@/futils'
import InputField from '@/components/common/InputField'
import checkCouponAction from '@/actions/coupons/checkCouponAction'

type CouponsProps = {
  carId: number
  className?: string
  isDailyPriceActive: boolean
  isWeeklyPriceActive: boolean
  isMonthlyPriceActive: boolean
  bookNow: CarDetail['book_now']
}

const Coupons = ({
  carId,
  bookNow,
  className,
  isDailyPriceActive,
  isWeeklyPriceActive,
  isMonthlyPriceActive,
}: CouponsProps) => {
  const t = useTranslations()

  const [isApplied, setIsApplied] = useState(false)
  const [couponValue, setCouponValue] = useState('')
  const {
    order: { pricingMode },
    setOrder: { setCoupon },
  } = useAppStore((state) => state)

  const checkCoupon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await checkCouponAction({
      coupon: couponValue,
      rentalcarId: Number(carId),
    })

    if (res.success) {
      setCoupon(res.data)
      setIsApplied(true)
      toast.success(res.message)
    } else {
      setCoupon(null)
      setIsApplied(false)
      toast.warning(res.message)
    }

    return res.message
  }

  const remoevCoupon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const message = 'Coupon Removed'

    setCoupon(null)
    setIsApplied(false)
    toast.warning(message)

    return message
  }

  const { mutate, isPending: isApplyingCoupon } = useMutation({
    mutationFn: isApplied ? remoevCoupon : checkCoupon,
  })

  // check if the car is rentable based on the active pricing modes
  // and the book now option
  const isDisabled = !checkIfRentable({
    bookNow,
    pricingMode,
    isDailyPriceActive,
    isWeeklyPriceActive,
    isMonthlyPriceActive,
  })

  return (
    <Form
      onSubmit={mutate}
      className={classnames(
        'grid grid-cols-[200px_100px] items-end',
        className
      )}
    >
      <div className="space-y-2">
        <label className="font-medium text-black">{t('Coupon')}</label>
        <InputField
          value={couponValue}
          onChange={setCouponValue}
          className="!rounded-s-none"
          placeholder={t('New Coupon')}
          isDisabled={isApplied || isApplyingCoupon}
          inputClassName={classnames(
            '!h-9 !rounded-e-none shadow shadow-primary/10 border-0',
            isApplied && 'bg-green-100 border-green-200 color-primary'
          )}
        />
      </div>
      <Button
        size="small"
        type="submit"
        theme="primaryLight"
        isDisabled={isApplyingCoupon || isDisabled}
        className={classnames(
          '!rounded-s-none',
          isApplied &&
            'border-secondary bg-secondary text-white hover:border-secondary hover:bg-secondary'
        )}
      >
        {isApplied ? t('Remove') : t('Apply')}
      </Button>
    </Form>
  )
}

export default Coupons
