// app/loading.tsx
'use client'

import React from 'react'

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center space-x-1">
      <div className="h-3 w-3 animate-bounce rounded-full bg-red-500 [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 animate-bounce rounded-full bg-red-500 [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 animate-bounce rounded-full bg-red-500"></div>
    </div>
  )
}
