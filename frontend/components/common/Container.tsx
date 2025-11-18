import type { ReactNode } from 'react'

import { classnames } from '@/futils'

interface ContainerProps {
  children: ReactNode
  className?: string
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div
      className={classnames(
        'mx-auto max-w-8xl px-3 py-3 font-light text-neutral-700 md:px-6',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Container
