import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import getPrivacyPolicyPageContentAction from '@/actions/pages/getPrivacyPolicyPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getPrivacyPolicyPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const PrivacyPolicyPage = async () => {
  const [t, res] = await Promise.all([
    getTranslations(),
    getPrivacyPolicyPageContentAction(),
  ])

  if (res.success && res.data) {
    const { data } = res

    return (
      <>
        <Breadcrumb path={[{ name: t('Privacy Policy') }]} />

        <main className="mb-8 mt-2 md:mt-8">
          <Container>
            <section>
              <PageHeading className="mb-4 text-center">
                {data.title}
              </PageHeading>

              {data.content && (
                <div
                  className="privacy-policy-terms-and-conditions-content"
                  dangerouslySetInnerHTML={{ __html: data.content }}
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

export default PrivacyPolicyPage
