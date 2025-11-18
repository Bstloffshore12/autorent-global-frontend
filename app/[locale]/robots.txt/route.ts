import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { generateRobotsTxt } from '@/i18n/robotsTxtGenerator'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ locale: string }> }
) {
  const params = await context.params
  const { locale } = await params

  const supportedLocales = ['sa', 'ae', 'om', 'bh']

  if (!supportedLocales.includes(locale)) {
    return new NextResponse('Invalid locale', { status: 404 })
  }

  const robotsTxtContent = generateRobotsTxt(locale)

  return new NextResponse(robotsTxtContent, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
