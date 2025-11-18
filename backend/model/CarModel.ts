import { type Seo } from '@/model/CmsModel'
import NetworkModel from '@/model/NetworkModel'
import { type Errors } from '@/model/NetworkModel'

export type MakeData = {
  id: number
  slug: string
  title: string
  media: string
  car_count: number
}

export type BodyTypeData = {
  id: number
  slug: string
  title: string
  media: string
  count?: number
  app_link?: string
  web_link?: string
}

export type DoorData = {
  id: number
  title: string
  slug: string
}

export type CategoryData = {
  id: number
  title: string
  slug: string
}

export type ModelData = {
  id: number
  title: string
  slug: string
}

export interface AllModelsData extends MakeData {
  chield: ModelData
}

export type FuelTypesData = {
  id: number
  title: string
  slug: string
}

export type ColorData = {
  id: number
  title: string
  slug: string
  code: string
}

export type TransmissionData = {
  id: number
  title: string
  slug: string
}

export type CylinderData = {
  id: number
  title: string
  slug: string
}

export type PriceRangeData = {
  daily: {
    min: number
    max: number
  }
  weekly: {
    min: number
    max: number
  }
  monthly: {
    min: number
    max: number
  }
}

export type CarData = {
  id: number
  book_now: 0 | 1
  dailyactive: 0 | 1
  weeklyactive: 0 | 1
  monthlyactive: 0 | 1
  car_category: string
  countryname: string
  title: string
  slug: string
  daily: string
  dailysale: string | null
  weekly: string
  weeklysale: string | null
  monthly: string
  monthlysale: string | null
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
  mediacount: number
  rental_car_link: string
  media?: {
    title: string
    alt: string
    path: string
  }
}

export type CarPagination = {
  total: number
  per_page: number
  current_page: number
  last_pages: number
  next_page_url: string | null
  prev_page_url: string | null
  from: number
  to: number
}

export type GetRentalCarsRes = {
  errors: Errors
  data: CarData[]
  message: string
  pagination: CarPagination
}

export type GetRentalCarsProps = {
  min?: string
  max?: string
  page?: string
  perPage?: string
  isFeatured?: boolean
  'door[]'?: string | string[]
  'make[]'?: string | string[]
  'model[]'?: string | string[]
  'category[]'?: string | string[]
  'fuelType[]'?: string | string[]
  'cylinder[]'?: string | string[]
  'bodyType[]'?: string | string[]
  'transmission[]'?: string | string[]
  priceType?: 'daily' | 'weekly' | 'monthly'
  sortBy?: 'price_high_low' | 'price_low_high' | 'recent'
}

export type DropoffCharge = {
  id: number
  pickup_location: {
    id: number
    city: string
    title: string
  }
  dropoff_location: {
    id: number
    city: string
    title: string
  }
  charge_amount: string
  currency: string
  title: string
  description: string
}

type CarAttribute = {
  id: number
  title: string
  media: {
    title: string
    alt: string
    path: string
  } | null
}

export type RentalAdditional = {
  id: number
  title: string
  daily: string
  warning: string
  weekly: string | null
  monthly: string | null
  mandatory: 0 | 1
  additional_id: string
  description: string | null
  type: 'single' | 'multiple'
  conditional?: 'airport' | 'other' | 'map'
  service_type?:
    | 'registration'
    | 'gps'
    | 'orange_card'
    | 'collection'
    | 'delivery'
    | 'no_deposit'
  default: 0 | 1
}

export type CarDetail = {
  id: number
  book_now: 0 | 1
  dailyactive: 0 | 1
  weeklyactive: 0 | 1
  monthlyactive: 0 | 1
  car_category: string
  countryname: string
  title: string
  slug: string
  daily: string
  dailysale: string | null
  description: string
  weekly: string
  weeklysale: string | null
  monthly: string
  monthlysale: string | null
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
  media:
    | {
        title: string
        alt: string
        featured: string
        path: string
      }[]
    | null
  carattributes_attr?: { features: CarAttribute[] }
  rental_additional: RentalAdditional[]
  seo?: Seo
}

const { apiRoutes } = NetworkModel

class CarModel {
  static getMakes = () => NetworkModel.fetch(apiRoutes.getMakes)
  static getDoors = () => NetworkModel.fetch(apiRoutes.getDoors)
  static getColors = () => NetworkModel.fetch(apiRoutes.getColors)
  static getBodyTypes = () => NetworkModel.fetch(apiRoutes.getBodyTypes)
  static getFuelTypes = () => NetworkModel.fetch(apiRoutes.getFuelTypes)
  static getCylinders = () => NetworkModel.fetch(apiRoutes.getCylinders)
  static getAllModels = () => NetworkModel.fetch(apiRoutes.getAllModels)
  static getCategories = () => NetworkModel.fetch(apiRoutes.getCategories)
  static getPriceRange = async () => NetworkModel.fetch(apiRoutes.getPriceRange)
  static getTransmissions = () => NetworkModel.fetch(apiRoutes.getTransmissions)

  static getModels = (makeId: string) =>
    NetworkModel.fetch(apiRoutes.getModels(makeId))

  static getRentalCars = async ({
    min,
    max,
    page,
    isFeatured,
    perPage = '12',
    'make[]': make,
    'door[]': door,
    'model[]': model,
    priceType = 'daily',
    'category[]': category,
    'fuelType[]': fuelType,
    'bodyType[]': bodyType,
    sortBy = 'price_low_high',
    'transmission[]': transmission,
  }: GetRentalCarsProps) => {
    const url = new URL(apiRoutes.getRentalCars)

    const appendParam = (key: string, value?: string[] | string) => {
      if (Array.isArray(value))
        value.forEach((v) => url.searchParams.append(key, v))
      else if (value) url.searchParams.append(key, value)
    }

    appendParam('min', min)
    appendParam('max', max)
    appendParam('page', page)
    appendParam('make[]', make)
    appendParam('door[]', door)
    appendParam('model[]', model)
    appendParam('sort_by', sortBy)
    appendParam('per_page', perPage)
    appendParam('fueltype[]', fuelType)
    appendParam('bodytype[]', bodyType)
    appendParam('price_type', priceType)
    appendParam('car_category_id[]', category)
    appendParam('transmission[]', transmission)
    if (isFeatured) appendParam('featured', '1')
    return NetworkModel.fetch(url)
  }
  static getCarDetail = (slug: string) =>
    NetworkModel.fetch(apiRoutes.getCarDetail(slug))

  static getDropoffCharge = async (
    countryId: number,
    pickupLocationId: number,
    dropoffLocationId: number
  ) => {
    const url = new URL(
      `${NetworkModel.adminIp}api/location-dropoff-charges/get-charges`
    )

    const body = JSON.stringify({
      'country-id': countryId,
      pickup_location_id: pickupLocationId,
      dropoff_location_id: dropoffLocationId,
    })

    return NetworkModel.fetch(url, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export default CarModel
