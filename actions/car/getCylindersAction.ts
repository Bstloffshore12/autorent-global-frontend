'use server'

import { type Errors } from '@/model/NetworkModel'
import CarModel, { type CylinderData } from '@/model/CarModel'

type Return =
  | {
      success: true
      data: CylinderData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getCylindersAction = async (): Promise<Return> => {
  try {
    const response = await CarModel.getCylinders()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getCylindersAction: error })

    return {
      success: false,
      message: 'Unable to get cylinders',
      errors: { message: ['Unable to get cylinders'] },
    }
  }
}

export default getCylindersAction
