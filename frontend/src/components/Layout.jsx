import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/emi-calculator', label: 'EMI' },
  { to: '/sip-calculator', label: 'SIP' },
  { to: '/loan-comparison', label: 'Compare' },
  { to: '/fd-calculator', label: 'FD' },
  { to: '/ppf-calculator', label: 'PPF' },
]

export default function Layout({ children }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-brand-border bg-brand-dark/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white hover:text-brand-primary transition-colors">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="20" fill="#3B82F6"/>
              <text x="50" y="42" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="22">EMI</text>
              <text x="50" y="72" textAnchor="middle" fill="#BFDBFE" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18">Buddy</text>
            </svg>
            EMIBuddy
          </Link>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-brand-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {menuOpen && (
          <div className="md:hidden border-t border-brand-border px-4 py-2 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  location.pathname === link.to
                    ? 'text-brand-primary'
                    : 'text-gray-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-brand-border py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-white mb-3">EMIBuddy</h3>
              <p className="text-sm text-brand-muted">
                Free EMI calculator, SIP calculator, loan comparison and financial
                planning tools for India. No login required.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">Calculators</h3>
              <ul className="space-y-2 text-sm text-brand-muted">
                <li><Link to="/emi-calculator" className="hover:text-brand-primary transition-colors">EMI Calculator</Link></li>
                <li><Link to="/sip-calculator" className="hover:text-brand-primary transition-colors">SIP Calculator</Link></li>
                <li><Link to="/lumpsum-calculator" className="hover:text-brand-primary transition-colors">Lumpsum Calculator</Link></li>
                <li><Link to="/loan-comparison" className="hover:text-brand-primary transition-colors">Loan Comparison</Link></li>
                <li><Link to="/prepayment-calculator" className="hover:text-brand-primary transition-colors">Prepayment Calculator</Link></li>
                <li><Link to="/fd-calculator" className="hover:text-brand-primary transition-colors">FD Calculator</Link></li>
                <li><Link to="/ppf-calculator" className="hover:text-brand-primary transition-colors">PPF Calculator</Link></li>
                <li><Link to="/nps-calculator" className="hover:text-brand-primary transition-colors">NPS Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">Disclaimer</h3>
              <p className="text-sm text-brand-muted">
                Calculations are for informational purposes only. Actual EMI and returns
                may vary based on bank policies and market conditions. Consult your
                financial advisor before making decisions.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-brand-border text-center text-xs text-brand-muted">
            <p>&copy; {new Date().getFullYear()} DoAide. All rights reserved.</p>
            <p className="mt-1">
              A <a href="https://doaide.com" className="text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer">DoAide</a> product.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
