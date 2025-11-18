import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'

import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Accordion from '@/components/common/Accordion'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import ContactAside from '@/components/webforms/ContactAside'
import PartnerSliderSction from '@/sections/PartnerSliderSction'
import getFaqsPageContentAction from '@/actions/pages/getFaqsPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getFaqsPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const FaqsPage = async () => {
  const res = await getFaqsPageContentAction()

  if (res.success && res.data) {
    const { data } = res

    return (
      <>
        <Breadcrumb path={[{ name: 'Frequently Asked Question' }]} />

        <main className="mb-8 mt-2 space-y-8 md:mt-8">
          <Container>
            <div className="grid gap-6 md:grid-cols-[auto_400px]">
              <div className="space-y-4">
                <PageHeading>{data.title}</PageHeading>
                <p>{data.subtitle}</p>
                {data.metadata?.map(({ key, value }, i) => (
                  <Accordion key={key} heading={key} defaultExpanded={!i}>
                    {value}
                  </Accordion>
                ))}
              </div>

              <ContactAside />
            </div>
          </Container>

          <PartnerSliderSction />
        </main>
      </>
    )
  }

  return notFound()
}

export default FaqsPage
