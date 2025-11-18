'use server'

import { type Errors } from '@/model/NetworkModel'
import MonthlyLeaseModel, {
  type MonthlyLeaseCarData,
  type MonthlyLeaseCarDetail,
} from '@/model/MonthlyLeaseModel'

/* ---------- LIST OF MONTHLY LEASE CARS ---------- */
type GetMonthlyLeaseCarsReturn =
  | {
      success: true
      message: string
      data: MonthlyLeaseCarData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getMonthlyLeaseCarsAction =
  async (): Promise<GetMonthlyLeaseCarsReturn> => {
    try {
      const response = await MonthlyLeaseModel.getMonthlyLeaseCars()
      const { success, message } = response

      return success
        ? { success, message, data: response.data }
        : { success, message, errors: response.errors }
    } catch (error) {
      console.error({ getMonthlyLeaseCarsAction: error })
      return {
        success: false,
        message: 'Unable to fetch monthly lease cars',
        errors: { message: ['Unable to fetch monthly lease cars'] },
      }
    }
  }

/* ---------- MONTHLY LEASE CAR DETAIL ---------- */
type GetMonthlyLeaseCarDetailReturn =
  | {
      success: true
      message: string
      data: MonthlyLeaseCarDetail
    }
  | {
      errors: Errors
      success: false
      message: string
    }

type GetMonthlyLeaseCarDetailActionProps = {
  slug: string
}

const getMonthlyLeaseCarDetailAction = async ({
  slug,
}: GetMonthlyLeaseCarDetailActionProps): Promise<GetMonthlyLeaseCarDetailReturn> => {
  try {
    const response = await MonthlyLeaseModel.getMonthlyLeaseCarDetail(slug)
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.errors }
  } catch (error) {
    console.error({ getMonthlyLeaseCarDetailAction: error })
    return {
      success: false,
      message: 'Unable to fetch monthly lease car detail',
      errors: { message: ['Unable to fetch monthly lease car detail'] },
    }
  }
}

export { getMonthlyLeaseCarsAction, getMonthlyLeaseCarDetailAction }
