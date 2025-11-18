import Image from 'next/image'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Card from '@/components/common/Card'
import { SpecialOffer } from '@/model/CmsModel'
import Container from '@/components/common/Container'
import LinkButton from '@/components/common/LinkButton'

export const metadata: Metadata = {
  title: 'Special Offers | AutoRent',
}

interface SpecialOfferListingProps {
  stateName?: string
  specialOffers: SpecialOffer[]
}

const SpecialOfferListing = async ({
  specialOffers,
  stateName = '',
}: SpecialOfferListingProps) => {
  const t = await getTranslations()

  return (
    <Container className="space-y-6">
      {specialOffers.length ? (
        specialOffers.map(({ state_id, state_name, offers }) => (
          <div key={state_id} className="space-y-6">
            {!stateName && (
              <h2 className="max-w-fit border-b-2 border-black text-2xl font-medium">
                {state_name}
              </h2>
            )}

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {offers?.map(({ id, subtitle, title, media, slug }) => (
                <Card
                  key={id}
                  className="relative flex flex-col shadow-lg shadow-primary/10"
                >
                  <div className="absolute right-0 top-0 z-20 h-10 w-16">
                    <div className="absolute right-[-50px] top-6 w-[170px] rotate-45 transform bg-gradient-to-r from-primary to-secondary py-1 text-center text-sm font-medium text-white shadow-md shadow-black/40">
                      {t('Special Offer')}
                    </div>
                  </div>
                  <Link href={`${routes.specialOffer(state_name, slug)}`}>
                    <Image
                      width={600}
                      height={600}
                      alt={media?.alt || title}
                      title={media?.title || title}
                      className="mx-auto mb-4 w-full rounded-lg object-contain duration-300"
                      src={
                        media?.path
                          ? `${routes.bucketUrl}${media?.path}`
                          : '/assets/images/placeholder.svg'
                      }
                    />
                  </Link>
                  <h3 className="text-base font-medium">{title}</h3>
                  <p className="mb-4"> {subtitle}</p>

                  <div className="mt-auto flex gap-2">
                    {/* Default Discover button */}
                    <LinkButton
                      size="small"
                      theme="primary"
                      className="flex-1"
                      href={routes.specialOffer(state_name, slug)}
                    >
                      {t('Discover')}
                    </LinkButton>

                    {/* Conditional Explore button */}
                    {slug ===
                      'drive-more-pay-less-with-our-pay-as-u-drive-monthly-car-rental-offer' && (
                      <LinkButton
                        size="small"
                        theme="secondary"
                        className="flex-1"
                        href="/monthly-lease-cars"
                      >
                        {t('Explore')}
                      </LinkButton>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="py-20 text-center">
          <p className="mx-auto w-fit rounded-lg border border-dotted px-3 py-1 text-xl font-light text-slate-600">
            {t('No offer available')}
          </p>
        </div>
      )}
    </Container>
  )
}

export default SpecialOfferListing
