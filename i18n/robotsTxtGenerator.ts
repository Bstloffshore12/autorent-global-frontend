const baseUrls: Record<string, string> = {
  sa: 'https://autorent-me.com/sa',
  ae: 'https://autorent-me.com/ae',
  om: 'https://autorent-me.com/om',
  bh: 'https://autorent-me.com/bh',
}

export function generateRobotsTxt(locale: string): string {
  const baseUrl = baseUrls[locale] || 'https://autorent-me.com'
  return [
    'User-agent: *',
    'Disallow: ',
    'Disallow: /cgi-bin/',
    `Sitemap: ${baseUrl}/sitemap.xml`,
  ].join('\n')
}
