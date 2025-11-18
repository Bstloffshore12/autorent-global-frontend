import Image from 'next/image'
import { notFound } from 'next/navigation'

import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import LandingOfferForm from '@/components/webforms/LandingOfferForm'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

interface LandingPageProps {
  params: Promise<{
    campaign: string
    locale: GetOperatingCountriesData['iso2']
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const LandingPage = async ({ params, searchParams }: LandingPageProps) => {
  const { locale, campaign } = await params
  if (locale !== 'ae') return notFound()

  const { source } = await searchParams

  return (
    <>
      <main className="mb-8 mt-2 space-y-8 md:mt-8">
        <Container className="grid items-center justify-around gap-8 lg:grid-cols-2">
          <Image
            width={500}
            height={500}
            alt="Monthly Rental"
            title="Monthly Rental"
            src="/assets/images/landings/monthly-rental.jpeg"
            className="xlg:ml-auto ml-auto h-full w-full max-w-[500px] object-contain duration-300"
          />

          <div className="max-w-[500px] space-y-6 rounded-lg border bg-primary-light p-4 shadow-md shadow-primary/10">
            <div className="space-y-2">
              <SectionHeading className="capitalize">
                <span className="text-secondary">Monthly Rental </span>
                <span className="text-primary">Offer</span>
              </SectionHeading>
              <div className="space-y-1">
                <p className="font-medium">
                  Looking for a long-term car rental?
                </p>
                <ul className="text-sm">
                  <li className="flex items-center gap-1">
                    <span className="block size-1 rounded-full bg-primary"></span>{' '}
                    <span>Free Delivery & Collection Within City Limits</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="block size-1 rounded-full bg-primary"></span>{' '}
                    <span>Free Personal Accident Insurance</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="block size-1 rounded-full bg-primary"></span>{' '}
                    <span>Unlimited Mileage</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="block size-1 rounded-full bg-primary"></span>{' '}
                    <span>24/7 Support</span>
                  </li>
                </ul>
              </div>

              <LandingOfferForm
                campaign={campaign}
                source={source?.toString() || 'website'}
              />
              <div className="text-sm">
                <p className="w-max border-b border-b-neutral-700 font-normal">
                  Terms and Conditions:
                </p>
                <p>
                  An additional 5% VAT is applicable. Terms and conditions
                  apply. Delivery of vehicles is subject to availability at the
                  time of order. Vehicle images shown are for illustrative
                  purposes only.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}

export default LandingPage
