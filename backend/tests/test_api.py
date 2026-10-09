import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"


def test_emi_endpoint():
    res = client.post("/api/calculators/emi", json={
        "principal": 5000000, "annual_rate": 8.5, "tenure_months": 240
    })
    assert res.status_code == 200
    data = res.json()
    assert "emi" in data
    assert "schedule" in data
    assert len(data["schedule"]) == 240


def test_sip_endpoint():
    res = client.post("/api/calculators/sip", json={
        "monthly_investment": 10000, "annual_return": 12, "tenure_years": 10
    })
    assert res.status_code == 200
    data = res.json()
    assert data["total_invested"] == 1200000


def test_lumpsum_endpoint():
    res = client.post("/api/calculators/lumpsum", json={
        "principal": 100000, "annual_return": 10, "tenure_years": 5
    })
    assert res.status_code == 200
    assert res.json()["future_value"] > 100000


def test_compare_endpoint():
    res = client.post("/api/calculators/compare", json={
        "loans": [
            {"principal": 5000000, "annual_rate": 8.5, "tenure_months": 240},
            {"principal": 5000000, "annual_rate": 8.75, "tenure_months": 240},
        ]
    })
    assert res.status_code == 200
    assert len(res.json()["loans"]) == 2


def test_prepayment_endpoint():
    res = client.post("/api/calculators/prepayment", json={
        "principal": 5000000, "annual_rate": 8.5, "tenure_months": 240,
        "prepayment_amount": 500000, "prepayment_month": 24
    })
    assert res.status_code == 200
    assert res.json()["months_saved"] > 0


def test_fd_endpoint():
    res = client.post("/api/calculators/fd", json={
        "principal": 100000, "annual_rate": 7, "tenure_years": 5
    })
    assert res.status_code == 200
    assert res.json()["maturity_amount"] > 100000


def test_ppf_endpoint():
    res = client.post("/api/calculators/ppf", json={
        "annual_investment": 150000, "tenure_years": 15
    })
    assert res.status_code == 200
    assert len(res.json()["yearly_data"]) == 15


def test_nps_endpoint():
    res = client.post("/api/calculators/nps", json={
        "monthly_contribution": 5000, "annual_return": 10,
        "current_age": 30, "retirement_age": 60, "annuity_percentage": 40
    })
    assert res.status_code == 200
    assert res.json()["total_corpus"] > 0


def test_affordability_endpoint():
    res = client.post("/api/calculators/affordability", json={
        "monthly_income": 100000, "existing_emis": 0,
        "annual_rate": 8.5, "tenure_months": 240
    })
    assert res.status_code == 200
    assert res.json()["max_loan"] > 0


def test_emi_pdf_endpoint():
    res = client.post("/api/calculators/emi/pdf", json={
        "principal": 1000000, "annual_rate": 8, "tenure_months": 60
    })
    assert res.status_code == 200
    assert res.headers["content-type"] == "application/pdf"


def test_invalid_emi_request():
    res = client.post("/api/calculators/emi", json={
        "principal": -1000, "annual_rate": 8, "tenure_months": 60
    })
    assert res.status_code == 422
