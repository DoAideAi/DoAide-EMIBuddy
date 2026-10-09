import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const CALCULATORS = [
  {
    to: '/emi-calculator',
    title: 'EMI Calculator',
    desc: 'Calculate monthly EMI for home loan, car loan, personal loan & education loan with amortization schedule.',
    icon: '🏠',
    color: 'from-blue-500/20 to-blue-600/5',
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
    color: 'from-yellow-500/20 to-yellow-600/5',
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
    color: 'from-orange-500/20 to-orange-600/5',
  },
  {
    to: '/fd-calculator',
    title: 'FD Calculator',
    desc: 'Fixed Deposit maturity calculator with tax impact for all compounding frequencies.',
    icon: '🏦',
    color: 'from-cyan-500/20 to-cyan-600/5',
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
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Free Financial Calculators for <span className="text-brand-primary">India</span>
        </h1>
        <p className="text-lg text-brand-muted max-w-2xl mx-auto mb-8">
          Calculate EMI, plan SIP investments, compare loans, and make smarter financial
          decisions. No login, no ads, completely free.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            to="/emi-calculator"
            className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold rounded-lg transition-colors"
          >
            Calculate EMI
          </Link>
          <Link
            to="/sip-calculator"
            className="px-6 py-3 bg-brand-card hover:bg-brand-border text-white font-semibold rounded-lg border border-brand-border transition-colors"
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
              className="group p-6 rounded-xl border border-brand-border bg-brand-card hover:border-brand-primary/50 transition-all"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${calc.color} flex items-center justify-center text-2xl mb-4`}>
                {calc.icon}
              </div>
              <h2 className="text-lg font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                {calc.title}
              </h2>
              <p className="text-sm text-brand-muted">{calc.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Bank-Specific EMI Calculators</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {BANK_LINKS.map(bank => (
            <Link
              key={bank.to}
              to={bank.to}
              className="p-3 rounded-lg border border-brand-border bg-brand-card hover:border-brand-primary/50 text-center text-sm text-brand-muted hover:text-brand-primary transition-all"
            >
              {bank.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">How EMI is Calculated</h2>
        <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
          <p className="text-brand-muted mb-4">
            EMI (Equated Monthly Installment) is calculated using the standard reducing balance formula:
          </p>
          <div className="bg-brand-dark p-4 rounded-lg text-center mb-4">
            <p className="text-white font-mono text-lg">
              EMI = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> - 1)
            </p>
          </div>
          <p className="text-brand-muted text-sm">
            Where <strong className="text-white">P</strong> = Principal loan amount,{' '}
            <strong className="text-white">r</strong> = Monthly interest rate (annual rate / 12 / 100),{' '}
            <strong className="text-white">n</strong> = Number of monthly installments.
          </p>
        </div>
      </section>
    </>
  )
}
