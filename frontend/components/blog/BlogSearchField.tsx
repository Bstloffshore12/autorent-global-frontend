'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { classnames } from '@/futils'
import { type BlogData } from '@/model/BlogModel'
import Blogwidget from '@/components/blog/BlogWidget'
import InputField from '@/components/common/InputField'

interface BlogSearchFieldProps {
  blogs: BlogData[]
  isPending?: boolean
}

const BlogSearchField = ({ blogs, isPending }: BlogSearchFieldProps) => {
  const t = useTranslations()

  const [search, setSearch] = useState('')
  const [isInSearch, setIsInSearch] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)

  const onBlur = () => {
    setTimeout(() => {
      setInputFocused(false)
    }, 100)
  }

  useEffect(() => {
    const activeBlogs = blogs.filter((blog) =>
      (
        blog.title.toLowerCase() ||
        blog.subtitle?.toLowerCase() ||
        blog.summary.toLowerCase()
      ).includes(search.toLowerCase())
    )

    setIsInSearch(!!activeBlogs.length)
  }, [search, blogs])

  return (
    <div className="relative">
      <InputField
        onBlur={onBlur}
        name="blogSearch"
        onChange={setSearch}
        isDisabled={isPending}
        aria-label="Blog Search"
        placeholder={`${t('Search')}...`}
        onFocus={() => setInputFocused(true)}
      />

      <div
        data-lenis-prevent
        className={classnames(
          'absolute mt-1 space-y-4 overflow-auto rounded-2xl bg-white px-4 shadow-lg shadow-primary/20 duration-300',
          inputFocused && isInSearch ? 'max-h-[420px] py-4' : 'max-h-0 py-0'
        )}
      >
        {blogs.map((blog) => {
          const inSearch = (
            blog.title.toLowerCase() ||
            blog.subtitle?.toLowerCase() ||
            blog.summary.toLowerCase()
          ).includes(search.toLowerCase())

          return (
            <Blogwidget
              key={blog.id}
              className={inSearch ? 'h-[84px]' : '!mt-0 h-0'}
              {...blog}
            />
          )
        })}
      </div>
    </div>
  )
}

export default BlogSearchField
