'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import 'swiper/css'
import 'swiper/css/navigation'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import { type HomeBannersData } from '@/model/CmsModel'

const HomeSlider2 = ({ banners }: { banners: HomeBannersData[] }) => {
  return (
    <div className="w-full pt-[90px] sm:pt-[100px]">
      <div className="relative w-full">
        {/* Responsive height container */}
        <div className="w-full">
          {/* ✅ Custom Navigation Buttons with React Icons */}
          <button className="swiper-button-prev-custom absolute left-4 top-1/2 z-20 flex hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-transparent text-white transition-all duration-200 hover:bg-white/5 sm:h-12 sm:w-12 md:flex lg:h-16 lg:w-16 xl:h-20 xl:w-20">
            <FiChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10" />
          </button>

          <button className="swiper-button-next-custom absolute right-4 top-1/2 z-20 flex hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-transparent text-white transition-all duration-200 hover:bg-white/5 sm:h-12 sm:w-12 md:flex lg:h-16 lg:w-16 xl:h-20 xl:w-20">
            <FiChevronRight className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10" />
          </button>

          <Swiper
            dir="ltr"
            className="h-full w-full"
            autoplay={{ delay: 5000 }}
            modules={[Autoplay, Navigation]}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
          >
            {banners.map(({ id, title, media, subtitle }) => (
              <SwiperSlide key={id} className="relative">
                <Link href={subtitle || routes.home}>
                  <Image
                    alt={title}
                    width={2774}
                    height={650}
                    title={title}
                    src={
                      media?.path
                        ? `${routes.bucketUrlClient}${media?.path}`
                        : '/assets/images/placeholder.svg'
                    }
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
    // <div className="w-full xl:h-[590px] lg:h-[437px] md:h-[400px] sm:h-[200px] h-[250px] ">
    //   <Swiper
    //     navigation
    //     autoplay={{ delay: 5000 }}
    //     modules={[Autoplay, Navigation]}
    //     className="banner-swiper w-screen max-w-full overflow-hidden h-full"
    //   >
    //     {banners.map(({ id, title, media, subtitle, content }) => (
    //       <SwiperSlide key={id}>
    //         <Link
    //           href={subtitle || routes.home}
    //           className="top-16 h-full w-full md:absolute"
    //         >
    //           <Image
    //             alt={title}
    //             width={1920}
    //             height={650}
    //             title={title}
    //             className="h-full w-full object-contain bg-gray-100"
    //             src={
    //               media?.path
    //                 ? `${routes.bucketUrlClient}${media?.path}`
    //                 : '/assets/images/placeholder.svg'
    //             }
    //           />
    //         </Link>

    //         <Container className="pointer-events-none z-20 mt-16 flex items-center text-white drop-shadow sm:mt-20 md:mt-24 lg:mt-32">
    //           <div className="space-y-3 sm:space-y-4 md:space-y-6">
    //             {title?.length > 2 && (
    //               <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">{title}</h2>
    //             )}
    //             {content && (
    //               <div className="flex flex-wrap items-center gap-4 text-sm font-normal sm:text-base md:text-lg lg:text-xl">
    //                 <div
    //                   className="flex max-w-[400px] items-center gap-2 sm:max-w-[500px] md:max-w-[600px]"
    //                   dangerouslySetInnerHTML={{ __html: content }}
    //                 />
    //               </div>
    //             )}
    //           </div>
    //         </Container>
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>
    // </div>
  )
}

export default HomeSlider2
