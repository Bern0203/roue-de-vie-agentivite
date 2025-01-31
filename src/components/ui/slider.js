import * as React from "react"

const Slider = React.forwardRef(({ className, min = 0, max = 10, step = 1, defaultValue, onValueChange, ...props }, ref) => {
  const [value, setValue] = React.useState(defaultValue || [min])

  const handleChange = (event) => {
    const newValue = [parseInt(event.target.value, 10)]
    setValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <div className="space-y-2">
      <div className="relative pt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleChange}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
          ref={ref}
          {...props}
        />
        <div className="flex justify-between w-full px-2 mt-2">
          {Array.from({ length: max + 1 }, (_, i) => (
            <span key={i} className="text-xs text-gray-600">{i}</span>
          ))}
        </div>
      </div>
      <div className="text-right text-sm font-medium text-primary">
        {value[0]}/10
      </div>
    </div>
  )
})

Slider.displayName = "Slider"

export { Slider }
