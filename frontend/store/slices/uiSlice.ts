import { StateCreator } from 'zustand'

import routes from '@/routes'
import { type AppStore } from '@/store/index'
import type { ReactElement, ReactNode } from 'react'

export interface NavLinks {
  [key: string]: { [key: string]: string }[]
}

const navLinks: NavLinks = {
  Individual: [{ link: routes.listing, text: 'Rental' }],
  Lease: [
    { link: routes.webform.leaseCars, text: 'Individual Lease' },
    { link: routes.webform.corporateLeasing, text: 'Corporate Lease' },
  ],
  Contact: [
    { link: routes.webform.contact, text: 'Contact Us' },
    { link: routes.webform.roadSideAssistance, text: 'Road Side Assistance' },
    { link: routes.webform.feedback, text: 'Feedback' },
  ],
}

export type UiState = {
  ui: {
    navLinks: NavLinks
    isNavigationDrawerActive: boolean
    loadingModel: {
      title: string
      subtitle: string
      isActive: boolean
      icon?: ReactElement
      children: ReactNode
    }
  }
}

export type UiActions = {
  setUi: {
    setIsNavigationDrawerActive: (
      isNavigationDrawerActive: UiState['ui']['isNavigationDrawerActive']
    ) => void
    resetLoadingModel: () => void
    setNavLinks: (navLinks: NavLinks) => void
    setLoadingModel: (loadingModel: UiState['ui']['loadingModel']) => void
  }
}

export type UiSlice = UiState & UiActions

export const defaultUiState: UiState = {
  ui: {
    navLinks,
    isNavigationDrawerActive: false,
    loadingModel: {
      title: '',
      subtitle: '',
      children: null,
      isActive: false,
    },
  },
}

export const uiSlice: StateCreator<AppStore, [], [], UiSlice> = (set) => ({
  ...defaultUiState,
  setUi: {
    setNavLinks: (navLinks) =>
      set((state) => ({ ...state, ui: { ...state.ui, navLinks } })),
    setLoadingModel: (loadingModel) =>
      set((state) => ({ ...state, ui: { ...state.ui, loadingModel } })),
    setIsNavigationDrawerActive: (isNavigationDrawerActive) =>
      set((state) => ({
        ...state,
        ui: { ...state.ui, isNavigationDrawerActive },
      })),
    resetLoadingModel: () =>
      set((state) => ({
        ...state,
        ui: { ...state.ui, loadingModel: defaultUiState.ui.loadingModel },
      })),
  },
})
