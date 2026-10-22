export function calculateEMI(principal, annualRate, tenureMonths) {
  if (annualRate === 0) {
    const emi = principal / tenureMonths
    return { emi, totalPayment: principal, totalInterest: 0, principal }
  }
  const monthlyRate = annualRate / 12 / 100
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  const totalPayment = emi * tenureMonths
  const totalInterest = totalPayment - principal
  return {
    emi: Math.round(emi * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    principal,
  }
}

export function generateAmortization(principal, annualRate, tenureMonths) {
  if (annualRate === 0) {
    const emi = principal / tenureMonths
    const schedule = []
    let balance = principal
    for (let m = 1; m <= tenureMonths; m++) {
      balance -= emi
      schedule.push({
        month: m,
        emi: Math.round(emi * 100) / 100,
        principal: Math.round(emi * 100) / 100,
        interest: 0,
        balance: Math.round(Math.max(balance, 0) * 100) / 100,
      })
    }
    return schedule
  }

  const monthlyRate = annualRate / 12 / 100
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)

  const schedule = []
  let balance = principal
  for (let m = 1; m <= tenureMonths; m++) {
    const interest = balance * monthlyRate
    const principalPart = emi - interest
    balance -= principalPart
    schedule.push({
      month: m,
      emi: Math.round(emi * 100) / 100,
      principal: Math.round(principalPart * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(Math.max(balance, 0) * 100) / 100,
    })
  }
  return schedule
}

export function calculateSIP(monthlyInvestment, annualReturn, tenureYears) {
  const months = tenureYears * 12
  const monthlyRate = annualReturn / 12 / 100
  let futureValue
  if (monthlyRate === 0) {
    futureValue = monthlyInvestment * months
  } else {
    futureValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate)
  }
  const totalInvested = monthlyInvestment * months
  return {
    futureValue: Math.round(futureValue * 100) / 100,
    totalInvested: Math.round(totalInvested * 100) / 100,
    wealthGained: Math.round((futureValue - totalInvested) * 100) / 100,
  }
}

export function calculateLumpsum(principal, annualReturn, tenureYears) {
  const futureValue = principal * Math.pow(1 + annualReturn / 100, tenureYears)
  return {
    futureValue: Math.round(futureValue * 100) / 100,
    principal,
    wealthGained: Math.round((futureValue - principal) * 100) / 100,
  }
}

export function calculateFD(principal, annualRate, tenureYears, compounding = 'quarterly', taxSlab = 0) {
  const freqMap = { monthly: 12, quarterly: 4, 'half-yearly': 2, yearly: 1 }
  const n = freqMap[compounding] || 4
  const maturity = principal * Math.pow(1 + annualRate / 100 / n, n * tenureYears)
  const totalInterest = maturity - principal
  const tax = totalInterest * taxSlab / 100
  return {
    maturityAmount: Math.round(maturity * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    postTaxInterest: Math.round((totalInterest - tax) * 100) / 100,
    postTaxMaturity: Math.round((principal + totalInterest - tax) * 100) / 100,
    principal,
  }
}

export function calculatePPF(annualInvestment, tenureYears = 15) {
  const rate = 7.1 / 100
  let balance = 0
  let totalInvested = 0
  const yearlyData = []
  for (let y = 1; y <= tenureYears; y++) {
    balance += annualInvestment
    const interest = balance * rate
    balance += interest
    totalInvested += annualInvestment
    yearlyData.push({
      year: y,
      investment: Math.round(annualInvestment * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    })
  }
  return {
    maturityAmount: Math.round(balance * 100) / 100,
    totalInvested: Math.round(totalInvested * 100) / 100,
    totalInterest: Math.round((balance - totalInvested) * 100) / 100,
    yearlyData,
  }
}

export function calculateNPS(monthlyContribution, annualReturn, currentAge, retirementAge = 60, annuityPercentage = 40) {
  const years = retirementAge - currentAge
  const months = years * 12
  const monthlyRate = annualReturn / 12 / 100
  let corpus
  if (monthlyRate === 0) {
    corpus = monthlyContribution * months
  } else {
    corpus =
      monthlyContribution *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate)
  }
  const totalInvested = monthlyContribution * months
  const annuityAmount = corpus * annuityPercentage / 100
  const lumpSum = corpus - annuityAmount
  const estimatedMonthlyPension = annuityAmount * 0.06 / 12
  return {
    totalCorpus: Math.round(corpus * 100) / 100,
    totalInvested: Math.round(totalInvested * 100) / 100,
    wealthGained: Math.round((corpus - totalInvested) * 100) / 100,
    annuityAmount: Math.round(annuityAmount * 100) / 100,
    lumpSum: Math.round(lumpSum * 100) / 100,
    estimatedMonthlyPension: Math.round(estimatedMonthlyPension * 100) / 100,
  }
}

export function calculatePrepayment(principal, annualRate, tenureMonths, prepaymentAmount, prepaymentMonth) {
  const original = calculateEMI(principal, annualRate, tenureMonths)
  const monthlyRate = annualRate / 12 / 100
  const emi = original.emi
  let balance = principal
  const newSchedule = []

  for (let m = 1; m <= tenureMonths; m++) {
    if (balance <= 0) break
    const interest = balance * monthlyRate
    const principalPart = emi - interest
    if (m === prepaymentMonth) balance -= prepaymentAmount
    balance -= principalPart
    newSchedule.push({
      month: m,
      emi: Math.round(emi * 100) / 100,
      principal: Math.round(principalPart * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(Math.max(balance, 0) * 100) / 100,
    })
  }

  const newTotalInterest = newSchedule.reduce((sum, r) => sum + r.interest, 0)
  return {
    originalEmi: original.emi,
    originalTenure: tenureMonths,
    newTenure: newSchedule.length,
    monthsSaved: tenureMonths - newSchedule.length,
    originalTotalInterest: original.totalInterest,
    newTotalInterest: Math.round(newTotalInterest * 100) / 100,
    interestSaved: Math.round((original.totalInterest - newTotalInterest) * 100) / 100,
  }
}

export function calculateAffordability(monthlyIncome, existingEmis, annualRate, tenureMonths, emiToIncomeRatio = 50) {
  const maxEmi = (monthlyIncome * emiToIncomeRatio / 100) - existingEmis
  if (maxEmi <= 0) return { maxLoan: 0, maxEmi: 0 }
  const monthlyRate = annualRate / 12 / 100
  let maxLoan
  if (monthlyRate === 0) {
    maxLoan = maxEmi * tenureMonths
  } else {
    maxLoan = maxEmi * (Math.pow(1 + monthlyRate, tenureMonths) - 1) /
      (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths))
  }
  return {
    maxLoan: Math.round(maxLoan * 100) / 100,
    maxEmi: Math.round(maxEmi * 100) / 100,
  }
}

export function formatINR(num) {
  if (num === undefined || num === null) return '₹0'
  const abs = Math.abs(num)
  if (abs >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`
  if (abs >= 100000) return `₹${(num / 100000).toFixed(2)} L`
  return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export function formatINRFull(num) {
  if (num === undefined || num === null) return '₹0'
  return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
}

// RD maturity with the bank convention: deposits credited monthly, interest
// compounded quarterly on the running balance.
export function calculateRD(monthlyDeposit, annualRate, tenureMonths) {
  const quarterlyRate = annualRate / 4 / 100
  let balance = 0
  for (let m = 1; m <= tenureMonths; m++) {
    balance += monthlyDeposit
    if (m % 3 === 0) balance *= 1 + quarterlyRate
  }
  // Interest for a trailing partial quarter, pro-rated
  const rem = tenureMonths % 3
  if (rem > 0) balance *= 1 + quarterlyRate * (rem / 3)
  const totalInvested = monthlyDeposit * tenureMonths
  return {
    maturityAmount: Math.round(balance * 100) / 100,
    totalInvested: Math.round(totalInvested * 100) / 100,
    totalInterest: Math.round((balance - totalInvested) * 100) / 100,
  }
}

// Home loan vs rent: net worth after `years` for a buyer (property value minus
// outstanding loan) vs a renter who invests the down payment and every month's
// EMI-minus-rent difference.
export function calculateRentVsBuy({
  homePrice,
  downPaymentPct = 20,
  loanRate = 8.5,
  loanTenureYears = 20,
  monthlyRent,
  rentIncreasePct = 5,
  appreciationPct = 5,
  investmentReturnPct = 12,
  years = 10,
}) {
  const downPayment = homePrice * downPaymentPct / 100
  const loanAmount = homePrice - downPayment
  const tenureMonths = loanTenureYears * 12
  const { emi } = calculateEMI(loanAmount, loanRate, tenureMonths)
  const monthlyLoanRate = loanRate / 12 / 100
  const monthlyInvReturn = investmentReturnPct / 12 / 100

  let loanBalance = loanAmount
  let corpus = downPayment // renter invests the down payment on day one
  let rent = monthlyRent
  let totalRentPaid = 0
  let totalEmiPaid = 0

  const horizon = years * 12
  for (let m = 1; m <= horizon; m++) {
    if (loanBalance > 0) {
      const interest = loanBalance * monthlyLoanRate
      loanBalance = Math.max(0, loanBalance + interest - emi)
      totalEmiPaid += emi
    }
    corpus *= 1 + monthlyInvReturn
    const outgoDiff = (m <= tenureMonths ? emi : 0) - rent
    if (outgoDiff > 0) corpus += outgoDiff
    totalRentPaid += rent
    if (m % 12 === 0) rent *= 1 + rentIncreasePct / 100
  }

  const propertyValue = homePrice * Math.pow(1 + appreciationPct / 100, years)
  const buyerNetWorth = propertyValue - loanBalance
  const renterNetWorth = corpus
  return {
    emi: Math.round(emi * 100) / 100,
    downPayment: Math.round(downPayment),
    propertyValue: Math.round(propertyValue),
    loanOutstanding: Math.round(loanBalance),
    buyerNetWorth: Math.round(buyerNetWorth),
    renterNetWorth: Math.round(renterNetWorth),
    totalRentPaid: Math.round(totalRentPaid),
    totalEmiPaid: Math.round(totalEmiPaid),
    buyingWins: buyerNetWorth > renterNetWorth,
    difference: Math.round(Math.abs(buyerNetWorth - renterNetWorth)),
  }
}

// FD vs equity mutual fund for a lumpsum: FD interest taxed at the investor's
// slab; equity MF gains taxed at 12.5% LTCG above the ₹1.25 lakh exemption.
export function calculateFDvsMF(lumpsum, years, fdRate = 7, taxSlab = 30, mfReturn = 12) {
  const fd = calculateFD(lumpsum, fdRate, years, 'quarterly', taxSlab)
  const mfCorpus = lumpsum * Math.pow(1 + mfReturn / 100, years)
  const mfGains = mfCorpus - lumpsum
  const taxableGains = Math.max(0, mfGains - 125000)
  const mfTax = taxableGains * 0.125
  const mfPostTax = mfCorpus - mfTax
  return {
    fdMaturity: fd.maturityAmount,
    fdPostTaxMaturity: fd.postTaxMaturity,
    fdTax: fd.tax,
    mfCorpus: Math.round(mfCorpus * 100) / 100,
    mfTax: Math.round(mfTax * 100) / 100,
    mfPostTaxMaturity: Math.round(mfPostTax * 100) / 100,
    mfWins: mfPostTax > fd.postTaxMaturity,
    difference: Math.round(Math.abs(mfPostTax - fd.postTaxMaturity) * 100) / 100,
  }
}
