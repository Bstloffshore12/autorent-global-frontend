import { StateCreator } from 'zustand'

import { type AppStore } from '@/store/index'

export type AuthState = {
  auth: {
    isLoggedIn: boolean
    isAuthModalOpen: boolean
    isResetPasswordModalOpen: boolean
  }
}

export type AuthActions = {
  setAuth: {
    resetAuth: () => void
    setIsAuthModalOpen: (
      isModalOpen: AuthState['auth']['isAuthModalOpen']
    ) => void
    setIsResetPasswordModalOpen: (
      isModalOpen: AuthState['auth']['isResetPasswordModalOpen']
    ) => void
    setIsLoggedIn: (isLoggedIn: AuthState['auth']['isLoggedIn']) => void
  }
}

export type AuthSlice = AuthState & AuthActions

export const defaultAuthState: AuthState = {
  auth: {
    isLoggedIn: false,
    isAuthModalOpen: false,
    isResetPasswordModalOpen: false,
  },
}

export const authSlice: StateCreator<AppStore, [], [], AuthSlice> = (set) => ({
  ...defaultAuthState,
  setAuth: {
    setIsResetPasswordModalOpen: (isResetPasswordModalOpen) =>
      set((state) => ({
        ...state,
        auth: { ...state.auth, isResetPasswordModalOpen },
      })),
    resetAuth: () =>
      set((state) => ({ ...state, auth: defaultAuthState.auth })),
    setIsLoggedIn: (isLoggedIn) =>
      set((state) => ({ ...state, auth: { ...state.auth, isLoggedIn } })),
    setIsAuthModalOpen: (isAuthModalOpen) =>
      set((state) => ({ ...state, auth: { ...state.auth, isAuthModalOpen } })),
  },
})
