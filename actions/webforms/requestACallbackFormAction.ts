'use server'

import WebformModel, {
  type Return,
  type PostRequestACallbackProps,
} from '@/model/WebformModel'

const { errorMessage, postRequestACallback } = WebformModel

const requestACallbackFormAction = async (
  data: PostRequestACallbackProps
): Promise<Return> => {
  try {
    const response = await postRequestACallback(data)
    const { success, message } = response

    if (success) {
      await WebformModel.form.setCookieSubmit()
      return { success, message }
    }
    if (response.error) return { success, message, errors: response.error }
    throw Error
  } catch (error) {
    console.error({ requestACallbackFormAction: error })

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default requestACallbackFormAction
