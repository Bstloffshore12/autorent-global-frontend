'use server'

import { type Errors } from '@/model/NetworkModel'
import AuthModel, { type VerifyEmailProps } from '@/model/AuthModel'

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

const verifyEmailAction = async (data: VerifyEmailProps): Promise<Return> => {
  try {
    const response = await AuthModel.verifyEmail(data)

    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error || { error: [message] } }
  } catch (error) {
    console.error({ verifyEmailAction: error })

    const errorMessage = 'Unable to verify email'

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default verifyEmailAction
