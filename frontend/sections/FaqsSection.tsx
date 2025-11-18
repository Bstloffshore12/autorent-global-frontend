import { BsArrowRight } from 'react-icons/bs'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import Container from '@/components/common/Container'
import Accordion from '@/components/common/Accordion'
import LinkButton from '@/components/common/LinkButton'
import HeadingSection from '@/components/common/HeadingSection'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'
import getFaqsPageContentAction from '@/actions/pages/getFaqsPageContentAction'

const FaqsSection = async () => {
  const t = await getTranslations()

  const [faqsContentRes, headingRes] = await Promise.all([
    getFaqsPageContentAction(),
    getCustomContentAction('faqs-heading'),
  ])

  const heading = (headingRes.success && headingRes.data?.title) || ''
  const subTitle = (headingRes.success && headingRes.data?.subtitle) || ''

  if (faqsContentRes.success && faqsContentRes.data) {
    const { data } = faqsContentRes

    return (
      <section>
        <Container className="space-y-6">
          <HeadingSection
            title={heading}
            subTitle={subTitle}
            className="text-center"
          />

          {data.metadata?.slice(0, 5).map(({ key, value }, i) => (
            <Accordion defaultExpanded={!i} key={key} heading={key}>
              {value}
            </Accordion>
          ))}

          <LinkButton
            size="small"
            href={routes.faqs}
            theme="primaryLight"
            className="mx-auto block max-w-min"
          >
            {t('View All')} <BsArrowRight />
          </LinkButton>
        </Container>
      </section>
    )
  }

  return null
}

export default FaqsSection
