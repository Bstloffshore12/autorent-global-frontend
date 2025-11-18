'use client'

import Image from 'next/image'

import routes from '@/routes'
import { classnames } from '@/futils'
import { Link } from '@/i18n/routing'
import { type BlogData } from '@/model/BlogModel'

interface BlogwidgetProps extends BlogData {
  className?: string
}

const Blogwidget = ({
  slug,
  media,
  title,
  summary,
  subtitle,
  className,
  created_at: createdAt,
}: BlogwidgetProps) => {
  const date = new Date(createdAt)

  const blogCreateDate = date.toLocaleDateString(undefined, {
    day: '2-digit',
    year: '2-digit',
    month: '2-digit',
  })

  return (
    <div
      className={classnames(
        'group space-y-2 overflow-hidden duration-300',
        className
      )}
    >
      <Link href={routes.blogDetail(slug)}>
        <span className="grid grid-cols-[84px_auto] gap-4">
          <span className="relative block h-[84px] overflow-hidden rounded-xl after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:z-10 after:bg-black/20 after:opacity-0 after:duration-300 group-hover:after:opacity-100">
            <Image
              width={100}
              height={100}
              alt={media.alt}
              title={media.title}
              className="h-full w-full rounded-2xl object-cover duration-300 group-hover:scale-110"
              src={
                media?.path
                  ? `${routes.bucketUrlClient}${media?.path}`
                  : '/assets/images/placeholder.svg'
              }
            />
          </span>
          <span>
            <span className="flex items-center gap-2 text-sm">
              <span className="text-xs font-medium">{blogCreateDate}</span>
              <span className="block h-4 border-r border-neutral-200" />
              <span className="line-clamp-1 font-medium text-primary">
                {subtitle}
              </span>
            </span>
            <h3 className="line-clamp-1 font-medium duration-300 hover:text-primary">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm">{summary}</p>
          </span>
        </span>
      </Link>
    </div>
  )
}

export default Blogwidget
