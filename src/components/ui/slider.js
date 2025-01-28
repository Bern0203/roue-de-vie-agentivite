import * as React from "react"

const Slider = React.forwardRef(({ className, min = 0, max = 100, step = 1, defaultValue, onValueChange, ...props }, ref) => {
  const [value, setValue] = React.useState(defaultValue || [min])
  const trackRef = React.useRef(null)

  const handleChange = (event) => {
    const newValue = [parseInt(event.target.value, 10)]
    setValue(newValue)
    onValueChange?.(newValue)
  }

  const getPercentage = (value) => ((value - min) / (max - min)) * 100

  return (
    <div className="relative w-full touch-none select-none" ref={ref} {...props}>
      <div className="relative h-2 w-full rounded-full bg-gray-200">
        <div
          ref={trackRef}
          className="absolute h-full rounded-full bg-primary"
          style={{ width: `${getPercentage(value[0])}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        className={`
          absolute inset-0 h-2 w-full appearance-none bg-transparent
          [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:transition
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary
          [&::-moz-range-thumb]:transition [&::-moz-range-thumb]:cursor-pointer
          ${className}
        `}
      />
    </div>
  )
})
Slider.displayName = "Slider"

export { Slider }
