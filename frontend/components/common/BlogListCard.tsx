'use client'

import Image from 'next/image'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Chip from '@/components/common/Chip'
import { type BlogData } from '@/model/BlogModel'

const BlogListCard = ({
  slug,
  media,
  title,
  summary,
  subtitle,
  article_date: articleDate,
}: BlogData) => {
  const date = new Date(articleDate)

  const blogCreateDate = date.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="group space-y-2">
      <Link
        href={routes.blogDetail(slug)}
        className="relative mb-6 block h-64 overflow-hidden rounded-2xl after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:z-10 after:bg-black/20 after:opacity-0 after:duration-300 group-hover:after:opacity-100"
      >
        <Chip className="absolute bottom-2 left-2 z-20 bg-white !text-primary">
          {blogCreateDate}
        </Chip>
        <Image
          width={410}
          height={270}
          alt={media.alt}
          title={media.title}
          className="h-full w-full rounded-2xl object-cover duration-300 group-hover:scale-110"
          src={
            media?.path
              ? `${routes.bucketUrlClient}${media?.path}`
              : '/assets/images/placeholder.svg'
          }
        />
      </Link>

      <div className="flex items-center gap-2 text-sm">
        <span className="block h-4 border-r border-neutral-200" />

        <p className="font-medium text-primary">{subtitle}</p>
      </div>
      <h3 className="text-2xl font-medium duration-300 hover:text-primary">
        <Link href={routes.blogDetail(slug)}>{title}</Link>
      </h3>
      <p>{summary}</p>
    </div>
  )
}

export default BlogListCard
