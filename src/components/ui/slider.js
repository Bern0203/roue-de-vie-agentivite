import * as React from "react"

const Slider = React.forwardRef(({ className, min = 0, max = 100, step = 1, defaultValue, onValueChange, ...props }, ref) => {
  const [value, setValue] = React.useState(defaultValue || [min])

  const handleChange = (event) => {
    const newValue = [parseInt(event.target.value, 10)]
    setValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className={`w-full ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Slider.displayName = "Slider"

export { Slider }
