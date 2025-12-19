import { z } from 'zod'

export const feedbackSchema = z.object({
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

  message: z
    .string()
    .trim()
    .min(3, 'Please share your feedback'),

  honeypot: z.string().optional(),
})

export type FeedbackValues = z.infer<typeof feedbackSchema>
