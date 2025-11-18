'use client'

import Link from 'next/link'
import { RiWhatsappFill } from 'react-icons/ri'

import { useAppStore } from '@/store/provider'

const WhatsAppContact = () => {
  const {
    contact: {
      whatsapp: { number, text },
    },
  } = useAppStore((state) => state.general)
  return (
    <Link
      target="_blank"
      aria-label="WhatsApp Share Link"
      href={`https://wa.me/${number}?text=${text}`}
      className="fixed bottom-5 left-5 rounded-bl-[50px] rounded-br-[50px] rounded-tl-xl rounded-tr-[50px] bg-[#25D366] p-[11px] text-white shadow md:p-4"
    >
      <RiWhatsappFill size={28} />
    </Link>
  )
}

export default WhatsAppContact
