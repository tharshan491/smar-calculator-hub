// worker/src/routes/finance.js
// 7 Finance endpoints: compound, loan, vat, profit, salary, retirement, breakeven
import { ok, err } from "../index.js";

export function financeRouter(path, { body }) {
  const route = path.replace("/api/finance", "");

  // POST /api/finance/compound
  // Body: { principal, rate, years, n }  — n = compounding freq/year (default 12)
  if (route === "/compound") {
    const { principal, rate, years, n = 12 } = body;
    if ([principal, rate, years].some(v => isNaN(Number(v)))) return err("principal, rate, years are required numbers");
    const A = Number(principal) * Math.pow(1 + Number(rate) / 100 / n, n * Number(years));
    return ok({ amount: +A.toFixed(2), interest: +(A - principal).toFixed(2), principal: +principal, rate: +rate, years: +years, n });
  }

  // POST /api/finance/loan
  // Body: { principal, rate, years }
  if (route === "/loan") {
    const { principal, rate, years } = body;
    const r = Number(rate) / 100 / 12, n = Number(years) * 12;
    const pmt = Number(principal) * r / (1 - Math.pow(1 + r, -n));
    return ok({ monthly: +pmt.toFixed(2), total: +(pmt * n).toFixed(2), interest: +(pmt * n - Number(principal)).toFixed(2), principal: +principal });
  }

  // POST /api/finance/vat
  // Body: { amount, rate, mode: "add" | "extract" }
  if (route === "/vat") {
    const { amount, rate, mode = "add" } = body;
    if (mode === "add") {
      const tax = Number(amount) * Number(rate) / 100;
      return ok({ total: +(Number(amount) + tax).toFixed(2), tax: +tax.toFixed(2), preTax: +Number(amount).toFixed(2) });
    } else {
      const pre = Number(amount) / (1 + Number(rate) / 100);
      return ok({ preTax: +pre.toFixed(2), tax: +(Number(amount) - pre).toFixed(2), total: +Number(amount).toFixed(2) });
    }
  }

  // POST /api/finance/profit
  // Body: { revenue, cost }
  if (route === "/profit") {
    const { revenue, cost } = body;
    const gross = Number(revenue) - Number(cost);
    return ok({
      gross:  +gross.toFixed(2),
      margin: +((gross / Number(revenue)) * 100).toFixed(2),
      markup: +((gross / Number(cost))    * 100).toFixed(2),
      revenue: +Number(revenue).toFixed(2),
      cost:    +Number(cost).toFixed(2),
    });
  }

  // POST /api/finance/salary
  // Body: { amount, period: "annual"|"monthly"|"bi-weekly"|"weekly"|"daily"|"hourly" }
  if (route === "/salary") {
    const { amount, period = "annual" } = body;
    const multipliers = { annual: 1, monthly: 12, "bi-weekly": 26, weekly: 52, daily: 260, hourly: 2080 };
    const annual = Number(amount) * (multipliers[period.toLowerCase()] || 1);
    return ok({
      annual:   +annual.toFixed(2),
      monthly:  +(annual / 12).toFixed(2),
      biWeekly: +(annual / 26).toFixed(2),
      weekly:   +(annual / 52).toFixed(2),
      daily:    +(annual / 260).toFixed(2),
      hourly:   +(annual / 2080).toFixed(2),
    });
  }

  // POST /api/finance/retirement
  // Body: { currentAge, retireAge, savings, monthly, rate }
  if (route === "/retirement") {
    const { currentAge, retireAge, savings, monthly, rate } = body;
    const years = Number(retireAge) - Number(currentAge);
    const r = Number(rate) / 100 / 12, n = years * 12;
    const nest = Number(savings) * Math.pow(1 + r, n) + Number(monthly) * (Math.pow(1 + r, n) - 1) / r;
    return ok({
      nestEgg:      +nest.toFixed(2),
      monthly4pct:  +(nest * 0.04 / 12).toFixed(2),
      monthly3pct:  +(nest * 0.03 / 12).toFixed(2),
      years,
    });
  }

  // POST /api/finance/breakeven
  // Body: { fixedCosts, pricePerUnit, variableCostPerUnit }
  if (route === "/breakeven") {
    const { fixedCosts, pricePerUnit, variableCostPerUnit } = body;
    const contributionMargin = Number(pricePerUnit) - Number(variableCostPerUnit);
    if (contributionMargin <= 0) return err("Price per unit must be greater than variable cost per unit");
    const units = Number(fixedCosts) / contributionMargin;
    return ok({
      units:              +units.toFixed(0),
      revenueAtBreakeven: +(units * Number(pricePerUnit)).toFixed(2),
      contributionMargin: +contributionMargin.toFixed(2),
    });
  }

  return err("Finance endpoint not found", 404);
}
