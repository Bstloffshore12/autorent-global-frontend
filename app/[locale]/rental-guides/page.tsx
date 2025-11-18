import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import RentalGuideCard from '@/components/rentalGuide/RentalGuideListCard'
import getRentalGuidesAction from '@/actions/rentalGuide/getRentalGuidesAction'
import getRentalGuidesPageContentAction from '@/actions/pages/getRentalGuidesPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getRentalGuidesPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const RentalGuidePage = async () => {
  const [t, rentalGuidesRes, pageRes] = await Promise.all([
    getTranslations(),
    getRentalGuidesAction(),
    getRentalGuidesPageContentAction(),
  ])

  if (
    pageRes.success &&
    pageRes.data &&
    rentalGuidesRes.success &&
    rentalGuidesRes.data.length
  )
    return (
      <>
        <Breadcrumb path={[{ name: t('Rental Guide') }]} />

        <main className="mb-8 mt-2 md:mt-8">
          <Container className="space-y-6">
            <PageHeading>{pageRes.data.title}</PageHeading>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {rentalGuidesRes.data.map((rentalGuide) => (
                <RentalGuideCard {...rentalGuide} key={rentalGuide.id} />
              ))}
            </div>
          </Container>
        </main>
      </>
    )

  return notFound()
}

export default RentalGuidePage
