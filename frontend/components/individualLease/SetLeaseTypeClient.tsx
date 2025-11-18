// components/SetLeaseTypeClient.tsx
'use client'

import { useEffect } from 'react'
import useLeaseType, { LeaseType } from '@/hooks/useLeaseType'

interface SetLeaseTypeClientProps {
  type: LeaseType
}

const SetLeaseTypeClient = ({ type }: SetLeaseTypeClientProps) => {
  const { setLeaseType } = useLeaseType(type)
  // Apply lease type on mount
  useEffect(() => {
    setLeaseType()
  }, [setLeaseType])

  return null // no UI
}

export default SetLeaseTypeClient
