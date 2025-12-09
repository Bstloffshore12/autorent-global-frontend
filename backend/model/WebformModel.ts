import { cookies } from 'next/headers'

import NetworkModel, { type Errors } from '@/model/NetworkModel'

export type PostEnquiryProps = {
  name: string
  type?: string
  phone: string
  email: string
  source?: string
  message?: string
  vehicle?: number
  company?: string
  car_type?: string
  campaign?: string
  state_id?: string | null
  pickup_location?: string
  rental_duration?: string
  dropoff_location?: string
}

export type PostCustomerEnquiryProps = {
  name: string
  email: string
  phone: string
  vehicle_name: string
  message?: string
  campaign?: string
  source?: string
}

export type PostCarLeaseProps = {
  type: string
  city: string
  email: string
  phone: string
  vehicle: string
  message: string
  country: string
  last_name: string
  first_name: string
  campaign?: string
  source?: string
}

export type PostContactProps = {
  name: string
  email: string
  phone: string
  subject: string
  address: string
  message: string
  campaign?: string
  source?: string
}

export type PostCorporateLeasingProps = {
  name: string
  phone: string
  email: string
  message: string
  company_name: string
  number_vehicles: string
  vehicle_category: string
  vehicle_interested_in: string
  campaign?: string
  source?: string
}

export type PostFeedbackProps = {
  email: string
  phone: string
  message: string
  last_name: string
  first_name: string
  campaign?: string
  source?: string
}

export type PostNewsletterProps = {
  email: string
}

export type PostRequestACallbackProps = {
  name: string
  phone: string
  email: string
  message: string
}
export type PostRoadSideAssistanceProps = {
  email: string
  phone: string
  message: string
  last_name: string
  first_name: string
  booking_ref_no: string
  breakdown_location: string
  campaign?: string
  source?: string
}

export type Return =
  | {
      success: true
      message: string
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const {
  career,
  contact,
  carlease,
  feedback,
  newsletter,
  postEnquiry,
  corporateLeasing,
  requestCallACallback,
  postRoadSideAssistance,
  customerVehicleRequests,
} = NetworkModel.apiRoutes.webform

class WebformModel {
  static errorMessage =
    "We couldn't submit your application. Please try again later."

  static form = {
    cookieKey: 'formSubmitted',

    setCookieSubmit: async () => {
      const cookieStore = await cookies()
      cookieStore.set(this.form.cookieKey, 'true', {
        path: '/',
        maxAge: 15,
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
      })
    },
    checkIfSubmitted: async () => {
      const cookieStore = await cookies()
      return cookieStore.get(this.form.cookieKey)?.value
    },
  }

  static postCareer = async (formData: FormData) =>
    NetworkModel.fetch(career, {
      method: 'POST',
      body: formData,
    })

  static postCarLease = async (data: PostCarLeaseProps) =>
    NetworkModel.fetch(carlease, {
      method: 'POST',
      body: JSON.stringify(data),
    })

  static postContact = async (data: PostContactProps) =>
    NetworkModel.fetch(contact, {
      method: 'POST',
      body: JSON.stringify(data),
    })

  static postEnquiry = async (data: PostEnquiryProps) =>
    NetworkModel.fetch(postEnquiry, {
      method: 'POST',
      body: JSON.stringify(data),
    })

  static postCustomerEnquiry = async (data: PostCustomerEnquiryProps) =>
    NetworkModel.fetch(customerVehicleRequests, {
      method: 'POST',
      body: JSON.stringify(data),
    })

  static postCorporateLeasing = async (data: PostCorporateLeasingProps) =>
    NetworkModel.fetch(corporateLeasing, {
      method: 'POST',
      body: JSON.stringify(data),
    })

  static postFeedback = async (data: PostFeedbackProps) =>
    NetworkModel.fetch(feedback, {
      method: 'POST',
      body: JSON.stringify(data),
    })

  static postNewsletter = async (data: PostNewsletterProps) =>
    NetworkModel.fetch(newsletter, {
      method: 'POST',
      body: JSON.stringify(data),
    })

  static postRequestACallback = async (data: PostRequestACallbackProps) =>
    NetworkModel.fetch(requestCallACallback, {
      method: 'POST',
      body: JSON.stringify(data),
    })

  static postRoadSideAssistance = async (data: PostRoadSideAssistanceProps) =>
    NetworkModel.fetch(postRoadSideAssistance, {
      method: 'POST',
      body: JSON.stringify(data),
    })
}

export default WebformModel
