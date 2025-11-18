'use server'

import { type Errors } from '@/model/NetworkModel'
import AuthModel, { type SignUpProps } from '@/model/AuthModel'

type Return =
  | {
      success: true
      message: string
      data: {
        otp: string
        token: string
        expiresAt: string
      }
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const { signUp, createSession } = AuthModel

const signUpAction = async (data: SignUpProps): Promise<Return> => {
  try {
    const response = await signUp(data)
    const { success, message } = response

    if (success) {
      // const otp = response.data.pin
      // console.log({ otp })

      const token = response.data.plainTextToken
      const expiresAt = response.data.expires_at

      await createSession({ token, expiresAt })

      return {
        success,
        message,
        data: { token, expiresAt, otp: '' },
      }
    }
    return { success, message, errors: response.error }
  } catch (error) {
    console.error({ signUpAction: error })

    return {
      success: false,
      message: 'Unable to sign up',
      errors: { server: ['Unable to sign up'] },
    }
  }
}

export default signUpAction
