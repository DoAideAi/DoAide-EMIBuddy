// Title, description, h1 and JSON-LD for every route in the sitemap.
//
// Read twice: by each page's <SEO>, and by scripts/prerender-routes.mjs, which
// writes dist/<route>/index.html with these tags already in the head and the
// h1 in #root. Crawlers and link unfurlers that skip JavaScript otherwise saw
// the homepage's title and canonical on every route. Plain data: the build
// script imports it, so no JSX here.
export const SITE = 'https://emi.doaide.com'

const PUBLISHER = { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' }

function webApp(name, path, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url: `${SITE}${path}`,
    description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    publisher: PUBLISHER,
  }
}

function page(path, h1, title, description, keywords) {
  return { path, h1, title: `${title} | DoAide EMIBuddy`, description, keywords, jsonLd: [webApp(h1, path, description)] }
}

export const ROUTE_META = {
  '/': {
    path: '/',
    h1: 'Free Financial Calculators for India',
    title: 'DoAide | EMIBuddy - Free EMI Calculator, SIP Calculator & Loan Tools for India',
    description:
      'Free EMI Calculator, SIP Calculator, Loan Comparison & Financial Planning Tools for India. Calculate home loan EMI, car loan EMI, SIP returns, FD, PPF & NPS. No login required.',
    keywords:
      'EMI calculator, SIP calculator, home loan EMI calculator, car loan EMI, loan comparison, FD calculator, PPF calculator, NPS calculator, India financial calculator',
    jsonLd: [
      webApp(
        'DoAide EMIBuddy',
        '/',
        'Free EMI Calculator, SIP Calculator, Loan Comparison & Financial Planning Tools for India',
      ),
    ],
  },
  '/emi-calculator': page(
    '/emi-calculator',
    'EMI Calculator',
    'EMI Calculator - Home Loan, Car Loan, Personal Loan',
    'Free EMI calculator for home loan, car loan, personal loan and education loan. Calculate monthly EMI, total interest, and get the full amortization schedule.',
    'EMI calculator, home loan EMI calculator, car loan EMI calculator, personal loan EMI, education loan EMI, amortization schedule',
  ),
  '/sip-calculator': page(
    '/sip-calculator',
    'SIP Calculator',
    'SIP Calculator - Systematic Investment Plan Returns',
    'Free SIP calculator. Calculate returns on systematic investment plans in mutual funds. See how your monthly SIP grows with compounding over time.',
    'SIP calculator, mutual fund SIP calculator, SIP returns calculator, step-up SIP calculator, SIP calculator India',
  ),
  '/lumpsum-calculator': page(
    '/lumpsum-calculator',
    'Lumpsum Calculator',
    'Lumpsum Calculator - One-Time Investment Returns',
    'Free lumpsum investment calculator. Calculate returns on one-time investments in mutual funds, stocks, or other instruments.',
    'lumpsum calculator, one time investment calculator, mutual fund lumpsum calculator, lumpsum returns India',
  ),
  '/loan-comparison': page(
    '/loan-comparison',
    'Loan Comparison',
    'Loan Comparison Calculator - Compare Home Loans',
    'Compare up to 3 loans side by side. Find the best EMI deal across banks. Compare interest rates, total interest, and monthly EMI.',
    'loan comparison calculator, compare home loans, home loan comparison India, compare EMI',
  ),
  '/prepayment-calculator': page(
    '/prepayment-calculator',
    'Prepayment Calculator',
    'Loan Prepayment Calculator - Save on Interest',
    'Calculate how much you save by making part-prepayments on your home loan or car loan. See interest savings and reduced tenure.',
    'loan prepayment calculator, home loan prepayment calculator, part payment calculator, prepayment savings',
  ),
  '/fd-calculator': page(
    '/fd-calculator',
    'FD Calculator',
    'FD Calculator - Fixed Deposit Maturity Calculator',
    'Free FD calculator with tax impact. Calculate fixed deposit maturity amount for monthly, quarterly, half-yearly and yearly compounding.',
    'FD calculator, fixed deposit calculator, FD maturity calculator, FD interest calculator India',
  ),
  '/ppf-calculator': page(
    '/ppf-calculator',
    'PPF Calculator',
    'PPF Calculator - Public Provident Fund Returns',
    'Free PPF calculator. Calculate Public Provident Fund maturity amount over 15-50 years at current 7.1% interest rate. Tax-free returns under Section 80C.',
    'PPF calculator, public provident fund calculator, PPF maturity calculator, PPF interest rate 7.1%',
  ),
  '/nps-calculator': page(
    '/nps-calculator',
    'NPS Calculator',
    'NPS Calculator - National Pension System Retirement',
    'Free NPS calculator. Calculate your National Pension System retirement corpus, lump sum amount, and estimated monthly pension.',
    'NPS calculator, national pension system calculator, NPS pension calculator, NPS retirement corpus',
  ),
  '/affordability-calculator': page(
    '/affordability-calculator',
    'What Can I Afford?',
    'What Can I Afford? - Reverse EMI Calculator',
    'Enter your monthly income and find out the maximum loan amount you can afford. Reverse EMI calculator for home loans, car loans.',
    'loan affordability calculator, reverse EMI calculator, how much home loan can I get, home loan eligibility',
  ),
  '/rd-calculator': page(
    '/rd-calculator',
    'RD Calculator',
    'RD Calculator - Recurring Deposit Maturity Calculator',
    'Free RD calculator for India. Calculate recurring deposit maturity amount and interest with quarterly compounding — the same method banks and post office use.',
    'RD calculator, recurring deposit calculator, RD maturity calculator, post office RD calculator',
  ),
  '/rent-vs-buy-calculator': page(
    '/rent-vs-buy-calculator',
    'Home Loan vs Rent Calculator',
    'Home Loan vs Rent Calculator - Buy or Rent in India?',
    'Should you buy a house or keep renting in India? Compare net worth after 5-30 years: EMI, property appreciation, and rent-money invested in mutual funds. Free, no login.',
    'rent vs buy calculator India, home loan vs rent, buy or rent house India, rent vs buy',
  ),
  '/fd-vs-mutual-fund': page(
    '/fd-vs-mutual-fund',
    'FD vs Mutual Fund Calculator',
    'FD vs Mutual Fund Calculator - Post-Tax Comparison India',
    'Compare fixed deposit vs equity mutual fund returns after tax in India. FD interest taxed at your slab vs 12.5% LTCG on equity funds. Free calculator, no login.',
    'FD vs mutual fund calculator, FD vs mutual fund returns, FD vs SIP, post-tax returns India',
  ),
  '/blog': {
    path: '/blog',
    h1: 'Financial Planning Blog',
    title: 'Financial Planning Blog | DoAide EMIBuddy',
    description:
      'Expert guides on home loan EMI, SIP vs lumpsum investing, PPF vs FD comparison, and more. Free financial planning tips for India.',
    keywords:
      'financial blog India, EMI guide, SIP investment tips, PPF guide, FD comparison, personal finance India',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'EMIBuddy Financial Planning Blog',
        url: `${SITE}/blog`,
        description:
          'Expert guides on home loan EMI, SIP vs lumpsum investing, PPF vs FD comparison, and more. Free financial planning tips for India.',
        publisher: PUBLISHER,
      },
    ],
  },
}

export function bankMeta(slug, bank) {
  const path = `/banks/${slug}`
  const h1 = `${bank.short} EMI Calculator`
  const description = `Calculate ${bank.name} loan EMI. Current home loan rate: ${bank.homeLoanRate}%, car loan: ${bank.carLoanRate}%, personal loan: ${bank.personalLoanRate}%. Free EMI calculator.`
  return page(
    path,
    h1,
    `${bank.short} EMI Calculator - Home Loan, Car Loan, Personal Loan`,
    description,
    `${bank.short} EMI calculator, ${bank.short} home loan, ${bank.short} car loan, ${bank.short} personal loan rate, ${bank.name} EMI`,
  )
}

export function blogPostMeta(post) {
  const path = `/blog/${post.slug}`
  const url = `${SITE}${path}`
  return {
    path,
    h1: post.title,
    title: `${post.title} | EMIBuddy`,
    description: post.description,
    keywords: post.keywords,
    type: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        author: { '@type': 'Organization', name: 'EMIBuddy', url: SITE },
        publisher: PUBLISHER,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        url,
        keywords: post.keywords,
        articleSection: post.category,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  }
}

// Every indexable route, in sitemap order.
export function allRoutes(banks, posts) {
  return [
    ...Object.values(ROUTE_META).filter((m) => m.path !== '/blog'),
    ROUTE_META['/blog'],
    ...posts.map(blogPostMeta),
    ...Object.entries(banks).map(([slug, bank]) => bankMeta(slug, bank)),
  ]
}
