import 'server-only'
import { headers } from 'next/headers'

import OperatingCountryModel, {
  type GetOperatingCountriesData,
} from '@/model/OperatingCountryModel'
import AuthModel from '@/model/AuthModel'
import LanguageModel from '@/model/LanguageModel'

export type Errors = {
  [key: string]: string[]
}

export type CmsSlugs =
  | '404'
  | 'faqs'
  | 'home'
  | 'blogs'
  | 'about'
  | 'careers'
  | 'contact'
  | 'feedback'
  | 'rent-cars'
  | 'lease-cars'
  | 'mobile-app'
  | 'summer-offers'
  | 'rental-guides'
  | 'special-offers'
  | 'privacy-policy'
  | 'rent-cars-enquiry'
  | 'corporate-leasing'
  | 'road-side-assistance'
  | 'terms-and-conditions'
  | 'monthly'
  | 'personal'

export type CmsSectionSlugs =
  | 'partners'
  | 'whychooses'
  | 'howitworks'
  | 'advantages'
  | 'homebanners'
  | 'aboutbottom'
  | 'rentalguides'
  | 'testimonials'
  | 'aboutreliables'
  | 'rentaldocuments'
  | 'webspecialoffers'
  | 'aboutphilosophies'
  | 'officelocationsdropdown'

export type CmsCustomSlugs =
  | 'footer-content'
  | 'booking-content'
  | 'booking-success-page'
  | 'booking-failure-page'
  | 'rent-cars-bullet-points'
  | 'special-offers-form-content'

  // section headings
  | 'faqs-heading'
  | 'blogs-heading'
  | 'partner-heading'
  | 'contact-page-aside'
  | 'advantages-heading'
  | 'how-it-works-heading'
  | 'rental-guide-heading'
  | 'fleets-slider-heading'
  | 'brands-slider-heading'
  | 'rental-documents-heading'
  | 'customers-reviews-heading'
  | 'rental-cars-slider-heading'

class NetworkModel {
  static adminIp = process.env.ADMIN_IP || ''

  static apiRoutes = {
    getCountries: `${this.adminIp}api/countries`,
    getOperatingCountries: `${this.adminIp}api/oc`,
    getMakes: `${this.adminIp}api/carconfig/makes`,
    getDoors: `${this.adminIp}api/carconfig/doors`,
    getColors: `${this.adminIp}api/carconfig/colors`,
    getAllModels: `${this.adminIp}api/carconfig/brands`,
    getCylinders: `${this.adminIp}api/carconfig/cylinders`,
    getBodyTypes: `${this.adminIp}api/carconfig/bodytypes`,
    getFuelTypes: `${this.adminIp}api/carconfig/fueltypes`,
    submitNewsletter: `${this.adminIp}api/webform/newsletter`,
    getRentalCars: `${this.adminIp}api/rentalcar/rental-cars`,
    getSpecialOffers: `${this.adminIp}api/cms/webspecialoffers`,
    getCategories: `${this.adminIp}api/carconfig/carcategories`,
    getTransmissions: `${this.adminIp}api/carconfig/transmissions`,
    getPersonalLeaseCars: `${this.adminIp}api/rentalcar/personal-lease-rental-cars`,
    getMonthlyLeaseCars: `${this.adminIp}api/rentalcar/monthly-pricing-rental-cars`,
    getMonthlyLeaseCarDetail: (slug: string) =>
      `${this.adminIp}api/rentalcar/monthly-pricing-detail/${slug}`,
    getPersonalLeaseCarDetail: (slug: string) =>
      `${this.adminIp}api/rentalcar/personal-lease-detail/${slug}`,

    coupons: {
      check: `${this.adminIp}api/coupon/check`,
      getCoupon: `${this.adminIp}api/coupon/list/`,
    },

    payment: {
      getUrl: `${this.adminIp}api/auth/paymentsubmit`,
      getMethods: `${this.adminIp}api/paymentgateways`,
      redirect: `${this.adminIp}api/auth/paymentredirect`,
      nboRedirect: `${this.adminIp}api/auth/nbopaymentredirect`,
      clickPayRedirect: `${this.adminIp}api/auth/clickpaypaymentreturn`,
      credimaxRedirect: `${this.adminIp}api/auth/credimaxpaymentredirect`,
    },

    auth: {
      login: `${this.adminIp}api/auth/login`,
      signUp: `${this.adminIp}api/auth/register`,
      resendOtp: `${this.adminIp}api/auth/resend`,
      logOut: `${this.adminIp}api/customer/logout`,
      getOtp: `${this.adminIp}api/auth/forgotpassword`,
      verifyEmail: `${this.adminIp}api/auth/verifyemail`,
      resetPassword: `${this.adminIp}api/auth/resetpassword`,
      verifyOtp: `${this.adminIp}api/auth/forgotpassword-verify`,
    },

    // web forms
    webform: {
      career: `${this.adminIp}api/webform/career`,
      contact: `${this.adminIp}api/webform/contact`,
      carlease: `${this.adminIp}api/webform/carlease`,
      feedback: `${this.adminIp}api/webform/feedback`,
      postEnquiry: `${this.adminIp}api/webform/enquiry`,
      newsletter: `${this.adminIp}api/webform/newsletter`,
      requestCallACallback: `${this.adminIp}api/webform/request`,
      postRoadSideAssistance: `${this.adminIp}api/webform/roadside`,
      corporateLeasing: `${this.adminIp}api/webform/corporatelease`,
      customerVehicleRequests: `${this.adminIp}api/customer-vehicle-requests`,
    },

    // user
    user: {
      getBookingDetail: (id: string) =>
        `${this.adminIp}api/customer/getorderdetail/${id}`,
      getorders: `${this.adminIp}api/customer/getorders`,
      postProfile: `${this.adminIp}api/customer/profile`,
      getProfile: `${this.adminIp}api/customer/getprofile`,
      postProfileDetails: `${this.adminIp}api/customer/profiledetail`,
    },

    // order
    postOrder: `${this.adminIp}api/order/insert`,
    extraKilometer: `${this.adminIp}api/customer/extra-kilometer`,
    booking: {
      getInvoice: (bookingId: string) =>
        `${this.adminIp}api/customer/getinvoice/${bookingId}`,
    },

    getPriceRange: `${this.adminIp}api/carconfig/pricerange`,
    getModels: (makeId: string) =>
      `${this.adminIp}api/carconfig/models/${makeId}`,

    getCarDetail: (slug: string) =>
      `${this.adminIp}api/rentalcar/detail/${slug}`,

    getBlogs: `${this.adminIp}api/articles/list`,
    getBlogDetail: (slug: string) =>
      `${this.adminIp}api/articles/detail/${slug}`,

    // cms
    getCmsSectionDetail: (slug: string) => `${this.adminIp}api/cms/${slug}`,
  }

  static fetchCmsSectionDetail = async (slug: CmsSectionSlugs) => {
    try {
      const headers = await this.getDefaultHeaders()
      const url = `${this.adminIp}api/cms/${slug}`
      const res = await fetch(url, { headers })
      const response = await res.json()
      const success = res.status === 200

      return success ? { data: response, success } : { ...response, success }
    } catch (error) {
      console.error({ error })
      // Handle error silently or log to external service
      return {
        success: false,
        message: 'Network error occurred',
        errors: { message: ['Network error occurred'] },
      }
    }
  }

  static fetchPersonalLeaseCars = async () =>
    this.fetch(this.apiRoutes.getPersonalLeaseCars)

  static fetchPersonalLeaseCarDetail = async (slug: string) =>
    this.fetch(this.apiRoutes.getPersonalLeaseCarDetail(slug))

  static fetchMonthlyLeaseCars = async () =>
    this.fetch(this.apiRoutes.getMonthlyLeaseCars)

  static fetchMonthlyLeaseCarDetail = async (slug: string) =>
    this.fetch(this.apiRoutes.getMonthlyLeaseCarDetail(slug))

  static fetchCmsPageContent = async (slug: CmsSlugs) => {
    const url = `${this.adminIp}api/cms/pagedetail/${slug}`
    return this.fetch(url)
  }
  static fetchLeaseTermsPageContent = async (slug: CmsSlugs) => {
    const url = `${this.adminIp}api/lease-terms/${slug}`
    return this.fetch(url)
  }

  static fetchCmsCustomContent = async (slug: CmsCustomSlugs) => {
    const url = `${this.adminIp}api/cms/customcontent/${slug}`
    return this.fetch(url)
  }

  static getDefaultHeaders = async () => {
    const headerList = await headers()

    const slug = headerList.get(
      OperatingCountryModel.slugKey
    ) as GetOperatingCountriesData['iso2']
    const countryId = await OperatingCountryModel.getIdBySlug_Static(slug)

    const languageSlug =
      (await LanguageModel.getActive()) || LanguageModel.default
    const device = `web | ${headerList.get('user-agent')}`
    const visitor = headerList.get('x-forwarded-for') || 'not found'
    const authToken = await AuthModel.getAuthToken()

    const defaultHeaders: HeadersInit = {
      device,
      visitor,
      'country-id': countryId,
      'lang-slug': languageSlug,
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    }

    return defaultHeaders
  }

  static fetch = async (url: URL | string, options: RequestInit = {}) => {
    try {
      const defaultHeaders = await this.getDefaultHeaders()

      let body: FormData | string | undefined

      if (options.method === 'POST') {
        if (options.body instanceof FormData) {
          body = options.body
        } else if (typeof options.body === 'string') {
          body = options.body
          defaultHeaders['Content-Type'] = 'application/json'
        }
      }

      const res = await fetch(url, {
        ...options,
        body,
        headers: { ...defaultHeaders, ...(options.headers || {}) },
      })

      const response = await res.json()
      // console.log({
      //   url,
      //   options: { ...options.headers, ...options },
      //   res,
      //   response,
      // })
      const success = res.status === 200 || res.status === 201

      return { ...response, success, status: res.status }
    } catch (error) {
      console.error({ error })
      // Handle error silently or log to external service
      return {
        success: false,
        message: 'Network error occurred',
        errors: { message: ['Network error occurred'] },
      }
    }
  }
}

export default NetworkModel
