import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import SEO from '../components/SEO'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
import { calculateFDvsMF, formatINR, formatINRFull } from '../utils/calculators'

export default function FDvsMutualFundCalculator() {
  const [lumpsum, setLumpsum] = useState(1000000)
  const [years, setYears] = useState(10)
  const [fdRate, setFdRate] = useState(7)
  const [taxSlab, setTaxSlab] = useState(30)
  const [mfReturn, setMfReturn] = useState(12)

  const result = useMemo(() => calculateFDvsMF(lumpsum, years, fdRate, taxSlab, mfReturn), [lumpsum, years, fdRate, taxSlab, mfReturn])

  const chartData = [
    { name: 'FD (post-tax)', value: result.fdPostTaxMaturity },
    { name: 'Mutual Fund (post-tax)', value: result.mfPostTaxMaturity },
  ]

  const shareText = `FD vs Mutual Fund: ${formatINR(lumpsum)} for ${years} years\nFD at ${fdRate}% (post-tax): ${formatINRFull(result.fdPostTaxMaturity)}\nMF at ${mfReturn}% (post-LTCG): ${formatINRFull(result.mfPostTaxMaturity)}\n${result.mfWins ? 'Mutual fund' : 'FD'} wins by ${formatINR(result.difference)}`

  return (
    <>
      <SEO
        title="FD vs Mutual Fund Calculator - Post-Tax Comparison India"
        description="Compare fixed deposit vs equity mutual fund returns after tax in India. FD interest taxed at your slab vs 12.5% LTCG on equity funds. Free calculator, no login."
        path="/fd-vs-mutual-fund"
        keywords="FD vs mutual fund, FD vs mutual fund calculator, fixed deposit vs mutual fund India, FD vs equity returns after tax, where to invest FD or mutual fund"
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">FD vs Mutual Fund Calculator</h1>
        <p className="text-brand-muted mb-8">Post-tax comparison: FD interest at your slab rate vs equity LTCG at 12.5%</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-card">
            <InputSlider label="Investment Amount" value={lumpsum} onChange={setLumpsum} min={50000} max={20000000} step={50000} prefix="₹" />
            <InputSlider label="Investment Period (years)" value={years} onChange={setYears} min={1} max={30} step={1} />
            <InputSlider label="FD Interest Rate (p.a.)" value={fdRate} onChange={setFdRate} min={4} max={10} step={0.1} unit="%" />
            <InputSlider label="Your Tax Slab" value={taxSlab} onChange={setTaxSlab} min={0} max={30} step={5} unit="%" />
            <InputSlider label="Expected MF Return (p.a.)" value={mfReturn} onChange={setMfReturn} min={6} max={18} step={0.5} unit="%" />

            <div className="mt-4 p-4 rounded-lg bg-brand-dark border border-brand-border text-xs text-brand-muted leading-relaxed">
              FD interest is added to your income and taxed at your slab every year. Equity mutual fund gains held over 1 year are taxed at
              12.5% LTCG above the ₹1.25 lakh annual exemption (Budget 2024 rules). Market returns are not guaranteed — this compares
              expected values, not outcomes.
            </div>
          </div>

          <div>
            <div
              className={`mb-6 p-5 rounded-xl border text-center ${
                result.mfWins ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-amber-500/40 bg-amber-500/10'
              }`}
            >
              <p className="text-sm text-brand-muted mb-1">After {years} years (post-tax)</p>
              <p className="text-2xl font-bold text-white">{result.mfWins ? '📈 Mutual fund wins' : '🏦 FD wins'}</p>
              <p className="text-brand-muted mt-1">by {formatINRFull(result.difference)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <ResultCard label="FD Maturity (pre-tax)" value={formatINRFull(result.fdMaturity)} />
              <ResultCard label="FD Post-Tax" value={formatINRFull(result.fdPostTaxMaturity)} highlight={!result.mfWins} />
              <ResultCard label="MF Corpus (pre-tax)" value={formatINRFull(result.mfCorpus)} />
              <ResultCard label="MF Post-LTCG" value={formatINRFull(result.mfPostTaxMaturity)} highlight={result.mfWins} />
              <ResultCard label="Tax on FD Interest" value={formatINRFull(result.fdTax)} />
              <ResultCard label="LTCG Tax on MF" value={formatINRFull(result.mfTax)} />
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
                  <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fill: '#94A3B8', fontSize: 11 }} width={70} />
                  <Tooltip formatter={(v) => formatINRFull(v)} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="value" fill="#14B8A6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <ShareButton text={shareText} />
      </div>
    </>
  )
}
