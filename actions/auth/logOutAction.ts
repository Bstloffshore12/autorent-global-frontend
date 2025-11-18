'use server'

import AuthModel from '@/model/AuthModel'
import { type Errors } from '@/model/NetworkModel'

type Return =
  | {
      success: true
      message: string
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const { logOut, deleteSession } = AuthModel

const logOutAction = async (): Promise<Return> => {
  try {
    await logOut()

    deleteSession()
    return { success: true, message: 'Logged Out' }
  } catch (error) {
    console.error({ logOutAction: error })

    return {
      success: false,
      message: 'Unable to log out',
      errors: { server: ['Unable to log out'] },
    }
  }
}

export default logOutAction
