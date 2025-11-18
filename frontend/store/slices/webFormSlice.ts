import { StateCreator } from 'zustand'

import { type AppStore } from '@/store/index'

export type WebFormSliceState = {
  webForm: {
    isRequestACallbackModalOpen: boolean
  }
}

export type WebFormSliceActions = {
  setWebForm: {
    setIsRequestACallbackModalOpen: (
      isRequestACallbackModalOpen: WebFormSliceState['webForm']['isRequestACallbackModalOpen']
    ) => void
  }
}

export type WebFormSliceSlice = WebFormSliceState & WebFormSliceActions

export const defaultWebFormSliceState: WebFormSliceState = {
  webForm: {
    isRequestACallbackModalOpen: false,
  },
}

export const requestACallbackSlice: StateCreator<
  AppStore,
  [],
  [],
  WebFormSliceSlice
> = (set) => ({
  ...defaultWebFormSliceState,
  setWebForm: {
    setIsRequestACallbackModalOpen: (isRequestACallbackModalOpen) =>
      set((state) => ({
        ...state,
        webForm: { ...state.webForm, isRequestACallbackModalOpen },
      })),
  },
})
