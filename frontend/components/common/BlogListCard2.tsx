'use client'

import Image from 'next/image'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Card from '@/components/common/Card'
import { type BlogData } from '@/model/BlogModel'

const BlogListCard2 = ({ slug, media, title, summary }: BlogData) => {
  return (
    <Card className="group relative mb-8 !p-0">
      <Link href={routes.blogDetail(slug)} className="block h-80">
        <Image
          width={390}
          height={250}
          alt={media.alt}
          title={media.title}
          className="h-56 w-full rounded-2xl object-cover duration-300 group-hover:scale-110"
          src={
            media?.path
              ? `${routes.bucketUrlClient}${media?.path}`
              : '/assets/images/placeholder.svg'
          }
        />

        <div className="absolute bottom-0 left-0 right-0 h-[130px] rounded-t-2xl bg-white p-4 duration-300 group-hover:h-4/5">
          <div className="h-full overflow-hidden rtl:text-right">
            <h3 className="text-lg font-medium text-primary duration-300">
              {title}
            </h3>

            <p>{summary}</p>
          </div>
        </div>
      </Link>
    </Card>
  )
}

export default BlogListCard2
