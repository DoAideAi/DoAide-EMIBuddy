// Current loan rates for the /banks/:bankSlug pages. Plain data: also read by
// scripts/prerender-routes.mjs.
export const BANKS = {
  sbi: {
    name: 'State Bank of India (SBI)',
    short: 'SBI',
    homeLoanRate: 8.50,
    carLoanRate: 8.70,
    personalLoanRate: 11.15,
    educationLoanRate: 8.15,
  },
  hdfc: {
    name: 'HDFC Bank',
    short: 'HDFC',
    homeLoanRate: 8.75,
    carLoanRate: 8.80,
    personalLoanRate: 10.75,
    educationLoanRate: 9.50,
  },
  icici: {
    name: 'ICICI Bank',
    short: 'ICICI',
    homeLoanRate: 8.75,
    carLoanRate: 8.85,
    personalLoanRate: 10.75,
    educationLoanRate: 9.85,
  },
  axis: {
    name: 'Axis Bank',
    short: 'Axis',
    homeLoanRate: 8.75,
    carLoanRate: 8.90,
    personalLoanRate: 10.49,
    educationLoanRate: 9.70,
  },
  kotak: {
    name: 'Kotak Mahindra Bank',
    short: 'Kotak',
    homeLoanRate: 8.75,
    carLoanRate: 8.90,
    personalLoanRate: 10.99,
    educationLoanRate: 10.00,
  },
  pnb: {
    name: 'Punjab National Bank (PNB)',
    short: 'PNB',
    homeLoanRate: 8.45,
    carLoanRate: 8.65,
    personalLoanRate: 10.40,
    educationLoanRate: 8.55,
  },
}
