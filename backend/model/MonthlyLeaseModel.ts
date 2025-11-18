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

export type MonthlyPricingMatrix = {
  year_id: number
  year_title: string
  durations: DurationPricing[]
}

export type MonthlyPricing = {
  enabled: boolean
  active: boolean
}

export type SEO = {
  title: string
  description: string
  keywords: string
}

export type SEOMeta = {
  key: string
  value: string
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

export type MonthlyLeaseCarData = {
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
  media: Media[]
  carattributes_attr: { features: CarAttribute[] }
  monthly_pricing: MonthlyPricing
  rental_additional: RentalAdditional[]
  monthly_pricing_data: MonthlyPricingMatrix[]
}

export type MonthlyLeaseCarDetail = MonthlyLeaseCarData & {
  description: string
  seo?: SEO
  seometa?: SEOMeta[]
}

export type GetMonthlyLeaseCarsRes = {
  errors: Errors
  data: MonthlyLeaseCarData[]
  message: string
}

export type GetMonthlyLeaseCarDetailRes = {
  errors: Errors
  data: MonthlyLeaseCarDetail
  message: string
}

class MonthlyLeaseModel {
  static getMonthlyLeaseCars = () => NetworkModel.fetchMonthlyLeaseCars()

  static getMonthlyLeaseCarDetail = (slug: string) =>
    NetworkModel.fetchMonthlyLeaseCarDetail(slug)
}

export default MonthlyLeaseModel
