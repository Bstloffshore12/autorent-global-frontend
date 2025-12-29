'use server'

import WebformModel, {
  type Return,
  type PostEnquiryProps,
} from '@/model/WebformModel'

const { errorMessage, postEnquiry } = WebformModel

const carEnquiryFormAction = async (
  data: PostEnquiryProps
): Promise<Return> => {
  try {
    const response = await postEnquiry(data)
    const { success, message } = response

    if (success) {
      await WebformModel.form.setCookieSubmit()
      return { success, message }
    }
    if (response.error) return { success, message, errors: response.error }
    if (response.message)
      return { success, message, errors: { message: [response.message] } }
    throw Error
  } catch (error) {
    console.error({ carEnquiryFormAction: error })

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default carEnquiryFormAction
