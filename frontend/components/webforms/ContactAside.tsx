import { type ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'

import LocationList from '@/components/LocationList'
import SocialLInkBlocks from '@/components/SocialLInkBlocks'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'
import getOfficeLocationsContentAction from '@/actions/cms/getOfficeLocationsContentAction'

const ContactAside = async ({ children }: { children?: ReactNode }) => {
  const t = await getTranslations()

  const [res, headingRes] = await Promise.all([
    getOfficeLocationsContentAction(),
    getCustomContentAction('contact-page-aside'),
  ])

  const heading = (headingRes.success && headingRes.data?.title) || ''
  const content = (headingRes.success && headingRes.data?.content) || ''

  if (res.success && res.data) {
    const { data } = res

    return (
      <aside className="h-min w-full space-y-6 rounded-2xl border border-neutral-100 p-6 shadow-lg shadow-primary/20">
        {children ? (
          children
        ) : (
          <div className="space-y-2 text-sm font-normal">
            <h2 className="text-3xl font-medium">{heading}</h2>
            <div
              className="space-y-2"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}

        <LocationList locations={data} />

        <div className="space-y-2">
          <h3 className="text-lg font-medium">{t('Follow Us')}:</h3>
          <SocialLInkBlocks />
        </div>
      </aside>
    )
  }

  return null
}

export default ContactAside
