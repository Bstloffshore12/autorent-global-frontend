'use server'

import AuthModel from '@/model/AuthModel'
import { type Errors } from '@/model/NetworkModel'

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

const resendOtpAction = async (): Promise<Return> => {
  try {
    const response = await AuthModel.resendOtp()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: { ...response.error, Error: [message] } }
  } catch (error) {
    console.error({ resendOtpAction: error })

    const errorMessage = 'Unable to resend OTP'

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default resendOtpAction
