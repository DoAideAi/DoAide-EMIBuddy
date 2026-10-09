import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import SEO from '../components/SEO'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
import { calculatePrepayment, formatINR, formatINRFull } from '../utils/calculators'

export default function PrepaymentCalculator() {
  const [principal, setPrincipal] = useState(5000000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(240)
  const [prepayment, setPrepayment] = useState(500000)
  const [prepaymentMonth, setPrepaymentMonth] = useState(24)

  const result = useMemo(
    () => calculatePrepayment(principal, rate, tenure, prepayment, prepaymentMonth),
    [principal, rate, tenure, prepayment, prepaymentMonth]
  )

  const chartData = [
    { name: 'Without Prepayment', interest: result.originalTotalInterest, tenure: result.originalTenure },
    { name: 'With Prepayment', interest: result.newTotalInterest, tenure: result.newTenure },
  ]

  const shareText = `Prepayment of ${formatINR(prepayment)} at month ${prepaymentMonth}\nInterest Saved: ${formatINR(result.interestSaved)}\nMonths Saved: ${result.monthsSaved}\nOriginal Tenure: ${result.originalTenure} months → ${result.newTenure} months`

  return (
    <>
      <SEO
        title="Loan Prepayment Calculator - Save on Interest"
        description="Calculate how much you save by making part-prepayments on your home loan or car loan. See interest savings and reduced tenure."
        path="/prepayment-calculator"
        keywords="loan prepayment calculator, part payment calculator, home loan prepayment, interest savings calculator, EMI prepayment"
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Prepayment Calculator</h1>
        <p className="text-brand-muted mb-8">See how much you save by making a part-prepayment on your loan</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
            <InputSlider label="Loan Amount" value={principal} onChange={setPrincipal} min={100000} max={100000000} step={100000} prefix="₹" />
            <InputSlider label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={1} max={20} step={0.1} unit="%" />
            <InputSlider label="Loan Tenure (months)" value={tenure} onChange={setTenure} min={12} max={360} step={12} />
            <hr className="border-brand-border my-4" />
            <InputSlider label="Prepayment Amount" value={prepayment} onChange={setPrepayment} min={10000} max={principal} step={10000} prefix="₹" />
            <InputSlider label="Prepayment at Month" value={prepaymentMonth} onChange={setPrepaymentMonth} min={1} max={tenure - 1} step={1} />
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ResultCard label="Interest Saved" value={formatINR(result.interestSaved)} highlight />
              <ResultCard label="Months Saved" value={`${result.monthsSaved} months`} highlight />
              <ResultCard label="Original Interest" value={formatINR(result.originalTotalInterest)} />
              <ResultCard label="New Interest" value={formatINR(result.newTotalInterest)} />
              <ResultCard label="Original Tenure" value={`${result.originalTenure} months`} />
              <ResultCard label="New Tenure" value={`${result.newTenure} months`} />
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-xl border border-brand-border bg-brand-card">
          <h2 className="text-lg font-bold text-white mb-4">Before vs After Prepayment</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 12 }} />
              <YAxis tick={{ fill: '#888', fontSize: 12 }} tickFormatter={v => formatINR(v)} />
              <Tooltip formatter={v => formatINRFull(v)} contentStyle={{ backgroundColor: '#141414', border: '1px solid #2a2a2a', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="interest" fill="#EF4444" name="Total Interest" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <ShareButton text={shareText} />
      </div>
    </>
  )
}
