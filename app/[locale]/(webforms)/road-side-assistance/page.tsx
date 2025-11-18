import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { FaRegCheckCircle } from 'react-icons/fa'
import { getTranslations } from 'next-intl/server'

import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import LinkButton from '@/components/common/LinkButton'
import ContentArea from '@/components/webforms/ContentArea'
import ContactAside from '@/components/webforms/ContactAside'
import OperatingCountryModel from '@/model/OperatingCountryModel'
import RoadSideAssistanceForm from '@/components/webforms/RoadSideAssistanceForm'
import getRoadSideAssistancePageContentAction from '@/actions/pages/getRoadSideAssistancePageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getRoadSideAssistancePageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const RoadSideAssistancePage = async () => {
  const [t, tw, res, activeCountry] = await Promise.all([
    getTranslations(),
    getTranslations('webform'),
    getRoadSideAssistancePageContentAction(),
    OperatingCountryModel.getActiveOperatingCountry(),
  ])

  if (activeCountry && res.success && res.data) {
    const { data } = res

    return (
      <>
        <Breadcrumb path={[{ name: t('Road Side Assistance') }]} />

        <main className="mb-8 mt-2 md:mt-8">
          <Container className="grid gap-6 md:grid-cols-[auto_400px]">
            <section className="space-y-4">
              <ContentArea title={data.title} subtitle={data.subtitle || ''} />

              {data.content && (
                <div
                  className="blog-post"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              )}

              <RoadSideAssistanceForm />
            </section>

            <ContactAside>
              <div className="space-y-4 border-b pb-6 text-sm font-normal">
                <h2 className="!mb-2 text-3xl font-medium">
                  {t('Road Side Assistance')}
                </h2>
                <p className="!mt-2">{tw('roadSideAssistanceSidePara')}</p>
                <div className="grid gap-1 font-medium">
                  <p className="flex items-center gap-1">
                    <FaRegCheckCircle className="size-4 text-green-500" />
                    {t('Wheel Change')}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaRegCheckCircle className="size-4 text-green-500" />
                    {t('Fuel Delivery')}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaRegCheckCircle className="size-4 text-green-500" />
                    {t('Lock-Out Assistance')}
                  </p>
                </div>

                {activeCountry.phone_number && (
                  <LinkButton
                    size="small"
                    theme="primary"
                    className="mt-6 block"
                    href={`tel:${activeCountry.phone_number}`}
                  >
                    {t('Call Now')}
                  </LinkButton>
                )}
              </div>
            </ContactAside>
          </Container>
        </main>
      </>
    )
  }

  return notFound()
}

export default RoadSideAssistancePage
