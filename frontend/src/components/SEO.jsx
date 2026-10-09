import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, path = '', keywords = '' }) {
  const fullTitle = title ? `${title} | EMIBuddy` : 'EMIBuddy - Free EMI Calculator, SIP Calculator & Loan Tools for India'
  const url = `https://emi.doaide.com${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
