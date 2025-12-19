'use server'

import WebformModel, {
  type Return,
  type PostCarLeaseProps,
} from '@/model/WebformModel'

const { errorMessage, postCarLease } = WebformModel

const carLeaseFormAction = async (data: PostCarLeaseProps): Promise<Return> => {
  try {
    const response = await postCarLease(data)
    const { success, message } = response

    if (success) {
      await WebformModel.form.setCookieSubmit()
      return { success, message }
    }
    if (response.error) return { success, message, errors: response.error }
    if(response.message) return { success, message, errors: { message: [response.message] } }
    throw Error
  } catch (error) {
    console.error({ carLeaseFormAction: error })

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default carLeaseFormAction
