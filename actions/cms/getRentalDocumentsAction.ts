'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { RentalDocumentData } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: RentalDocumentData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getRentalDocumentsAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getRentalDocumentsContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getRentalDocumentsAction: error })

    return {
      success: false,
      message: 'Unable to get  rental Documents',
      errors: { message: ['Unable to get  rental Documents'] },
    }
  }
}

export default getRentalDocumentsAction
