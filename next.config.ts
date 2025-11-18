import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    serverActions: {
      allowedOrigins: [
        'secure.ccavenue.ae',
        'unifiedpg.nbo.om',
        'secure.clickpay.com.sa',
        'credimax.com',
      ],
      bodySizeLimit: '20mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'autobackend.servicemytaxi.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'api.autorent-me.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'admin-staging.autorent-me.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'autobackend.autorent-me.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
