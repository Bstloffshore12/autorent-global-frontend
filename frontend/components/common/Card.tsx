import { type ReactNode } from 'react'

import { classnames } from '@/futils'

interface CardProps {
  id?: string
  className?: string
  children: ReactNode
}

const Card = ({ id, children, className }: CardProps) => {
  return (
    <div
      id={id}
      className={classnames(
        'overflow-hidden rounded-2xl border border-neutral-100 p-6 duration-300 hover:shadow-xl hover:shadow-primary/20',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
