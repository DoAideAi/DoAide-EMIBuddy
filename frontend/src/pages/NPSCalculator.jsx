import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import SEO from '../components/SEO'
import { ROUTE_META } from '../routeMeta'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
import { calculateNPS, formatINR, formatINRFull } from '../utils/calculators'

const COLORS = ['#3B82F6', '#F59E0B', '#10B981']

export default function NPSCalculator() {
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(10)
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [annuityPct, setAnnuityPct] = useState(40)

  const result = useMemo(
    () => calculateNPS(monthly, rate, currentAge, retirementAge, annuityPct),
    [monthly, rate, currentAge, retirementAge, annuityPct]
  )

  const pieData = [
    { name: 'Invested', value: result.totalInvested },
    { name: 'Lump Sum (60%)', value: result.lumpSum },
    { name: 'Annuity', value: result.annuityAmount },
  ]

  const shareText = `NPS: ${formatINR(monthly)}/month from age ${currentAge} to ${retirementAge}\nTotal Corpus: ${formatINR(result.totalCorpus)}\nLump Sum: ${formatINR(result.lumpSum)}\nEst. Monthly Pension: ${formatINRFull(result.estimatedMonthlyPension)}`

  return (
    <>
      <SEO {...ROUTE_META['/nps-calculator']} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">NPS Calculator</h1>
        <p className="text-brand-muted mb-8">Plan your National Pension System retirement</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
            <InputSlider label="Monthly Contribution" value={monthly} onChange={setMonthly} min={500} max={100000} step={500} prefix="₹" />
            <InputSlider label="Expected Return (p.a.)" value={rate} onChange={setRate} min={4} max={14} step={0.5} unit="%" />
            <InputSlider label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={55} step={1} />
            <InputSlider label="Retirement Age" value={retirementAge} onChange={setRetirementAge} min={Math.max(currentAge + 5, 40)} max={75} step={1} />
            <InputSlider label="Annuity %" value={annuityPct} onChange={setAnnuityPct} min={40} max={100} step={5} unit="%" />
            <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400">
              At least 40% of the corpus must be used to buy an annuity. The remaining 60% is tax-free lump sum withdrawal.
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ResultCard label="Total Corpus" value={formatINR(result.totalCorpus)} highlight />
              <ResultCard label="Est. Monthly Pension" value={formatINRFull(result.estimatedMonthlyPension)} highlight />
              <ResultCard label="Total Invested" value={formatINR(result.totalInvested)} />
              <ResultCard label="Wealth Gained" value={formatINR(result.wealthGained)} />
              <ResultCard label="Lump Sum" value={formatINR(result.lumpSum)} />
              <ResultCard label="Annuity Purchase" value={formatINR(result.annuityAmount)} />
            </div>

            <div className="flex justify-center">
              <PieChart width={200} height={200}>
                <Pie data={pieData} cx={100} cy={100} innerRadius={60} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => formatINR(v)} />
              </PieChart>
            </div>
            <div className="flex justify-center gap-4 text-sm mt-2">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500" /> Invested</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500" /> Lump Sum</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Annuity</span>
            </div>
          </div>
        </div>

        <ShareButton text={shareText} />
      </div>
    </>
  )
}
