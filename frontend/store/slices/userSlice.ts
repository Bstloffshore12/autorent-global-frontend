import { StateCreator } from 'zustand'

import { type AppStore } from '@/store/index'
import { type OrderData, type UserData } from '@/model/UserModel'

export type UserState = {
  user: {
    isVerified: boolean
    bookings: OrderData[]
    userData: UserData | null
  }
}

export type UserActions = {
  setUser: {
    resetUser: () => void
    setBookings: (bookings: UserState['user']['bookings']) => void
    setUserData: (userData: UserState['user']['userData']) => void
    setIsVerified: (isVerified: UserState['user']['isVerified']) => void
  }
}

export type UserSlice = UserState & UserActions

export const defaultUserState: UserState = {
  user: {
    bookings: [],
    userData: null,
    isVerified: false,
  },
}

export const userSlice: StateCreator<AppStore, [], [], UserSlice> = (set) => ({
  ...defaultUserState,
  setUser: {
    resetUser: () =>
      set((state) => ({ ...state, user: defaultUserState.user })),
    setUserData: (userData) =>
      set((state) => ({ ...state, user: { ...state.user, userData } })),
    setBookings: (bookings) =>
      set((state) => ({ ...state, user: { ...state.user, bookings } })),
    setIsVerified: (isVerified) =>
      set((state) => ({ ...state, user: { ...state.user, isVerified } })),
  },
})
