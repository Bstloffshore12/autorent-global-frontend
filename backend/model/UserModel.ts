import NetworkModel from '@/model/NetworkModel'

type userDocumentData = {
  title: string
  alt: string
  path: string
}

export type UserData = {
  id: string
  country: string
  first_name: string
  last_name: string
  phone: string
  email: string
  email_verified_at: string
  city: string
  address: string
  state: string
  postal_code: string
  visa_status: 'visit' | 'resident' | null

  valid_visa: string
  valid_cc: string
  valid_age: string
  newsletter: string
  terms: string
  status_id: string
  verify: true
  verify_document: false

  passport_number: string
  passport_expiry: string
  passport_place: string
  passport: userDocumentData | null

  emirates_id: string
  resident_place: string
  resident_expiry: string
  resident_back: userDocumentData | null
  resident_front: userDocumentData | null

  license: string
  license_place: string
  valid_license: string
  license_number: string
  license_expiry: string
  license_back: userDocumentData | null
  license_front: userDocumentData | null
}

export type PostProfileProps = {
  first_name?: string
  last_name?: string
  phone?: string
}

export type PostProfileDetailsProps = {
  city?: string
  country?: string
  address?: string
  state?: string
  postal_code?: string
  visa_status?: string
  emirates_id?: string
  license_number?: string
  license_expiry?: string
  license_place?: string
  passport_number?: string
  passport_expiry?: string
  passport_place?: string
  valid_license?: string
  valid_visa?: string
  valid_cc?: string
  valid_age?: string
  newsletter?: string
  terms?: string
}

export type OrderData = {
  booking_id: string
  order_id: number
  order_price: string
  order_pickupdate: string
  dropoff_date: string
  office_locations: {
    pickup: string
    dropoff: string
  }
  currency: string
  currency_position: string
  car_id: number
  car_title: string
  car_media: {
    title: string
    alt: string
    featured: string
    path: string
  } | null
  car_make: string
  car_model: string
  status_name: string
  order_extensions: []
  status_color: string
  order_dailyprice: string
  order_extendable: number
  payment_status_name: string
  payment_status_color: string
}

export interface BookingDetailDcoumentData {
  title: string
  alt: string
  size: string
  type: string
  path: string
}

export type BookingDetailData = {
  additional_charges: {
    id: number
    price: string
    title: string
    additional_id: number
    description: string | null
  }[]
  order: {
    additional_total: string
    booking_id: string
    car_id: number
    car_total_price: string
    country_id: number
    coupon_price: string | null
    created_date: string
    currency: string
    currency_position: string
    dropoff_date: string
    duration: number
    is_invoice: number
    locations: { pickup: null | string; dropoff: null | string }
    order_extendable: number
    order_id: number
    order_type: null
    payment_status_color: string
    payment_status_name: string
    pickup_date: string
    pricemode: 'daily' | 'weekly' | 'monthly'
    status_color: string
    status_name: string
    sub_amount: string
    tax_amount: string | null
    tax_label: string
    tax_rate: string
    pay_at_counter_fee: string | null
    pay_at_counter_percentage: string | null
    pay_at_counter_fee_label: string | null
    total_amount: string
    transaction_id: string
    lease_type: 'personal' | 'rental'
  }

  car: {
    id: number
    slug: string
    title: string
    daily: string
    dailysale: string | null
    weekly: string
    weeklysale: string | null
    monthly: string
    monthlysale: string | null
    media: {
      title: string
      alt: string
      featured: string
      path: string
    } | null
    make: string
    model: string
    bodyType: string
    fuelType: string
    bodyCondition: string
    regionalSpecification: string
    transmission: string
    year: string
    warranty: string
    regional_specification: string
    bodytype: string
    fueltype: string
    cylinder: string
    color: string
    body_condition: string
    door: string
    seat: string
    carattributes: {
      features: {
        id: number
        title: string
        media: {
          title: string
          alt: string
          path: string
        } | null
      }[]
    }
  }
  order_extensions: []
  documents?: { [key: string]: BookingDetailDcoumentData[] }
  location_dropoff_charge: {
    title: string
    amount: string
  }
  lease_details?: {
    type: string
    year_id: number
    year_title: string
    duration_id: number
    duration_title: string
    duration_months: number
    kilometer_id: number
    kilometer_title: string
    kilometer_value: number
  }
  extra_kilometer_options?: {
    id: number
    additional_id: string
    title: string
    description: string
    service_type: string
    type: string
    daily: string
    weekly: string
    monthly: string | null
  }[]
  extra_kilometer_charges: {
    id: number
    title: string
    description: string
    service_type: string
    amount: string
    kilometers: string
    price_per_km: string
    media: null | any
    added_by_manager: boolean
    recorded_at: string
  }[]
}

const {
  getProfile,
  getorders,
  postProfile,
  postProfileDetails,
  getBookingDetail,
} = NetworkModel.apiRoutes.user

class UserModel {
  static getProfile = async () => NetworkModel.fetch(getProfile)

  static postProfile = async (data: PostProfileProps) => {
    return NetworkModel.fetch(postProfile, {
      method: 'POST',
      body: JSON.stringify({ ...data, _method: 'put' }),
    })
  }

  static getOrders = async () => {
    return NetworkModel.fetch(getorders)
  }

  static getBookingDetail = async (id: string) => {
    return NetworkModel.fetch(getBookingDetail(id))
  }

  static postProfileDetails = async (body: FormData) => {
    body.append('_method', 'put')
    return NetworkModel.fetch(postProfileDetails, { method: 'POST', body })
  }
}

export default UserModel
