'use server'

import { Errors } from '@/model/NetworkModel'
import CmsModel, { type AboutTransparencyData } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: AboutTransparencyData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getAboutTransparencyContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getAboutTransparencyContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getAboutTransparencyContentAction: error })

    return {
      success: false,
      message: 'Unable to get why choose us',
      errors: { message: ['Unable to get why choose us'] },
    }
  }
}

export default getAboutTransparencyContentAction
