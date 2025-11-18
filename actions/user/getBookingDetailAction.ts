'use server'

import { type Errors } from '@/model/NetworkModel'
import UserModel, { type BookingDetailData } from '@/model/UserModel'

type Return =
  | {
      success: true
      message: string
      data: BookingDetailData
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getBookingDetailAction = async (id: string): Promise<Return> => {
  try {
    const response = await UserModel.getBookingDetail(id)
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getBookingDetailAction: error })

    return {
      success: false,
      message: 'Unable to get booking Details',
      errors: { message: ['Unable to get booking Details'] },
    }
  }
}

export default getBookingDetailAction
