import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/emi-calculator', label: 'EMI' },
  { to: '/sip-calculator', label: 'SIP' },
  { to: '/loan-comparison', label: 'Compare' },
  { to: '/fd-calculator', label: 'FD' },
  { to: '/ppf-calculator', label: 'PPF' },
  { to: '/blog', label: 'Blog' },
]

const DOAIDE_PRODUCTS = [
  { href: 'https://doaide.com', label: 'DoAide Home' },
  { href: 'https://emibuddy.doaide.com', label: 'EMIBuddy' },
]

export default function Layout({ children }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-da-bg">
      <header className="border-b border-da-border bg-da-bg/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-da-text hover:text-da-primary transition-colors">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="20" fill="#0D9488"/>
              <text x="50" y="42" textAnchor="middle" fill="white" fontFamily="Inter, Arial, sans-serif" fontWeight="bold" fontSize="22">EMI</text>
              <text x="50" y="72" textAnchor="middle" fill="#99F6E4" fontFamily="Inter, Arial, sans-serif" fontWeight="bold" fontSize="18">Buddy</text>
            </svg>
            <span>DoAide <span className="text-da-muted font-normal">|</span> EMIBuddy</span>
          </Link>

          <button
            className="md:hidden text-da-text p-2"
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
                    ? 'text-da-primary'
                    : 'text-da-muted hover:text-da-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {menuOpen && (
          <div className="md:hidden border-t border-da-border px-4 py-2 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  location.pathname === link.to
                    ? 'text-da-primary'
                    : 'text-da-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-da-border py-8 mt-12 bg-da-surface">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-da-text mb-3">DoAide | EMIBuddy</h3>
              <p className="text-sm text-da-muted">
                Free EMI calculator, SIP calculator, loan comparison and financial
                planning tools for India. No login required.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-da-text mb-3">Calculators</h3>
              <ul className="space-y-2 text-sm text-da-muted">
                <li><Link to="/emi-calculator" className="hover:text-da-primary transition-colors">EMI Calculator</Link></li>
                <li><Link to="/sip-calculator" className="hover:text-da-primary transition-colors">SIP Calculator</Link></li>
                <li><Link to="/lumpsum-calculator" className="hover:text-da-primary transition-colors">Lumpsum Calculator</Link></li>
                <li><Link to="/loan-comparison" className="hover:text-da-primary transition-colors">Loan Comparison</Link></li>
                <li><Link to="/prepayment-calculator" className="hover:text-da-primary transition-colors">Prepayment Calculator</Link></li>
                <li><Link to="/fd-calculator" className="hover:text-da-primary transition-colors">FD Calculator</Link></li>
                <li><Link to="/ppf-calculator" className="hover:text-da-primary transition-colors">PPF Calculator</Link></li>
                <li><Link to="/nps-calculator" className="hover:text-da-primary transition-colors">NPS Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-da-text mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-da-muted">
                <li><Link to="/blog" className="hover:text-da-primary transition-colors">Financial Blog</Link></li>
                <li><Link to="/blog/home-loan-emi-guide-india-2025" className="hover:text-da-primary transition-colors">Home Loan EMI Guide</Link></li>
                <li><Link to="/blog/sip-vs-lumpsum-investment-india" className="hover:text-da-primary transition-colors">SIP vs Lumpsum Guide</Link></li>
                <li><Link to="/blog/ppf-vs-fd-comparison-india" className="hover:text-da-primary transition-colors">PPF vs FD Comparison</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-da-text mb-3">DoAide Products</h3>
              <ul className="space-y-2 text-sm text-da-muted">
                {DOAIDE_PRODUCTS.map(p => (
                  <li key={p.href}>
                    <a href={p.href} className="hover:text-da-primary transition-colors" target="_blank" rel="noopener noreferrer">{p.label}</a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-da-primary/10 border border-da-primary/20">
                <p className="text-xs text-da-muted">
                  Calculations are for informational purposes only. Consult your
                  financial advisor before making decisions.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-da-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-da-muted">
            <p>&copy; {new Date().getFullYear()} DoAide. All rights reserved.</p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-da-primary/10 text-da-primary font-medium">
              A DoAide Product
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
