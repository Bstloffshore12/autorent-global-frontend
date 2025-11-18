import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import ContentArea from '@/components/webforms/ContentArea'
import ContactAside from '@/components/webforms/ContactAside'
import FeedbackForm from '@/components/webforms/FeedbackForm'
import getFeedbackPageContentAction from '@/actions/pages/getFeedbackPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getFeedbackPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const FeedbackPage = async () => {
  const [t, res] = await Promise.all([
    getTranslations(),
    getFeedbackPageContentAction(),
  ])

  if (res.success && res.data) {
    const { data } = res

    return (
      <>
        <Breadcrumb path={[{ name: t('Feedback') }]} />

        <main className="mb-8 mt-2 md:mt-8">
          <Container className="grid gap-6 md:grid-cols-[auto_400px]">
            <section className="space-y-4">
              <ContentArea title={data.title} subtitle={data.subtitle || ''} />

              {data.content && (
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              )}

              <FeedbackForm />
            </section>

            <ContactAside />
          </Container>
        </main>
      </>
    )
  }

  return notFound()
}

export default FeedbackPage
