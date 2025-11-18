'use client'

import {
  type CheckboxProps,
  Checkbox as AriaCheckbox,
} from 'react-aria-components'
import { FaCheck } from 'react-icons/fa6'

import { classnames } from '@/futils'

interface CustCheckboxProps extends CheckboxProps {
  label?: string
  className?: string
  labelClassName?: string
}

const Checkbox = ({
  label,
  className,
  labelClassName,
  ...props
}: CustCheckboxProps) => {
  return (
    <AriaCheckbox
      {...props}
      className={classnames(
        'block w-fit cursor-pointer font-normal',
        className
      )}
    >
      {({ isSelected, isInvalid, isDisabled }) => (
        <div className="flex items-center gap-2">
          <div
            className={classnames(
              'flex h-4 w-4 items-center justify-center rounded border text-xs text-primary focus:ring-2 focus:ring-primary',
              isInvalid
                ? 'border-red-400 bg-red-100'
                : 'border-primary/10 bg-primary-light',
              isDisabled &&
                '!border-neutral-50 !bg-neutral-50 !text-neutral-600'
            )}
          >
            <FaCheck
              className={classnames(
                'duration-300',
                isSelected ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>

          {label && <span className={labelClassName}>{label}</span>}
        </div>
      )}
    </AriaCheckbox>
  )
}

export default Checkbox
