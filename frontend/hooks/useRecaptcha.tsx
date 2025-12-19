'use client'

import { useRef, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export type RecaptchaV2Handle = {
  token: string | null
  isVerified: boolean
  reset: () => void
  Recaptcha: ReactNode
}

export function useRecaptchaV2(): RecaptchaV2Handle {
  const ref = useRef<ReCAPTCHA>(null)
  const [token, setToken] = useState<string | null>(null)

  const reset = useCallback(() => {
    ref.current?.reset()
    setToken(null)
  }, [])

  const Recaptcha = (
    <ReCAPTCHA
      ref={ref}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      onChange={setToken}
    />
  )

  return {
    token,
    isVerified: Boolean(token),
    reset,
    Recaptcha,
  }
}
