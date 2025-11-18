import Image from 'next/image'
import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import CmsModel from '@/model/CmsModel'
import TrustSection from '@/components/TrustSection'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import WhyChooseUsSection from '@/sections/WhyChooseUsSection'
import PartnerSliderSction from '@/sections/PartnerSliderSction'
import AboutTransparencySection from '@/sections/AboutTransparencySection'
import AboutPhilosophiesdataSection from '@/sections/AboutPhilosophiesdataSection'
import getAboutUsPageContentAction from '@/actions/pages/getAboutUsPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getAboutUsPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const AboutPage = async () => {
  const [t, res] = await Promise.all([
    getTranslations(),
    getAboutUsPageContentAction(),
  ])

  if (res.success && res.data) {
    const { data } = res
    return (
      <>
        <Breadcrumb path={[{ name: t('About Us') }]} />

        <main className="mb-8 mt-2 space-y-8 md:mt-8">
          <Container className="flex flex-col-reverse gap-4 md:grid md:grid-cols-2">
            <div className="space-y-6">
              <PageHeading>{data.title}</PageHeading>

              {data.content && (
                <div
                  className="cms-content"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              )}
            </div>

            <Image
              width={600}
              height={600}
              alt={data.media?.alt || data.title}
              title={data.media?.title || data.title}
              src={
                data.media?.path
                  ? `${routes.bucketUrl}${data.media?.path}`
                  : '/assets/images/placeholder.svg'
              }
              className="ml-auto h-max w-full max-w-[600px] object-contain duration-300"
            />
          </Container>

          <WhyChooseUsSection />

          <TrustSection />

          <AboutPhilosophiesdataSection />

          <PartnerSliderSction />

          <AboutTransparencySection />
        </main>
      </>
    )
  }

  return notFound()
}

export default AboutPage
