import NetworkModel from '@/model/NetworkModel'
import { type Errors } from '@/model/NetworkModel'

export type CarAttribute = {
  id: number
  title: string
  media: {
    title: string
    alt: string
    path: string
  } | null
}

export type Media = {
  title: string
  alt: string
  featured?: string
  path: string
}

export type RentalAdditional = {
  id: number
  additional_id: string
  title: string
  description: string
  warning: string
  mandatory: 0 | 1
  conditional: string
  service_type: string
  default: 0 | 1
  type: string
  daily: string
  weekly: string | null
  monthly: string | null
}

export type KilometerPricing = {
  kilometer_id: number
  kilometers: number
  kilometer_title: string
  price: string
}

export type DurationPricing = {
  duration_id: number
  duration_months: number
  duration_title: string
  kilometer_pricing: KilometerPricing[]
}

export type PersonalLeasePricingMatrix = {
  year_id: number
  year_title: string
  durations: DurationPricing[]
}

export type PersonalLeasePricing = {
  enabled: boolean
  active: boolean
  pricing_matrix: PersonalLeasePricingMatrix[]
}

export type PersonalLeaseCarData = {
  id: number
  countryname: string
  title: string
  slug: string
  daily: string
  dailysale: string | null
  dailyactive: 0 | 1
  weekly: string
  weeklysale: string | null
  weeklyactive: 0 | 1
  monthly: string
  monthlysale: string | null
  monthlyactive: 0 | 1
  summary: string
  car_category: string
  make: string
  model: string
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
  book_now: 0 | 1
  media: Media[]
  carattributes_attr: { features: CarAttribute[] }
  rental_additional: RentalAdditional[]
  personal_lease_pricing: PersonalLeasePricing
}

export type PersonalLeaseCarDetail = PersonalLeaseCarData & {
  description: string
}

export type GetPersonalLeaseCarsRes = {
  errors: Errors
  data: PersonalLeaseCarData[]
  message: string
}

export type GetPersonalLeaseCarDetailRes = {
  errors: Errors
  data: PersonalLeaseCarDetail
  message: string
}

class PersonalLeaseModel {
  static getPersonalLeaseCars = () => NetworkModel.fetchPersonalLeaseCars()
  static getPersonalLeaseCarDetail = (slug: string) =>
    NetworkModel.fetchPersonalLeaseCarDetail(slug)
}

export default PersonalLeaseModel
