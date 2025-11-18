'use server'

import { type Errors } from '@/model/NetworkModel'
import BlogModel, { type BlogDetail } from '@/model/BlogModel'

type Return =
  | {
      success: true
      message: string
      data: BlogDetail | null
    }
  | {
      errors: Errors
      success: false
      message: string
    }

type GetBlogDetailActionProps = {
  slug: string
}

const getBlogDetailAction = async ({
  slug,
}: GetBlogDetailActionProps): Promise<Return> => {
  try {
    const response = await BlogModel.getBlogDetail({ slug })
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getBlogDetailAction: error })

    return {
      success: false,
      message: 'Unable to get blog detail',
      errors: { message: ['Unable to get blog detail'] },
    }
  }
}

export default getBlogDetailAction
