'use client'

import Image from 'next/image'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Card from '@/components/common/Card'
import { type RentalGuideData } from '@/model/CmsModel'

const RentalGuideListCard = ({
  media,
  slug,
  title,
  content,
}: RentalGuideData) => {
  return (
    <Card className="group mb-8 h-96 overflow-hidden border-0 !p-0">
      <Image
        width={600}
        height={600}
        alt={media?.alt || title}
        title={media?.title || title}
        className="h-full w-full object-cover"
        src={
          media?.path
            ? `${routes.bucketUrlClient}${media?.path}`
            : '/assets/images/placeholder.svg'
        }
      />
      <Link
        href={routes.rentalGuideDetail(slug)}
        className="absolute top-3/4 h-full w-full space-y-2 bg-gradient-to-t from-primary/50 to-black/50 p-4 text-white duration-700 hover:backdrop-blur-sm group-hover:top-0 group-hover:rounded-2xl rtl:text-right"
        style={{ boxShadow: '0 0 5px 5px #00000080' }}
      >
        <h3 className="w-fit border-b border-white pb-2 font-semibold rtl:ms-auto">
          {title}
        </h3>
        {content && (
          <div
            className="blog-post text-sm font-normal text-white"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </Link>

      <div className="absolute bottom-0 z-30 h-8 w-full bg-gradient-to-t from-black" />
    </Card>
  )
}

export default RentalGuideListCard
