'use server'

import { type Errors } from '@/model/NetworkModel'
import CarModel, { type FuelTypesData } from '@/model/CarModel'

type Return =
  | {
      success: true
      data: FuelTypesData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getFuleTypesAction = async (): Promise<Return> => {
  try {
    const response = await CarModel.getFuelTypes()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getFuleTypesAction: error })

    return {
      success: false,
      message: 'Unable to get fule types',
      errors: { message: ['Unable to get fule types'] },
    }
  }
}

export default getFuleTypesAction
