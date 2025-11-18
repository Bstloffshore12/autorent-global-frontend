import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import ContactAside from '@/components/webforms/ContactAside'
import CarEnquiryForm from '@/components/webforms/CarEnquiryForm'
import getRentalCarsEnquiryPageContentAction from '@/actions/pages/getRentalCarsEnquiryPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getRentalCarsEnquiryPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const RentCarsEnquiry = async () => {
  const [t, res] = await Promise.all([
    getTranslations(),
    getRentalCarsEnquiryPageContentAction(),
  ])

  if (res.success && res.data) {
    const data = res.data

    return (
      <>
        <Breadcrumb path={[{ name: t('Rent Cars Enquiry') }]} />

        <main className="mb-8 mt-2 md:mt-8">
          <Container>
            <div className="grid gap-6 md:grid-cols-[auto_400px]">
              <section className="space-y-4">
                <PageHeading>{data.title}</PageHeading>

                <CarEnquiryForm />
              </section>

              <ContactAside />
            </div>
          </Container>
        </main>
      </>
    )
  }

  return notFound()
}

export default RentCarsEnquiry
