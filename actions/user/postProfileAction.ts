'use server'

import { type Errors } from '@/model/NetworkModel'
import UserModel, { type PostProfileProps } from '@/model/UserModel'

type Return =
  | {
      success: true
      message: string
    }
  | {
      success: false
      message: string
      errors: Errors
    }

const postProfileAction = async (
  profile: PostProfileProps
): Promise<Return> => {
  try {
    const response = await UserModel.postProfile(profile)
    const { success, message } = response

    return success
      ? { success, message }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ postProfileAction: error })

    return {
      success: false,
      message: 'Unable to post user profile',
      errors: { message: ['Unable to post user profile'] },
    }
  }
}

export default postProfileAction
