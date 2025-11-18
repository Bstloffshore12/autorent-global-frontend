'use server'

import { type Errors } from '@/model/NetworkModel'
import CarModel, { type PriceRangeData } from '@/model/CarModel'

type Return =
  | {
      success: true
      data: PriceRangeData
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getPriceRangeAction = async (): Promise<Return> => {
  try {
    const response = await CarModel.getPriceRange()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getPriceRangeAction: error })

    return {
      success: false,
      message: 'Unable to get price range',
      errors: { message: ['Unable to get price range'] },
    }
  }
}

export default getPriceRangeAction
