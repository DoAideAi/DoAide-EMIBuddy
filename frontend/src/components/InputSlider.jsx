export default function InputSlider({ label, value, onChange, min, max, step = 1, unit = '', prefix = '' }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-da-text mb-1">
        {label}
        <span className="float-right text-da-primary font-semibold">
          {prefix}{Number(value).toLocaleString('en-IN')}{unit}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 bg-da-border rounded-lg appearance-none cursor-pointer accent-da-primary"
      />
      <div className="flex justify-between text-xs text-da-muted mt-1">
        <span>{prefix}{Number(min).toLocaleString('en-IN')}{unit}</span>
        <span>{prefix}{Number(max).toLocaleString('en-IN')}{unit}</span>
      </div>
    </div>
  )
}
