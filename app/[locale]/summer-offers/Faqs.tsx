'use client'

import React, { useState } from 'react'

const Faqs = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  const faqData = [
    {
      question: '1. Is a credit card required to rent a car with Autorent?',
      answer:
        'Yes, a valid credit card in the name of the primary driver is mandatory for all rentals. This is required for the security deposit and to cover any incidental charges during the rental period. Please ensure your credit card has sufficient available credit.',
    },
    {
      question: '2. What documents do I need to provide?',
      answer: (
        <>
          <strong>For UAE Residents:</strong>
          <br />
          • Valid UAE Driving License
          <br />
          • Emirates ID
          <br />
          • Credit Card
          <br />
          • Proof of Address (e.g., DEWA bill, telephone bill, or company
          address)
          <br />
          <br />
          <strong>For Tourists:</strong>
          <br />
          • Passport
          <br />
          • Valid Visit Visa
          <br />
          • Credit Card
          <br />
          • Home Country Driving License
          <br />• International Driving Permit (IDP)
        </>
      ),
    },
    {
      question: '3. What is the minimum age to rent a car?',
      answer:
        'The minimum age is 21 years. Additionally, your driving license must have been held for at least 6 months.',
    },
    {
      question: '4. Do I need an International Driving Permit (IDP)?',
      answer:
        'An IDP is required for tourists from countries whose licenses are not recognized in the UAE. If you hold a valid UAE, European, or GCC driving license, an IDP is not necessary.',
    },
    {
      question: '5. What is the rental period and return policy?',
      answer: (
        <>
          • Rental Charges: Calculated on a 24-hour basis.
          <br />
          • Grace Period: A 2-hour grace period is allowed.
          <br />
          • Late Returns: Beyond 2 hours = full day charge.
          <br />
          • Return Notification: Inform Autorent at least 4 hours in advance for
          pickup.
          <br />
          <br />
          <strong>Security Deposit Policy:</strong>
          <br />
          • AED 1,500 deposit, held for 30 days.
          <br />
          • Covers fines & Salik (toll) charges.
          <br />• Refund processed within 30 days.
        </>
      ),
    },
    {
      question: '6. Are fines and Salik charges included?',
      answer:
        'Fines during the rental are the lessee’s responsibility. A AED 20 + VAT service charge applies to each fine. Salik (toll) charges are billed separately.',
    },
    {
      question: '7. What insurance coverage is provided?',
      answer:
        'All rentals include comprehensive insurance coverage. Please verify the coverage at the time of booking to ensure it meets your needs.',
    },
    {
      question: '8. Can I extend my rental period?',
      answer:
        'Yes, contact Autorent before your rental ends to arrange an extension and complete any required paperwork.',
    },
    {
      question: '9. Is delivery and pick-up service available?',
      answer:
        'Yes, Autorent offers doorstep delivery and pick-up for all bookings. AED 50 applies for the service.',
    },
  ]

  return (
    <div>
      {faqData.map((item, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-300"
        >
          <button
            className="flex w-full items-center justify-between bg-gray-50 px-6 py-4 text-left font-semibold hover:bg-gray-100"
            onClick={() => toggleAccordion(index)}
            aria-expanded={activeAccordion === index}
          >
            <span className="text-gray-800">{item.question}</span>
            <svg
              className={`h-5 w-5 transition-transform duration-300 ${
                activeAccordion === index ? 'rotate-180' : ''
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            className={`bg-white px-6 py-4 text-gray-600 transition-all duration-300 ${
              activeAccordion === index ? 'block' : 'hidden'
            }`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Faqs
