'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type SpecialOffer } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: SpecialOffer[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getSpecialOffersByStateAction = async (
  stateName: string
): Promise<Return> => {
  try {
    const response = await CmsModel.getSpecialOffersContent()

    const { success, message } = response

    let data: SpecialOffer[] = []

    if (response.success) {
      const specialOffers = response.data as SpecialOffer[]

      data = specialOffers.filter(
        (offer) =>
          offer.state_name.toLowerCase() ===
          stateName.toLowerCase().replaceAll('-', ' ')
      )

      return { success, message, data }
    }

    return { success, message, errors: response.error }
  } catch (error) {
    console.error({ getSpecialOffersByStateAction: error })

    const errorMessage = 'Unable to get special offers'

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default getSpecialOffersByStateAction
