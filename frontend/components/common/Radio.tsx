'use client'

import { type RadioProps, Radio as AriaRadio } from 'react-aria-components'

import { classnames } from '@/futils'

interface CustCheckboxProps extends RadioProps {
  label?: string
  labelClassName?: string
}

const Radio = ({ label, labelClassName, ...props }: CustCheckboxProps) => {
  return (
    <AriaRadio
      {...props}
      className={classnames(
        'block w-fit cursor-pointer font-normal',
        props.className
      )}
    >
      {({ isSelected, isInvalid, isDisabled }) => (
        <div className="flex items-center gap-2">
          <div
            className={classnames(
              'flex h-4 w-4 items-center justify-center rounded-full border text-xs text-primary focus:ring-2 focus:ring-primary',
              isInvalid
                ? 'border-red-400 bg-red-100'
                : 'border-primary/10 bg-primary-light',
              isDisabled &&
                '!border-neutral-50 !bg-neutral-50 !text-neutral-600'
            )}
          >
            <div
              className={classnames(
                'size-2 rounded-full bg-primary duration-300',
                isSelected ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>

          {label && <span className={labelClassName}>{label}</span>}
        </div>
      )}
    </AriaRadio>
  )
}

export default Radio
