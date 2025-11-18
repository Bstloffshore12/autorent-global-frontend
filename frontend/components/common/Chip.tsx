import { type ReactNode } from 'react'

import { classnames } from '@/futils'

interface ChipPorps {
  className?: string
  children: ReactNode
  theme?: 'primary' | 'primaryLight'
}

const getTheme = (theme: ChipPorps['theme']) => {
  if (theme === 'primaryLight') return 'bg-primary-light'
  return 'bg-primary text-white'
}

const Chip = ({ theme, children, className }: ChipPorps) => {
  return (
    <div
      className={classnames(
        'cursor-pointer rounded-full px-3 py-1 text-xs font-medium duration-200',
        getTheme(theme),
        className
      )}
    >
      {children}
    </div>
  )
}

export default Chip
