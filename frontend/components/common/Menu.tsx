import { BiChevronDown } from 'react-icons/bi'
import { Button } from 'react-aria-components'
import { useState, type ReactNode } from 'react'

import { classnames } from '@/futils'

interface MenuProps {
  text: string
  children: ReactNode
  appropriateHeight?: string | number
}
const Menu = ({ text, children, appropriateHeight = '50' }: MenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="p-2">
      <Button
        onPress={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between text-left font-medium"
      >
        {text}
        <span
          className={classnames(
            isExpanded ? 'rotate-180' : 'rotate-0',
            'duration-150'
          )}
        >
          <BiChevronDown />
        </span>
      </Button>
      <div
        className="overflow-hidden duration-500"
        style={{ maxHeight: isExpanded ? `${appropriateHeight}px` : '0px' }}
      >
        <div className="mt-2">{children}</div>
      </div>
    </div>
  )
}

export default Menu
