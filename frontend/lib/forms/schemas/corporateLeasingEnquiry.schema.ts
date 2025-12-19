import { z } from 'zod'

export const CorporateLeasingEnquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),

  email: z.email('Invalid email address'),

  phone: z
    .string()
    .max(32, 'Phone number must not exceed 32 characters')
    .regex(/^\+?[0-9\s\-\(\)]{6,20}$/, 'Invalid phone number format'),

  companyName: z.string().trim().min(2, 'Company name is required'),

  vehicleInterestedIn: z
    .string()
    .trim()
    .min(2, 'Vehicle interested in is required'),

  numberOfVehicles: z
    .string()
    .regex(/^\d+$/, 'Number of vehicles must be a number'),

  vehicleCategory: z
    .array(z.string())
    .min(1, 'Select at least one vehicle category'),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters'),

  honeypot: z.string().optional(),
})

export type CorporateLeasingEnquiryValues = z.infer<
  typeof CorporateLeasingEnquirySchema
>
