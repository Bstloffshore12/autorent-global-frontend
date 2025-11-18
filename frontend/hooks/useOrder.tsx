'use client'

import { useRouter } from 'next/navigation'

import { useAppStore } from '@/store/provider'
import { dateToApiAcceptableFormat } from '@/futils'
import usePickUpDropOff from '@/hooks/usePickUpDropOff'
import { type GetPaymentUrlProps } from '@/model/PaymentModel'
import getPaymentUrlAction from '@/actions/getPaymentUrlAction'

const useOrder = () => {
  const router = useRouter()

  const { pickupLocationType, dropoffLocationType } = usePickUpDropOff()

  const {
    order: {
      carId,
      coupon,
      pickupTime,
      dropoffTime,
      paymentMethod,
      additionalServices,
      selfPickupLocation,
      selfDropoffLocation,
      officePickupLocation,
      officeDropoffLocation,
      dropoffCharge,
      yearId,
      durationId,
      kilometerId,
      leaseType,
    },
  } = useAppStore((state) => state)

  const getOrderPayload = () => {
    if (pickupTime && dropoffTime && paymentMethod) {
      const pickupId =
        pickupLocationType === 'office' && officePickupLocation
          ? officePickupLocation.id
          : ''

      const dropoffId =
        dropoffLocationType === 'office' && officeDropoffLocation
          ? officeDropoffLocation.id
          : ''

      const selfPickup =
        selfPickupLocation && pickupLocationType === 'self'
          ? JSON.stringify({
            placeId: selfPickupLocation.place_id || '',
            formattedAddress: selfPickupLocation.formatted_address || '',
            location: {
              lat: selfPickupLocation.geometry?.location?.lat() || 0,
              lng: selfPickupLocation.geometry?.location?.lat() || 0,
            },
          })
          : ''

      const selfDropoff =
        selfDropoffLocation && dropoffLocationType === 'self'
          ? JSON.stringify({
            placeId: selfDropoffLocation.place_id || '',
            formattedAddress: selfDropoffLocation.formatted_address || '',
            location: {
              lat: selfDropoffLocation.geometry?.location?.lat() || 0,
              lng: selfDropoffLocation.geometry?.location?.lat() || 0,
            },
          })
          : ''

      const additionalIds = JSON.stringify(
        additionalServices.map(({ id }) => id.toString())
      )
      const isregular = leaseType === 'monthly' || leaseType === 'personal'


      return {
        rentalcar_id: carId,
        pickup_id: pickupId,
        dropoff_id: dropoffId,
        self_pickup: selfPickup,
        self_dropoff: selfDropoff,
        coupon: coupon?.code || '',
        additional_id: additionalIds,
        payment_id: paymentMethod.id,
        pickup_date: dateToApiAcceptableFormat(pickupTime),
        dropoff_date: dateToApiAcceptableFormat(dropoffTime),
        year_id: isregular ? yearId || null : null,
        duration_id: isregular ? durationId || null : null,
        kilometer_id: isregular ? kilometerId || null : null,
        lease_type: leaseType || null,
        location_dropoff_charge_id: dropoffCharge?.id || 0,
      }
    }
    return null
  }

  const redirectToPayment = async (postOrderData: GetPaymentUrlProps) => {
    const res = await getPaymentUrlAction(postOrderData)
    if (res.success) router.push(res.data)
    return res.success
  }

  return { getOrderPayload, redirectToPayment }
}

export default useOrder
