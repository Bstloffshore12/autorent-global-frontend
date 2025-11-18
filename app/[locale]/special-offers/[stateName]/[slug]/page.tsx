import Image from 'next/image'
import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import SectionHeading from '@/components/common/SectionHeading'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'
import SpecialOfferEnquiryForm from '@/components/specialOffers/SpecialOfferEnquiryForm'
import getSpecialOfferDetailPageContentAction from '@/actions/pages/getSpecialOfferDetailPageContentAction'

// seo meta
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  metaData: Promise<ResolvedMetadata>
) {
  const { slug } = await params
  const parentMeta = await metaData
  const res = await getSpecialOfferDetailPageContentAction(slug)

  return CmsModel.setSeoMeta(res, parentMeta)
}

interface PageProps {
  params: Promise<{ slug: string }>
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params

  const [t, specialOffersPageRes, specialOffersCustomContenRes] =
    await Promise.all([
      getTranslations(),
      getSpecialOfferDetailPageContentAction(slug),
      getCustomContentAction('special-offers-form-content'),
    ])

  const termsAndConditions =
    (specialOffersCustomContenRes.success &&
      specialOffersCustomContenRes.data?.subtitle) ||
    ''
  const formContent =
    (specialOffersCustomContenRes.success &&
      specialOffersCustomContenRes.data?.content) ||
    ''

  if (specialOffersPageRes.success && specialOffersPageRes.data) {
    const data = specialOffersPageRes.data

    return (
      <>
        <Breadcrumb
          path={[
            { name: t('Special Offer'), link: routes.specialOffers },
            { name: data.title },
          ]}
        />

        <main className="mb-8">
          <Container className="mt-4">
            <Image
              width={1920}
              height={1080}
              alt={data.media?.alt || data.title}
              title={data.media?.title || data.title}
              src={
                data.media?.path
                  ? `${routes.bucketUrl}${data.media?.path}`
                  : '/assets/images/placeholder.svg'
              }
              className="max-h-full w-full rounded-2xl object-cover"
            />

            <section className="mt-2 grid justify-between gap-4 md:mt-8 md:grid-cols-[auto_500px]">
              {data.content && (
                <div
                  className="blog-post"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              )}

              <div className="mx-auto max-h-max max-w-[500px] space-y-6 rounded-lg border bg-primary-light p-4 shadow-md shadow-primary/10">
                <div className="space-y-2">
                  <SectionHeading className="capitalize" brandColoured>
                    {data.title}
                  </SectionHeading>
                  <div className="space-y-1">
                    <p className="font-medium">{data.subtitle}</p>
                    {formContent && (
                      <div
                        className="cms-content text-sm"
                        dangerouslySetInnerHTML={{ __html: formContent }}
                      />
                    )}
                  </div>

                  <SpecialOfferEnquiryForm
                    slug={data.slug}
                    stateId={data.state_id}
                  />

                  {termsAndConditions && (
                    <div className="!mt-4 text-sm">
                      <p className="w-max border-b border-b-neutral-700 pb-1 font-normal">
                        {t('Terms and Conditions')}:
                      </p>
                      <p className="mt-2">{termsAndConditions}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </Container>
        </main>
      </>
    )
  }

  return notFound()
}

export default page
