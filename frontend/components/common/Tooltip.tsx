import {
  OverlayArrow,
  Tooltip as AriaTooltip,
  type TooltipProps,
} from 'react-aria-components'

interface MyTooltipProps extends Omit<TooltipProps, 'children'> {
  children: React.ReactNode
}

const Tooltip = ({ children, ...props }: MyTooltipProps) => {
  return (
    <AriaTooltip
      {...props}
      className="rounded-lg bg-white px-2 py-1 shadow-lg shadow-primary/20"
    >
      <OverlayArrow>
        <svg width={8} height={8} viewBox="0 0 8 8">
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {children}
    </AriaTooltip>
  )
}

export default Tooltip
