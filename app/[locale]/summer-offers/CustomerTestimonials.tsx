'use client' // Required for Next.js App Router

import { useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const CustomerTestimonials = () => {
  const swiperRef = useRef<{ swiper: SwiperType }>(null)
  const testimonials: string[] = [
    `"As a frequent business traveler to Abu Dhabi, I rely on Autorent for consistent service..."`,
    `"Our family trip to Sharjah was enhanced by the SUV we rented from Autorent..."`,
    `"I've been using Autorent for my yearly rental in Dubai for the past 3 years..."`,
    `"Reliable, clean, and affordable—Autorent is my go-to every time I visit the UAE."`,
  ]

  const names: string[] = [
    'Ahmed Al–Mansouri',
    'Fatima Rahman',
    'James Wilson',
    'David Thompson',
  ]

  const titles: string[] = [
    ' - Business Professional',
    ' - Family Vacationer',
    ' - Expat Resident',
    ' - Frequent Tourist',
  ]

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
          What Our Customers Say
        </h2>

        <div className="relative">
          <Swiper
            dir="ltr"
            ref={swiperRef}
            spaceBetween={20}
            slidesPerView={1}
            navigation={false} // Disable default navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="m-3 mx-2 h-full rounded-xl bg-white p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl">
                  <div className="mb-4">
                    <i className="bi bi-person-circle text-6xl text-gray-400"></i>
                  </div>
                  <p className="mb-4 italic text-gray-600">{testimonial}</p>
                  <div className="text-lg text-yellow-500">★★★★★</div>
                  <strong className="mt-3 block text-lg text-gray-800">
                    {names[index]}
                  </strong>
                  <small className="text-gray-500">{titles[index]}</small>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2 sm:left-5">
            <button
              onClick={goPrev}
              className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Prev
            </button>
          </div>
          <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2 sm:right-5">
            <button
              onClick={goNext}
              className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerTestimonials
