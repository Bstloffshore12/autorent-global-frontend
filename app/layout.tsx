import type { ReactNode } from 'react'

import './globals.css'

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => children

export default RootLayout
