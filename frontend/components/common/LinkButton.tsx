import { type Url } from 'next/dist/shared/lib/router/router'
import { type HTMLAttributeAnchorTarget, type ReactNode } from 'react'

import { Link } from '@/i18n/routing'
import { type CustButtonProps } from '@/components/common/Button'
import { classnames, getButtonSize, getButtonThemeColor } from '@/futils'

interface LinkButtonProps {
  href: Url
  className?: string
  ariaLabel?: string
  children: ReactNode
  size?: CustButtonProps['size']
  theme?: CustButtonProps['theme']
  target?: HTMLAttributeAnchorTarget
}

const LinkButton = ({
  href,
  size,
  theme,
  target,
  children,
  ariaLabel,
  className = '',
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      target={target}
      aria-label={ariaLabel}
      className={classnames(
        'flex min-w-max items-center justify-center gap-2 text-nowrap rounded-lg border px-6 shadow shadow-primary/20 duration-150',
        'hover:shadow-md hover:shadow-primary/20 hover:brightness-110',
        'active:!brightness-125',
        getButtonThemeColor(theme),
        getButtonSize(size),
        className
      )}
    >
      {children}
    </Link>
  )
}

export default LinkButton
