import { useState, useMemo } from 'react'
import SEO from '../components/SEO'
import { ROUTE_META } from '../routeMeta'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
import { calculateAffordability, calculateEMI, formatINR, formatINRFull } from '../utils/calculators'

export default function AffordabilityCalculator() {
  const [income, setIncome] = useState(100000)
  const [existingEmis, setExistingEmis] = useState(0)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(240)
  const [ratio, setRatio] = useState(50)

  const result = useMemo(
    () => calculateAffordability(income, existingEmis, rate, tenure, ratio),
    [income, existingEmis, rate, tenure, ratio]
  )

  const verify = useMemo(() => {
    if (result.maxLoan <= 0) return null
    return calculateEMI(result.maxLoan, rate, tenure)
  }, [result.maxLoan, rate, tenure])

  const shareText = `With ₹${income.toLocaleString('en-IN')}/month income:\nMax Loan: ${formatINR(result.maxLoan)}\nMax EMI: ${formatINRFull(result.maxEmi)}/month\nAt ${rate}% for ${Math.floor(tenure / 12)} years`

  return (
    <>
      <SEO {...ROUTE_META['/affordability-calculator']} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">What Can I Afford?</h1>
        <p className="text-brand-muted mb-8">Find out the maximum loan you can take based on your income</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
            <InputSlider label="Monthly Income" value={income} onChange={setIncome} min={10000} max={1000000} step={5000} prefix="₹" />
            <InputSlider label="Existing EMIs" value={existingEmis} onChange={setExistingEmis} min={0} max={income} step={1000} prefix="₹" />
            <InputSlider label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={1} max={20} step={0.1} unit="%" />
            <InputSlider label="Desired Tenure (months)" value={tenure} onChange={setTenure} min={12} max={360} step={12} />
            <InputSlider label="EMI-to-Income Ratio" value={ratio} onChange={setRatio} min={20} max={70} step={5} unit="%" />
            <p className="text-xs text-brand-muted mt-2">
              Banks typically allow 40-50% of net income towards total EMIs.
            </p>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ResultCard label="Maximum Loan" value={formatINR(result.maxLoan)} highlight />
              <ResultCard label="Maximum EMI" value={formatINRFull(result.maxEmi)} highlight />
            </div>

            {verify && (
              <div className="p-4 rounded-lg border border-brand-border bg-brand-card">
                <h3 className="font-semibold text-white mb-3">Verification</h3>
                <p className="text-sm text-brand-muted">
                  A loan of <span className="text-white font-medium">{formatINR(result.maxLoan)}</span> at{' '}
                  <span className="text-white font-medium">{rate}%</span> for{' '}
                  <span className="text-white font-medium">{Math.floor(tenure / 12)} years</span> gives an EMI of{' '}
                  <span className="text-brand-primary font-medium">{formatINRFull(verify.emi)}</span>/month.
                </p>
                <p className="text-sm text-brand-muted mt-2">
                  Total interest: <span className="text-white">{formatINR(verify.totalInterest)}</span> |
                  Total payment: <span className="text-white">{formatINR(verify.totalPayment)}</span>
                </p>
              </div>
            )}

            {result.maxLoan <= 0 && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                Your existing EMIs exceed the budget. Consider reducing existing obligations or increasing the EMI-to-income ratio.
              </div>
            )}
          </div>
        </div>

        <ShareButton text={shareText} />
      </div>
    </>
  )
}
