import { z } from 'zod'

export const RegisterSchema = z
  .object({
    firstName: z.string().trim().min(2, 'First name is required'),
    lastName: z.string().trim().min(2, 'Last name is required'),

    email: z.email('Invalid email address'),

    phoneCode: z.string().min(1, 'Country code is required'),

    phone: z
      .string()
      .regex(/^[0-9]{6,15}$/, 'Invalid phone number'),

    password: z.string().min(8, 'Password must be at least 8 characters'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterValues = z.infer<typeof RegisterSchema>
