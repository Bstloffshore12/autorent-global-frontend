'use client'

import { useEffect } from 'react'

import routes from '@/routes'
import { classnames } from '@/futils'
import { usePathname } from '@/i18n/routing'
import { useAppStore } from '@/store/provider'

type HeaderProps = {
  isLoggedIn: boolean
  children: React.ReactNode
}

const Header = ({ children, isLoggedIn }: HeaderProps) => {
  const pathname = usePathname()
  const {
    setAuth: { setIsLoggedIn },
  } = useAppStore((state) => state)

  useEffect(() => {
    setIsLoggedIn(isLoggedIn)
  }, [setIsLoggedIn, isLoggedIn])

  return (
    <>
      <div
        className={classnames(
          pathname !== routes.home &&
            pathname !== '/summer-offers' &&
            'h-[72px] md:h-[89px]'
        )}
      />
      <header
        className={classnames(
          'fixed left-0 top-0 z-40 mx-auto w-full border-primary shadow-lg shadow-primary/5 backdrop-blur-sm'
        )}
      >
        {children}
      </header>
    </>
  )
}

export default Header
