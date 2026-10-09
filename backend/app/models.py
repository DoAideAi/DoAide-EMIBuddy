from pydantic import BaseModel, Field


class EMIRequest(BaseModel):
    principal: float = Field(gt=0, description="Loan amount in INR")
    annual_rate: float = Field(ge=0, le=50, description="Annual interest rate %")
    tenure_months: int = Field(gt=0, le=600, description="Loan tenure in months")
    loan_type: str = Field(
        default="home", description="home, car, personal, education"
    )


class SIPRequest(BaseModel):
    monthly_investment: float = Field(gt=0, description="Monthly SIP amount")
    annual_return: float = Field(ge=0, le=50, description="Expected annual return %")
    tenure_years: int = Field(gt=0, le=50, description="Investment tenure in years")


class LumpsumRequest(BaseModel):
    principal: float = Field(gt=0, description="One-time investment amount")
    annual_return: float = Field(ge=0, le=50, description="Expected annual return %")
    tenure_years: int = Field(gt=0, le=50, description="Investment tenure in years")


class LoanCompareRequest(BaseModel):
    loans: list[EMIRequest] = Field(min_length=2, max_length=3)


class PrepaymentRequest(BaseModel):
    principal: float = Field(gt=0)
    annual_rate: float = Field(ge=0, le=50)
    tenure_months: int = Field(gt=0, le=600)
    prepayment_amount: float = Field(gt=0)
    prepayment_month: int = Field(gt=0)


class FDRequest(BaseModel):
    principal: float = Field(gt=0)
    annual_rate: float = Field(ge=0, le=20)
    tenure_years: int = Field(gt=0, le=20)
    compounding: str = Field(default="quarterly")
    tax_slab: float = Field(default=0, ge=0, le=40)


class PPFRequest(BaseModel):
    annual_investment: float = Field(gt=0, le=150000)
    tenure_years: int = Field(default=15, ge=15, le=50)


class NPSRequest(BaseModel):
    monthly_contribution: float = Field(gt=0)
    annual_return: float = Field(ge=0, le=20)
    current_age: int = Field(ge=18, le=65)
    retirement_age: int = Field(default=60, ge=40, le=75)
    annuity_percentage: float = Field(default=40, ge=40, le=100)


class AffordabilityRequest(BaseModel):
    monthly_income: float = Field(gt=0)
    existing_emis: float = Field(default=0, ge=0)
    annual_rate: float = Field(ge=0, le=50)
    tenure_months: int = Field(gt=0, le=600)
    emi_to_income_ratio: float = Field(default=50, ge=10, le=80)
