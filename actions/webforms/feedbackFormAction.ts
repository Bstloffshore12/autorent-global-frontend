'use server'

import WebformModel, {
  type Return,
  type PostFeedbackProps,
} from '@/model/WebformModel'

const { errorMessage, postFeedback } = WebformModel

const feedbackFormAction = async (data: PostFeedbackProps): Promise<Return> => {
  try {
    const response = await postFeedback(data)
    const { success, message } = response

    if (success) {
      await WebformModel.form.setCookieSubmit()
      return { success, message }
    }
    if (response.error) return { success, message, errors: response.error }
    if(response.message) return { success, message, errors: { message: [response.message] } }
    throw Error(message)
  } catch (error) {
    console.error({ feedbackFormAction: error })

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default feedbackFormAction
