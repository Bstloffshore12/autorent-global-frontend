import { z } from 'zod'

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  phone: z
    .string()
    .max(32, 'Phone number must not exceed 32 characters')
    .regex(/^\+?[0-9\s\-\(\)]{6,20}$/, 'Invalid phone number format'),
  address: z.string().min(3, 'Address is required'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  honeypot: z.string().optional(),
})

export type ContactFormValues = z.infer<typeof ContactFormSchema>
