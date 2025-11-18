import { getTranslations } from 'next-intl/server'
import { BsPatchExclamationFill } from 'react-icons/bs'

import routes from '@/routes'
import Container from '@/components/common/Container'
import LinkButton from '@/components/common/LinkButton'
import Breadcrumb from '@/components/common/Breadcrumb'
import SectionHeading from '@/components/common/SectionHeading'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'

const BookingFailurePage = async () => {
  const [t, res] = await Promise.all([
    getTranslations(),
    getCustomContentAction('booking-failure-page'),
  ])

  const heading = (res.success && res.data?.title) || ''
  const content = (res.success && res.data?.content) || ''

  return (
    <>
      <Breadcrumb
        path={[
          { name: t('Bookings'), link: routes.user.bookings },
          { name: t('Failure') },
        ]}
      />

      <main className="my-8 md:my-24">
        <Container className="!max-w-3xl">
          <div className="mb-8 space-y-8 text-center">
            <BsPatchExclamationFill className="mx-auto text-8xl text-secondary" />

            <SectionHeading headingLevel={1} className="text-secondary">
              {heading}
            </SectionHeading>

            <div
              className="space-y-2"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          {/* Action buttons */}
          <div className="mt-12 flex justify-center gap-4">
            <LinkButton theme="primaryLight" href={routes.home}>
              {t('Go to Home')}
            </LinkButton>
            <LinkButton theme="primary" href={routes.user.support}>
              {t('Contact Support')}
            </LinkButton>
          </div>
        </Container>
      </main>
    </>
  )
}

export default BookingFailurePage
