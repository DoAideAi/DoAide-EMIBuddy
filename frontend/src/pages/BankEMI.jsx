import { useParams, Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import SEO from '../components/SEO'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
import { calculateEMI, formatINR, formatINRFull } from '../utils/calculators'

const BANKS = {
  sbi: {
    name: 'State Bank of India (SBI)',
    short: 'SBI',
    homeLoanRate: 8.50,
    carLoanRate: 8.70,
    personalLoanRate: 11.15,
    educationLoanRate: 8.15,
  },
  hdfc: {
    name: 'HDFC Bank',
    short: 'HDFC',
    homeLoanRate: 8.75,
    carLoanRate: 8.80,
    personalLoanRate: 10.75,
    educationLoanRate: 9.50,
  },
  icici: {
    name: 'ICICI Bank',
    short: 'ICICI',
    homeLoanRate: 8.75,
    carLoanRate: 8.85,
    personalLoanRate: 10.75,
    educationLoanRate: 9.85,
  },
  axis: {
    name: 'Axis Bank',
    short: 'Axis',
    homeLoanRate: 8.75,
    carLoanRate: 8.90,
    personalLoanRate: 10.49,
    educationLoanRate: 9.70,
  },
  kotak: {
    name: 'Kotak Mahindra Bank',
    short: 'Kotak',
    homeLoanRate: 8.75,
    carLoanRate: 8.90,
    personalLoanRate: 10.99,
    educationLoanRate: 10.00,
  },
  pnb: {
    name: 'Punjab National Bank (PNB)',
    short: 'PNB',
    homeLoanRate: 8.45,
    carLoanRate: 8.65,
    personalLoanRate: 10.40,
    educationLoanRate: 8.55,
  },
}

const COLORS = ['#3B82F6', '#EF4444']

export default function BankEMI() {
  const { bankSlug } = useParams()
  const bank = BANKS[bankSlug]

  const [principal, setPrincipal] = useState(5000000)
  const [loanType, setLoanType] = useState('home')
  const [tenure, setTenure] = useState(240)

  if (!bank) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Bank not found</h1>
        <Link to="/" className="text-brand-primary hover:underline">Go back home</Link>
      </div>
    )
  }

  const rateMap = { home: bank.homeLoanRate, car: bank.carLoanRate, personal: bank.personalLoanRate, education: bank.educationLoanRate }
  const rate = rateMap[loanType]

  const result = useMemo(() => calculateEMI(principal, rate, tenure), [principal, rate, tenure])

  const pieData = [
    { name: 'Principal', value: result.principal },
    { name: 'Interest', value: result.totalInterest },
  ]

  const shareText = `${bank.short} ${loanType} loan EMI: ${formatINRFull(result.emi)}/month\nLoan: ${formatINR(principal)} | Rate: ${rate}% | Tenure: ${Math.floor(tenure / 12)} years\nTotal Interest: ${formatINR(result.totalInterest)}`

  return (
    <>
      <SEO
        title={`${bank.short} EMI Calculator - Home Loan, Car Loan, Personal Loan`}
        description={`Calculate ${bank.name} loan EMI. Current home loan rate: ${bank.homeLoanRate}%, car loan: ${bank.carLoanRate}%, personal loan: ${bank.personalLoanRate}%. Free EMI calculator.`}
        path={`/banks/${bankSlug}`}
        keywords={`${bank.short} EMI calculator, ${bank.short} home loan, ${bank.short} car loan, ${bank.short} personal loan rate, ${bank.name} EMI`}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">{bank.short} EMI Calculator</h1>
        <p className="text-brand-muted mb-8">Calculate EMI for {bank.name} loans at current rates</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="p-3 rounded-lg border border-brand-border bg-brand-card text-center">
            <p className="text-xs text-brand-muted">Home Loan</p>
            <p className="text-lg font-bold text-white">{bank.homeLoanRate}%</p>
          </div>
          <div className="p-3 rounded-lg border border-brand-border bg-brand-card text-center">
            <p className="text-xs text-brand-muted">Car Loan</p>
            <p className="text-lg font-bold text-white">{bank.carLoanRate}%</p>
          </div>
          <div className="p-3 rounded-lg border border-brand-border bg-brand-card text-center">
            <p className="text-xs text-brand-muted">Personal Loan</p>
            <p className="text-lg font-bold text-white">{bank.personalLoanRate}%</p>
          </div>
          <div className="p-3 rounded-lg border border-brand-border bg-brand-card text-center">
            <p className="text-xs text-brand-muted">Education Loan</p>
            <p className="text-lg font-bold text-white">{bank.educationLoanRate}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
            <div className="flex flex-wrap gap-2 mb-4">
              {['home', 'car', 'personal', 'education'].map(type => (
                <button
                  key={type}
                  onClick={() => setLoanType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                    loanType === type
                      ? 'bg-brand-primary text-white'
                      : 'bg-brand-dark text-brand-muted border border-brand-border'
                  }`}
                >
                  {type} Loan
                </button>
              ))}
            </div>
            <InputSlider label="Loan Amount" value={principal} onChange={setPrincipal} min={100000} max={100000000} step={100000} prefix="₹" />
            <InputSlider label="Tenure (months)" value={tenure} onChange={setTenure} min={6} max={360} step={6} />
            <p className="text-xs text-brand-muted">Interest Rate: <span className="text-brand-primary font-semibold">{rate}% p.a.</span></p>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ResultCard label="Monthly EMI" value={formatINRFull(result.emi)} highlight />
              <ResultCard label="Total Interest" value={formatINR(result.totalInterest)} />
              <ResultCard label="Total Payment" value={formatINR(result.totalPayment)} />
              <ResultCard label="Principal" value={formatINR(result.principal)} />
            </div>
            <div className="flex justify-center">
              <PieChart width={200} height={200}>
                <Pie data={pieData} cx={100} cy={100} innerRadius={60} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => formatINR(v)} />
              </PieChart>
            </div>
          </div>
        </div>

        <ShareButton text={shareText} />

        <div className="mt-12">
          <h2 className="text-lg font-bold text-white mb-4">Other Bank EMI Calculators</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(BANKS).filter(([slug]) => slug !== bankSlug).map(([slug, b]) => (
              <Link
                key={slug}
                to={`/banks/${slug}`}
                className="p-3 rounded-lg border border-brand-border bg-brand-card hover:border-brand-primary/50 text-center text-sm text-brand-muted hover:text-brand-primary transition-all"
              >
                {b.short} EMI
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-400">
          Note: Interest rates shown are indicative and may vary based on CIBIL score, loan amount, and bank policies. Please check with {bank.name} for the latest rates.
        </div>
      </div>
    </>
  )
}
