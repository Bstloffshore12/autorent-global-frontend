'use server'

import { type Errors } from '@/model/NetworkModel'
import CarModel, { type MakeData } from '@/model/CarModel'

type Return =
  | {
      success: true
      data: MakeData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getMakesAction = async (): Promise<Return> => {
  try {
    const response = await CarModel.getMakes()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getMakesAction: error })

    return {
      success: false,
      message: 'Unable to get makes',
      errors: { message: ['Unable to get makes'] },
    }
  }
}

export default getMakesAction
