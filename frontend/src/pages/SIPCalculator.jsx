import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import SEO from '../components/SEO'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
import { calculateSIP, formatINR, formatINRFull } from '../utils/calculators'

const COLORS = ['#10B981', '#3B82F6']

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const result = useMemo(() => calculateSIP(monthly, rate, years), [monthly, rate, years])

  const pieData = [
    { name: 'Invested', value: result.totalInvested },
    { name: 'Returns', value: result.wealthGained },
  ]

  const chartData = Array.from({ length: years }, (_, i) => {
    const y = i + 1
    const r = calculateSIP(monthly, rate, y)
    return { year: y, invested: r.totalInvested, value: r.futureValue }
  })

  const shareText = `SIP of ${formatINR(monthly)}/month at ${rate}% for ${years} years\nTotal Invested: ${formatINR(result.totalInvested)}\nFuture Value: ${formatINR(result.futureValue)}\nWealth Gained: ${formatINR(result.wealthGained)}`

  return (
    <>
      <SEO
        title="SIP Calculator - Systematic Investment Plan Returns"
        description="Free SIP calculator. Calculate returns on systematic investment plans in mutual funds. See how your monthly SIP grows with compounding over time."
        path="/sip-calculator"
        keywords="SIP calculator, systematic investment plan, mutual fund SIP, SIP returns calculator, monthly investment calculator"
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">SIP Calculator</h1>
        <p className="text-brand-muted mb-8">See how your Systematic Investment Plan grows over time</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
            <InputSlider label="Monthly Investment" value={monthly} onChange={setMonthly} min={500} max={500000} step={500} prefix="₹" />
            <InputSlider label="Expected Return (p.a.)" value={rate} onChange={setRate} min={1} max={30} step={0.5} unit="%" />
            <InputSlider label="Time Period (years)" value={years} onChange={setYears} min={1} max={40} step={1} />
          </div>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <ResultCard label="Future Value" value={formatINR(result.futureValue)} highlight />
              <ResultCard label="Total Invested" value={formatINR(result.totalInvested)} />
              <ResultCard label="Wealth Gained" value={formatINR(result.wealthGained)} />
            </div>

            <div className="flex justify-center mb-4">
              <PieChart width={200} height={200}>
                <Pie data={pieData} cx={100} cy={100} innerRadius={60} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => formatINR(v)} />
              </PieChart>
            </div>
            <div className="flex justify-center gap-6 text-sm">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Invested</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500" /> Returns</span>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-xl border border-brand-border bg-brand-card">
          <h2 className="text-lg font-bold text-white mb-4">Growth Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="year" tick={{ fill: '#888', fontSize: 12 }} label={{ value: 'Years', position: 'insideBottom', offset: -5, fill: '#888' }} />
              <YAxis tick={{ fill: '#888', fontSize: 12 }} tickFormatter={v => formatINR(v)} />
              <Tooltip formatter={v => formatINRFull(v)} labelFormatter={l => `Year ${l}`} contentStyle={{ backgroundColor: '#141414', border: '1px solid #2a2a2a', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="invested" stroke="#10B981" name="Invested" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" name="Future Value" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <ShareButton text={shareText} />
      </div>
    </>
  )
}
