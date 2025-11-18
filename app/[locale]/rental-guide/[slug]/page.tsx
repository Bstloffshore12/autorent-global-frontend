import Image from 'next/image'
import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import SectionHeading from '@/components/common/SectionHeading'
import getRentalGuidesAction from '@/actions/rentalGuide/getRentalGuidesAction'
import RentalGuidePageSidePanel from '@/components/rentalGuide/RentalGuidePageSidePanel'
import getRentalGuideDetailPageAction from '@/actions/pages/getRentalGuideDetailPageAction'

// seo meta
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  metaData: Promise<ResolvedMetadata>
) {
  const { slug } = await params
  const parentMeta = await metaData
  const res = await getRentalGuideDetailPageAction({ slug })

  return CmsModel.setSeoMeta(res, parentMeta)
}

interface RentalGuideDetailProps {
  params: Promise<{ slug: string }>
}

const RentalGuideDetailPage = async ({ params }: RentalGuideDetailProps) => {
  const { slug } = await params

  const [t, retntalGuideRes, rentalGuidesRes] = await Promise.all([
    getTranslations(),
    getRentalGuideDetailPageAction({ slug }),
    getRentalGuidesAction(),
  ])

  if (retntalGuideRes.success && retntalGuideRes.data) {
    const rentalGuide = retntalGuideRes.data
    const rentalGuides = rentalGuidesRes.success ? rentalGuidesRes.data : []
    const date = new Date(rentalGuide.created_at)

    const createdAt = date.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    return (
      <>
        <Breadcrumb
          path={[
            { name: t('Rental Guides'), link: routes.rentalGuides },
            { name: rentalGuide.title },
          ]}
        />

        <main className="mb-8">
          <Container className="grid duration-300 md:grid-cols-[auto_300px] lg:grid-cols-[auto_400px]">
            <section className="mt-2 space-y-2 md:mt-8 md:space-y-6">
              <PageHeading>{rentalGuide.title}</PageHeading>

              <span className="flex items-center gap-2 text-primary">
                <FaRegCalendarAlt />
                <span className="font-normal">{createdAt}</span>
              </span>

              <Image
                width={1000}
                height={700}
                alt={rentalGuide.media?.alt || rentalGuide.title}
                title={rentalGuide.media?.title || rentalGuide.title}
                src={
                  rentalGuide.media?.path
                    ? `${routes.bucketUrl}${rentalGuide.media?.path}`
                    : '/assets/images/placeholder.svg'
                }
                className="max-h-96 w-full rounded-2xl object-cover"
              />

              <SectionHeading>{rentalGuide.subtitle}</SectionHeading>

              {rentalGuide.content && (
                <div
                  className="blog-post"
                  dangerouslySetInnerHTML={{ __html: rentalGuide.content }}
                />
              )}
            </section>

            <RentalGuidePageSidePanel rentalGuides={rentalGuides} />
          </Container>
        </main>
      </>
    )
  }

  return notFound()
}

export default RentalGuideDetailPage
