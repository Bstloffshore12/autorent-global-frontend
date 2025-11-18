import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AutoRent',
    short_name: 'AutoRent',
    theme_color: '#f2f6fa',
    background_color: '#fae9ed',
    display: 'standalone',
    orientation: 'portrait',
    scope: '/',
    start_url: '/',

    icons: [
      {
        src: '/assets/images/favicon.svg',
        sizes: '150x150',
        type: 'image/svg',
        purpose: 'maskable',
      },
      {
        src: '/assets/images/favicon.svg',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/assets/images/wide-screenshot.png',
        sizes: '2133x1200',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Application',
      },
      {
        src: '/assets/images/narrow-screenshot.png',
        sizes: '1170x2532',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Application',
      },
    ],
  }
}
