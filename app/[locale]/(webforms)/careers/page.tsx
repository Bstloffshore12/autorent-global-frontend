import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import CareersForm from '@/components/webforms/CareersForm'
import ContentArea from '@/components/webforms/ContentArea'
import ContactAside from '@/components/webforms/ContactAside'
import getCareerPageContentAction from '@/actions/pages/getCareerPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getCareerPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const CareerPage = async () => {
  const [t, res] = await Promise.all([
    getTranslations(),
    getCareerPageContentAction(),
  ])

  if (res.success && res.data) {
    const { data } = res

    return (
      <>
        <Breadcrumb path={[{ name: t('Careers') }]} />

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

              <CareersForm />
            </section>

            <ContactAside />
          </Container>
        </main>
      </>
    )
  }

  return notFound()
}

export default CareerPage
