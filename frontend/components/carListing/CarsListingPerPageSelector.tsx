'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { type Key } from 'react-aria-components'

import { classnames } from '@/futils'
import Dropdown from '@/components/common/Select'
import useQueryString from '@/hooks/useQueryString'

const CarsListingPerPageSelector = ({ className }: { className?: string }) => {
  const t = useTranslations()

  const [perPage, setPerPage] = useState<number>(0)
  const { setQueryString, getQueryString } = useQueryString()

  const handleOnChange = (value: Key) => {
    setQueryString([
      { name: 'perPage', value },
      { name: 'page', value: '' },
    ])
  }

  useEffect(() => {
    setPerPage(Number(getQueryString('perPage')))
  }, [getQueryString])

  return (
    <Dropdown
      bordered
      size="small"
      placeholder={t('Per Page')}
      selectedKeys={perPage || 12}
      onSelectionChange={handleOnChange}
      className={classnames('font-normal', className)}
      options={[
        { id: 6, title: `${t('Per Page')}  6` },
        { id: 12, title: `${t('Per Page')} 12` },
        { id: 18, title: `${t('Per Page')} 18` },
        { id: 24, title: `${t('Per Page')} 24` },
      ]}
    />
  )
}

export default CarsListingPerPageSelector
