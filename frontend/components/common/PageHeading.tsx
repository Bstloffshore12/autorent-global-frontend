import type { ReactNode } from 'react'

import { classnames } from '@/futils'

interface PageHeadingProps {
  className?: string
  children: ReactNode
}

const PageHeading = ({ className, children }: PageHeadingProps) => {
  return (
    <h1
      className={classnames(
        'text-2xl font-semibold text-black md:text-3xl',
        className
      )}
    >
      {children}
    </h1>
  )
}

export default PageHeading
