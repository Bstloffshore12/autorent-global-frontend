import { z } from 'zod'

export const roadSideAssistanceSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, 'First name is required'),

  last_name: z
    .string()
    .trim()
    .min(2, 'Last name is required'),

  email: z
    .string()
    .email('Invalid email address'),

  phone: z
    .string()
    .max(32, 'Phone number must not exceed 32 characters')
    .regex(
      /^\+?[0-9\s\-\(\)]{6,20}$/,
      'Invalid phone number format'
    ),

  booking_ref_no: z
    .string()
    .trim()
    .min(1, 'Booking reference number is required'),

  breakdown_location: z
    .string()
    .trim()
    .min(1, 'Breakdown location is required'),

  message: z
    .string()
    .trim()
    .min(5, 'Enter a brief description of the cause for breakdown'),

  honeypot: z.string().optional(),
})

export type RoadSideAssistanceValues =
  z.infer<typeof roadSideAssistanceSchema>
