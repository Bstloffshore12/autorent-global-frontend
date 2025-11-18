import { type ResolvedMetadata } from 'next'

import NetworkModel, { type Errors, type CmsSlugs } from '@/model/NetworkModel'

export interface Seo {
  title: string
  keywords: string | null
  description: string | null
  canonical_url: string | null
}

export interface OfficeLocationOption {
  id: number
  title: string
}

export interface Metadata {
  key: string
  value: string
}

export type Media = {
  alt: string
  path: string
  title: string
}

export interface BaseCMSContent {
  id: number
  title: string
  content?: string
  media?: Media | null
  subtitle?: string | null
}

export type GetCustomeData = BaseCMSContent

export type PartnerData = BaseCMSContent
export type GetTrustData = BaseCMSContent
export type HowItWorksData = BaseCMSContent
export type WhyChooseUsData = BaseCMSContent
export type HomeBannersData = BaseCMSContent
export type GetAdvantagesData = BaseCMSContent
export type RentalDocumentData = BaseCMSContent
export type AboutPhilosophiesData = BaseCMSContent
export type AboutTransparencyData = BaseCMSContent

export interface RentalGuideData extends BaseCMSContent {
  slug: string
  mapframe: string
  created_at: string
}

export type OfficeLocationData = {
  id: number
  title: string
  city: string
  address: string
  mapframe: string
  phone: string
  fax: string
  email: string
}

export type OfficeLocationGroupByStateData = {
  [key: string]: OfficeLocationData[]
}

// New types for dropdown API
export type OfficeLocationDropdownItem = {
  id: number
  title: string
  type: string
}

export type OfficeLocationDropdownData = {
  [key: string]: OfficeLocationDropdownItem[]
}

export interface SeoMeta {
  key: string
  value: string
}

export type CmsContent = {
  seo?: Seo
  slug: string
  title: string
  content?: string
  seometa: SeoMeta[]
  created_at: string
  media: Media | null
  metadata?: Metadata[]
  state_id: string | null
  subtitle: string | null
} | null

export type Testimonial = {
  id: number
  name: string
  rating: number
  description: string
  media: Media | null
  created_at: string
}

export type SpecialOffer = {
  state_id: number
  state_name: string
  offers: {
    id: number
    title: string
    subtitle: string
    slug: string
    media: Media | null
  }[]
}

type SetSeoMetaProps =
  | {
      success: true
      message: string
      data: { seo?: Seo } | null
    }
  | {
      errors: Errors
      success: false
      message: string
    }
  | null

const {
  apiRoutes,
  fetchCmsPageContent,
  fetchCmsSectionDetail,
  fetchCmsCustomContent,
} = NetworkModel
class CmsModel {
  static metaKeywords = ''
  static metaTitle = 'AutoRent'
  static metaDescription =
    "Drive Dubai's finest luxury cars or any type of car rental for unbeatable rates and first-class service only with Autorent Dubai."

  static getSpecialOffersContent = () =>
    fetchCmsSectionDetail('webspecialoffers')
  static getRentalDocumentsContent = () =>
    fetchCmsSectionDetail('rentaldocuments')
  static getAboutTransparencyContent = () =>
    fetchCmsSectionDetail('aboutbottom')
  static getAboutPhilosophiesContent = () =>
    fetchCmsSectionDetail('aboutphilosophies')
  static getOfficeLocationsContent = () =>
    NetworkModel.fetch(apiRoutes.getCmsSectionDetail('officelocations'))
  static getOfficeLocationsDropdown = () =>
    fetchCmsSectionDetail('officelocationsdropdown')
  static getPartnersContent = () => fetchCmsSectionDetail('partners')
  static getRentalGuides = () => fetchCmsSectionDetail('rentalguides')
  static getTrustContent = () => fetchCmsSectionDetail('aboutreliables')
  static getHowItWorksContent = () => fetchCmsSectionDetail('howitworks')
  static getAdvantagesContent = () => fetchCmsSectionDetail('advantages')
  static getWhyChooseUsContent = () => fetchCmsSectionDetail('whychooses')
  static getHomeBannersContent = () => fetchCmsSectionDetail('homebanners')
  static getTestimonialContent = () => fetchCmsSectionDetail('testimonials')

  // page

  static getPrivacyPolicyPageContent = () =>
    fetchCmsPageContent('privacy-policy')

  static getSpecialOfferPageContent = () =>
    fetchCmsPageContent('special-offers')

  static getCorporateLeasingPageContent = () =>
    fetchCmsPageContent('corporate-leasing')

  static getRentalCarsEnquiryPageContent = () =>
    fetchCmsPageContent('rent-cars-enquiry')

  static getRoadSideAssistancePageContent = () =>
    fetchCmsPageContent('road-side-assistance')

  static getTermsAndConditionsPageContent = () =>
    fetchCmsPageContent('terms-and-conditions')

  static getRentalGuideDetailPageContent = (slug: string) =>
    fetchCmsPageContent(slug as CmsSlugs)

  static getSpecialOfferDetailPageContent = (slug: string) =>
    fetchCmsPageContent(slug as CmsSlugs)

  static get404PageContent = () => fetchCmsPageContent('404')

  static getFaqsPageContent = () => fetchCmsPageContent('faqs')

  static getHomePageContent = () => fetchCmsPageContent('home')

  static getBlogsPageContent = () => fetchCmsPageContent('blogs')

  static getAboutUsPageContent = () => fetchCmsPageContent('about')

  static getCareerPageContent = () => fetchCmsPageContent('careers')

  static getContactPageContent = () => fetchCmsPageContent('contact')

  static getFeedbackPageContent = () => fetchCmsPageContent('feedback')

  static getLeaseCarPageContent = () => fetchCmsPageContent('lease-cars')

  static getMobileAppPageContent = () => fetchCmsPageContent('mobile-app')

  static getRentalCarsPageContent = () => fetchCmsPageContent('rent-cars')

  static getRentalGuidesPageContent = () => fetchCmsPageContent('rental-guides')

  // custom

  static getCustomContent = fetchCmsCustomContent

  static setSeoMeta = (res: SetSeoMetaProps, parentMeta: ResolvedMetadata) => {
    if (!res || !res.success || !res.data?.seo) return parentMeta

    const seo = res.data.seo

    const canonical = seo.canonical_url || ''
    const title = seo.title || parentMeta.title
    const keywords = seo.keywords || parentMeta.keywords
    const description = seo.description || parentMeta.description
    const twitter = { ...parentMeta.twitter, title, description }
    const openGraph = {
      ...parentMeta.openGraph,
      title,
      description,
      url: canonical || parentMeta.openGraph?.url,
    }
    const alternates = {
      ...parentMeta.alternates,
      canonical: canonical ? { url: canonical } : null,
    }

    return {
      ...parentMeta,
      title,
      twitter,
      keywords,
      openGraph,
      alternates,
      description,
    }
  }
}

export default CmsModel
