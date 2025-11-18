import Image from 'next/image'
import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ContentArea from '@/components/webforms/ContentArea'
import CarLeaseForm from '@/components/webforms/CarLeaseForm'
import ContactAside from '@/components/webforms/ContactAside'
import { countriesToSelectOptions } from '@/futils'
import getCountriesAction from '@/actions/getCountriesAction'
import routes from '@/routes'
import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import getLeaseCarPageContentAction from '@/actions/pages/getLeaseCarPageContentAction'
import PersonalLeaseExplore from '@/components/individualLease/PersonalLeaseExplore'

interface LocalePageProps {
  params: Promise<{ locale: string }>
}

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getLeaseCarPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const LeaseCarPage = async ({ params }: LocalePageProps) => {
  const { locale } = await params
  const [t, getCountriesRes, LeaseCarContentRes] = await Promise.all([
    getTranslations(),
    getCountriesAction(),
    getLeaseCarPageContentAction(),
  ])
  const countries = getCountriesRes.success
    ? countriesToSelectOptions(getCountriesRes.data)
    : []

  if (LeaseCarContentRes.success && LeaseCarContentRes.data) {
    const leaseCarContent = LeaseCarContentRes.data

    return (
      <>
        <Breadcrumb path={[{ name: t('Lease Cars') }]} />

        <main className="mb-8 mt-2 space-y-8 md:mt-8">
          <Container className="space-y-6">
            {locale === 'ae' ? (
              <div>
                {leaseCarContent.media?.path && (
                  <Image
                    width={1500}
                    height={800}
                    className="max-h-[800px] w-full rounded-2xl object-cover"
                    src={`${routes.bucketUrl}${leaseCarContent.media.path}`}
                    alt={leaseCarContent.media.alt || leaseCarContent.title}
                    title={leaseCarContent.media.title || leaseCarContent.title}
                  />
                )}
                {
                  <Image
                    width={1500}
                    height={800}
                    className="max-h-[800px] w-full rounded-2xl object-cover"
                    src="https://autobackend.autorent-me.com/storage/web/uploads/2025/09/enjoy-reliable-mobility-with-flexible-rental-1920-650.jpg"
                    alt=""
                  />
                }

                <PersonalLeaseExplore />
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-[auto_400px]">
                <section className="space-y-4">
                  <ContentArea
                    title={leaseCarContent.title}
                    subtitle={leaseCarContent.subtitle || ''}
                  />

                  {leaseCarContent.content && (
                    <div
                      className="leasing-content"
                      dangerouslySetInnerHTML={{
                        __html: leaseCarContent.content,
                      }}
                    />
                  )}

                  <CarLeaseForm countries={countries} />
                </section>

                <ContactAside />
              </div>
            )}
          </Container>
        </main>
      </>
    )
  }

  return notFound()
}

export default LeaseCarPage
