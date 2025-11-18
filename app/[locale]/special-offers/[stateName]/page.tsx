import Image from 'next/image'
import { redirect } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import SectionHeading from '@/components/common/SectionHeading'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'
import SpecialOfferListing from '@/components/specialOffers/SpecialOfferListing'
import getSpecialOffersByStateAction from '@/actions/getSpecialOffersByStateAction'
import getSpecialOffersPageContentAction from '@/actions/pages/getSpecialOffersPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getSpecialOffersPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

interface PageProps {
  params: Promise<{
    stateName: string
    locale: GetOperatingCountriesData['iso2']
  }>
}

const page = async ({ params }: PageProps) => {
  const { stateName, locale } = await params

  const [t, SpecialOffersPageContentRes, SpecialOffersRes] = await Promise.all([
    getTranslations(),
    getSpecialOffersPageContentAction(),
    getSpecialOffersByStateAction(stateName),
  ])

  if (
    SpecialOffersRes.success &&
    SpecialOffersRes.data?.length &&
    SpecialOffersPageContentRes.success &&
    SpecialOffersPageContentRes.data
  ) {
    const listing = SpecialOffersRes.data
    const content = SpecialOffersPageContentRes.data

    return (
      <>
        <Breadcrumb path={[{ name: t('Special Offers') }]} />

        <main className="mb-8 mt-2 md:mt-8">
          <section>
            <Container className="flex flex-col-reverse gap-4 md:grid md:grid-cols-2">
              <div className="space-y-4">
                <SectionHeading brandColoured headingLevel={1}>
                  {content.title}
                </SectionHeading>

                {content.subtitle && (
                  <h4 className="font-medium">{content.subtitle}</h4>
                )}

                {content.content && (
                  <div
                    className="blog-post"
                    dangerouslySetInnerHTML={{ __html: content.content }}
                  />
                )}
              </div>

              {content.media?.path && (
                <Image
                  width={1500}
                  height={600}
                  alt={content.media.alt || content.title}
                  title={content.media.title || content.title}
                  src={`${routes.bucketUrl}${content.media.path}`}
                  className="max-h-[600px] w-full rounded-2xl object-cover"
                />
              )}
            </Container>
          </section>

          <section className="mt-6">
            <SpecialOfferListing
              specialOffers={listing}
              stateName={listing[0].state_name}
            />
          </section>
        </main>
      </>
    )
  }

  return redirect(`/${locale}/${routes.specialOffers}`)
}

export default page
