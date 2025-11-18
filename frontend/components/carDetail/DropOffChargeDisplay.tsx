'use client'

import { Label } from 'react-aria-components'
import { classnames } from '@/futils'
import useDropoffCharges from '@/hooks/useDropoffCharges'
import { PriceChip } from './AdditionalServicesForMobile'
import { useTranslations } from 'next-intl'
import { Fragment } from 'react'
import Checkbox from '@/components/common/Checkbox'

const DropoffChargeDisplay = () => {
  const t = useTranslations()
  const { charge, isLoading, error } = useDropoffCharges()

  if (isLoading) {
    return (
      <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-center text-blue-600">
        Loading drop-off charge…
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-center text-red-600">
        Error: {error.message}
      </div>
    )
  }

  if (!charge) {
    return null
  }

  return (
    <div className="mb-4">
      <Fragment>
        <Label
          className={classnames(
            'grid cursor-pointer grid-cols-[auto_70px] items-center gap-1 border-b border-dashed bg-primary-light p-2 duration-150'
          )}
        >
          <div className="text-left">
            <div
              className={classnames(
                'flex items-center gap-2 font-normal text-primary duration-150'
              )}
            >
              <Checkbox isReadOnly={true} isSelected={true} />
              {charge.title}
            </div>
            <p className="text-sm">{charge.description}</p>
          </div>
          <PriceChip price={charge.charge_amount} isActive={true} />
        </Label>
      </Fragment>
    </div>
  )
}

export default DropoffChargeDisplay
