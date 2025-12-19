import { z } from 'zod'

export const CarEnquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),

  email: z.email('Invalid email address'),

  phone: z
    .string()
    .max(32, 'Phone number must not exceed 32 characters')
    .regex(/^\+?[0-9\s\-\(\)]{6,20}$/, 'Invalid phone number format'),

  company: z.string().optional(),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters'),

  honeypot: z.string().optional(),
})

export type CarEnquiryValues = z.infer<typeof CarEnquirySchema>
