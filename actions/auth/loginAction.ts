'use server'

import { type Errors } from '@/model/NetworkModel'
import AuthModel, { type LogInProps } from '@/model/AuthModel'

type Return =
  | {
      success: true
      message: string
      data: {
        token: string
        expiresAt: string
        isVerified: boolean
      }
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const { login, createSession } = AuthModel

const loginAction = async (data: LogInProps): Promise<Return> => {
  try {
    const response = await login(data)
    const { success, message } = response

    if (success) {
      const {
        verify: isVerified,
        expires_at: expiresAt,
        plainTextToken: token,
      } = response.data

      await createSession({ token, expiresAt })

      return { message, success: true, data: { token, expiresAt, isVerified } }
    }
    return { success: false, message, errors: response.error }
  } catch (error) {
    console.error({ loginAction: error })

    return {
      success: false,
      message: 'Unable to log in',
      errors: { server: ['Unable to log in'] },
    }
  }
}

export default loginAction
