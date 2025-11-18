import { StateCreator } from 'zustand'

import { type AppStore } from '@/store/index'
import { type SocialLinksType } from '@/components/SocialLInkBlocks'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

export type GeneralState = {
  general: {
    currency: {
      name: string
      position: string
      abbreviation: string
    }
    contact: {
      email: string
      phonecode: string
      phoneLength: number
      phoneNumber: string
      supportEmail: string
      whatsapp: {
        text: string
        number: string
      }
      location: string
    }
    tax: {
      taxRate: number
      taxLabel: string
      taxStatus: boolean
      taxIncluded: boolean
      taxEffectiveDate: null | Date
    }
    pay_at_counter_percentage: number
    socialLinks: SocialLinksType
    isSalePriceActive: GetOperatingCountriesData['sale_price_active']
    isGlobalDailyPriceActive: GetOperatingCountriesData['daily_price_active']
    isGlobalWeeklyPriceActive: GetOperatingCountriesData['weekly_price_active']
    isGlobalMonthlyPriceActive: GetOperatingCountriesData['monthly_price_active']
  }
}

export type GeneralActions = {
  setGeneral: {
    serSocialLinks: (
      socialLinks: GeneralState['general']['socialLinks']
    ) => void
    setTax: (tax: GeneralState['general']['tax']) => void
    setContact: (contact: GeneralState['general']['contact']) => void
    setCurrency: (currency: GeneralState['general']['currency']) => void
    setIsSalePriceActive: (
      isSalePriceActive: GeneralState['general']['isSalePriceActive']
    ) => void
    setIsGlobalDailyPriceActive: (
      isGlobalDailyPriceActive: GeneralState['general']['isGlobalDailyPriceActive']
    ) => void
    setIsGlobalWeeklyPriceActive: (
      isGlobalWeeklyPriceActive: GeneralState['general']['isGlobalWeeklyPriceActive']
    ) => void
    setIsGlobalMonthlyPriceActive: (
      isGlobalMonthlyPriceActive: GeneralState['general']['isGlobalMonthlyPriceActive']
    ) => void
    setPayAtCounterPercentage: (
      payAtCounterPercentage: GeneralState['general']['pay_at_counter_percentage']
    ) => void
  }
}

export type GeneralSlice = GeneralState & GeneralActions

export const defaultGeneralState: GeneralState = {
  general: {
    currency: {
      name: '',
      position: '',
      abbreviation: '',
    },
    isSalePriceActive: 0,
    isGlobalDailyPriceActive: 1,
    isGlobalWeeklyPriceActive: 1,
    isGlobalMonthlyPriceActive: 1,
    contact: {
      email: '',
      phonecode: '',
      phoneLength: 9,
      phoneNumber: '',
      supportEmail: '',
      whatsapp: {
        text: '',
        number: '',
      },
      location: '',
    },
    socialLinks: {
      x: '',
      tiktok: '',
      youtube: '',
      facebook: '',
      linkedIn: '',
      instagram: '',
    },
    tax: {
      taxRate: 0,
      taxLabel: '',
      taxStatus: false,
      taxIncluded: false,
      taxEffectiveDate: null,
    },
    pay_at_counter_percentage: 0,
  },
}

export const generalSlice: StateCreator<AppStore, [], [], GeneralSlice> = (
  set
) => ({
  ...defaultGeneralState,
  setGeneral: {
    serSocialLinks: (socialLinks) =>
      set((state) => ({
        ...state,
        general: { ...state.general, socialLinks },
      })),
    setIsSalePriceActive: (isSalePriceActive) =>
      set((state) => ({
        ...state,
        general: { ...state.general, isSalePriceActive },
      })),
    setIsGlobalDailyPriceActive: (isGlobalDailyPriceActive) =>
      set((state) => ({
        ...state,
        general: { ...state.general, isGlobalDailyPriceActive },
      })),
    setIsGlobalWeeklyPriceActive: (isGlobalWeeklyPriceActive) =>
      set((state) => ({
        ...state,
        general: { ...state.general, isGlobalWeeklyPriceActive },
      })),
    setIsGlobalMonthlyPriceActive: (isGlobalMonthlyPriceActive) =>
      set((state) => ({
        ...state,
        general: { ...state.general, isGlobalMonthlyPriceActive },
      })),
    setTax: (tax) =>
      set((state) => ({ ...state, general: { ...state.general, tax } })),
    setPayAtCounterPercentage: (
      pay_at_counter_percentage: GeneralState['general']['pay_at_counter_percentage']
    ) =>
      set((state) => ({
        ...state,
        general: { ...state.general, pay_at_counter_percentage },
      })),
    setContact: (contact) =>
      set((state) => ({ ...state, general: { ...state.general, contact } })),
    setCurrency: (currency) =>
      set((state) => ({ ...state, general: { ...state.general, currency } })),
  },
})
