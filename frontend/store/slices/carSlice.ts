import { StateCreator } from 'zustand'
import { now, type ZonedDateTime } from '@internationalized/date'
import { type DropoffCharge } from '@/model/CarModel'
import { type AppStore } from '@/store/index'
import { type CarDetail } from '@/model/CarModel'
import { type CouponData } from '@/model/CouponModel'
import { type PaymentMethod } from '@/model/PaymentModel'

export type CarState = {
  isListingFilterDrawerOpen: boolean

  car: {
    isDailyActive: CarDetail['dailyactive']
    isWeeklyActive: CarDetail['weeklyactive']
    isMonthlyActive: CarDetail['monthlyactive']
  }

  // order
  order: {
    duration: number
    carId: CarDetail['id']
    isOrderModalOpen: boolean
    coupon: CouponData | null
    pickupTime: ZonedDateTime | null
    dropoffTime: ZonedDateTime | null
    paymentMethod: PaymentMethod | null
    pricingMode: 'daily' | 'weekly' | 'monthly'
    additionalServices: CarDetail['rental_additional']
    selfPickupLocation: google.maps.places.PlaceResult | null
    selfDropoffLocation: google.maps.places.PlaceResult | null
    officePickupLocation: { id: number; title: string; type?: string } | null
    officeDropoffLocation: { id: number; title: string; type?: string } | null
    dropoffCharge: DropoffCharge | null
    yearId: number | null
    durationId: number | null
    kilometerId: number | null
    leaseType: 'personal' | 'regular' | 'corporate' | 'monthly' | null
  }
}

export type CarActions = {
  setIsListingFilterDrawerOpen: (
    isLoggedIn: CarState['isListingFilterDrawerOpen']
  ) => void

  setCar: {
    setIsDailyActive: (isDailyActive: CarDetail['dailyactive']) => void
    setIsWeeklyActive: (isWeeklyActive: CarDetail['weeklyactive']) => void
    setIsMonthlyActive: (isMonthlyActive: CarDetail['monthlyactive']) => void
  }

  // order
  setOrder: {
    setIsOrderModalOpen: (
      isModalOpen: CarState['order']['isOrderModalOpen']
    ) => void
    setPricingMode: (
      additionalServices: CarState['order']['pricingMode']
    ) => void
    setAdditionalServices: (
      additionalServices: CarState['order']['additionalServices']
    ) => void
    setSelfPickupLocation: (
      selfPickupLocation: CarState['order']['selfPickupLocation']
    ) => void
    setSelfDropoffLocation: (
      selfDropoffLocation: CarState['order']['selfDropoffLocation']
    ) => void
    setOfficePickupLocation: (
      officePickupLocation: CarState['order']['officePickupLocation']
    ) => void
    setOfficeDropoffLocation: (
      officeDropoffLocation: CarState['order']['officeDropoffLocation']
    ) => void
    setCoupon: (coupon: CarState['order']['coupon']) => void
    setCarId: (pickupTime: CarState['order']['carId']) => void
    setDuration: (duration: CarState['order']['duration']) => void
    setPickupTime: (pickupTime: CarState['order']['pickupTime']) => void
    setPaymentMethod: (coupon: CarState['order']['paymentMethod']) => void
    setDropoffTime: (dropoffTime: CarState['order']['dropoffTime']) => void
    setYearId: (yearId: CarState['order']['yearId']) => void
    setDropoffCharge: (charge: CarState['order']['dropoffCharge']) => void
    setDurationId: (durationId: CarState['order']['durationId']) => void
    setKilometerId: (kilometerId: CarState['order']['kilometerId']) => void
    setLeaseType: (leaseType: CarState['order']['leaseType']) => void
  }
}

export type CarSlice = CarState & CarActions

export const defaultCarState: CarState = {
  isListingFilterDrawerOpen: false,

  car: {
    isDailyActive: 1,
    isWeeklyActive: 1,
    isMonthlyActive: 1,
  },

  // order
  order: {
    carId: 0,
    duration: 1,
    coupon: null,
    paymentMethod: null,
    pricingMode: 'daily',
    additionalServices: [],
    isOrderModalOpen: false,
    selfPickupLocation: null,
    selfDropoffLocation: null,
    officePickupLocation: null,
    officeDropoffLocation: null,
    pickupTime: now('Etc/GMT-4').add({ hours: 1 }),
    dropoffTime: now('Etc/GMT-4').add({ days: 1, hours: 1 }),
    dropoffCharge: null,
    yearId: null,
    durationId: null,
    kilometerId: null,
    leaseType: null,
  },
}

export const carSlice: StateCreator<AppStore, [], [], CarSlice> = (set) => ({
  ...defaultCarState,
  setIsListingFilterDrawerOpen: (isListingFilterDrawerOpen) =>
    set((state) => ({ ...state, isListingFilterDrawerOpen })),

  // car
  setCar: {
    setIsDailyActive: (isDailyActive: CarDetail['dailyactive']) =>
      set((state) => ({ ...state, car: { ...state.car, isDailyActive } })),
    setIsWeeklyActive: (isWeeklyActive: CarDetail['weeklyactive']) =>
      set((state) => ({ ...state, car: { ...state.car, isWeeklyActive } })),
    setIsMonthlyActive: (isMonthlyActive: CarDetail['monthlyactive']) =>
      set((state) => ({ ...state, car: { ...state.car, isMonthlyActive } })),
  },

  // order
  setOrder: {
    setIsOrderModalOpen: (isOrderModalOpen) =>
      set((state) => ({
        ...state,
        order: { ...state.order, isOrderModalOpen },
      })),
    setAdditionalServices: (additionalServices) =>
      set((state) => ({
        ...state,
        order: { ...state.order, additionalServices },
      })),
    setSelfPickupLocation: (selfPickupLocation) =>
      set((state) => ({
        ...state,
        order: { ...state.order, selfPickupLocation },
      })),
    setSelfDropoffLocation: (selfDropoffLocation) =>
      set((state) => ({
        ...state,
        order: { ...state.order, selfDropoffLocation },
      })),
    setOfficePickupLocation: (officePickupLocation) =>
      set((state) => ({
        ...state,
        order: { ...state.order, officePickupLocation },
      })),
    setOfficeDropoffLocation: (officeDropoffLocation) =>
      set((state) => ({
        ...state,
        order: { ...state.order, officeDropoffLocation },
      })),
    setCarId: (carId) =>
      set((state) => ({ ...state, order: { ...state.order, carId } })),
    setCoupon: (coupon) =>
      set((state) => ({ ...state, order: { ...state.order, coupon } })),
    setDuration: (duration) =>
      set((state) => ({ ...state, order: { ...state.order, duration } })),
    setPickupTime: (pickupTime) =>
      set((state) => ({ ...state, order: { ...state.order, pickupTime } })),
    setDropoffTime: (dropoffTime) =>
      set((state) => ({ ...state, order: { ...state.order, dropoffTime } })),
    setPricingMode: (pricingMode) =>
      set((state) => ({ ...state, order: { ...state.order, pricingMode } })),
    setPaymentMethod: (paymentMethod) =>
      set((state) => ({ ...state, order: { ...state.order, paymentMethod } })),
    setYearId: (yearId) =>
      set((state) => ({ ...state, order: { ...state.order, yearId } })),
    setDurationId: (durationId) =>
      set((state) => ({ ...state, order: { ...state.order, durationId } })),
    setKilometerId: (kilometerId) =>
      set((state) => ({ ...state, order: { ...state.order, kilometerId } })),
    setLeaseType: (leaseType) =>
      set((state) => ({ ...state, order: { ...state.order, leaseType } })),
    setDropoffCharge: (dropoffCharge) =>
      set((state) => ({
        ...state,
        order: { ...state.order, dropoffCharge },
      })),
  },
})
