'use server'

import { type Errors } from '@/model/NetworkModel'
import AuthModel, { type GetOtpProps } from '@/model/AuthModel'

type Return =
  | {
      success: true
      message: string
      data: { pin: string }
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getOtpAction = async (data: GetOtpProps): Promise<Return> => {
  try {
    const response = await AuthModel.getOtp(data)
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: { ...response.error, error: [message] } }
  } catch (error) {
    console.error({ getOtpAction: error })

    return {
      success: false,
      message: 'Unable to get OTP',
      errors: { server: ['Unable to get OTP'] },
    }
  }
}

export default getOtpAction
