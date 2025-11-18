'use server'

import { type Errors } from '@/model/NetworkModel'
import CarModel, { type TransmissionData } from '@/model/CarModel'

type Return =
  | {
      success: true
      data: TransmissionData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getTransmissionsAction = async (): Promise<Return> => {
  try {
    const response = await CarModel.getTransmissions()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getTransmissionsAction: error })

    return {
      success: false,
      message: 'Unable to get transmissions',
      errors: { message: ['Unable to get transmissions'] },
    }
  }
}

export default getTransmissionsAction
