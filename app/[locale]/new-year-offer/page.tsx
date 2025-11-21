import { type ResolvedMetadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import CmsModel from '@/model/CmsModel'
import LandingPageData from '../summer-offers/PageData'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'
import NetworkModel from '@/model/NetworkModel'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await NetworkModel.fetchCmsPageContent('summer-offers')

  return CmsModel.setSeoMeta(res, parentMeta)
}

interface LocaleLayoutProps {
  params: Promise<{ locale: GetOperatingCountriesData['iso2'] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const LandingPage = async ({ params, searchParams }: LocaleLayoutProps) => {
  const { locale } = await params
  if (!['bh'].includes(locale)) {
    return notFound()
  }

  const { utm_campaign: campaign, utm_source: source } = await searchParams
  return (
    <>
      <LandingPageData
        campaign={campaign?.toString() || 'website'}
        source={source?.toString() || 'website'}
        locale={locale}
      />

      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-11485000450"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-11485000450');
        `}
      </Script>

      {/* Event snippet for Summer Offer conversion page */}
      <Script id="google-ads-conversion">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-11485000450/_TUUCPbwjOUaEILmvOQq',
            'value': 1.0,
            'currency': 'AED'
          });
        `}
      </Script>

      <Script src="/scripts/summerOffer.js" />
    </>
  )
}

export default LandingPage
