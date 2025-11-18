import { classnames } from '@/futils'
import SectionHeading from '@/components/common/SectionHeading'

type HeadingSectionProps = {
  title: string
  subTitle?: string
  className?: string
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
}

const HeadingSection = ({
  title,
  subTitle,
  className,
  headingLevel,
}: HeadingSectionProps) => {
  return (
    <div className={classnames('space-y-2', className)}>
      <SectionHeading headingLevel={headingLevel} brandColoured>
        {title}
      </SectionHeading>
      {subTitle && <p>{subTitle}</p>}
    </div>
  )
}

export default HeadingSection
