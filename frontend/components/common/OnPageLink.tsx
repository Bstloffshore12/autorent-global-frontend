'use client'

import { useLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import { Button } from 'react-aria-components'

interface OnPageLinkProps {
  scrollTo: string
  className: string
  children: ReactNode
}

const OnPageLink = ({ children, scrollTo, className }: OnPageLinkProps) => {
  const lenis = useLenis()

  return (
    <Button
      className={className}
      onPress={() => lenis?.scrollTo(`#${scrollTo}`)}
    >
      {children}
    </Button>
  )
}

export default OnPageLink
