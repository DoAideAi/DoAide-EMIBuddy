import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import SEO from '../components/SEO'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
import { calculateEMI, generateAmortization, formatINR, formatINRFull } from '../utils/calculators'

const LOAN_TYPES = [
  { value: 'home', label: 'Home Loan', defaultAmount: 5000000, maxAmount: 100000000, defaultRate: 8.5, defaultTenure: 240 },
  { value: 'car', label: 'Car Loan', defaultAmount: 800000, maxAmount: 10000000, defaultRate: 9.5, defaultTenure: 60 },
  { value: 'personal', label: 'Personal Loan', defaultAmount: 500000, maxAmount: 5000000, defaultRate: 12, defaultTenure: 36 },
  { value: 'education', label: 'Education Loan', defaultAmount: 1000000, maxAmount: 20000000, defaultRate: 10, defaultTenure: 84 },
]

const COLORS = ['#3B82F6', '#EF4444']

export default function EMICalculator() {
  const [loanType, setLoanType] = useState('home')
  const config = LOAN_TYPES.find(t => t.value === loanType)
  const [principal, setPrincipal] = useState(config.defaultAmount)
  const [rate, setRate] = useState(config.defaultRate)
  const [tenure, setTenure] = useState(config.defaultTenure)
  const [showSchedule, setShowSchedule] = useState(false)

  const result = useMemo(() => calculateEMI(principal, rate, tenure), [principal, rate, tenure])
  const schedule = useMemo(() => generateAmortization(principal, rate, tenure), [principal, rate, tenure])

  const pieData = [
    { name: 'Principal', value: result.principal },
    { name: 'Interest', value: result.totalInterest },
  ]

  const chartData = schedule.filter((_, i) => i % (tenure > 120 ? 12 : tenure > 60 ? 6 : 3) === 0 || i === schedule.length - 1).map(row => ({
    month: row.month,
    principal: row.principal,
    interest: row.interest,
    balance: row.balance,
  }))

  const handleLoanTypeChange = (type) => {
    const c = LOAN_TYPES.find(t => t.value === type)
    setLoanType(type)
    setPrincipal(c.defaultAmount)
    setRate(c.defaultRate)
    setTenure(c.defaultTenure)
  }

  const handleDownloadPDF = async () => {
    try {
      const res = await fetch('/api/calculators/emi/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ principal, annual_rate: rate, tenure_months: tenure, loan_type: loanType }),
      })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'amortization-schedule.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('PDF generation failed. Please try again.')
    }
  }

  const shareText = `My ${config.label} EMI: ${formatINRFull(result.emi)}/month\nLoan: ${formatINR(principal)} | Rate: ${rate}% | Tenure: ${Math.floor(tenure / 12)}yr ${tenure % 12}mo\nTotal Interest: ${formatINR(result.totalInterest)}`

  return (
    <>
      <SEO
        title="EMI Calculator - Home Loan, Car Loan, Personal Loan"
        description={`Free EMI calculator for ${config.label.toLowerCase()}. Calculate monthly EMI, total interest, and get amortization schedule. Compare home loan, car loan, personal loan and education loan EMI.`}
        path="/emi-calculator"
        keywords="EMI calculator, home loan EMI, car loan EMI, personal loan EMI, education loan EMI, amortization schedule, monthly installment calculator"
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">EMI Calculator</h1>
        <p className="text-brand-muted mb-8">Calculate your Equated Monthly Installment for any loan type</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {LOAN_TYPES.map(type => (
            <button
              key={type.value}
              onClick={() => handleLoanTypeChange(type.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                loanType === type.value
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-card text-brand-muted border border-brand-border hover:border-brand-primary/50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
            <InputSlider
              label="Loan Amount"
              value={principal}
              onChange={setPrincipal}
              min={100000}
              max={config.maxAmount}
              step={100000}
              prefix="₹"
            />
            <InputSlider
              label="Interest Rate (p.a.)"
              value={rate}
              onChange={setRate}
              min={1}
              max={30}
              step={0.1}
              unit="%"
            />
            <InputSlider
              label="Loan Tenure (months)"
              value={tenure}
              onChange={setTenure}
              min={6}
              max={360}
              step={6}
            />
            <p className="text-xs text-brand-muted mt-2">
              = {Math.floor(tenure / 12)} years {tenure % 12 > 0 ? `${tenure % 12} months` : ''}
            </p>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ResultCard label="Monthly EMI" value={formatINRFull(result.emi)} highlight />
              <ResultCard label="Total Interest" value={formatINR(result.totalInterest)} />
              <ResultCard label="Total Payment" value={formatINR(result.totalPayment)} />
              <ResultCard label="Principal" value={formatINR(result.principal)} />
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
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500" /> Principal</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500" /> Interest</span>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-xl border border-brand-border bg-brand-card">
          <h2 className="text-lg font-bold text-white mb-4">Payment Breakdown Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <XAxis dataKey="month" tick={{ fill: '#888', fontSize: 12 }} label={{ value: 'Month', position: 'insideBottom', offset: -5, fill: '#888' }} />
              <YAxis tick={{ fill: '#888', fontSize: 12 }} tickFormatter={v => formatINR(v)} />
              <Tooltip formatter={v => formatINRFull(v)} labelFormatter={l => `Month ${l}`} contentStyle={{ backgroundColor: '#141414', border: '1px solid #2a2a2a', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="principal" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Principal" />
              <Area type="monotone" dataKey="interest" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} name="Interest" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="px-4 py-2 bg-brand-card hover:bg-brand-border text-white text-sm rounded-lg border border-brand-border transition-colors"
          >
            {showSchedule ? 'Hide' : 'Show'} Amortization Schedule
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-sm rounded-lg transition-colors"
          >
            Download PDF
          </button>
        </div>

        <ShareButton text={shareText} />

        {showSchedule && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="py-3 px-3 text-left text-brand-muted">Month</th>
                  <th className="py-3 px-3 text-right text-brand-muted">EMI</th>
                  <th className="py-3 px-3 text-right text-brand-muted">Principal</th>
                  <th className="py-3 px-3 text-right text-brand-muted">Interest</th>
                  <th className="py-3 px-3 text-right text-brand-muted">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map(row => (
                  <tr key={row.month} className="border-b border-brand-border/50 hover:bg-brand-border/20">
                    <td className="py-2 px-3 text-white">{row.month}</td>
                    <td className="py-2 px-3 text-right text-white">{formatINRFull(row.emi)}</td>
                    <td className="py-2 px-3 text-right text-blue-400">{formatINRFull(row.principal)}</td>
                    <td className="py-2 px-3 text-right text-red-400">{formatINRFull(row.interest)}</td>
                    <td className="py-2 px-3 text-right text-brand-muted">{formatINRFull(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
