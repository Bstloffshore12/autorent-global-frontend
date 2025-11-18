'use client'

import { Button } from 'react-aria-components'

import { classnames } from '@/futils'
import { CarPagination } from '@/model/CarModel'
import useQueryString from '@/hooks/useQueryString'

interface CarListingPaginationProps {
  pagination: CarPagination
}

const CarListingPagination = ({ pagination }: CarListingPaginationProps) => {
  const { setQueryString } = useQueryString()

  const handlePageChange = (pageNumber: number) => {
    setQueryString([{ name: 'page', value: pageNumber }])
  }

  return (
    <div className="flex justify-center gap-2">
      {Array(pagination.last_pages || 0)
        .fill(0)
        .map((_, i) => (
          <Button
            onPress={() => handlePageChange(i + 1)}
            key={`page-${i + 1}`}
            className={classnames(
              'flex size-10 cursor-pointer items-center justify-center rounded-lg border font-normal duration-300 hover:border-primary hover:bg-primary hover:text-white',
              pagination.current_page === i + 1
                ? 'border-primary bg-primary text-white'
                : 'border-neutral-300 bg-white'
            )}
          >
            {i + 1}
          </Button>
        ))}
    </div>
  )
}

export default CarListingPagination
