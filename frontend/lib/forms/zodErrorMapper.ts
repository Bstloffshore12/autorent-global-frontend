import { z } from 'zod'

type TreeifiedError = {
  errors?: string[]
  properties?: Record<
    string,
    {
      errors?: string[]
    }
  >
}

export function mapZodErrors(error: z.ZodError): Record<string, string[]> {
  const tree = z.treeifyError(error) as TreeifiedError

  // No field-level errors
  if (!tree.properties) {
    return {}
  }

  const result: Record<string, string[]> = {}

  for (const key of Object.keys(tree.properties)) {
    result[key] = tree.properties[key]?.errors ?? []
  }

  return result
}
