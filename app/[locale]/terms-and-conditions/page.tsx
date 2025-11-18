import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import SectionHeading from '@/components/common/SectionHeading'
import getTermsAndConditionsPageContentAction from '@/actions/pages/getTermsAndConditionsPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getTermsAndConditionsPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const TermsAndConditionsPage = async () => {
  const [t, res] = await Promise.all([
    getTranslations(),
    getTermsAndConditionsPageContentAction(),
  ])

  if (res.success && res.data) {
    const { data } = res
    return (
      <>
        <Breadcrumb path={[{ name: t('Terms and Conditions') }]} />

        <main className="mb-8 mt-2 md:mt-8">
          <Container>
            <section>
              <PageHeading>{data.title}</PageHeading>

              <SectionHeading className="mt-2 text-xl">
                {data.subtitle}
              </SectionHeading>

              {data.content && (
                <div
                  dangerouslySetInnerHTML={{ __html: data.content }}
                  className="privacy-policy-terms-and-conditions-content mt-6"
                />
              )}
            </section>
          </Container>
        </main>
      </>
    )
  }

  return notFound()
}

export default TermsAndConditionsPage
