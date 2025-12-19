import { z } from 'zod'

export const SummerOffersEnquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .max(32, 'Phone number must not exceed 32 characters')
    .regex(/^\+?[0-9\s\-\(\)]{6,20}$/, 'Invalid phone number format'),
  email: z.email('Invalid email address'),
  car_type: z.string().min(1, 'Car type is required'),
  rental_duration: z.string().min(1, 'Rental duration is required'),
  message: z.string().min(1, 'Special Notes is required'),
  honeypot: z.string().optional(),
})

export type SummerOffersEnquiryValues = z.infer<
  typeof SummerOffersEnquirySchema
>
