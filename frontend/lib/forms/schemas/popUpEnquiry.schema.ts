import { z } from 'zod'

export const PopupEnquirySchema = z.object({
  username: z.string().trim().min(2, 'Username must be at least 2 characters'),

  email: z.email('Invalid email address'),

  phone: z
    .string()
    .max(32, 'Phone number must not exceed 32 characters')
    .regex(/^\+?[0-9\s\-\(\)]{6,20}$/, 'Invalid phone number format'),

  city: z.string().trim().min(1, 'City is required').optional(), // conditional based on locale

  honeypot: z.string().optional(),
})

export type PopupEnquiryValues = z.infer<typeof PopupEnquirySchema>
