'use client'

import { Button } from '@/components/ui/button'
import { useMemo } from 'react'
import { useAppStore } from '@/store/provider'

interface WhatsAppLeaseButtonProps {
  carMake: string
  carModel: string
  yearTitle: string
  durationTitle: string
  kmTitle: string
  basePrice: number | string
}

export default function WhatsAppLeaseButton({
  carMake,
  carModel,
  yearTitle,
  durationTitle,
  kmTitle,
  basePrice,
}: WhatsAppLeaseButtonProps) {
  const {
    order: { additionalServices, pricingMode },
  } = useAppStore((state) => state)

  // Extract months from duration title (ex: "12 Months")
  const durationInMonths = useMemo(() => {
    const match = durationTitle.match(/(\d+)\s*Months?/)
    return match ? Number(match[1]) : 1
  }, [durationTitle])

  // Generate readable list of selected add-ons
  const selectedAddonsText = (additionalServices || [])
    .filter(
      (s: any) => s.mandatory === 1 || s.selected === true || s.default === 1
    )
    .map((s: any) => `• ${s.title}: ${s.monthly || s.daily || 0} AED`)
    .join('\n')

  const sendWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello, I am interested in leasing the following vehicle:

Car: ${carMake} ${carModel}
Year: ${yearTitle}
Duration: ${durationTitle}
KM Allowance: ${kmTitle}

Base Monthly Price: ${basePrice} AED

Additional Services Selected:
${selectedAddonsText || 'None'}



Please share more details.`
    )

    window.open(`https://wa.me/+971567819715?text=${message}`, '_blank')
  }

  return (
    <Button
      onClick={sendWhatsApp}
      className="mt-4 h-12 w-full bg-green-600 text-lg font-semibold text-white hover:bg-green-700"
    >
      Enquiry Now
    </Button>
  )
}
