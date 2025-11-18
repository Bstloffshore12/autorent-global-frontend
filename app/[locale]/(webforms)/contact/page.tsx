import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import ContactForm from '@/components/webforms/ContactForm'
import ContentArea from '@/components/webforms/ContentArea'
import ContactAside from '@/components/webforms/ContactAside'
import OfficeLocationSection from '@/sections/OfficeLocationSection'
import getContactPageContentAction from '@/actions/pages/getContactPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getContactPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const ContactPage = async () => {
  const [t, res] = await Promise.all([
    getTranslations(),
    getContactPageContentAction(),
  ])

  if (res.success && res.data) {
    const { data } = res

    return (
      <>
        <Breadcrumb path={[{ name: t('Contact Us') }]} />

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

              <ContactForm />
            </section>

            <ContactAside />
          </Container>

          <section>
            <Container>
              <OfficeLocationSection />
            </Container>
          </section>
        </main>
      </>
    )
  }

  return notFound()
}

export default ContactPage
