import Image from 'next/image'
import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import ContentArea from '@/components/webforms/ContentArea'
import ContactAside from '@/components/webforms/ContactAside'
import CorporateLeasingForm from '@/components/webforms/CorporateLeasingForm'
import getCorporateLeasingPageContentAction from '@/actions/pages/getCorporateLeasingPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getCorporateLeasingPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const CorporateLeasingPage = async () => {
  const [t, res] = await Promise.all([
    getTranslations(),
    getCorporateLeasingPageContentAction(),
  ])

  if (res.success && res.data) {
    const { data } = res

    return (
      <>
        <Breadcrumb path={[{ name: t('Corporate Leasing') }]} />

        <main className="mb-8 mt-2 md:mt-8">
          <Container className="space-y-6">
            {data.media?.path && (
              <Image
                width={1500}
                height={600}
                alt={data.media.alt || data.title}
                title={data.media.title || data.title}
                src={`${routes.bucketUrl}${data.media?.path}`}
                className="max-h-[600px] w-full rounded-2xl object-cover"
              />
            )}
            <div className="grid gap-8 md:grid-cols-[auto_400px]">
              <section className="space-y-4">
                <ContentArea
                  title={data.title}
                  subtitle={data.subtitle || ''}
                />

                <CorporateLeasingForm />
              </section>

              <ContactAside />
            </div>
          </Container>

          {data.content && (
            <Container>
              <section
                className="leasing-content"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </Container>
          )}
        </main>
      </>
    )
  }

  return notFound()
}

export default CorporateLeasingPage
