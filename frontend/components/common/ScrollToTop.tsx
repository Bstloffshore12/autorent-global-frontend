'use client'

import { useEffect, useState } from 'react'
import { FaArrowUpLong } from 'react-icons/fa6'

import { classnames } from '@/futils'
import useTopOffset from '@/hooks/useTopOffset'

const ScrollToTop = () => {
  const { scrollToTop } = useTopOffset()

  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollPercent(percent)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={classnames(
        'fixed bottom-8 right-12 z-50 flex size-12 cursor-pointer items-center justify-center rounded-full bg-primary text-lg text-primary-light shadow-lg shadow-primary/20 duration-300',
        scrollPercent > 5 ? 'scale-100' : 'scale-0'
      )}
    >
      <FaArrowUpLong />
    </button>
  )
}

export default ScrollToTop
