export default function ResultCard({ label, value, highlight = false }) {
  return (
    <div className={`p-4 rounded-lg border ${highlight ? 'border-da-primary bg-da-primary/10' : 'border-da-border bg-da-card'}`}>
      <p className="text-sm text-da-muted">{label}</p>
      <p className={`text-xl font-bold mt-1 ${highlight ? 'text-da-primary' : 'text-da-text'}`}>
        {value}
      </p>
    </div>
  )
}
