'use server'

import { type Errors } from '@/model/NetworkModel'
import AuthModel, { type ResetPasswordProps } from '@/model/AuthModel'

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

const resetPasswordAction = async (
  data: ResetPasswordProps
): Promise<Return> => {
  try {
    const response = await AuthModel.resetPassword(data)

    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ resetPasswordAction: error })

    return {
      success: false,
      message: 'Unable to reset password',
      errors: { server: ['Unable to reset password'] },
    }
  }
}

export default resetPasswordAction
