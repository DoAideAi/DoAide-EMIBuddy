import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import SEO from '../components/SEO'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
import { calculateLumpsum, formatINR, formatINRFull } from '../utils/calculators'

const COLORS = ['#0D9488', '#14B8A6']

const TOOLTIP_STYLE = { backgroundColor: 'var(--da-card)', border: '1px solid var(--da-border)', borderRadius: '8px', color: 'var(--da-text)' }
const TICK_STYLE = { fill: '#64748B', fontSize: 12 }

export default function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const result = useMemo(() => calculateLumpsum(principal, rate, years), [principal, rate, years])

  const pieData = [
    { name: 'Invested', value: result.principal },
    { name: 'Returns', value: result.wealthGained },
  ]

  const chartData = Array.from({ length: years }, (_, i) => {
    const y = i + 1
    const r = calculateLumpsum(principal, rate, y)
    return { year: y, value: r.futureValue }
  })

  const shareText = `Lumpsum of ${formatINR(principal)} at ${rate}% for ${years} years\nFuture Value: ${formatINR(result.futureValue)}\nWealth Gained: ${formatINR(result.wealthGained)}`

  return (
    <>
      <SEO
        title="Lumpsum Calculator - One-Time Investment Returns"
        description="Free lumpsum investment calculator. Calculate returns on one-time investments in mutual funds, stocks, or other instruments."
        path="/lumpsum-calculator"
        keywords="lumpsum calculator, one time investment calculator, mutual fund lumpsum, investment growth calculator"
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-da-text mb-2">Lumpsum Calculator</h1>
        <p className="text-da-muted mb-8">Calculate returns on your one-time investment</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-da-border bg-da-card">
            <InputSlider label="Investment Amount" value={principal} onChange={setPrincipal} min={10000} max={10000000} step={10000} prefix="₹" />
            <InputSlider label="Expected Return (p.a.)" value={rate} onChange={setRate} min={1} max={30} step={0.5} unit="%" />
            <InputSlider label="Time Period (years)" value={years} onChange={setYears} min={1} max={30} step={1} />
          </div>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <ResultCard label="Future Value" value={formatINR(result.futureValue)} highlight />
              <ResultCard label="Invested" value={formatINR(result.principal)} />
              <ResultCard label="Returns" value={formatINR(result.wealthGained)} />
            </div>

            <div className="flex justify-center mb-4">
              <PieChart width={200} height={200}>
                <Pie data={pieData} cx={100} cy={100} innerRadius={60} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => formatINR(v)} contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-xl border border-da-border bg-da-card">
          <h2 className="text-lg font-bold text-da-text mb-4">Growth Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="year" tick={TICK_STYLE} />
              <YAxis tick={TICK_STYLE} tickFormatter={v => formatINR(v)} />
              <Tooltip formatter={v => formatINRFull(v)} labelFormatter={l => `Year ${l}`} contentStyle={TOOLTIP_STYLE} />
              <Line type="monotone" dataKey="value" stroke="#0D9488" name="Value" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <ShareButton text={shareText} />
      </div>
    </>
  )
}
