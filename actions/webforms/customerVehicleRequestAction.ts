'use server'

import WebformModel, {
  type Return,
  type PostCustomerEnquiryProps,
} from '@/model/WebformModel'

const { errorMessage, postCustomerEnquiry } = WebformModel

const customerVehicleRequestAction = async (
  data: PostCustomerEnquiryProps
): Promise<Return> => {
  try {
    const response = await postCustomerEnquiry(data)
    const { success, message } = response

    if (success) {
      await WebformModel.form.setCookieSubmit()
      return { success, message }
    }

    if (response.error) {
      return { success, message, errors: response.error }
    }

    throw Error
  } catch (error) {
    console.error({ customerVehicleRequestAction: error })

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default customerVehicleRequestAction
