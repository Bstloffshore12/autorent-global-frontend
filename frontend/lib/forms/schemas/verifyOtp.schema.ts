import { z } from 'zod'

export const VerifyOtpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export type VerifyOtpValues = z.infer<typeof VerifyOtpSchema>
