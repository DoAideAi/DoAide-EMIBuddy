import { useState, useMemo } from 'react'
import SEO from '../components/SEO'
import { ROUTE_META } from '../routeMeta'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
import { calculateRentVsBuy, formatINR, formatINRFull } from '../utils/calculators'

export default function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState(8000000)
  const [downPaymentPct, setDownPaymentPct] = useState(20)
  const [loanRate, setLoanRate] = useState(8.5)
  const [loanTenureYears, setLoanTenureYears] = useState(20)
  const [monthlyRent, setMonthlyRent] = useState(25000)
  const [rentIncreasePct, setRentIncreasePct] = useState(5)
  const [appreciationPct, setAppreciationPct] = useState(5)
  const [investmentReturnPct, setInvestmentReturnPct] = useState(12)
  const [years, setYears] = useState(10)

  const result = useMemo(
    () => calculateRentVsBuy({ homePrice, downPaymentPct, loanRate, loanTenureYears, monthlyRent, rentIncreasePct, appreciationPct, investmentReturnPct, years }),
    [homePrice, downPaymentPct, loanRate, loanTenureYears, monthlyRent, rentIncreasePct, appreciationPct, investmentReturnPct, years]
  )

  const shareText = `Home loan vs rent over ${years} years (home ${formatINR(homePrice)}, rent ${formatINR(monthlyRent)}/mo):\nBuying net worth: ${formatINRFull(result.buyerNetWorth)}\nRenting + investing: ${formatINRFull(result.renterNetWorth)}\nVerdict: ${result.buyingWins ? 'Buying' : 'Renting'} wins by ${formatINR(result.difference)}`

  return (
    <>
      <SEO {...ROUTE_META['/rent-vs-buy-calculator']} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Home Loan vs Rent Calculator</h1>
        <p className="text-brand-muted mb-8">
          Compare your net worth after {years} years: buy with a home loan, or keep renting and invest the difference
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
            <h2 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Buying</h2>
            <InputSlider label="Home Price" value={homePrice} onChange={setHomePrice} min={2000000} max={50000000} step={500000} prefix="₹" />
            <InputSlider label="Down Payment" value={downPaymentPct} onChange={setDownPaymentPct} min={10} max={50} step={5} unit="%" />
            <InputSlider label="Loan Interest Rate" value={loanRate} onChange={setLoanRate} min={6} max={12} step={0.1} unit="%" />
            <InputSlider label="Loan Tenure (years)" value={loanTenureYears} onChange={setLoanTenureYears} min={5} max={30} step={1} />
            <InputSlider label="Property Appreciation (p.a.)" value={appreciationPct} onChange={setAppreciationPct} min={0} max={12} step={0.5} unit="%" />

            <h2 className="text-sm font-semibold text-white mt-6 mb-4 uppercase tracking-wide">Renting</h2>
            <InputSlider label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} min={5000} max={200000} step={1000} prefix="₹" />
            <InputSlider label="Annual Rent Increase" value={rentIncreasePct} onChange={setRentIncreasePct} min={0} max={10} step={1} unit="%" />
            <InputSlider label="Investment Return (p.a.)" value={investmentReturnPct} onChange={setInvestmentReturnPct} min={4} max={18} step={0.5} unit="%" />

            <h2 className="text-sm font-semibold text-white mt-6 mb-4 uppercase tracking-wide">Horizon</h2>
            <InputSlider label="Compare After (years)" value={years} onChange={setYears} min={3} max={30} step={1} />
          </div>

          <div>
            <div
              className={`mb-6 p-5 rounded-xl border text-center ${
                result.buyingWins ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-sky-500/40 bg-sky-500/10'
              }`}
            >
              <p className="text-sm text-brand-muted mb-1">After {years} years</p>
              <p className="text-2xl font-bold text-white">
                {result.buyingWins ? '🏠 Buying wins' : '📈 Renting + investing wins'}
              </p>
              <p className="text-brand-muted mt-1">by {formatINRFull(result.difference)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <ResultCard label="Buyer Net Worth" value={formatINRFull(result.buyerNetWorth)} highlight={result.buyingWins} />
              <ResultCard label="Renter Net Worth" value={formatINRFull(result.renterNetWorth)} highlight={!result.buyingWins} />
              <ResultCard label="Monthly EMI" value={formatINRFull(result.emi)} />
              <ResultCard label="Down Payment" value={formatINRFull(result.downPayment)} />
              <ResultCard label="Property Value Then" value={formatINRFull(result.propertyValue)} />
              <ResultCard label="Loan Outstanding Then" value={formatINRFull(result.loanOutstanding)} />
              <ResultCard label="Total Rent Paid" value={formatINRFull(result.totalRentPaid)} />
              <ResultCard label="Total EMI Paid" value={formatINRFull(result.totalEmiPaid)} />
            </div>

            <div className="p-4 rounded-lg bg-brand-dark border border-brand-border text-xs text-brand-muted leading-relaxed">
              Buyer net worth = appreciated property value minus outstanding loan. Renter net worth = down payment plus every month's
              (EMI − rent) difference, invested at your chosen return. Registration charges, maintenance, and tax benefits under 80C/24(b)
              are not modelled — treat the result as a directional comparison, not financial advice.
            </div>
          </div>
        </div>

        <ShareButton text={shareText} />
      </div>
    </>
  )
}
