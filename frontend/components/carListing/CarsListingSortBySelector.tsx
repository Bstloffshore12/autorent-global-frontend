'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { type Key } from 'react-aria-components'

import { classnames } from '@/futils'
import Dropdown from '@/components/common/Select'
import useQueryString from '@/hooks/useQueryString'
import { GetRentalCarsProps } from '@/model/CarModel'

const CarsListingSortBySelector = ({ className }: { className?: string }) => {
  const t = useTranslations()

  const [sortBy, setSortBy] =
    useState<GetRentalCarsProps['sortBy']>('price_low_high')
  const { setQueryString, getQueryString } = useQueryString()

  const handleOnChange = (value: Key) => {
    setQueryString([{ name: 'sortBy', value }])
  }

  useEffect(() => {
    const queryValue = getQueryString('sortBy')
    if (queryValue) setSortBy(queryValue as GetRentalCarsProps['sortBy'])
  }, [getQueryString])

  return (
    <Dropdown
      bordered
      size="small"
      selectedKeys={sortBy}
      placeholder={t('Sort By')}
      className={classnames('font-normal', className)}
      onSelectionChange={handleOnChange}
      options={[
        { id: 'recent', title: t('Recent') },
        { id: 'price_low_high', title: t('Price: Low to High') },
        { id: 'price_high_low', title: t('Price: High to Low') },
      ]}
    />
  )
}

export default CarsListingSortBySelector
