import type { MetadataRoute } from 'next'

import routes from '@/routes'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/profile/',
    },
    sitemap: `${routes.baseUrl}/sitemap.xml`,
  }
}
