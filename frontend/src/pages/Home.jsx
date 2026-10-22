import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const CALCULATORS = [
  {
    to: '/emi-calculator',
    title: 'EMI Calculator',
    desc: 'Calculate monthly EMI for home loan, car loan, personal loan & education loan with amortization schedule.',
    icon: '🏠',
    color: 'from-teal-500/20 to-teal-600/5',
  },
  {
    to: '/sip-calculator',
    title: 'SIP Calculator',
    desc: 'Plan your SIP investments. See how monthly investments grow over time with compounding.',
    icon: '📈',
    color: 'from-green-500/20 to-green-600/5',
  },
  {
    to: '/lumpsum-calculator',
    title: 'Lumpsum Calculator',
    desc: 'Calculate returns on one-time investments in mutual funds, stocks or other instruments.',
    icon: '💰',
    color: 'from-teal-400/20 to-teal-500/5',
  },
  {
    to: '/loan-comparison',
    title: 'Loan Comparison',
    desc: 'Compare up to 3 loans side by side. Find the best deal across banks and NBFCs.',
    icon: '⚖️',
    color: 'from-purple-500/20 to-purple-600/5',
  },
  {
    to: '/prepayment-calculator',
    title: 'Prepayment Calculator',
    desc: 'See how much you save by making part-prepayments on your loan.',
    icon: '⚡',
    color: 'from-cyan-500/20 to-cyan-600/5',
  },
  {
    to: '/fd-calculator',
    title: 'FD Calculator',
    desc: 'Fixed Deposit maturity calculator with tax impact for all compounding frequencies.',
    icon: '🏦',
    color: 'from-sky-500/20 to-sky-600/5',
  },
  {
    to: '/ppf-calculator',
    title: 'PPF Calculator',
    desc: 'Public Provident Fund projections over 15+ years. Tax-free returns at 7.1% p.a.',
    icon: '🛡️',
    color: 'from-emerald-500/20 to-emerald-600/5',
  },
  {
    to: '/nps-calculator',
    title: 'NPS Calculator',
    desc: 'National Pension System retirement projections with annuity & lump sum breakdown.',
    icon: '🎯',
    color: 'from-rose-500/20 to-rose-600/5',
  },
  {
    to: '/affordability-calculator',
    title: 'What Can I Afford?',
    desc: 'Reverse calculator — enter your income and find out the maximum loan you can take.',
    icon: '🔍',
    color: 'from-indigo-500/20 to-indigo-600/5',
  },
  {
    to: '/rd-calculator',
    title: 'RD Calculator',
    desc: 'Recurring Deposit maturity with quarterly compounding — same method banks use.',
    icon: '📆',
    color: 'from-amber-500/20 to-amber-600/5',
  },
  {
    to: '/rent-vs-buy-calculator',
    title: 'Home Loan vs Rent',
    desc: 'Buy a house or keep renting and invest the difference? Compare net worth over time.',
    icon: '🏘️',
    color: 'from-orange-500/20 to-orange-600/5',
  },
  {
    to: '/fd-vs-mutual-fund',
    title: 'FD vs Mutual Fund',
    desc: 'Post-tax comparison: FD at your slab rate vs equity mutual fund with 12.5% LTCG.',
    icon: '🥊',
    color: 'from-lime-500/20 to-lime-600/5',
  },
]

const BANK_LINKS = [
  { to: '/banks/sbi', label: 'SBI Home Loan EMI' },
  { to: '/banks/hdfc', label: 'HDFC Bank Loan EMI' },
  { to: '/banks/icici', label: 'ICICI Bank Loan EMI' },
  { to: '/banks/axis', label: 'Axis Bank Loan EMI' },
  { to: '/banks/kotak', label: 'Kotak Mahindra Loan EMI' },
  { to: '/banks/pnb', label: 'PNB Home Loan EMI' },
]

export default function Home() {
  return (
    <>
      <SEO
        description="Free EMI Calculator, SIP Calculator, Loan Comparison & Financial Planning Tools for India. Calculate home loan EMI, car loan EMI, SIP returns, FD, PPF & NPS. No login required."
        keywords="EMI calculator, SIP calculator, home loan EMI calculator, car loan EMI, loan comparison, FD calculator, PPF calculator, NPS calculator, India financial calculator"
        path="/"
      />

      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-da-text mb-4">
          Free Financial Calculators for <span className="text-da-primary">India</span>
        </h1>
        <p className="text-lg text-da-muted max-w-2xl mx-auto mb-8">
          Calculate EMI, plan SIP investments, compare loans, and make smarter financial
          decisions. No login, no ads, completely free.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            to="/emi-calculator"
            className="px-6 py-3 bg-da-primary hover:bg-da-primary-hover text-white font-semibold rounded-lg transition-colors"
          >
            Calculate EMI
          </Link>
          <Link
            to="/sip-calculator"
            className="px-6 py-3 bg-da-card hover:bg-da-border text-da-text font-semibold rounded-lg border border-da-border transition-colors"
          >
            Plan SIP
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CALCULATORS.map(calc => (
            <Link
              key={calc.to}
              to={calc.to}
              className="group p-6 rounded-xl border border-da-border bg-da-card hover:border-da-primary/50 transition-all"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${calc.color} flex items-center justify-center text-2xl mb-4`}>
                {calc.icon}
              </div>
              <h2 className="text-lg font-bold text-da-text mb-2 group-hover:text-da-primary transition-colors">
                {calc.title}
              </h2>
              <p className="text-sm text-da-muted">{calc.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-da-text mb-6 text-center">Bank-Specific EMI Calculators</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {BANK_LINKS.map(bank => (
            <Link
              key={bank.to}
              to={bank.to}
              className="p-3 rounded-lg border border-da-border bg-da-card hover:border-da-primary/50 text-center text-sm text-da-muted hover:text-da-primary transition-all"
            >
              {bank.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-da-text mb-6 text-center">How EMI is Calculated</h2>
        <div className="p-6 rounded-xl border border-da-border bg-da-card">
          <p className="text-da-muted mb-4">
            EMI (Equated Monthly Installment) is calculated using the standard reducing balance formula:
          </p>
          <div className="bg-da-surface p-4 rounded-lg text-center mb-4">
            <p className="text-da-text font-mono text-lg">
              EMI = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> - 1)
            </p>
          </div>
          <p className="text-da-muted text-sm">
            Where <strong className="text-da-text">P</strong> = Principal loan amount,{' '}
            <strong className="text-da-text">r</strong> = Monthly interest rate (annual rate / 12 / 100),{' '}
            <strong className="text-da-text">n</strong> = Number of monthly installments.
          </p>
        </div>
      </section>
    </>
  )
}
