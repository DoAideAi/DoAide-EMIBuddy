import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import SEO from '../components/SEO'
import { ROUTE_META } from '../routeMeta'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
import { calculateFD, formatINR, formatINRFull } from '../utils/calculators'

const COLORS = ['#F59E0B', '#10B981', '#EF4444']

export default function FDCalculator() {
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)
  const [compounding, setCompounding] = useState('quarterly')
  const [taxSlab, setTaxSlab] = useState(0)

  const result = useMemo(() => calculateFD(principal, rate, years, compounding, taxSlab), [principal, rate, years, compounding, taxSlab])

  const pieData = [
    { name: 'Principal', value: result.principal },
    { name: 'Interest (post-tax)', value: result.postTaxInterest },
    ...(result.tax > 0 ? [{ name: 'Tax', value: result.tax }] : []),
  ]

  const shareText = `FD of ${formatINR(principal)} at ${rate}% for ${years} years (${compounding})\nMaturity: ${formatINRFull(result.maturityAmount)}\nInterest: ${formatINRFull(result.totalInterest)}${taxSlab > 0 ? `\nPost-tax: ${formatINRFull(result.postTaxMaturity)}` : ''}`

  return (
    <>
      <SEO {...ROUTE_META['/fd-calculator']} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">FD Calculator</h1>
        <p className="text-brand-muted mb-8">Calculate Fixed Deposit maturity with tax impact</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
            <InputSlider label="Deposit Amount" value={principal} onChange={setPrincipal} min={10000} max={10000000} step={10000} prefix="₹" />
            <InputSlider label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={1} max={12} step={0.1} unit="%" />
            <InputSlider label="Tenure (years)" value={years} onChange={setYears} min={1} max={10} step={1} />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Compounding Frequency</label>
              <div className="grid grid-cols-2 gap-2">
                {['monthly', 'quarterly', 'half-yearly', 'yearly'].map(freq => (
                  <button
                    key={freq}
                    onClick={() => setCompounding(freq)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${
                      compounding === freq
                        ? 'bg-brand-primary text-white'
                        : 'bg-brand-dark text-brand-muted border border-brand-border'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            <InputSlider label="Tax Slab" value={taxSlab} onChange={setTaxSlab} min={0} max={30} step={5} unit="%" />
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ResultCard label="Maturity Amount" value={formatINRFull(result.maturityAmount)} highlight />
              <ResultCard label="Total Interest" value={formatINRFull(result.totalInterest)} />
              {taxSlab > 0 && (
                <>
                  <ResultCard label="Tax on Interest" value={formatINRFull(result.tax)} />
                  <ResultCard label="Post-Tax Maturity" value={formatINRFull(result.postTaxMaturity)} />
                </>
              )}
            </div>

            <div className="flex justify-center">
              <PieChart width={200} height={200}>
                <Pie data={pieData} cx={100} cy={100} innerRadius={60} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => formatINRFull(v)} />
              </PieChart>
            </div>
          </div>
        </div>

        <ShareButton text={shareText} />
      </div>
    </>
  )
}
