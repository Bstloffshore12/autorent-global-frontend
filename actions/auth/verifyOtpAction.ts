'use server'

import { type Errors } from '@/model/NetworkModel'
import AuthModel, { type VerifyOtpProps } from '@/model/AuthModel'

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

const verifyOtpAction = async (data: VerifyOtpProps): Promise<Return> => {
  try {
    const response = await AuthModel.verifyOtp(data)
    const { success, message } = response
    // console.log({ response })

    return success
      ? { success, message, data: { pin: '' } }
      : { success, message, errors: response.error || { error: [message] } }
  } catch (error) {
    console.error({ verifyOtpAction: error })

    return {
      success: false,
      message: 'Unable to get OTP',
      errors: { server: ['Unable to get OTP'] },
    }
  }
}

export default verifyOtpAction
