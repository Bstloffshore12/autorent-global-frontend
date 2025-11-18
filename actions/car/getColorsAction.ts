'use server'

import { type Errors } from '@/model/NetworkModel'
import CarModel, { type ColorData } from '@/model/CarModel'

type Return =
  | {
      success: true
      data: ColorData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getColorsAction = async (): Promise<Return> => {
  try {
    const response = await CarModel.getColors()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getColorsAction: error })

    return {
      success: false,
      message: 'Unable to get colors',
      errors: { message: ['Unable to get colors'] },
    }
  }
}

export default getColorsAction
