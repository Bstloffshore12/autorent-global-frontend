import { StateCreator } from 'zustand'

import { type AppStore } from '@/store/index'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

type OperatingCountryState = {
  operatingCountry: {
    isModalOpen: boolean
    list: GetOperatingCountriesData[]
    activeId: GetOperatingCountriesData['id']
  }
}

type OperatingCountryActions = {
  setOperatingCountry: {
    setActiveId: (
      activeId: OperatingCountryState['operatingCountry']['activeId']
    ) => void
    setIsModalOpen: (
      isModalOpen: OperatingCountryState['operatingCountry']['isModalOpen']
    ) => void
    setList: (list: OperatingCountryState['operatingCountry']['list']) => void
  }
}

export type OperatingCountrySlice = OperatingCountryState &
  OperatingCountryActions

export const defaultOperatingCountryState: OperatingCountryState = {
  operatingCountry: {
    list: [],
    activeId: 0,
    isModalOpen: false,
  },
}

export const operatingCountrySlice: StateCreator<
  AppStore,
  [],
  [],
  OperatingCountrySlice
> = (set) => ({
  ...defaultOperatingCountryState,
  setOperatingCountry: {
    setList: (list) =>
      set((state) => ({
        ...state,
        operatingCountry: { ...state.operatingCountry, list },
      })),
    setActiveId: (activeId) =>
      set((state) => ({
        ...state,
        operatingCountry: { ...state.operatingCountry, activeId },
      })),
    setIsModalOpen: (isModalOpen) =>
      set((state) => ({
        ...state,
        operatingCountry: { ...state.operatingCountry, isModalOpen },
      })),
  },
})
