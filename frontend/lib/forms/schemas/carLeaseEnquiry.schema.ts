import { z } from 'zod'

export const CarLeaseEnquirySchema = z.object({
  firstName: z.string().trim().min(2, 'First name must be at least 2 characters'),

  lastName: z.string().trim().min(2, 'Last name must be at least 2 characters'),

  email: z.email('Invalid email address'),

  phone: z
    .string()
    .max(32, 'Phone number must not exceed 32 characters')
    .regex(/^\+?[0-9\s\-\(\)]{6,20}$/, 'Invalid phone number format'),

  address: z.string().trim().min(5, 'Address is required'),

  vehicle: z.string().trim().min(2, 'Preferred vehicle is required'),

  country: z.string().min(1, 'Country is required'),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters'),

  honeypot: z.string().optional(),
})

export type CarLeaseEnquiryValues = z.infer<typeof CarLeaseEnquirySchema>
