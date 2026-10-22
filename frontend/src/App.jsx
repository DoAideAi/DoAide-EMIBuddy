import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const EMICalculator = lazy(() => import('./pages/EMICalculator'))
const SIPCalculator = lazy(() => import('./pages/SIPCalculator'))
const LumpsumCalculator = lazy(() => import('./pages/LumpsumCalculator'))
const LoanComparison = lazy(() => import('./pages/LoanComparison'))
const PrepaymentCalculator = lazy(() => import('./pages/PrepaymentCalculator'))
const FDCalculator = lazy(() => import('./pages/FDCalculator'))
const PPFCalculator = lazy(() => import('./pages/PPFCalculator'))
const NPSCalculator = lazy(() => import('./pages/NPSCalculator'))
const AffordabilityCalculator = lazy(() => import('./pages/AffordabilityCalculator'))
const RDCalculator = lazy(() => import('./pages/RDCalculator'))
const RentVsBuyCalculator = lazy(() => import('./pages/RentVsBuyCalculator'))
const FDvsMutualFundCalculator = lazy(() => import('./pages/FDvsMutualFundCalculator'))
const BankEMI = lazy(() => import('./pages/BankEMI'))
const BlogList = lazy(() => import('./pages/BlogList'))
const BlogPost = lazy(() => import('./pages/BlogPost'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="flex justify-center py-16 text-da-muted">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/sip-calculator" element={<SIPCalculator />} />
          <Route path="/lumpsum-calculator" element={<LumpsumCalculator />} />
          <Route path="/loan-comparison" element={<LoanComparison />} />
          <Route path="/prepayment-calculator" element={<PrepaymentCalculator />} />
          <Route path="/fd-calculator" element={<FDCalculator />} />
          <Route path="/ppf-calculator" element={<PPFCalculator />} />
          <Route path="/nps-calculator" element={<NPSCalculator />} />
          <Route path="/affordability-calculator" element={<AffordabilityCalculator />} />
          <Route path="/rd-calculator" element={<RDCalculator />} />
          <Route path="/rent-vs-buy-calculator" element={<RentVsBuyCalculator />} />
          <Route path="/fd-vs-mutual-fund" element={<FDvsMutualFundCalculator />} />
          <Route path="/banks/:bankSlug" element={<BankEMI />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
