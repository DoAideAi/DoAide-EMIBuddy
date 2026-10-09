import { describe, it, expect } from 'vitest'
import {
  calculateEMI,
  generateAmortization,
  calculateSIP,
  calculateLumpsum,
  calculateFD,
  calculatePPF,
  calculateNPS,
  calculatePrepayment,
  calculateAffordability,
  formatINR,
  formatINRFull,
} from '../utils/calculators'

describe('calculateEMI', () => {
  it('calculates home loan EMI correctly', () => {
    const result = calculateEMI(5000000, 8.5, 240)
    expect(result.emi).toBeGreaterThan(43000)
    expect(result.emi).toBeLessThan(44000)
    expect(result.totalInterest).toBeGreaterThan(0)
    expect(result.totalPayment).toBeCloseTo(result.emi * 240, -2)
  })

  it('handles zero interest rate', () => {
    const result = calculateEMI(1200000, 0, 12)
    expect(result.emi).toBe(100000)
    expect(result.totalInterest).toBe(0)
    expect(result.totalPayment).toBe(1200000)
  })

  it('calculates car loan EMI', () => {
    const result = calculateEMI(800000, 9.5, 60)
    expect(result.emi).toBeGreaterThan(16000)
    expect(result.emi).toBeLessThan(17000)
  })
})

describe('generateAmortization', () => {
  it('returns correct number of rows', () => {
    const schedule = generateAmortization(1000000, 8, 120)
    expect(schedule).toHaveLength(120)
  })

  it('ends with near-zero balance', () => {
    const schedule = generateAmortization(5000000, 8.5, 240)
    expect(schedule[schedule.length - 1].balance).toBeLessThan(1)
  })

  it('first month interest is highest', () => {
    const schedule = generateAmortization(1000000, 10, 60)
    expect(schedule[0].interest).toBeGreaterThan(schedule[schedule.length - 1].interest)
  })
})

describe('calculateSIP', () => {
  it('calculates basic SIP returns', () => {
    const result = calculateSIP(10000, 12, 10)
    expect(result.totalInvested).toBe(1200000)
    expect(result.futureValue).toBeGreaterThan(1200000)
    expect(result.wealthGained).toBeGreaterThan(0)
  })

  it('handles zero return', () => {
    const result = calculateSIP(10000, 0, 10)
    expect(result.futureValue).toBe(result.totalInvested)
    expect(result.wealthGained).toBe(0)
  })
})

describe('calculateLumpsum', () => {
  it('calculates basic lumpsum returns', () => {
    const result = calculateLumpsum(100000, 10, 5)
    expect(result.futureValue).toBeCloseTo(161051, -1)
  })

  it('handles zero return', () => {
    const result = calculateLumpsum(100000, 0, 10)
    expect(result.futureValue).toBe(100000)
  })
})

describe('calculateFD', () => {
  it('calculates quarterly compounding', () => {
    const result = calculateFD(100000, 7, 5, 'quarterly', 0)
    expect(result.maturityAmount).toBeGreaterThan(140000)
    expect(result.tax).toBe(0)
  })

  it('applies tax correctly', () => {
    const result = calculateFD(500000, 7, 3, 'quarterly', 20)
    expect(result.tax).toBeGreaterThan(0)
    expect(result.postTaxMaturity).toBeLessThan(result.maturityAmount)
  })

  it('yearly compounding at 10% for 1 year', () => {
    const result = calculateFD(100000, 10, 1, 'yearly', 0)
    expect(result.maturityAmount).toBeCloseTo(110000, 0)
  })
})

describe('calculatePPF', () => {
  it('calculates 15-year PPF', () => {
    const result = calculatePPF(150000, 15)
    expect(result.yearlyData).toHaveLength(15)
    expect(result.maturityAmount).toBeGreaterThan(result.totalInvested)
    expect(result.totalInvested).toBe(150000 * 15)
  })

  it('extended tenure works', () => {
    const result = calculatePPF(100000, 25)
    expect(result.yearlyData).toHaveLength(25)
  })
})

describe('calculateNPS', () => {
  it('calculates basic NPS projections', () => {
    const result = calculateNPS(5000, 10, 30, 60, 40)
    expect(result.totalCorpus).toBeGreaterThan(result.totalInvested)
    expect(result.annuityAmount).toBeCloseTo(result.totalCorpus * 0.4, -2)
    expect(result.lumpSum).toBeCloseTo(result.totalCorpus * 0.6, -2)
    expect(result.estimatedMonthlyPension).toBeGreaterThan(0)
  })
})

describe('calculatePrepayment', () => {
  it('shows savings from prepayment', () => {
    const result = calculatePrepayment(5000000, 8.5, 240, 500000, 24)
    expect(result.monthsSaved).toBeGreaterThan(0)
    expect(result.interestSaved).toBeGreaterThan(0)
    expect(result.newTenure).toBeLessThan(result.originalTenure)
  })
})

describe('calculateAffordability', () => {
  it('calculates max loan from income', () => {
    const result = calculateAffordability(100000, 0, 8.5, 240, 50)
    expect(result.maxLoan).toBeGreaterThan(0)
    expect(result.maxEmi).toBe(50000)
  })

  it('handles exhausted budget', () => {
    const result = calculateAffordability(100000, 60000, 8.5, 240, 50)
    expect(result.maxLoan).toBe(0)
    expect(result.maxEmi).toBe(0)
  })
})

describe('formatINR', () => {
  it('formats crores', () => {
    expect(formatINR(15000000)).toContain('Cr')
  })

  it('formats lakhs', () => {
    expect(formatINR(500000)).toContain('L')
  })

  it('formats small amounts', () => {
    expect(formatINR(50000)).toContain('50,000')
  })

  it('handles null', () => {
    expect(formatINR(null)).toBe('₹0')
  })
})

describe('formatINRFull', () => {
  it('formats with Indian commas', () => {
    const result = formatINRFull(1234567.89)
    expect(result).toContain('₹')
    expect(result).toContain('12')
  })

  it('handles null', () => {
    expect(formatINRFull(null)).toBe('₹0')
  })
})
