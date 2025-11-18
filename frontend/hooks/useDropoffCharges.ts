'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/store/provider'
import { type RentalAdditional, type DropoffCharge } from '@/model/CarModel'
import getDropoffChargeAction from '@/actions/car/getDropoffChargeAction'

export const useDropoffCharges = () => {
  const {
    operatingCountry: { activeId: countryId },
    setOrder: { setDropoffCharge },
    order: { officePickupLocation, officeDropoffLocation },
  } = useAppStore((state) => state)

  const [charge, setCharge] = useState<DropoffCharge | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const pickupLocationId = officePickupLocation?.id ?? null
  const dropoffLocationId = officeDropoffLocation?.id ?? null

  useEffect(() => {
    let cancelled = false

    const fetchDropoffCharge = async () => {
      if (!pickupLocationId || !dropoffLocationId) {
        setCharge(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const res = await getDropoffChargeAction({
          countryId,
          pickupLocationId,
          dropoffLocationId,
        })

        if (!cancelled) {
          if (res.success) {
            setCharge(res.data)
            setDropoffCharge(res.data)
          } else setError(new Error(res.message))
        }
      } catch (err) {
        if (!cancelled) setError(err as Error)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchDropoffCharge()

    return () => {
      cancelled = true
    }
  }, [pickupLocationId, dropoffLocationId])
  return { charge, isLoading, error }
}

export default useDropoffCharges
