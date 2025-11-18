import { classnames } from '@/futils'

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 19.3 19.3"
      className={classnames('size-6 animate-spin stroke-primary', className)}
    >
      <path
        fill="none"
        strokeWidth="2px"
        d="M18.2,9.6c0-4.7-3.8-8.5-8.5-8.5S1.1,4.9,1.1,9.6"
      />
    </svg>
  )
}
export default LoadingSpinner
