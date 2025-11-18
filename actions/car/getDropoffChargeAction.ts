// app/actions/getDropoffChargeAction.ts
'use server'

import CarModel, { type DropoffCharge } from '@/model/CarModel'
import { type Errors } from '@/model/NetworkModel'

type Return =
  | {
      success: true
      message: string
      data: DropoffCharge
    }
  | {
      errors: Errors
      success: false
      message: string
    }

interface GetDropoffChargeActionProps {
  countryId: number
  pickupLocationId: number
  dropoffLocationId: number
}

const getDropoffChargeAction = async ({
  countryId,
  pickupLocationId,
  dropoffLocationId,
}: GetDropoffChargeActionProps): Promise<Return> => {
  try {
    const response = await CarModel.getDropoffCharge(
      countryId,
      pickupLocationId,
      dropoffLocationId
    )
    if (response.success) {
      return {
        success: true,
        message: 'Dropoff charge fetched successfully',
        data: response.data,
      }
    } else {
      return {
        success: false,
        message: response.message || 'Failed to fetch dropoff charge',
        errors: response.errors ?? { message: ['Unknown error'] },
      }
    }
  } catch (error) {
    console.error({ getDropoffChargeAction: error })
    return {
      success: false,
      message: 'Unable to fetch dropoff charge',
      errors: { message: ['Unable to fetch dropoff charge'] },
    }
  }
}

export default getDropoffChargeAction
