'use client'

import { Button } from 'react-aria-components'
import { useState, type ReactNode } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import { classnames } from '@/futils'

interface AccordionProps {
  heading: string
  children: ReactNode
  defaultExpanded?: boolean
}
const Accordion = ({
  heading,
  children,
  defaultExpanded = false,
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div
      className={classnames(
        'overflow-hidden rounded-2xl border border-neutral-100 bg-primary-light duration-300 hover:shadow hover:shadow-primary/20',
        isExpanded ? 'bg-primary-light' : 'white'
      )}
    >
      <Button
        onPress={() => setIsExpanded(!isExpanded)}
        className={classnames(
          'w-full p-4 text-left text-base font-normal duration-300 md:text-lg',
          isExpanded ? 'pb-0 text-primary' : ''
        )}
      >
        <span className="flex items-center justify-between">
          {heading}
          {isExpanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </span>
      </Button>
      <div
        style={{ height: 'calc-size(auto, size)' }}
        className={classnames(
          'px-4 duration-300',
          isExpanded ? 'pb-4 pt-1' : '!h-0 py-0'
        )}
      >
        <p className=" ">{children}</p>
      </div>
    </div>
  )
}

export default Accordion
