from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import io

from app.models import (
    EMIRequest,
    SIPRequest,
    LumpsumRequest,
    LoanCompareRequest,
    PrepaymentRequest,
    FDRequest,
    PPFRequest,
    NPSRequest,
    AffordabilityRequest,
)
from app.calculators import (
    calculate_emi,
    generate_amortization,
    calculate_sip,
    calculate_lumpsum,
    calculate_prepayment,
    calculate_fd,
    calculate_ppf,
    calculate_nps,
)

router = APIRouter(prefix="/calculators", tags=["calculators"])


@router.post("/emi")
async def emi(req: EMIRequest):
    result = calculate_emi(req.principal, req.annual_rate, req.tenure_months)
    schedule = generate_amortization(req.principal, req.annual_rate, req.tenure_months)
    return {**result, "loan_type": req.loan_type, "schedule": schedule}


@router.post("/sip")
async def sip(req: SIPRequest):
    return calculate_sip(req.monthly_investment, req.annual_return, req.tenure_years)


@router.post("/lumpsum")
async def lumpsum(req: LumpsumRequest):
    return calculate_lumpsum(req.principal, req.annual_return, req.tenure_years)


@router.post("/compare")
async def compare(req: LoanCompareRequest):
    results = []
    for loan in req.loans:
        result = calculate_emi(loan.principal, loan.annual_rate, loan.tenure_months)
        results.append({**result, "loan_type": loan.loan_type})
    return {"loans": results}


@router.post("/prepayment")
async def prepayment(req: PrepaymentRequest):
    return calculate_prepayment(
        req.principal,
        req.annual_rate,
        req.tenure_months,
        req.prepayment_amount,
        req.prepayment_month,
    )


@router.post("/fd")
async def fd(req: FDRequest):
    return calculate_fd(
        req.principal,
        req.annual_rate,
        req.tenure_years,
        req.compounding,
        req.tax_slab,
    )


@router.post("/ppf")
async def ppf(req: PPFRequest):
    return calculate_ppf(req.annual_investment, req.tenure_years)


@router.post("/nps")
async def nps(req: NPSRequest):
    return calculate_nps(
        req.monthly_contribution,
        req.annual_return,
        req.current_age,
        req.retirement_age,
        req.annuity_percentage,
    )


@router.post("/affordability")
async def affordability(req: AffordabilityRequest):
    max_emi = (req.monthly_income * req.emi_to_income_ratio / 100) - req.existing_emis
    if max_emi <= 0:
        return {"max_loan": 0, "max_emi": 0, "message": "EMI budget exhausted"}

    monthly_rate = req.annual_rate / 12 / 100
    if monthly_rate == 0:
        max_loan = max_emi * req.tenure_months
    else:
        max_loan = (
            max_emi
            * ((1 + monthly_rate) ** req.tenure_months - 1)
            / (monthly_rate * (1 + monthly_rate) ** req.tenure_months)
        )
    return {
        "max_loan": round(max_loan, 2),
        "max_emi": round(max_emi, 2),
    }


@router.post("/emi/pdf")
async def emi_pdf(req: EMIRequest):
    from reportlab.lib.pagesizes import A4
    from reportlab.lib import colors
    from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
    from reportlab.lib.styles import getSampleStyleSheet

    result = calculate_emi(req.principal, req.annual_rate, req.tenure_months)
    schedule = generate_amortization(req.principal, req.annual_rate, req.tenure_months)

    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph("EMIBuddy - Amortization Schedule", styles["Title"]))
    elements.append(Spacer(1, 12))

    loan_type_label = req.loan_type.replace("_", " ").title()
    summary_data = [
        ["Loan Type", loan_type_label],
        ["Loan Amount", f"₹{req.principal:,.2f}"],
        ["Interest Rate", f"{req.annual_rate}% p.a."],
        ["Tenure", f"{req.tenure_months} months"],
        ["Monthly EMI", f"₹{result['emi']:,.2f}"],
        ["Total Interest", f"₹{result['total_interest']:,.2f}"],
        ["Total Payment", f"₹{result['total_payment']:,.2f}"],
    ]
    summary_table = Table(summary_data, colWidths=[150, 250])
    summary_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#3B82F6")),
                ("TEXTCOLOR", (0, 0), (0, -1), colors.white),
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    elements.append(summary_table)
    elements.append(Spacer(1, 20))

    table_data = [["Month", "EMI (₹)", "Principal (₹)", "Interest (₹)", "Balance (₹)"]]
    for row in schedule:
        table_data.append(
            [
                row["month"],
                f"{row['emi']:,.2f}",
                f"{row['principal']:,.2f}",
                f"{row['interest']:,.2f}",
                f"{row['balance']:,.2f}",
            ]
        )

    table = Table(table_data, colWidths=[50, 90, 90, 90, 100])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#3B82F6")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 7),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                ("ALIGN", (0, 0), (-1, -1), "RIGHT"),
                ("ALIGN", (0, 0), (0, -1), "CENTER"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F3F4F6")]),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    elements.append(table)
    elements.append(Spacer(1, 20))
    elements.append(
        Paragraph(
            "Generated by EMIBuddy (emi.doaide.com) — Free EMI Calculator for India",
            styles["Normal"],
        )
    )

    doc.build(elements)
    buf.seek(0)

    return StreamingResponse(
        buf,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=amortization-schedule.pdf"},
    )
