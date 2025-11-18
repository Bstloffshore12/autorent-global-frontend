'use server'

import { type Errors } from '@/model/NetworkModel'
import CarModel, { type DoorData } from '@/model/CarModel'

type Return =
  | {
      success: true
      data: DoorData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getDoorsAction = async (): Promise<Return> => {
  try {
    const response = await CarModel.getDoors()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getDoorsAction: error })

    return {
      success: false,
      message: 'Unable to get Doors',
      errors: { message: ['Unable to get Doors'] },
    }
  }
}

export default getDoorsAction
