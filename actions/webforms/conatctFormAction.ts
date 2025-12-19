'use server'

import WebformModel, {
  type Return,
  type PostContactProps,
} from '@/model/WebformModel'

const { errorMessage, postContact } = WebformModel

const conatctFormAction = async (data: PostContactProps): Promise<Return> => {
  try {
    const response = await postContact(data)
    const { success, message } = response

    if (success) {
      await WebformModel.form.setCookieSubmit()
      return { success, message }
    }
    if (response.error) return { success, message, errors: response.error }
    if(response.message) return { success, message, errors: { message: [response.message] } }
    throw Error
  } catch (error) {
    console.error({ conatctFormAction: error })

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default conatctFormAction
