'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import { type BlogData } from '@/model/BlogModel'
import BlogListCard2 from '@/components/common/BlogListCard2'

const BlogSlider = ({ blogs }: { blogs: BlogData[] }) => {
  return (
    <Swiper
      loop
      dir="ltr"
      spaceBetween={24}
      autoplay={{ delay: 4000 }}
      modules={[Pagination, Autoplay]}
      pagination={{ dynamicBullets: true }}
      breakpoints={{
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      }}
    >
      {blogs.map((blog) => (
        <SwiperSlide key={blog.id} className="mb-4">
          <BlogListCard2 {...blog} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default BlogSlider
