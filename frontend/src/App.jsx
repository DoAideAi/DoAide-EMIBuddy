import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import EMICalculator from './pages/EMICalculator'
import SIPCalculator from './pages/SIPCalculator'
import LumpsumCalculator from './pages/LumpsumCalculator'
import LoanComparison from './pages/LoanComparison'
import PrepaymentCalculator from './pages/PrepaymentCalculator'
import FDCalculator from './pages/FDCalculator'
import PPFCalculator from './pages/PPFCalculator'
import NPSCalculator from './pages/NPSCalculator'
import AffordabilityCalculator from './pages/AffordabilityCalculator'
import BankEMI from './pages/BankEMI'

export default function App() {
  return (
    <Layout>
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
        <Route path="/banks/:bankSlug" element={<BankEMI />} />
      </Routes>
    </Layout>
  )
}
