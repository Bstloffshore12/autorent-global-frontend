'use server'

import WebformModel, {
  type Return,
  type PostCorporateLeasingProps,
} from '@/model/WebformModel'

const { errorMessage, postCorporateLeasing } = WebformModel

const corporateLeasingFormAction = async (
  data: PostCorporateLeasingProps
): Promise<Return> => {
  try {
    const response = await postCorporateLeasing(data)
    const { success, message } = response

    if (success) {
      await WebformModel.form.setCookieSubmit()
      return { success, message }
    }
    if (response.error) return { success, message, errors: response.error }
    if(response.message) return { success, message, errors: { message: [response.message] } }
    throw Error
  } catch (error) {
    console.error({ corporateLeasingFormAction: error })

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default corporateLeasingFormAction
