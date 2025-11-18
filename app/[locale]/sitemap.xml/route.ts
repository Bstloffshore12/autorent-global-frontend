import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import getBlogsAction from '@/actions/blog/getBlogsAction'
import getRentalGuidesAction from '@/actions/rentalGuide/getRentalGuidesAction'
import getRentalCarsAction from '@/actions/car/getRentalCarsAction'

interface SlugItem {
  slug: string
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ locale: string }> }
) {
  const params = await context.params
  const { locale } = await params

  const now = new Date().toISOString()
  const supportedLocales = ['sa', 'ae', 'om', 'bh']

  if (!supportedLocales.includes(locale)) {
    return new NextResponse('Invalid locale', { status: 404 })
  }

  const baseUrls: Record<string, string> = {
    sa: 'https://autorent-me.com/sa',
    ae: 'https://autorent-me.com/ae',
    om: 'https://autorent-me.com/om',
    bh: 'https://autorent-me.com/bh',
  }

  const staticPages: Record<string, { path: string; priority: string }[]> = {
    sa: [
      { path: '', priority: '1.0' },
      { path: '/about', priority: '0.9' },
      { path: '/rent-cars', priority: '0.9' },
      { path: '/lease-cars', priority: '0.8' },
      { path: '/corporate-leasing', priority: '0.8' },
      { path: '/contact', priority: '0.8' },
      { path: '/road-side-assistance', priority: '0.7' },
      { path: '/blogs', priority: '0.7' },
      { path: '/faqs', priority: '0.7' },
      { path: '/feedback', priority: '0.6' },
      { path: '/careers', priority: '0.6' },
      { path: '/rental-guides', priority: '0.8' },
      { path: '/terms-and-conditions', priority: '0.8' },
      { path: '/privacy-policy', priority: '0.8' },
    ],
    ae: [
      { path: '', priority: '1.0' },
      { path: '/about', priority: '0.9' },
      { path: '/rent-cars', priority: '0.9' },
      { path: '/lease-cars', priority: '0.8' },
      { path: '/corporate-leasing', priority: '0.8' },
      { path: '/contact', priority: '0.8' },
      { path: '/road-side-assistance', priority: '0.7' },
      { path: '/blogs', priority: '0.7' },
      { path: '/faqs', priority: '0.7' },
      { path: '/feedback', priority: '0.6' },
      { path: '/careers', priority: '0.6' },
      { path: '/rental-guides', priority: '0.8' },
      { path: '/terms-and-conditions', priority: '0.8' },
      { path: '/privacy-policy', priority: '0.8' },
    ],
    om: [
      { path: '', priority: '1.0' },
      { path: '/about', priority: '0.9' },
      { path: '/rent-cars', priority: '0.9' },
      { path: '/lease-cars', priority: '0.8' },
      { path: '/corporate-leasing', priority: '0.8' },
      { path: '/contact', priority: '0.8' },
      { path: '/road-side-assistance', priority: '0.7' },
      { path: '/blogs', priority: '0.7' },
      { path: '/faqs', priority: '0.7' },
      { path: '/feedback', priority: '0.6' },
      { path: '/careers', priority: '0.6' },
      { path: '/rental-guides', priority: '0.8' },
      { path: '/terms-and-conditions', priority: '0.8' },
      { path: '/privacy-policy', priority: '0.8' },
    ],
    bh: [
      { path: '', priority: '1.0' },
      { path: '/about', priority: '0.9' },
      { path: '/rent-cars', priority: '0.9' },
      { path: '/lease-cars', priority: '0.8' },
      { path: '/corporate-leasing', priority: '0.8' },
      { path: '/contact', priority: '0.8' },
      { path: '/road-side-assistance', priority: '0.7' },
      { path: '/blogs', priority: '0.7' },
      { path: '/faqs', priority: '0.7' },
      { path: '/feedback', priority: '0.6' },
      { path: '/careers', priority: '0.6' },
      { path: '/rental-guides', priority: '0.8' },
      { path: '/terms-and-conditions', priority: '0.8' },
      { path: '/privacy-policy', priority: '0.8' },
    ],
  }

  const baseUrl = baseUrls[locale]
  const staticPaths = staticPages[locale]

  let blogSlugs: string[] = []
  let guideSlugs: string[] = []
  let carSlugs: string[] = []

  try {
    const [blogRes, guideRes, carRes] = await Promise.all([
      getBlogsAction(),
      getRentalGuidesAction(),
      getRentalCarsAction({ perPage: '100' }),
    ])

    if (blogRes?.success && Array.isArray(blogRes.data)) {
      blogSlugs = blogRes.data.map((item: SlugItem) => item.slug)
    }

    if (guideRes?.success && Array.isArray(guideRes.data)) {
      guideSlugs = guideRes.data.map((item: SlugItem) => item.slug)
    }

    if (carRes?.success && Array.isArray(carRes.data.cars)) {
      carSlugs = carRes.data.cars.map((item: SlugItem) => item.slug)
    }
  } catch (error) {
    console.error(
      `[Sitemap] Error loading dynamic content for ${locale}`,
      error
    )
  }

  const dynamicPages = [
    ...blogSlugs.map((slug) => ({
      path: `/blog/${slug}`,
      priority: '0.6',
    })),
    ...guideSlugs.map((slug) => ({
      path: `/rental-guide/${slug}`,
      priority: '0.6',
    })),
    ...carSlugs.map((slug) => ({
      path: `/rent-car/${slug}`,
      priority: '0.7',
    })),
  ]

  const allPages = [...staticPaths, ...dynamicPages]

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    allPages
      .map(({ path, priority }) => {
        return `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${now}</lastmod>
    <priority>${priority}</priority>
  </url>`
      })
      .join('\n') +
    `\n</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
