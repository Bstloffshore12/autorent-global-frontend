import MonthlyLeaseCarDetail from '@/components/monthlyLease/MonthlyLeaseCarDetail'
import { getMonthlyLeaseCarDetailAction } from '@/actions/car/getMonthlyLeaseCarAction'
import type {
  MonthlyLeaseCarDetail as CarData,
  SEO,
} from '@/model/MonthlyLeaseModel'
import Breadcrumb from '@/components/common/Breadcrumb'
import { getTranslations } from 'next-intl/server'
import routes from '@/routes'
import Image from 'next/image'
import LinkButton from '@/components/common/LinkButton'
import Container from '@/components/common/Container'
import PickUpDropOffSelector2 from '@/components/carListing/PickUpDropOffSelector2'
import getPaymentOptionsAction from '@/actions/getPaymentOptionsAction'
import getOfficeLocationsDropdownAction from '@/actions/cms/getOfficeLocationsDropdownAction'
import SetLeaseTypeClient from '@/components/individualLease/SetLeaseTypeClient'
import type { Metadata } from 'next'
interface LocaleLayoutProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { slug } = await params
  const res = await getMonthlyLeaseCarDetailAction({ slug })

  if (!res.success || !res.data) {
    return {
      title: 'Monthly Lease Car Not Found',
      description: 'Sorry, this monthly lease car could not be found.',
    }
  }

  const carData: CarData = res.data
  const seo: SEO | undefined = carData.seo
  const seometa = carData.seometa || []

  // Extract OG tags safely from seometa array
  const ogTitle = seometa.find(
    (item) => item.key?.toLowerCase() === 'og title'
  )?.value
  const ogDescription = seometa.find(
    (item) => item.key?.toLowerCase() === 'ogdescription'
  )?.value
  const ogUrl = seometa.find(
    (item) => item.key?.toLowerCase() === 'og url'
  )?.value

  return {
    title: seo?.title || `${carData.title} | Monthly Lease Cars`,
    description:
      seo?.description ||
      `Lease the ${carData.title} with flexible monthly plans and affordable options.`,
    keywords: seo?.keywords,
    openGraph: {
      title: ogTitle || seo?.title || carData.title,
      description: ogDescription || seo?.description,
      url: ogUrl,
      type: 'website',
    },
  }
}

export default async function MonthlyLeaseCarDetailPage({
  params,
}: LocaleLayoutProps) {
  const { slug } = await params
  // Fetch translations and car data in parallel
  const [t, res, officeLocationsContentRes, getPaymentOptionsRes] =
    await Promise.all([
      getTranslations(),
      getMonthlyLeaseCarDetailAction({ slug }),
      getOfficeLocationsDropdownAction(),
      getPaymentOptionsAction(),
    ])
  const paymentOptions = getPaymentOptionsRes.success
    ? getPaymentOptionsRes.data
    : []

  const officeLocationsContent = officeLocationsContentRes.success
    ? officeLocationsContentRes.data
    : {}

  // Handle if no data is returned
  if (!res.success || !res.data) {
    return (
      <>
        <Breadcrumb
          path={[{ name: 'Monthly Lease Cars', link: routes.monthlyLeaseCars }]}
        />

        <Container className="my-8 space-y-4">
          <Image
            width={400}
            height={400}
            alt="Car not found"
            src="/assets/images/not-found.svg"
            className="mx-auto h-96 w-96 max-w-full object-contain"
          />

          <LinkButton
            theme="primaryLight"
            href={routes.monthlyLeaseCars}
            className="mx-auto block w-max"
          >
            {t('Back To Listing')}
          </LinkButton>
        </Container>
      </>
    )
  }

  const carData: CarData = res.data

  return (
    <div className="min-h-screen">
      <Breadcrumb
        path={[
          { name: 'Monthly Lease Cars', link: routes.monthlyLeaseCars },
          {
            name: carData.title,
            link: routes.monthlyLeaseCarDetail(carData.slug),
          },
        ]}
      />
      <Container className="z-30 mt-8">
        <PickUpDropOffSelector2
          officeLocationsContent={officeLocationsContent}
        />
      </Container>
      <MonthlyLeaseCarDetail
        carData={carData}
        paymentOptions={paymentOptions}
      />
      <SetLeaseTypeClient type="monthly" />
    </div>
  )
}
