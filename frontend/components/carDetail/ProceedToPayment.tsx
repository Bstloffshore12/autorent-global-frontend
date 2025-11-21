'use client'

import { toast } from 'react-toastify'
import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import OrderModal from '@/modal/OrderModal'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import { type CarDetail } from '@/model/CarModel'
import Checkbox from '@/components/common/Checkbox'
import { classnames, checkIfRentable } from '@/futils'
import usePickUpDropOff from '@/hooks/usePickUpDropOff'
import { type PaymentMethod } from '@/model/PaymentModel'

type BasePrices = {
  daily: string
  weekly: string
  monthly: string
  fixed?: string
}

type ProceedToPaymentProps = {
  carId: number
  message?: string
  basePrices: BasePrices
  isDailyPriceActive: boolean
  isWeeklyPriceActive: boolean
  isMonthlyPriceActive: boolean
  bookNow: CarDetail['book_now']
  paymentOptions: PaymentMethod[]
}

const ProceedToPayment = ({
  carId,
  message,
  bookNow,
  basePrices,
  paymentOptions,
  isDailyPriceActive,
  isWeeklyPriceActive,
  isMonthlyPriceActive,
}: ProceedToPaymentProps) => {
  const t = useTranslations()

  const FORM_REF = useRef<HTMLFormElement>(null)
  const { pickupLocation, dropoffLocation } = usePickUpDropOff()

  const {
    auth: { isLoggedIn },
    order: { pricingMode, leaseType },
    user: { isVerified, userData },
    setAuth: { setIsAuthModalOpen },
    setOrder: { setCarId, setIsOrderModalOpen },
    setCar: { setIsDailyActive, setIsMonthlyActive, setIsWeeklyActive },
  } = useAppStore((state) => state)

  const checkFormValidations = () => {
    const locationForm = document.querySelector(
      '#PickUpDropOffSelectorForm'
    ) as HTMLFormElement

    if (FORM_REF.current && locationForm)
      return FORM_REF.current.checkValidity() && locationForm.checkValidity()

    return false
  }

  // check if the car is rentable based
  // to enable or disable the proceed button
  const isRentable = checkIfRentable({
    bookNow,
    pricingMode,
    isDailyPriceActive,
    isWeeklyPriceActive,
    isMonthlyPriceActive,
  })

  const checkUser = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true)
      return false
    }

    if (!isVerified) {
      toast.info('Varify email to proceed')
      return false
    }

    if (!userData?.verify_document) {
      toast.info('Upload Required Documents in profile section')
      return false
    }

    return true
  }

  const onProceed = () => {
    setCarId(carId)
    const isValid = checkFormValidations() && checkUser()

    if (isValid && dropoffLocation && pickupLocation) setIsOrderModalOpen(true)
  }

  // Set the active pricing modes of specific car
  // and update the state accordingly to update
  // the combined state in usePickUpDropOff
  useEffect(() => {
    setIsDailyActive(isDailyPriceActive ? 1 : 0)
    setIsWeeklyActive(isWeeklyPriceActive ? 1 : 0)
    setIsMonthlyActive(isMonthlyPriceActive ? 1 : 0)
  }, [
    setIsDailyActive,
    setIsWeeklyActive,
    setIsMonthlyActive,
    isDailyPriceActive,
    isWeeklyPriceActive,
    isMonthlyPriceActive,
  ])

  return (
    <div>
      <OrderModal
        basePrices={basePrices}
        isRentable={isRentable}
        paymentOptions={paymentOptions}
      />

      <div className="flex flex-wrap items-end">
        <form
          ref={FORM_REF}
          className="space-y-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Checkbox
            isRequired
            isDisabled={!isRentable} // disable checkbox if the car is not rentable
            label={t('I have a valid Driving License')}
          />
          <Checkbox
            isRequired
            isDisabled={!isRentable} // disable checkbox if the car is not rentable
            label={t("Driver's age is above 21 years")}
          />
          <span className="flex items-center gap-1">
            <Checkbox
              isRequired
              isDisabled={!isRentable} // disable checkbox if the car is not rentable
              label={t('I accept the')}
            />
            <Link
              href={
                leaseType === 'monthly'
                  ? routes.monthlyLeaseTermsAndConditions
                  : leaseType === 'personal'
                    ? routes.leaseCarTermsAndConditions
                    : routes.termsAndConditions
              }
              className="font-medium text-primary"
            >
              {t('Terms & Conditions')}.
            </Link>
          </span>
        </form>

        {/* if the car is not rentable, prevent proceeding to the booking modal by hiding the button */}
        <Button
          size="small"
          theme="primary"
          className="ms-auto"
          isDisabled={!isRentable}
          onPress={isRentable ? onProceed : () => {}}
        >
          {t('Proceed to Payment')}
        </Button>
      </div>

      {/* display message if car is not rentable */}
      <p
        className={classnames(
          'mt-4 overflow-hidden border border-dashed px-2 text-sm text-orange-600 duration-300',
          isRentable
            ? 'max-h-0 rounded-none border-white bg-transparent py-0'
            : 'max-h-10 rounded-lg border-orange-400 bg-orange-50 py-2'
        )}
      >
        {t('This car is not rentable for')} {t(pricingMode)} {t('rental')}.
      </p>

      {message && (
        <div
          dangerouslySetInnerHTML={{ __html: message }}
          className="mt-4 rounded-lg border border-dashed border-orange-400 bg-orange-50 p-2 text-sm text-orange-600"
        />
      )}
    </div>
  )
}

export default ProceedToPayment
