'use client'

import type { ZodSchema } from 'zod'
import { mapZodErrors } from './zodErrorMapper'

type ValidationSuccess<T> = {
  valid: true
  data: T
}

type ValidationFailure = {
  valid: false
  errors: Record<string, string[]>
}

export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure

export function useZodValidation<T>(schema: ZodSchema<T>) {
  const validate = (values: unknown): ValidationResult<T> => {
    const parsed = schema.safeParse(values)

    if (!parsed.success) {
      return {
        valid: false,
        errors: mapZodErrors(parsed.error),
      }
    }

    return {
      valid: true,
      data: parsed.data,
    }
  }

  return { validate }
}
