import { toast } from 'react-toastify'
import { fromDate, type ZonedDateTime } from '@internationalized/date'

import {
  type OfficeLocationOption,
  type OfficeLocationDropdownData,
  type OfficeLocationGroupByStateData,
} from '@/model/CmsModel'
import { type Errors } from '@/model/NetworkModel'
import { type CouponData } from '@/model/CouponModel'
import { type CarState } from '@/store/slices/carSlice'
import { type CountryData } from '@/actions/getCountriesAction'
import { type GeneralState } from '@/store/slices/generalSlice'
import { type CustButtonProps } from '@/components/common/Button'
import { type MakeData, RentalAdditional } from '@/model/CarModel'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

import { getAvailablePricingMode, checkIfRentable } from './utils/carUtils'

export { getAvailablePricingMode, checkIfRentable }

export const classnames = (...args: unknown[]) => {
  return args
    .flat()
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim()
}

export const capitalize = (string: string | undefined) =>
  string ? string.charAt(0).toUpperCase() + string.slice(1) : ''

interface getCompareDateProps {
  ending: ZonedDateTime
  starting: ZonedDateTime
}

export const compareDate = ({ starting, ending }: getCompareDateProps) => {
  const diffInMs = ending.compare(starting);
  const diffInMinutes = diffInMs / (1000 * 60);
  const diffInDays = diffInMinutes / (60 * 24);

  const fullDays = Math.floor(diffInDays);
  const remainderMinutes = diffInMinutes - fullDays * 24 * 60;

  // ✅ Only count as another day if remainder > 0.5 minute (to avoid floating errors)
  const totalDays = remainderMinutes > 0.5 ? fullDays + 1 : fullDays;


  return Math.max(1, totalDays);
};

interface getPricingModeProps {
  pickupTime: ZonedDateTime
  dropoffTime: ZonedDateTime
}

/**
 * This function determines the pricing mode based on the pickup and dropoff times difference.
 * @param {ZonedDateTime} pickupTime - the pickup time as a ZonedDateTime object
 * @param {ZonedDateTime} dropoffTime - the dropoffTime time as a ZonedDateTime object
 * @returns {CarState["order"]["pricingMode"]} the pricing mode as 'daily', 'weekly', or 'monthly'
 */
export const getPricingMode = ({
  pickupTime,
  dropoffTime,
}: getPricingModeProps): CarState['order']['pricingMode'] => {
  const diffarance = compareDate({ starting: pickupTime, ending: dropoffTime })

  if (diffarance >= 30) return 'monthly'
  if (diffarance >= 7) return 'weekly'
  return 'daily'
}

type GetAdditionalServicesPerDayCostProps = {
  cost: string | number
  pricingMode: CarState['order']['pricingMode']
}

export const getAdditionalServicesPerDayCost = ({
  cost,
  pricingMode,
}: GetAdditionalServicesPerDayCostProps) => {
  if (pricingMode === 'weekly') return Number(cost) / 7
  if (pricingMode === 'monthly') return Number(cost) / 30
  return Number(cost)
}

type getAdditionalServicesTotalProps = {
  duration: number
  additionalServices: RentalAdditional[]
  pricingMode: 'daily' | 'weekly' | 'monthly' | 'fixed'
}

const getAdditionalServicesTotal = ({
  duration,
  pricingMode,
  additionalServices,
}: getAdditionalServicesTotalProps) => {
  const totalCost = additionalServices.reduce((total, service) => {
    // ✅ Handle fixed pricing (flat cost)

    // ✅ Define one-time charge types and titles
    const oneTimeCharges = [
      'Airport Pickup Fee',
      'Airport Delivery Fee',
      'Delivery Charges',
      'Collection Charges',
    ]
    const oneTimeServiceTypes = ['delivery', 'collection', 'gps']

    const isOneTimeCharge =
      oneTimeCharges.includes(service.title) ||
      (service.service_type &&
        oneTimeServiceTypes.includes(service.service_type))

    let baseCost: number

    if (pricingMode === 'fixed') {
      // Fixed pricing — take flat monthly or daily cost
      baseCost = Number(service.monthly ?? service.daily ?? 0)
    } else if (isOneTimeCharge) {
      // If it's a one-time charge, use its direct cost
      baseCost = Number(service[pricingMode] ?? service.daily)
    } else {
      // Dynamic per-day/month cost calculation
      baseCost = getAdditionalServicesPerDayCost({
        pricingMode,
        cost: service[pricingMode] || service.daily || 0,
      })
    }

    // ✅ Determine whether to multiply by duration
    const shouldMultiplyByDuration =
      service.type === 'multiple' && !isOneTimeCharge && pricingMode !== 'fixed'
    const totalServiceCost = shouldMultiplyByDuration
      ? baseCost * duration
      : baseCost
    return total + totalServiceCost
  }, 0)
  return totalCost
}

const getRentalTotal = ({
  duration,
  basePrice,
  pricingMode,
}: {
  duration: number
  basePrice: string
  pricingMode: 'daily' | 'weekly' | 'monthly' | 'fixed'
}) => {
  if (pricingMode === 'daily') return Number(basePrice) * duration
  if (pricingMode === 'weekly') return (Number(basePrice) / 7) * duration
  if (pricingMode === 'monthly') return (Number(basePrice) / 30) * duration
  return Number(basePrice)
}

const getCouponAmount = (total: number, coupon: CouponData): number => {
  if (coupon.type === 'percentage') {
    const percentage = Number(coupon.value) / 100
    return Number(total) * percentage
  }

  if (coupon.type === 'fixed') return Number(coupon.value)

  return 0
}

interface GetTaxAmount {
  price: string | number
  tax: GeneralState['general']['tax']
}

const getTaxAmount = ({ price, tax }: GetTaxAmount) =>
  tax.taxStatus ? (Number(price) / 100) * tax.taxRate : 0

export const includeTax = ({ price, tax }: GetTaxAmount) => {
  const taxValue = getTaxAmount({ price, tax })
  return Number(price) + taxValue
}

type GetPayAtCounterAmount = {
  price: number | string
  payAtCounterPercentage: number
}

// ✅ Calculate the pay-at-counter amount
export const getPayAtCounterAmount = ({
  price,
  payAtCounterPercentage,
}: GetPayAtCounterAmount) =>
  payAtCounterPercentage > 0
    ? (Number(price) / 100) * payAtCounterPercentage
    : 0

// ✅ Include pay-at-counter amount in total if needed
export const includePayAtCounter = ({
  price,
  payAtCounterPercentage,
}: GetPayAtCounterAmount) => {
  const amount = getPayAtCounterAmount({ price, payAtCounterPercentage })
  return Number(price) + amount
}

type PricingCalculatorProps = {
  duration: number
  basePrice: string
  coupon: CouponData | null
  tax: GeneralState['general']['tax']
  additionalServices: RentalAdditional[]
  pricingMode: 'daily' | 'weekly' | 'monthly' | 'fixed'
  pay_at_counter_percentage: number
  dropoffChargeAmount?: number
}

export const PricingCalculator = ({
  tax,
  coupon,
  duration,
  basePrice,
  pricingMode,
  additionalServices,
  pay_at_counter_percentage,
  dropoffChargeAmount = 0,
}: PricingCalculatorProps) => {
  const price = {
    total: '0.00',
    rental: '0.00',
    discount: '0.00',
    taxAmount: '0.00',
    additionalServices: '0.00',
    totalWithoutDiscount: '0.00',
    payAtCounterAmount: '0.00',
  }
  const addOnCost = getAdditionalServicesTotal({
    duration,
    pricingMode,
    additionalServices,
  })
  const rentalCost = getRentalTotal({ basePrice, duration, pricingMode })
  const serviceCost = addOnCost + rentalCost
  const discountAmount = coupon ? getCouponAmount(serviceCost, coupon) : 0
  const subTotal = serviceCost - discountAmount + dropoffChargeAmount
  const taxAmount = getTaxAmount({ tax, price: subTotal })
  const payAtCounterAmount = pay_at_counter_percentage
    ? getPayAtCounterAmount({
      price: subTotal + taxAmount,
      payAtCounterPercentage: pay_at_counter_percentage,
    })
    : 0
  price.taxAmount = taxAmount.toFixed(2)
  price.rental = rentalCost.toFixed(2)
  price.discount = discountAmount.toFixed(2)
  price.additionalServices = addOnCost.toFixed(2)
  price.totalWithoutDiscount = serviceCost.toFixed(2)
  price.total = (subTotal + taxAmount + payAtCounterAmount).toFixed(2)
  price.payAtCounterAmount = payAtCounterAmount.toFixed(2)
  return price
}

export const toastErrors = (errors: Errors) =>
  Object.keys(errors).forEach((key: string) =>
    errors[key].forEach((err: string) => toast.error(err))
  )

export const dateToApiAcceptableFormat = (dateTime: ZonedDateTime) =>
  `${dateTime.year}-${String(dateTime.month).padStart(2, '0')}-${String(dateTime.day).padStart(2, '0')} ${String(dateTime.hour).padStart(2, '0')}:${String(dateTime.minute).padStart(2, '0')}`

export const toZonedDateTime = (date: string) => {
  try {
    return fromDate(new Date(date), 'Etc/GMT-4')
  } catch (error) {
    console.log({ error })
    return fromDate(new Date(), 'Etc/GMT-4')
  }
}

export const filterOperatingCountriesBySlug = (
  locale: GetOperatingCountriesData['iso2'],
  operatingCountries: GetOperatingCountriesData[]
) => operatingCountries.filter((c) => c.iso2 === locale)[0]

export const addCountInMakes = (makes: MakeData[]): MakeData[] => {
  const makeWithCount = makes.map((make) => ({
    ...make,
    title: `${make.title} (${make.car_count})`,
  }))

  const total = makes.reduce((t, m) => t + Number(m.car_count), 0)
  return [
    {
      id: 0,
      slug: '',
      media: '',
      car_count: total,
      title: `All Makes (${total})`,
    },
    ...makeWithCount,
  ]
}

export const getCountryDetailByIp = async (ip: string) => {
  const res = await fetch(`https://ipinfo.io/${ip}`, {
    headers: { Accept: 'application/json' },
  })

  return res.json()
}

export const getUserActialLocale = async () => {
  const response = await fetch('https://api.ipify.org?format=json')
  const data = await response.json()
  const userIP = data.ip
  // const userIP = '103.152.99.0' // saudi
  // const userIP = '178.238.11.6' // uk

  const countryRes = await getCountryDetailByIp(userIP)

  const locale =
    countryRes.country.toLowerCase() as GetOperatingCountriesData['iso2']

  return locale
}

export const countriesToSelectOptions = (countries: CountryData[]) =>
  countries.map(({ flag, name }) => ({
    id: name,
    title: `${flag} ${name}`,
  }))

export const getButtonThemeColor = (theme: CustButtonProps['theme']) => {
  if (theme === 'primary')
    return 'border-primary bg-primary font-medium text-white'
  if (theme === 'secondary')
    return 'border-secondary bg-secondary font-medium text-white'
  if (theme === 'primaryLight')
    return 'border-primary-light bg-primary-light font-normal text-primary duration-300 hover:border-primary hover:bg-primary hover:text-white'
  if (theme === 'secondaryLight')
    return 'border-secondary-light bg-secondary-light font-normal text-secondary duration-300 hover:border-secondary hover:bg-secondary hover:text-white'

  return 'border-neutral-500 bg-white font-normal text-black'
}

export const getButtonSize = (size: CustButtonProps['size']) => {
  if (size === 'small') return 'h-9 text-sm'
  if (size === 'big') return 'h-12 text-base'

  return 'h-10 text-base'
}

// Helper function to format date
export const formatDate = (dateString: string) => {
  return new Date(dateString).toDateString()
}

// Helper function to format time
export const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getOfficeLocationsOptions = (
  locations: OfficeLocationGroupByStateData
) => {
  const l: OfficeLocationOption[] = []

  Object.keys(locations).forEach((city) =>
    locations[city].forEach(({ id, title }) => {
      l.push({ id, title: capitalize(title) })
    })
  )

  return l
}

export const getOfficeLocationsDropdownOptions = (
  locations: OfficeLocationDropdownData | Record<string, any>
) => {
  const l: { id: number; title: string; type: string }[] = []

  // Handle case where locations might be null, undefined, or not an object
  if (!locations || typeof locations !== 'object') {
    return l
  }

  // Handle nested data structure where actual data is in locations.data
  const actualData = locations.data || locations

  Object.keys(actualData).forEach((type) => {
    const typeData = actualData[type]

    // Check if typeData is an array
    if (Array.isArray(typeData)) {
      typeData.forEach((item) => {
        if (
          item &&
          typeof item === 'object' &&
          'id' in item &&
          'title' in item
        ) {
          l.push({
            id: item.id,
            title: capitalize(item.title),
            type,
          })
        }
      })
    }
  })

  return l
}

export const getUserAcceptableDocumentsType = () =>
  ['.pdf', '.jpg', '.png', '.jpeg', '.docx', '.doc', '.webp'].toString()

export const calculateAdditionalServiceCost = (
  price: string,
  pricingMode: string,
  duration: number,
  serviceTitle: string,
  serviceType?: string
) => {
  const basePrice = Number(price)

  // Define one-time charges that should not be multiplied by duration
  const oneTimeCharges = [
    'Airport Pickup Fee',
    'Airport Delivery Fee',
    'Airport Deliver Fee',
    'Delivery Charges',
    'Collection Charges',
  ]

  // Define one-time service types
  const oneTimeServiceTypes = ['delivery', 'collection', 'gps']

  // Check if this is a one-time charge (by title or service_type)
  const isOneTimeCharge =
    oneTimeCharges.includes(serviceTitle) ||
    (serviceType && oneTimeServiceTypes.includes(serviceType))

  if (isOneTimeCharge) {
    // For one-time charges, return the base price as-is
    return basePrice.toFixed(2)
  }

  // For other services, calculate per-day cost based on pricing mode
  let perDayCost = basePrice
  if (pricingMode === 'weekly') {
    perDayCost = basePrice / 7
  } else if (pricingMode === 'monthly') {
    perDayCost = basePrice / 30
  } else if (pricingMode === 'fixed') {
    return perDayCost.toFixed(2)
  }
  // Multiply by duration for the total cost
  return (perDayCost * duration).toFixed(2)
}
