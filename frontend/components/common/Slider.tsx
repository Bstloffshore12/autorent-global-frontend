import {
  Label,
  SliderThumb,
  SliderTrack,
  SliderOutput,
  Slider as AriaSlider,
  type SliderProps,
} from 'react-aria-components'

import { classnames } from '@/futils'

interface MySliderProps extends SliderProps {
  label?: string
  suffix?: string
  prefix?: string
  className?: string
  thumbLabels?: string[]
}

const Slider = ({
  className,
  label = '',
  suffix = '',
  prefix = '',
  thumbLabels,
  ...props
}: MySliderProps) => {
  const getLeft = () => {
    if (Array.isArray(props.value) && props.value.length)
      return `${((((props.value?.[0] || 0) - (props.minValue || 0)) / ((props.maxValue || 0) - (props.minValue || 0))) * 100).toFixed(2)}%`
    return 0
  }

  const getLength = () => {
    if (Array.isArray(props.value) && props.value.length)
      return (
        (
          (((props.value?.[1] || 0) - (props.value?.[0] || 0)) /
            ((props.maxValue || 0) - (props.minValue || 0))) *
          100
        ).toFixed(2) + '%'
      )

    return (props.value || 0 * 100) + '%'
  }

  return (
    <AriaSlider {...props} className={classnames(className, 'pb-2')}>
      {label && <Label>{label}</Label>}
      <SliderOutput>
        {({ state }) =>
          state.values
            .map((_, i) => prefix + state.getThumbValueLabel(i) + suffix)
            .join(' – ')
        }
      </SliderOutput>
      <SliderTrack
        className={({ isDisabled }) =>
          classnames(
            'mt-4 border-2',
            isDisabled ? 'border-neutral-300' : 'border-primary-light'
          )
        }
      >
        {({ state }) =>
          state.values.map((_, i) => (
            <div key={thumbLabels?.[i]}>
              <div
                className="absolute top-[50%] h-1 translate-y-[-50%] rounded-full bg-primary"
                style={{ width: getLength(), left: getLeft() }}
              />
              <SliderThumb
                index={i}
                aria-label={thumbLabels?.[i]}
                className={({ isDisabled }) =>
                  classnames(
                    'z-10 h-4 w-4 cursor-pointer rounded-full border border-primary-light',
                    isDisabled ? 'bg-neutral-300' : 'bg-primary'
                  )
                }
              />
            </div>
          ))
        }
      </SliderTrack>
    </AriaSlider>
  )
}

export default Slider
