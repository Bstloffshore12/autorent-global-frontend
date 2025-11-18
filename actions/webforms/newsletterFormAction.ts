'use server'

import WebformModel, {
  type Return,
  type PostNewsletterProps,
} from '@/model/WebformModel'

const { errorMessage, postNewsletter } = WebformModel

const newsletterFormAction = async (
  data: PostNewsletterProps
): Promise<Return> => {
  try {
    const response = await postNewsletter(data)
    const { success, message } = response

    if (success) {
      await WebformModel.form.setCookieSubmit()
      return { success, message }
    }
    if (response.error) return { success, message, errors: response.error }
    throw Error
  } catch (error) {
    console.error({ newsletterFormAction: error })

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default newsletterFormAction
