import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { NOT_FOUND } from '../routeMeta'

const POPULAR = [
  { to: '/emi-calculator', label: 'EMI Calculator' },
  { to: '/sip-calculator', label: 'SIP Calculator' },
  { to: '/loan-comparison', label: 'Loan Comparison' },
  { to: '/fd-calculator', label: 'FD Calculator' },
  { to: '/blog', label: 'Blog' },
]

// Catch-all route, and what unknown bank and blog slugs render. The server
// already answered with dist/404.html and a 404 status; this keeps noindex on
// after React takes over the head.
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>{NOT_FOUND.title}</title>
        <meta name="description" content={NOT_FOUND.description} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-da-text mb-4">{NOT_FOUND.h1}</h1>
        <p className="text-lg text-da-muted max-w-2xl mx-auto mb-8">{NOT_FOUND.description}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 bg-da-primary hover:bg-da-primary-hover text-white font-semibold rounded-lg transition-colors"
          >
            All Calculators
          </Link>
          {POPULAR.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="px-6 py-3 bg-da-card hover:bg-da-border text-da-text font-semibold rounded-lg border border-da-border transition-colors"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
