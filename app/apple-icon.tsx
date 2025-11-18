import { ImageResponse } from 'next/og'

import Favicon from '@/icons/Favicon'

// Route segment config
export const contentType = 'image/png'

export function generateImageMetadata() {
  return [
    {
      id: 'apple-icon-57x57.png',
      contentType: 'image/png',
      size: { width: 57, height: 57 },
    },
    {
      id: 'apple-icon-60x60.png',
      contentType: 'image/png',
      size: { width: 60, height: 60 },
    },
    {
      id: 'apple-icon-72x72.png',
      contentType: 'image/png',
      size: { width: 72, height: 72 },
    },
    {
      id: 'apple-icon-76x76.png',
      contentType: 'image/png',
      size: { width: 76, height: 76 },
    },
    {
      id: 'apple-icon-114x114.png',
      contentType: 'image/png',
      size: { width: 114, height: 114 },
    },
    {
      id: 'apple-icon-120x120.png',
      contentType: 'image/png',
      size: { width: 120, height: 120 },
    },
    {
      id: 'apple-icon-144x144.png',
      contentType: 'image/png',
      size: { width: 144, height: 144 },
    },
    {
      id: 'apple-icon-152x152.png',
      contentType: 'image/png',
      size: { width: 152, height: 152 },
    },
    {
      id: 'apple-icon-180x180.png',
      contentType: 'image/png',
      size: { width: 180, height: 180 },
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
          background: 'black',
        }}
      >
        <Favicon size={size} />
      </div>
    ),
    { width: size, height: size }
  )
}
