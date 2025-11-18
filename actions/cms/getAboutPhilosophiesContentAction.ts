'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type AboutPhilosophiesData } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: AboutPhilosophiesData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getAboutPhilosophiesContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getAboutPhilosophiesContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getAboutPhilosophiesContentAction: error })

    return {
      success: false,
      message: 'Unable to get about philosophies',
      errors: { message: ['Unable to get about philosophies'] },
    }
  }
}

export default getAboutPhilosophiesContentAction
