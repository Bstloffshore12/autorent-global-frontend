'use client'

import {
  FaMoneyBillWave,
  FaCar,
  FaShieldAlt,
  FaWallet,
  FaHandHoldingUsd,
  FaTools,
  FaRegSmile,
  FaLifeRing,
  FaUserFriends,
  FaRoad,
  FaHeadset,
} from 'react-icons/fa'
import { Link } from '@/i18n/routing'

const benefits = [
  {
    icon: <FaMoneyBillWave />,
    title: 'Lower Monthly Peace of Mind',
    desc: 'Leasing a car with Autorent Car Rental offers customers exclusive prices.',
  },
  {
    icon: <FaCar />,
    title: 'Drive a New Car',
    desc: 'Latest models with modern safety, tech, and fuel efficiency.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'No Depreciation Worries',
    desc: 'You don’t have to worry about its resale value.',
  },
  {
    icon: <FaWallet />,
    title: 'Fixed Monthly Costs',
    desc: 'Makes budgeting easier, maintenance, and breakdown covered.',
  },
  {
    icon: <FaHandHoldingUsd />,
    title: 'No Large Upfront Payment',
    desc: 'Rental is lower than a car deposit.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Warranty Coverage',
    desc: 'Warranty covered during the lease period.',
  },
  {
    icon: <FaRegSmile />,
    title: 'No Selling Hassle',
    desc: 'Simply hand the car back at the end of the contract.',
  },
  {
    icon: <FaTools />,
    title: 'Maintenance Cost',
    desc: 'Autorent covers all maintenance charges till the contract ends.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Insurance Cost',
    desc: 'Comprehensive insurance included in the price. Optional 100% insurance available.',
  },
  {
    icon: <FaRoad />,
    title: 'Breakdown Assistance',
    desc: '24/7 roadside assistance free of charge.',
  },
  {
    icon: <FaHeadset />,
    title: 'Customer Care',
    desc: '24/7 customer care support available anytime.',
  },
]

export default function PersonalLeaseExplore() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16" id="leasing-benefits">
      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Right: Fixed Content */}
        <div className="">
          <div className="sticky right-12 top-20 w-full">
            <h2 className="mb-6 text-2xl font-bold lg:text-3xl">
              Enjoy Reliable Mobility with Flexible Rental Options
            </h2>

            <p className="mb-6 text-sm leading-relaxed text-gray-700 sm:text-base">
              Renting a car with Autorent is a fantastic way to enjoy
              cost-effective mobility! With our lower monthly rates, you can
              easily access a reliable vehicle without the stress of ownership.
              <br />
              <br />
              <strong>Predictable Budgeting:</strong> Fixed monthly payments
              make planning a breeze, so you know exactly what to expect.
              <br />
              <br />
              <strong>No Depreciation:</strong> Forget hidden costs—enjoy
              driving without worrying about vehicle value dropping.
              <br />
              <br />
              <strong>Flexible Options:</strong> Choose short-term contracts and
              customizable mileage limits to suit your needs.
            </p>

            <div className="flex justify-center">
              <Link
                href="/lease-cars/car-listing"
                className="relative inline-flex transform items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-3 text-sm font-bold text-white shadow-lg transition duration-300 ease-in-out hover:shadow-2xl active:scale-95 active:shadow-inner sm:px-7 sm:text-base md:px-9 md:py-3 md:text-lg lg:px-10 lg:py-4 lg:text-xl"
              >
                <span className="animate-slide absolute -left-10 top-0 h-full w-6 -skew-x-12 transform rounded-full bg-white/20 opacity-0 hover:opacity-50"></span>
                Let&apos;s Start Exploring the Models
              </Link>
            </div>
          </div>
        </div>

        {/* Left: Benefits Grid (scrolls normally) */}
        <div className="space-y-16">
          <h2 className="mb-12 text-center text-2xl font-bold text-gray-800 md:text-3xl lg:text-left">
            Personal Leasing Benefits
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="duration-400 group flex flex-col items-start rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all ease-in-out hover:scale-105 hover:shadow-2xl"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 md:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
