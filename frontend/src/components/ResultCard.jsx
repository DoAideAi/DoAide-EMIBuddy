export default function ResultCard({ label, value, highlight = false }) {
  return (
    <div className={`p-4 rounded-lg border ${highlight ? 'border-brand-primary bg-brand-primary/10' : 'border-brand-border bg-brand-card'}`}>
      <p className="text-sm text-brand-muted">{label}</p>
      <p className={`text-xl font-bold mt-1 ${highlight ? 'text-brand-primary' : 'text-white'}`}>
        {value}
      </p>
    </div>
  )
}
