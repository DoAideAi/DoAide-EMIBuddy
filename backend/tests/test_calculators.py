import pytest
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


class TestEMI:
    def test_basic_home_loan(self):
        result = calculate_emi(5000000, 8.5, 240)
        assert 43000 < result["emi"] < 44000
        assert result["total_interest"] > 0
        assert result["total_payment"] == pytest.approx(result["emi"] * 240, rel=0.01)

    def test_zero_rate(self):
        result = calculate_emi(1200000, 0, 12)
        assert result["emi"] == 100000
        assert result["total_interest"] == 0
        assert result["total_payment"] == 1200000

    def test_car_loan(self):
        result = calculate_emi(800000, 9.5, 60)
        assert 16000 < result["emi"] < 17000

    def test_personal_loan(self):
        result = calculate_emi(500000, 12, 36)
        assert 16000 < result["emi"] < 17000

    def test_education_loan(self):
        result = calculate_emi(1000000, 10, 84)
        assert result["emi"] > 0
        assert result["total_interest"] > 0


class TestAmortization:
    def test_schedule_length(self):
        schedule = generate_amortization(1000000, 8, 120)
        assert len(schedule) == 120

    def test_last_balance_near_zero(self):
        schedule = generate_amortization(5000000, 8.5, 240)
        assert schedule[-1]["balance"] < 1

    def test_zero_rate_schedule(self):
        schedule = generate_amortization(120000, 0, 12)
        assert len(schedule) == 12
        assert all(row["interest"] == 0 for row in schedule)

    def test_first_month_interest_highest(self):
        schedule = generate_amortization(1000000, 10, 60)
        assert schedule[0]["interest"] > schedule[-1]["interest"]


class TestSIP:
    def test_basic_sip(self):
        result = calculate_sip(10000, 12, 10)
        assert result["total_invested"] == 1200000
        assert result["future_value"] > result["total_invested"]
        assert result["wealth_gained"] > 0

    def test_zero_return(self):
        result = calculate_sip(10000, 0, 10)
        assert result["future_value"] == result["total_invested"]
        assert result["wealth_gained"] == 0

    def test_short_tenure(self):
        result = calculate_sip(5000, 12, 1)
        assert result["total_invested"] == 60000
        assert result["future_value"] > 60000


class TestLumpsum:
    def test_basic_lumpsum(self):
        result = calculate_lumpsum(100000, 10, 5)
        assert result["future_value"] == pytest.approx(161051, rel=0.01)

    def test_zero_return(self):
        result = calculate_lumpsum(100000, 0, 10)
        assert result["future_value"] == 100000
        assert result["wealth_gained"] == 0

    def test_high_return(self):
        result = calculate_lumpsum(500000, 15, 20)
        assert result["future_value"] > 500000 * 10


class TestPrepayment:
    def test_basic_prepayment(self):
        result = calculate_prepayment(5000000, 8.5, 240, 500000, 24)
        assert result["months_saved"] > 0
        assert result["interest_saved"] > 0
        assert result["new_tenure"] < result["original_tenure"]

    def test_large_prepayment(self):
        result = calculate_prepayment(1000000, 10, 60, 500000, 12)
        assert result["months_saved"] > 20


class TestFD:
    def test_quarterly_compounding(self):
        result = calculate_fd(100000, 7, 5, "quarterly", 0)
        assert result["maturity_amount"] > 140000
        assert result["tax"] == 0

    def test_with_tax(self):
        result = calculate_fd(500000, 7, 3, "quarterly", 20)
        assert result["tax"] > 0
        assert result["post_tax_maturity"] < result["maturity_amount"]

    def test_yearly_compounding(self):
        result = calculate_fd(100000, 10, 1, "yearly", 0)
        assert result["maturity_amount"] == pytest.approx(110000, rel=0.01)


class TestPPF:
    def test_basic_ppf(self):
        result = calculate_ppf(150000, 15)
        assert len(result["yearly_data"]) == 15
        assert result["maturity_amount"] > result["total_invested"]
        assert result["total_invested"] == 150000 * 15

    def test_extended_tenure(self):
        result = calculate_ppf(100000, 25)
        assert len(result["yearly_data"]) == 25
        assert result["maturity_amount"] > result["total_invested"] * 2


class TestNPS:
    def test_basic_nps(self):
        result = calculate_nps(5000, 10, 30, 60, 40)
        assert result["total_corpus"] > result["total_invested"]
        assert result["annuity_amount"] == pytest.approx(
            result["total_corpus"] * 0.4, rel=0.01
        )
        assert result["lump_sum"] == pytest.approx(
            result["total_corpus"] * 0.6, rel=0.01
        )
        assert result["estimated_monthly_pension"] > 0

    def test_higher_annuity(self):
        result = calculate_nps(5000, 10, 30, 60, 60)
        assert result["annuity_amount"] == pytest.approx(
            result["total_corpus"] * 0.6, rel=0.01
        )
