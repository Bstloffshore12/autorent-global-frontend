'use server'

import { type Errors } from '@/model/NetworkModel'
import BlogModel, { type BlogData } from '@/model/BlogModel'

type Return =
  | {
      data: BlogData[]
      success: true
      message: string
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getBlogsAction = async (): Promise<Return> => {
  try {
    const response = await BlogModel.getBlogs()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getBlogsAction: error })

    return {
      success: false,
      message: 'Unable to get Blogs',
      errors: { message: ['Unable to get Blogs'] },
    }
  }
}

export default getBlogsAction
