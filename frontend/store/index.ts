import { createStore } from 'zustand/vanilla'

import {
  carSlice,
  type CarSlice,
  defaultCarState,
} from '@/store/slices/carSlice'
import {
  authSlice,
  type AuthSlice,
  defaultAuthState,
} from '@/store/slices/authSlice'
import {
  userSlice,
  type UserSlice,
  defaultUserState,
} from '@/store/slices/userSlice'
import {
  generalSlice,
  type GeneralSlice,
  defaultGeneralState,
} from '@/store/slices/generalSlice'
import {
  requestACallbackSlice,
  type WebFormSliceSlice,
  defaultWebFormSliceState,
} from '@/store/slices/webFormSlice'

import {
  operatingCountrySlice,
  type OperatingCountrySlice,
  defaultOperatingCountryState,
} from '@/store/slices/operatingCountrySlice'
import { uiSlice, type UiSlice, defaultUiState } from '@/store/slices/uiSlice'

export type AppStore = UiSlice &
  CarSlice &
  AuthSlice &
  UserSlice &
  GeneralSlice &
  WebFormSliceSlice &
  OperatingCountrySlice

const defaultState = {
  ...defaultUiState,
  ...defaultCarState,
  ...defaultUserState,
  ...defaultAuthState,
  ...defaultGeneralState,
  ...defaultWebFormSliceState,
  ...defaultOperatingCountryState,
}

export const createAppStore = (initState = defaultState) => {
  return createStore<AppStore>()((set, get, store) => ({
    ...initState,
    ...uiSlice(set, get, store),
    ...carSlice(set, get, store),
    ...authSlice(set, get, store),
    ...userSlice(set, get, store),
    ...generalSlice(set, get, store),
    ...operatingCountrySlice(set, get, store),
    ...requestACallbackSlice(set, get, store),
  }))
}
