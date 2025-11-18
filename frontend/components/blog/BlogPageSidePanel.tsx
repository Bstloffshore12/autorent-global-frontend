'use client'

import { useTranslations } from 'next-intl'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import { classnames } from '@/futils'
import useTopOffset from '@/hooks/useTopOffset'
import { type BlogData } from '@/model/BlogModel'
import SectionHeading from '@/components/common/SectionHeading'
import BlogSearchField from '@/components/blog/BlogSearchField'
import NewsletterForm from '@/components/webforms/NewsletterForm'

const Heading = ({ text }: { text: string }) => (
  <SectionHeading className="!text-xl font-medium">{text}</SectionHeading>
)

type BlogPageSidePanelProps = {
  blogs: BlogData[]
}

const BlogPageSidePanel = ({ blogs }: BlogPageSidePanelProps) => {
  const t = useTranslations()
  const tw = useTranslations('webform')

  const { offset } = useTopOffset()

  return (
    <aside>
      <div className="sticky top-0 mx-auto w-full max-w-8xl space-y-6 border-t py-3 font-light text-neutral-700 md:border-t-0 md:px-6 md:pt-10">
        <div
          className={classnames(
            'z-10 space-y-4 duration-500',
            offset > 100 && 'md:mt-[40px]'
          )}
        >
          <Heading text={t('Search Blog')} />
          <BlogSearchField blogs={blogs} />
        </div>

        <div className="space-y-2">
          <Heading text={t('Trending Blogs')} />
          <ul className="max-h-64 overflow-hidden font-normal duration-300">
            {blogs.map((blog) => (
              <li key={blog.id}>
                <Link
                  href={routes.blogDetail(blog.slug)}
                  className="block border-b border-neutral-200 py-3 duration-300 hover:border-primary/30 hover:text-primary"
                >
                  <span className="line-clamp-1">{blog.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <Heading text={tw('newsletterTitle')} />
          <p>{tw('newsletterDescription')}</p>
          <NewsletterForm />
        </div>
      </div>
    </aside>
  )
}

export default BlogPageSidePanel
