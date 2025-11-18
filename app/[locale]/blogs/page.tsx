import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import getBlogsAction from '@/actions/blog/getBlogsAction'
import BlogListCard from '@/components/common/BlogListCard'
import getBlogsPageContentAction from '@/actions/pages/getBlogsPageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getBlogsPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const BlogPage = async () => {
  const [t, blogsRes, pageRes] = await Promise.all([
    getTranslations(),
    getBlogsAction(),
    getBlogsPageContentAction(),
  ])

  if (
    pageRes.success &&
    pageRes.data &&
    blogsRes.success &&
    blogsRes.data.length
  )
    return (
      <>
        <Breadcrumb path={[{ name: t('Blogs') }]} />

        <main className="mb-8 mt-2 md:mt-8">
          <Container className="space-y-6">
            <PageHeading>{pageRes.data.title}</PageHeading>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogsRes.data.map((blog) => (
                <BlogListCard key={blog.id} {...blog} />
              ))}
            </div>
          </Container>
        </main>
      </>
    )

  return notFound()
}

export default BlogPage
