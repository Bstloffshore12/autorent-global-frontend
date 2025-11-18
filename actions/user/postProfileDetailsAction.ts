'use server'

import { type Errors } from '@/model/NetworkModel'
import UserModel, { type PostProfileDetailsProps } from '@/model/UserModel'

type Return =
  | {
      success: true
      message: string
    }
  | {
      errors: Errors
      success: false
      message: string
    }

type postProfileDetailsActionProps = {
  files: FormData
  fields: PostProfileDetailsProps
}

const postProfileDetailsAction = async ({
  fields,
  files,
}: postProfileDetailsActionProps): Promise<Return> => {
  try {
    const formData = files

    Object.keys(fields).map((key) => {
      const value = fields[key as keyof PostProfileDetailsProps] || ''
      formData.append(key, value)
    })

    const response = await UserModel.postProfileDetails(formData)
    const { success, message } = response

    return success
      ? { success, message }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ postProfileDetailsAction: error })

    return {
      success: false,
      message: 'Unable to post user profile details',
      errors: { message: ['Unable to post user profile details'] },
    }
  }
}

export default postProfileDetailsAction
