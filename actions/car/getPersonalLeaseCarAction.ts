'use server'

import { type Errors } from '@/model/NetworkModel'
import PersonalLeaseModel, {
  type PersonalLeaseCarData,
  type PersonalLeaseCarDetail,
} from '@/model/PersonalLeaseModel'

/* ---------- LIST OF PERSONAL LEASE CARS ---------- */
type GetPersonalLeaseCarsReturn =
  | {
      success: true
      message: string
      data: PersonalLeaseCarData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getPersonalLeaseCarsAction =
  async (): Promise<GetPersonalLeaseCarsReturn> => {
    try {
      const response = await PersonalLeaseModel.getPersonalLeaseCars()
      const { success, message } = response

      return success
        ? { success, message, data: response.data }
        : { success, message, errors: response.errors }
    } catch (error) {
      console.error({ getPersonalLeaseCarsAction: error })
      return {
        success: false,
        message: 'Unable to fetch personal lease cars',
        errors: { message: ['Unable to fetch personal lease cars'] },
      }
    }
  }

/* ---------- PERSONAL LEASE CAR DETAIL ---------- */
type GetPersonalLeaseCarDetailReturn =
  | {
      success: true
      message: string
      data: PersonalLeaseCarDetail
    }
  | {
      errors: Errors
      success: false
      message: string
    }

type GetPersonalLeaseCarDetailActionProps = {
  slug: string
}

const getPersonalLeaseCarDetailAction = async ({
  slug,
}: GetPersonalLeaseCarDetailActionProps): Promise<GetPersonalLeaseCarDetailReturn> => {
  try {
    const response = await PersonalLeaseModel.getPersonalLeaseCarDetail(slug)
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.errors }
  } catch (error) {
    console.error({ getPersonalLeaseCarDetailAction: error })
    return {
      success: false,
      message: 'Unable to fetch personal lease car detail',
      errors: { message: ['Unable to fetch personal lease car detail'] },
    }
  }
}

export { getPersonalLeaseCarsAction, getPersonalLeaseCarDetailAction }
