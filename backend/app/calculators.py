def calculate_emi(principal: float, annual_rate: float, tenure_months: int) -> dict:
    if annual_rate == 0:
        emi = principal / tenure_months
        total_payment = principal
        total_interest = 0
    else:
        monthly_rate = annual_rate / 12 / 100
        emi = principal * monthly_rate * (1 + monthly_rate) ** tenure_months / (
            (1 + monthly_rate) ** tenure_months - 1
        )
        total_payment = emi * tenure_months
        total_interest = total_payment - principal

    return {
        "emi": round(emi, 2),
        "total_payment": round(total_payment, 2),
        "total_interest": round(total_interest, 2),
        "principal": round(principal, 2),
    }


def generate_amortization(
    principal: float, annual_rate: float, tenure_months: int
) -> list[dict]:
    if annual_rate == 0:
        emi = principal / tenure_months
        schedule = []
        balance = principal
        for month in range(1, tenure_months + 1):
            schedule.append(
                {
                    "month": month,
                    "emi": round(emi, 2),
                    "principal": round(emi, 2),
                    "interest": 0,
                    "balance": round(balance - emi, 2),
                }
            )
            balance -= emi
        return schedule

    monthly_rate = annual_rate / 12 / 100
    emi = principal * monthly_rate * (1 + monthly_rate) ** tenure_months / (
        (1 + monthly_rate) ** tenure_months - 1
    )

    schedule = []
    balance = principal
    for month in range(1, tenure_months + 1):
        interest = balance * monthly_rate
        principal_part = emi - interest
        balance -= principal_part
        schedule.append(
            {
                "month": month,
                "emi": round(emi, 2),
                "principal": round(principal_part, 2),
                "interest": round(interest, 2),
                "balance": round(max(balance, 0), 2),
            }
        )
    return schedule


def calculate_sip(
    monthly_investment: float, annual_return: float, tenure_years: int
) -> dict:
    months = tenure_years * 12
    monthly_rate = annual_return / 12 / 100
    if monthly_rate == 0:
        future_value = monthly_investment * months
    else:
        future_value = (
            monthly_investment
            * ((1 + monthly_rate) ** months - 1)
            / monthly_rate
            * (1 + monthly_rate)
        )
    total_invested = monthly_investment * months
    wealth_gained = future_value - total_invested

    return {
        "future_value": round(future_value, 2),
        "total_invested": round(total_invested, 2),
        "wealth_gained": round(wealth_gained, 2),
    }


def calculate_lumpsum(
    principal: float, annual_return: float, tenure_years: int
) -> dict:
    future_value = principal * (1 + annual_return / 100) ** tenure_years
    wealth_gained = future_value - principal

    return {
        "future_value": round(future_value, 2),
        "principal": round(principal, 2),
        "wealth_gained": round(wealth_gained, 2),
    }


def calculate_prepayment(
    principal: float,
    annual_rate: float,
    tenure_months: int,
    prepayment_amount: float,
    prepayment_month: int,
) -> dict:
    original = calculate_emi(principal, annual_rate, tenure_months)
    monthly_rate = annual_rate / 12 / 100
    emi = original["emi"]
    balance = principal
    new_schedule = []

    for month in range(1, tenure_months + 1):
        if balance <= 0:
            break
        interest = balance * monthly_rate
        principal_part = emi - interest
        if month == prepayment_month:
            balance -= prepayment_amount
        balance -= principal_part
        new_schedule.append(
            {
                "month": month,
                "emi": round(emi, 2),
                "principal": round(principal_part, 2),
                "interest": round(interest, 2),
                "balance": round(max(balance, 0), 2),
            }
        )

    months_saved = tenure_months - len(new_schedule)
    original_total_interest = original["total_interest"]
    new_total_interest = sum(row["interest"] for row in new_schedule)
    interest_saved = original_total_interest - new_total_interest

    return {
        "original_emi": original["emi"],
        "original_tenure": tenure_months,
        "new_tenure": len(new_schedule),
        "months_saved": months_saved,
        "original_total_interest": round(original_total_interest, 2),
        "new_total_interest": round(new_total_interest, 2),
        "interest_saved": round(interest_saved, 2),
    }


def calculate_fd(
    principal: float,
    annual_rate: float,
    tenure_years: int,
    compounding: str = "quarterly",
    tax_slab: float = 0,
) -> dict:
    freq_map = {"monthly": 12, "quarterly": 4, "half-yearly": 2, "yearly": 1}
    n = freq_map.get(compounding, 4)

    maturity = principal * (1 + annual_rate / 100 / n) ** (n * tenure_years)
    total_interest = maturity - principal
    tax = total_interest * tax_slab / 100
    post_tax_interest = total_interest - tax
    post_tax_maturity = principal + post_tax_interest

    return {
        "maturity_amount": round(maturity, 2),
        "total_interest": round(total_interest, 2),
        "tax": round(tax, 2),
        "post_tax_interest": round(post_tax_interest, 2),
        "post_tax_maturity": round(post_tax_maturity, 2),
        "principal": round(principal, 2),
    }


def calculate_ppf(annual_investment: float, tenure_years: int = 15) -> dict:
    rate = 7.1 / 100
    balance = 0
    total_invested = 0
    yearly_data = []

    for year in range(1, tenure_years + 1):
        balance += annual_investment
        interest = balance * rate
        balance += interest
        total_invested += annual_investment
        yearly_data.append(
            {
                "year": year,
                "investment": round(annual_investment, 2),
                "interest": round(interest, 2),
                "balance": round(balance, 2),
            }
        )

    return {
        "maturity_amount": round(balance, 2),
        "total_invested": round(total_invested, 2),
        "total_interest": round(balance - total_invested, 2),
        "yearly_data": yearly_data,
    }


def calculate_nps(
    monthly_contribution: float,
    annual_return: float,
    current_age: int,
    retirement_age: int = 60,
    annuity_percentage: float = 40,
) -> dict:
    years = retirement_age - current_age
    months = years * 12
    monthly_rate = annual_return / 12 / 100

    if monthly_rate == 0:
        corpus = monthly_contribution * months
    else:
        corpus = (
            monthly_contribution
            * ((1 + monthly_rate) ** months - 1)
            / monthly_rate
            * (1 + monthly_rate)
        )

    total_invested = monthly_contribution * months
    wealth_gained = corpus - total_invested
    annuity_amount = corpus * annuity_percentage / 100
    lump_sum = corpus - annuity_amount
    estimated_monthly_pension = annuity_amount * 0.06 / 12

    return {
        "total_corpus": round(corpus, 2),
        "total_invested": round(total_invested, 2),
        "wealth_gained": round(wealth_gained, 2),
        "annuity_amount": round(annuity_amount, 2),
        "lump_sum": round(lump_sum, 2),
        "estimated_monthly_pension": round(estimated_monthly_pension, 2),
    }
