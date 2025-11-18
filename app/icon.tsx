import { ImageResponse } from 'next/og'

import Favicon from '@/icons/Favicon'

export const contentType = 'image/png'

export function generateImageMetadata() {
  return [
    // android
    {
      id: 'android-icon-192x192.png',
      contentType: 'image/png',
      size: { width: 192, height: 192 },
    },
    // favicon
    {
      id: 'favicon-32x32.png',
      contentType: 'image/png',
      size: { width: 32, height: 32 },
    },
    {
      id: 'favicon-96x96.png',
      contentType: 'image/png',
      size: { width: 96, height: 96 },
    },
    {
      id: 'favicon-16x16.png',
      contentType: 'image/png',
      size: { width: 16, height: 16 },
    },
  ]
}

// Image generation
export default function Icon({ id }: { id: string }) {
  const size = parseInt(id.match(/\d+/g)?.toString() || '32', 10)
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Favicon size={size} />
      </div>
    ),
    { width: size, height: size }
  )
}
