import {
  Button,
  Dialog,
  DialogTrigger,
  Popover as PopoverAria,
} from 'react-aria-components'
import { BiChevronDown } from 'react-icons/bi'
import { useState, type ReactNode } from 'react'

import { classnames } from '@/futils'

interface PopoverProps {
  className?: string
  dialogs: ReactNode[]
  isHoverEnable?: boolean
  buttonClassName?: string
  dialogClassName?: string
  label: string | ReactNode
  onClick?: (e: MouseEvent) => void
}

const Popover = ({
  label,
  dialogs,
  onClick,
  isHoverEnable,
  className = '',
  buttonClassName = '',
  dialogClassName = '',
}: PopoverProps) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div
      onMouseEnter={() => isHoverEnable && setOpen(true)}
      onMouseLeave={() => isHoverEnable && setOpen(false)}
    >
      <DialogTrigger isOpen={isOpen}>
        <Button
          onPress={(e) => {
            if (!isHoverEnable) setOpen(!isOpen)
            if (onClick) onClick(e as unknown as MouseEvent)
          }}
          className={classnames(
            'flex items-center gap-2 font-normal',
            buttonClassName
          )}
        >
          {label}
          <span className="text-xl">
            <BiChevronDown />
          </span>
        </Button>
        <PopoverAria
          isNonModal
          className={({ defaultClassName }) =>
            classnames(
              defaultClassName,
              'p-4 shadow-lg shadow-primary/20',
              className
            )
          }
        >
          <Dialog className={classnames('grid space-y-2', dialogClassName)}>
            {dialogs.map((e) => e)}
          </Dialog>
        </PopoverAria>
      </DialogTrigger>
    </div>
  )
}

export default Popover
