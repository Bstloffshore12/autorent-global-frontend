'use server'

import { type Errors } from '@/model/NetworkModel'
import UserModel, { type UserData } from '@/model/UserModel'

type Return =
  | {
      success: true
      data: UserData
      message: string
    }
  | {
      errors: Errors
      status: number
      success: false
      message: string
    }

const getProfileAction = async (): Promise<Return> => {
  try {
    const response = await UserModel.getProfile()
    const { success, message, status } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error, status }
  } catch (error) {
    console.error({ getProfileAction: error })

    return {
      status: 500,
      success: false,
      message: 'Unable to get user profile',
      errors: { message: ['Unable to get user profile'] },
    }
  }
}

export default getProfileAction
