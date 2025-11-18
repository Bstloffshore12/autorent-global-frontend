import { redirect } from 'next/navigation'
import { BsPatchCheckFill } from 'react-icons/bs'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import OrderModel from '@/model/OrderModel'
import Container from '@/components/common/Container'
import LinkButton from '@/components/common/LinkButton'
import Breadcrumb from '@/components/common/Breadcrumb'
import SectionHeading from '@/components/common/SectionHeading'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

interface BookingSuccessPageProps {
  params: Promise<{
    locale: GetOperatingCountriesData['iso2']
  }>
}

const BookingSuccessPage = async ({ params }: BookingSuccessPageProps) => {
  // Return to home page if user didnt come through from submission
  const { locale } = await params
  const isFormSubmitted = await OrderModel.checkIfSubmitted()
  if (!isFormSubmitted) return redirect(`/${locale}/${routes.home}`)

  const [t, res] = await Promise.all([
    getTranslations(),
    getCustomContentAction('booking-success-page'),
  ])

  const heading = (res.success && res.data?.title) || ''
  const content = (res.success && res.data?.content) || ''

  return (
    <>
      <Breadcrumb
        path={[
          { name: t('Bookings'), link: routes.user.bookings },
          { name: t('Success') },
        ]}
      />

      <main className="my-8 md:my-24">
        <Container className="!max-w-3xl">
          <div className="mb-8 space-y-8 text-center">
            <BsPatchCheckFill className="mx-auto text-8xl text-primary" />

            <SectionHeading headingLevel={1} className="text-primary">
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
            <LinkButton theme="primaryLight" href={routes.user.bookings}>
              {t('View All Bookings')}
            </LinkButton>
          </div>
        </Container>
      </main>
    </>
  )
}

export default BookingSuccessPage
