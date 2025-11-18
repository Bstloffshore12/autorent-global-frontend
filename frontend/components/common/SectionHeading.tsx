import type { ReactNode } from 'react'

import { classnames } from '@/futils'

interface SectionHeadingProps {
  className?: string
  children: ReactNode
  brandColoured?: boolean
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
}

const SectionHeading = ({
  children,
  className,
  brandColoured,
  headingLevel = 2,
}: SectionHeadingProps) => {
  const Tag = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  if (brandColoured && typeof children === 'string') {
    if (children.includes('|')) {
      return (
        <Tag className={classnames('text-3xl font-medium', className)}>
          {children.split('|').map((output, i) => (
            <span
              key={i}
              className={classnames(i % 2 ? 'text-secondary' : 'text-primary')}
            >
              {output}
            </span>
          ))}
        </Tag>
      )
    }

    const len = Math.ceil(children.length / 2)
    let curr = len
    let prev = 0

    const output = []

    while (children[curr]) {
      if (children[curr++] == ' ') {
        output.push(children.substring(prev, curr))
        prev = curr
        curr += len
      }
    }

    output.push(children.substring(prev))

    return (
      <Tag className={classnames('text-3xl font-medium', className)}>
        <span className="text-primary">{output[0]} </span>
        <span className="text-secondary">{output[1]}</span>
      </Tag>
    )
  }

  return (
    <Tag className={classnames('text-3xl font-medium text-black', className)}>
      {children}
    </Tag>
  )
}

export default SectionHeading
