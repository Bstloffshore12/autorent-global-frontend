'use server'

import WebformModel, { type Return } from '@/model/WebformModel'

const { errorMessage, postCareer } = WebformModel

const careerFormAction = async (formData: FormData): Promise<Return> => {
  try {
    const response = await postCareer(formData)
    const { success, message } = response

    if (success) {
      await WebformModel.form.setCookieSubmit()
      return { success, message }
    }
    if (response.error) return { success, message, errors: response.error }
    throw Error
  } catch (error) {
    console.error({ careerFormAction: error })

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default careerFormAction
