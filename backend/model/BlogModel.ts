import NetworkModel from '@/model/NetworkModel'
import type { Metadata, Seo, SeoMeta } from '@/model/CmsModel'

interface Media {
  alt: string
  path: string
  title: string
}

export type BlogDetail = {
  seo?: Seo
  slug: string
  title: string
  content?: string
  seometa: SeoMeta[]
  created_at: string
  media: Media | null
  metadata?: Metadata[]
  state_id: string | null
  subtitle: string | null

  article_date: string
} | null

export type BlogData = {
  id: number
  media: Media
  slug: string
  title: string
  summary: string
  created_at: string
  article_date: string
  subtitle: string | null
}

class BlogModel {
  static getBlogs = () => NetworkModel.fetch(NetworkModel.apiRoutes.getBlogs)

  static getBlogDetail = async ({ slug }: { slug: string }) =>
    NetworkModel.fetch(NetworkModel.apiRoutes.getBlogDetail(slug))
}

export default BlogModel
