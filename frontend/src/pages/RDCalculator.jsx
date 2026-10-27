import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import SEO from '../components/SEO'
import { ROUTE_META } from '../routeMeta'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
import { calculateRD, formatINR, formatINRFull } from '../utils/calculators'

const COLORS = ['#F59E0B', '#10B981']

export default function RDCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000)
  const [rate, setRate] = useState(6.8)
  const [months, setMonths] = useState(60)

  const result = useMemo(() => calculateRD(monthlyDeposit, rate, months), [monthlyDeposit, rate, months])

  const pieData = [
    { name: 'Total Deposits', value: result.totalInvested },
    { name: 'Interest Earned', value: result.totalInterest },
  ]

  const shareText = `RD of ${formatINR(monthlyDeposit)}/month at ${rate}% for ${months} months\nMaturity: ${formatINRFull(result.maturityAmount)}\nInterest earned: ${formatINRFull(result.totalInterest)}`

  return (
    <>
      <SEO {...ROUTE_META['/rd-calculator']} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">RD Calculator</h1>
        <p className="text-brand-muted mb-8">Calculate Recurring Deposit maturity with quarterly compounding</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
            <InputSlider label="Monthly Deposit" value={monthlyDeposit} onChange={setMonthlyDeposit} min={500} max={200000} step={500} prefix="₹" />
            <InputSlider label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={1} max={10} step={0.1} unit="%" />
            <InputSlider label="Tenure (months)" value={months} onChange={setMonths} min={6} max={120} step={3} />

            <div className="mt-4 p-4 rounded-lg bg-brand-dark border border-brand-border text-xs text-brand-muted leading-relaxed">
              Banks and the post office compound RD interest quarterly on the running balance — this calculator uses the same convention, so the maturity figure matches your bank's quote.
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ResultCard label="Maturity Amount" value={formatINRFull(result.maturityAmount)} highlight />
              <ResultCard label="Total Deposits" value={formatINRFull(result.totalInvested)} />
              <ResultCard label="Interest Earned" value={formatINRFull(result.totalInterest)} />
              <ResultCard label="Tenure" value={`${months} months`} />
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
