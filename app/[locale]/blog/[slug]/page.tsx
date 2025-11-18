import Image from 'next/image'
import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import getBlogsAction from '@/actions/blog/getBlogsAction'
import SectionHeading from '@/components/common/SectionHeading'
import BlogPageSidePanel from '@/components/blog/BlogPageSidePanel'
import getBlogDetailAction from '@/actions/blog/getBlogDetailAction'

// seo meta
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  metaData: Promise<ResolvedMetadata>
) {
  const { slug } = await params
  const parentMeta = await metaData
  const res = await getBlogDetailAction({ slug })

  return CmsModel.setSeoMeta(res, parentMeta)
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { slug } = await params
  const [t, blogRes, blogsRes] = await Promise.all([
    getTranslations(),
    getBlogDetailAction({ slug }),
    getBlogsAction(),
  ])

  if (blogRes.success && blogRes.data) {
    const blog = blogRes.data
    const blogs = blogsRes.success ? blogsRes.data : []
    const date = new Date(blog.article_date)

    const createDate = date.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    return (
      <>
        <Breadcrumb
          path={[
            { name: t('Blogs'), link: routes.blogs },
            { name: blog.title },
          ]}
        />

        <main className="mb-8">
          <Container className="grid duration-300 md:grid-cols-[auto_300px] lg:grid-cols-[auto_400px]">
            <section className="mt-2 space-y-2 md:mt-8 md:space-y-6">
              <PageHeading>{blog.title}</PageHeading>

              <span className="flex items-center gap-2 text-primary">
                <FaRegCalendarAlt />
                <span className="font-normal">{createDate}</span>
              </span>

              <Image
                width={1000}
                height={700}
                alt={blog.media?.alt || blog.title}
                title={blog.media?.title || blog.title}
                src={
                  blog.media?.path
                    ? `${routes.bucketUrl}${blog.media?.path}`
                    : '/assets/images/placeholder.svg'
                }
                className="w-full rounded-2xl"
              />

              <div className="space-y-4">
                <SectionHeading className="!text-2xl">
                  {blog.subtitle}
                </SectionHeading>

                {blog.content && (
                  <div
                    className="blog-post"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                )}
              </div>
            </section>

            <BlogPageSidePanel blogs={blogs} />
          </Container>
        </main>
      </>
    )
  }

  return notFound()
}

export default BlogDetailPage
