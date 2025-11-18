import { FieldError as AriaFieldError } from 'react-aria-components'

const FieldError = ({ message }: { message?: string }) => {
  return (
    <AriaFieldError className="text-sm text-red-500">
      {({ defaultChildren }) => message || defaultChildren}
    </AriaFieldError>
  )
}

export default FieldError
