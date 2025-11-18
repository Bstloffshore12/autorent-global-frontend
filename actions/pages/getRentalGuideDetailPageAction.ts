'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type CmsContent } from '@/model/CmsModel'

type Return =
  | {
      success: true
      message: string
      data: CmsContent | null
    }
  | {
      errors: Errors
      success: false
      message: string
    }

interface getRentalGuideDetailPageActionProps {
  slug: string
}

const getRentalGuideDetailPageAction = async ({
  slug,
}: getRentalGuideDetailPageActionProps): Promise<Return> => {
  try {
    const response = await CmsModel.getRentalGuideDetailPageContent(slug)
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getRentalGuideDetailPageAction: error })

    return {
      success: false,
      message: 'Unable to get rental guide',
      errors: { message: ['Unable to get rental guide'] },
    }
  }
}

export default getRentalGuideDetailPageAction
