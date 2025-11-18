'use client'

import { type ReactNode } from 'react'
import { Button as AriaButton, type ButtonProps } from 'react-aria-components'

import LoadingSpinner from '@/icons/LoadingSpinner'
import { classnames, getButtonSize, getButtonThemeColor } from '@/futils'

export interface CustButtonProps extends ButtonProps {
  isPending?: boolean
  size?: 'big' | 'small'
  theme?: 'primary' | 'primaryLight' | 'secondary' | 'secondaryLight'
  children: ReactNode
}

const Button = ({
  size,
  theme,
  children,
  className,
  isPending,
  type = 'button',
  ...props
}: CustButtonProps) => {
  return (
    <AriaButton
      {...props}
      type={type}
      className={({ isDisabled, defaultClassName, isPressed, isHovered }) =>
        classnames(
          defaultClassName,
          'flex min-w-max items-center justify-center gap-2 text-nowrap rounded-lg border px-6 shadow shadow-primary/20 duration-150',
          getButtonThemeColor(theme),
          getButtonSize(size),
          isDisabled &&
            'border-neutral-300 bg-neutral-400 text-neutral-600 opacity-75',
          !isDisabled &&
            isHovered &&
            'shadow-md shadow-primary/20 brightness-110',
          isPressed && '!brightness-125',
          className
        )
      }
    >
      {isPending ? (
        <>
          <LoadingSpinner
            className={classnames(
              'w-4',
              theme === 'primaryLight' ? 'stroke-promary' : 'stroke-white'
            )}
          />
          {children}
        </>
      ) : (
        children
      )}
    </AriaButton>
  )
}

export default Button
