import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import SEO from '../components/SEO'
import { ROUTE_META } from '../routeMeta'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
import { calculatePPF, formatINR, formatINRFull } from '../utils/calculators'

export default function PPFCalculator() {
  const [annual, setAnnual] = useState(150000)
  const [years, setYears] = useState(15)

  const result = useMemo(() => calculatePPF(annual, years), [annual, years])

  const chartData = result.yearlyData.map(d => ({
    year: `Yr ${d.year}`,
    invested: d.year * annual,
    balance: d.balance,
  }))

  const shareText = `PPF Investment: ${formatINR(annual)}/year for ${years} years\nTotal Invested: ${formatINR(result.totalInvested)}\nMaturity: ${formatINR(result.maturityAmount)}\nInterest Earned: ${formatINR(result.totalInterest)} (tax-free!)`

  return (
    <>
      <SEO {...ROUTE_META['/ppf-calculator']} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">PPF Calculator</h1>
        <p className="text-brand-muted mb-8">Public Provident Fund projections at 7.1% p.a. (tax-free)</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
            <InputSlider label="Annual Investment" value={annual} onChange={setAnnual} min={500} max={150000} step={500} prefix="₹" />
            <InputSlider label="Tenure (years)" value={years} onChange={setYears} min={15} max={50} step={1} />
            <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400">
              PPF interest rate: 7.1% p.a. (set by Government of India, revised quarterly). Maximum annual deposit: ₹1,50,000. Tax-free under EEE (Exempt-Exempt-Exempt).
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <ResultCard label="Maturity Amount" value={formatINR(result.maturityAmount)} highlight />
              <ResultCard label="Total Invested" value={formatINR(result.totalInvested)} />
              <ResultCard label="Interest Earned" value={formatINR(result.totalInterest)} />
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-xl border border-brand-border bg-brand-card">
          <h2 className="text-lg font-bold text-white mb-4">PPF Growth Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <XAxis dataKey="year" tick={{ fill: '#888', fontSize: 12 }} />
              <YAxis tick={{ fill: '#888', fontSize: 12 }} tickFormatter={v => formatINR(v)} />
              <Tooltip formatter={v => formatINRFull(v)} contentStyle={{ backgroundColor: '#141414', border: '1px solid #2a2a2a', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="invested" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Invested" />
              <Area type="monotone" dataKey="balance" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} name="Balance" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="py-3 px-3 text-left text-brand-muted">Year</th>
                <th className="py-3 px-3 text-right text-brand-muted">Investment</th>
                <th className="py-3 px-3 text-right text-brand-muted">Interest</th>
                <th className="py-3 px-3 text-right text-brand-muted">Balance</th>
              </tr>
            </thead>
            <tbody>
              {result.yearlyData.map(row => (
                <tr key={row.year} className="border-b border-brand-border/50 hover:bg-brand-border/20">
                  <td className="py-2 px-3 text-white">{row.year}</td>
                  <td className="py-2 px-3 text-right text-white">{formatINRFull(row.investment)}</td>
                  <td className="py-2 px-3 text-right text-emerald-400">{formatINRFull(row.interest)}</td>
                  <td className="py-2 px-3 text-right text-blue-400">{formatINRFull(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ShareButton text={shareText} />
      </div>
    </>
  )
}
