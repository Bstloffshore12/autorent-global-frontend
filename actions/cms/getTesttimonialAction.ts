'use server'

import { Errors } from '@/model/NetworkModel'
import CmsModel, { type Testimonial } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: Testimonial[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getTesttimonialAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getTestimonialContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getTesttimonialAction: error })

    return {
      success: false,
      message: 'Unable to get customer reviews',
      errors: { message: ['Unable to get customer reviews'] },
    }
  }
}

export default getTesttimonialAction
