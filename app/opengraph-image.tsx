import { ImageResponse } from 'next/og'

import Favicon from '@/icons/Favicon'

// Image metadata
export const alt = 'AutoRent'
export const size = {
  width: 1200,
  height: 630,
}
export const card = 'summary'

export const contentType = 'image/png'

// Image generation
export default async function Image() {
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
        <Favicon />
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
