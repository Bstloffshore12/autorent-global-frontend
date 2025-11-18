import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import WhyChooseUsSection from '@/sections/WhyChooseUsSection'
import PartnerSliderSction from '@/sections/PartnerSliderSction'
import OperatingCountryModel from '@/model/OperatingCountryModel'
import CustomerReviewSliderSection from '@/sections/CustomerReviewSliderSection'
import getMobileAppPageContentAction from '@/actions/pages/getMobileAppPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getMobileAppPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const MobileAppPage = async () => {
  const [t, res, activeCountry] = await Promise.all([
    getTranslations(),
    getMobileAppPageContentAction(),
    OperatingCountryModel.getActiveOperatingCountry(),
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

              {activeCountry && (
                <div className="flex justify-center gap-4 sm:justify-start">
                  <Link target="_blank" href={activeCountry.apple_link}>
                    <Image
                      width={176}
                      height={56}
                      className="w-44"
                      alt={t('App Store')}
                      src="/assets/images/apps/app-store.svg"
                    />
                  </Link>
                  <Link target="_blank" href={activeCountry.android_link}>
                    <Image
                      width={176}
                      height={56}
                      className="w-44"
                      alt={t('Google Play')}
                      src="/assets/images/apps/google-play.svg"
                    />
                  </Link>
                </div>
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
              className="ml-auto h-max max-h-[600px] w-full max-w-[600px] object-contain duration-300"
            />
          </Container>

          <CustomerReviewSliderSection />

          <PartnerSliderSction />

          <WhyChooseUsSection />
        </main>
      </>
    )
  }

  return notFound()
}

export default MobileAppPage
