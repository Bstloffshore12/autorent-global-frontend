import { type CarData } from '@/model/CarModel'
import { type CarState } from '@/store/slices/carSlice'

interface GetAvailablePricingMode {
  isDailyPriceActive: boolean
  isWeeklyPriceActive: boolean
  isMonthlyPriceActive: boolean
}

export const getAvailablePricingMode = ({
  isDailyPriceActive,
  isWeeklyPriceActive,
  isMonthlyPriceActive,
}: GetAvailablePricingMode): CarState['order']['pricingMode'][] => {
  const x = ['daily', 'weekly', 'monthly'].filter((mode) => {
    if (mode === 'daily') return isDailyPriceActive
    if (mode === 'weekly') return isWeeklyPriceActive
    if (mode === 'monthly') return isMonthlyPriceActive
    return false
  })

  return x as CarState['order']['pricingMode'][]
}

interface IsRentable extends GetAvailablePricingMode {
  leadMode?: boolean
  bookNow: CarData['book_now']
  pricingMode: CarState['order']['pricingMode']
}

/**
 * This function checks if the car is rentable based on:
 * - is bookNow option is true
 * - leadMode is false
 * - at least one of isDailyPriceActive | isWeeklyPriceActive | isMonthlyPriceActive is available
 * - active pricing mode is one of available pricing modes
 * @param {boolean} bookNow
 * @param {CarData['book_now']} leadMode
 * @param {CarState['order']['pricingMode']} pricingMode
 * @param {boolean} isDailyPriceActive
 * @param {boolean} isWeeklyPriceActive
 * @param {boolean} isMonthlyPriceActive
 * @returns {boolean} true if the car is rentable, false otherwise
 */
export const checkIfRentable = ({
  bookNow,
  leadMode,
  pricingMode,
  isDailyPriceActive,
  isWeeklyPriceActive,
  isMonthlyPriceActive,
}: IsRentable): boolean => {
  const availablePricingMode = getAvailablePricingMode({
    isDailyPriceActive,
    isWeeklyPriceActive,
    isMonthlyPriceActive,
  })

  return !!(
    bookNow &&
    !leadMode &&
    availablePricingMode.length &&
    availablePricingMode.includes(pricingMode)
  )
}
