// hooks/useLeaseType.ts
'use client'

import { useAppStore } from '@/store/provider'

export type LeaseType = 'personal' | 'regular' | 'corporate' | 'monthly'

export const useLeaseType = (type: LeaseType) => {
  const setLeaseType = useAppStore((state) => state.setOrder.setLeaseType)

  const applyLeaseType = () => setLeaseType(type)

  return {
    setLeaseType: applyLeaseType,
  }
}
export default useLeaseType
