'use server'

import WebformModel, {
  type Return,
  type PostRoadSideAssistanceProps,
} from '@/model/WebformModel'

const { errorMessage, postRoadSideAssistance } = WebformModel

const roadSideAssistanceFormAction = async (
  data: PostRoadSideAssistanceProps
): Promise<Return> => {
  try {
    const response = await postRoadSideAssistance(data)
    const { success, message } = response

    if (success) {
      await WebformModel.form.setCookieSubmit()
      return { success, message }
    }
    if (response.error) return { success, message, errors: response.error }
    throw Error
  } catch (error) {
    console.error({ roadSideAssistanceFormAction: error })

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default roadSideAssistanceFormAction
