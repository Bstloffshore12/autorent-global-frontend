import { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'

import { usePathname, useRouter } from '@/i18n/routing'

interface SetQueryStringsProps {
  [key: string]: string[] | number[]
}

const useQueryString = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const resetQueryString = useCallback(() => {
    router.push(pathname)
  }, [pathname, router])

  const setQueryString = useCallback(
    (data: { name: string; value: string | number }[]) => {
      const params = new URLSearchParams(searchParams.toString())

      data.forEach(({ name, value }) => {
        if (value) params.set(name, value.toString())
        else params.delete(name)
      })

      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, router]
  )

  const setQueryStrings = useCallback(
    (data: SetQueryStringsProps) => {
      const formData = new FormData()

      Object.keys(data).forEach((key: keyof SetQueryStringsProps) => {
        const values = data[key]

        if (values.length)
          values.forEach((v: any) => formData.append(`${key}[]`, v))
      })

      const queryString = new URLSearchParams(formData as any).toString()
      router.push(`${pathname}?${queryString}`)
    },
    [pathname, router]
  )

  const getQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())

      return params.get(name)
    },
    [searchParams]
  )

  const getAllQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())

      return params.getAll(name)
    },
    [searchParams]
  )

  const removeQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)

      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, router]
  )

  return {
    setQueryString,
    getQueryString,
    setQueryStrings,
    resetQueryString,
    removeQueryString,
    getAllQueryString,
  }
}

export default useQueryString
