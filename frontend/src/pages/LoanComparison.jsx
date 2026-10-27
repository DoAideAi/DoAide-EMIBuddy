import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import SEO from '../components/SEO'
import { ROUTE_META } from '../routeMeta'
import ShareButton from '../components/ShareButton'
import { calculateEMI, formatINR, formatINRFull } from '../utils/calculators'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B']

function LoanInput({ index, loan, onChange }) {
  const update = (field, value) => onChange(index, { ...loan, [field]: value })
  return (
    <div className="p-4 rounded-xl border border-brand-border bg-brand-card">
      <h3 className="font-bold text-white mb-3" style={{ color: COLORS[index] }}>Loan {index + 1}</h3>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-brand-muted">Label</label>
          <input type="text" value={loan.label} onChange={e => update('label', e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-brand-dark border border-brand-border rounded-lg text-white text-sm focus:border-brand-primary outline-none" />
        </div>
        <div>
          <label className="text-xs text-brand-muted">Loan Amount (₹)</label>
          <input type="number" value={loan.principal} onChange={e => update('principal', Number(e.target.value))}
            className="w-full mt-1 px-3 py-2 bg-brand-dark border border-brand-border rounded-lg text-white text-sm focus:border-brand-primary outline-none" />
        </div>
        <div>
          <label className="text-xs text-brand-muted">Interest Rate (%)</label>
          <input type="number" value={loan.rate} step="0.1" onChange={e => update('rate', Number(e.target.value))}
            className="w-full mt-1 px-3 py-2 bg-brand-dark border border-brand-border rounded-lg text-white text-sm focus:border-brand-primary outline-none" />
        </div>
        <div>
          <label className="text-xs text-brand-muted">Tenure (months)</label>
          <input type="number" value={loan.tenure} onChange={e => update('tenure', Number(e.target.value))}
            className="w-full mt-1 px-3 py-2 bg-brand-dark border border-brand-border rounded-lg text-white text-sm focus:border-brand-primary outline-none" />
        </div>
      </div>
    </div>
  )
}

export default function LoanComparison() {
  const [loans, setLoans] = useState([
    { label: 'Bank A', principal: 5000000, rate: 8.5, tenure: 240 },
    { label: 'Bank B', principal: 5000000, rate: 8.75, tenure: 240 },
  ])

  const handleChange = (index, loan) => {
    const updated = [...loans]
    updated[index] = loan
    setLoans(updated)
  }

  const addLoan = () => {
    if (loans.length < 3) {
      setLoans([...loans, { label: `Bank ${String.fromCharCode(65 + loans.length)}`, principal: 5000000, rate: 9, tenure: 240 }])
    }
  }

  const removeLoan = (index) => {
    if (loans.length > 2) setLoans(loans.filter((_, i) => i !== index))
  }

  const results = useMemo(() => loans.map(l => ({
    ...calculateEMI(l.principal, l.rate, l.tenure),
    label: l.label,
    rate: l.rate,
    tenure: l.tenure,
  })), [loans])

  const chartData = results.map(r => ({
    name: r.label,
    EMI: r.emi,
    Interest: r.totalInterest,
    Total: r.totalPayment,
  }))

  const bestEmi = Math.min(...results.map(r => r.emi))
  const bestInterest = Math.min(...results.map(r => r.totalInterest))

  const shareText = results.map(r => `${r.label}: EMI ${formatINRFull(r.emi)} | Interest ${formatINR(r.totalInterest)}`).join('\n')

  return (
    <>
      <SEO {...ROUTE_META['/loan-comparison']} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Loan Comparison</h1>
        <p className="text-brand-muted mb-8">Compare up to 3 loans side by side</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {loans.map((loan, i) => (
            <div key={i} className="relative">
              <LoanInput index={i} loan={loan} onChange={handleChange} />
              {loans.length > 2 && (
                <button onClick={() => removeLoan(i)} className="absolute top-2 right-2 text-brand-muted hover:text-red-500 text-sm">✕</button>
              )}
            </div>
          ))}
          {loans.length < 3 && (
            <button onClick={addLoan} className="p-4 rounded-xl border-2 border-dashed border-brand-border hover:border-brand-primary/50 flex items-center justify-center text-brand-muted hover:text-brand-primary transition-colors min-h-[200px]">
              + Add Loan
            </button>
          )}
        </div>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="py-3 px-4 text-left text-brand-muted">Metric</th>
                {results.map((r, i) => (
                  <th key={i} className="py-3 px-4 text-right" style={{ color: COLORS[i] }}>{r.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-brand-border/50">
                <td className="py-3 px-4 text-brand-muted">Monthly EMI</td>
                {results.map((r, i) => (
                  <td key={i} className={`py-3 px-4 text-right font-semibold ${r.emi === bestEmi ? 'text-green-400' : 'text-white'}`}>
                    {formatINRFull(r.emi)} {r.emi === bestEmi && '✓'}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-brand-border/50">
                <td className="py-3 px-4 text-brand-muted">Total Interest</td>
                {results.map((r, i) => (
                  <td key={i} className={`py-3 px-4 text-right ${r.totalInterest === bestInterest ? 'text-green-400' : 'text-white'}`}>
                    {formatINR(r.totalInterest)} {r.totalInterest === bestInterest && '✓'}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-brand-border/50">
                <td className="py-3 px-4 text-brand-muted">Total Payment</td>
                {results.map((r, i) => (
                  <td key={i} className="py-3 px-4 text-right text-white">{formatINR(r.totalPayment)}</td>
                ))}
              </tr>
              <tr className="border-b border-brand-border/50">
                <td className="py-3 px-4 text-brand-muted">Interest Rate</td>
                {results.map((r, i) => (
                  <td key={i} className="py-3 px-4 text-right text-white">{r.rate}%</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
          <h2 className="text-lg font-bold text-white mb-4">Visual Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 12 }} />
              <YAxis tick={{ fill: '#888', fontSize: 12 }} tickFormatter={v => formatINR(v)} />
              <Tooltip formatter={v => formatINRFull(v)} contentStyle={{ backgroundColor: '#141414', border: '1px solid #2a2a2a', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="EMI" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Interest" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <ShareButton text={shareText} title="Loan Comparison" />
      </div>
    </>
  )
}
