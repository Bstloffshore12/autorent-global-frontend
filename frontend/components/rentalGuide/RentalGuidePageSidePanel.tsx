'use client'

import { useTranslations } from 'next-intl'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import { classnames } from '@/futils'
import useTopOffset from '@/hooks/useTopOffset'
import { type RentalGuideData } from '@/model/CmsModel'
import SectionHeading from '@/components/common/SectionHeading'
import NewsletterForm from '@/components/webforms/NewsletterForm'
import RentalGuideSearchField from '@/components/rentalGuide/RentalGuideSearchField'

const Heading = ({ text }: { text: string }) => (
  <SectionHeading className="!text-xl font-medium">{text}</SectionHeading>
)

type RentalGuidePageSidePanelProps = {
  rentalGuides: RentalGuideData[]
}

const RentalGuidePageSidePanel = ({
  rentalGuides,
}: RentalGuidePageSidePanelProps) => {
  const t = useTranslations()
  const tw = useTranslations('webform')

  const { offset } = useTopOffset()

  return (
    <aside>
      <div className="sticky top-0 mx-auto w-full max-w-8xl space-y-6 border-t py-3 font-light text-neutral-700 md:border-t-0 md:px-6 md:pt-10">
        <div
          className={classnames(
            'z-10 space-y-4 duration-500',
            offset > 100 && 'md:mt-[40px]'
          )}
        >
          <Heading text={t('Search Guide')} />
          <RentalGuideSearchField rentalGuides={rentalGuides} />
        </div>

        <div className="space-y-2">
          <Heading text={t('Trending Guides')} />
          <ul className="max-h-64 overflow-hidden font-normal duration-300">
            {rentalGuides.map((rentalGuide) => (
              <li key={rentalGuide.id}>
                <Link
                  href={routes.rentalGuideDetail(rentalGuide.slug)}
                  className="block border-b border-neutral-200 py-3 duration-300 hover:border-primary/30 hover:text-primary"
                >
                  <span className="line-clamp-1">{rentalGuide.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <Heading text={tw('newsletterTitle')} />
          <p>{tw('newsletterDescription')}</p>
          <NewsletterForm />
        </div>
      </div>
    </aside>
  )
}

export default RentalGuidePageSidePanel
