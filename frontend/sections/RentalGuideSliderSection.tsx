import { BsArrowRight } from 'react-icons/bs'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import Container from '@/components/common/Container'
import LinkButton from '@/components/common/LinkButton'
import HeadingSection from '@/components/common/HeadingSection'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'
import RentalGuideSlider from '@/components/rentalGuide/RentalGuideSlider'
import getRentalGuidesAction from '@/actions/rentalGuide/getRentalGuidesAction'

const RentalGuideSliderSection = async () => {
  const t = await getTranslations()

  const [res, headingRes] = await Promise.all([
    getRentalGuidesAction(),
    getCustomContentAction('rental-guide-heading'),
  ])

  const heading = (headingRes.success && headingRes.data?.title) || ''
  const subTitle = (headingRes.success && headingRes.data?.subtitle) || ''

  if (res.success && res.data.length) {
    return (
      <section>
        <Container className="space-y-6">
          <HeadingSection
            title={heading}
            subTitle={subTitle}
            className="text-center"
          />

          <RentalGuideSlider rentalGuides={res.data} />

          <LinkButton
            size="small"
            theme="primaryLight"
            href={routes.rentalGuides}
            className="m-auto block max-w-max"
          >
            {t('View All')} <BsArrowRight />
          </LinkButton>
        </Container>
      </section>
    )
  }
  return null
}

export default RentalGuideSliderSection
