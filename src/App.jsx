import { useState, useCallback, useEffect } from "react";
import Articles from './Articles.jsx';
import ArticlesExpanded from './ArticlesExpanded.jsx';
import FAQ from './FAQ.jsx';
import Blog from './Blog.jsx';
import ToolsGuides from './ToolsGuides.jsx';

// ─── Inline CSS ───────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Sora:wght@300;400;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #f8f9fa;
  --surface: #ffffff;
  --surface2: #f6f8fb;
  --border: #d0d7de;
  --accent: #0969da;
  --accent2: #1a7f0e;
  --accent3: #d1242f;
  --accent4: #6f42c1;
  --text: #24292f;
  --muted: #57606a;
  --finance: #0969da;
  --health: #1a7f0e;
  --math: #bd3e0f;
  --tools: #0969da;
  --lifestyle: #6f42c1;
}

body { font-family: 'Sora', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

.hub { max-width: 980px; margin: 0 auto; padding: 0 16px 60px; }

/* ── NAV ── */
.nav { background: var(--surface); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
.nav-inner { max-width: 980px; margin: 0 auto; padding: 12px 16px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.nav-brand { font-family: 'Space Mono', monospace; font-size: 15px; font-weight: 700; color: var(--accent); display: flex; align-items: center; gap: 6px; }
.nav-links { display: flex; gap: 4px; flex-wrap: wrap; }
.nav-link { font-size: 12px; color: var(--accent); cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: background .15s; }
.nav-link:hover { background: rgba(9, 105, 218, .08); }

/* ── HEADER ── */
.header { padding: 32px 0 20px; text-align: center; }
.header h1 { font-family: 'Space Mono', monospace; font-size: 22px; color: var(--accent); }
.header p { color: var(--muted); font-size: 13px; margin-top: 4px; }

/* ── CATEGORY SECTION ── */
.cat-section { margin-bottom: 28px; }
.cat-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.cat-title { font-size: 17px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
.cat-badge { font-size: 10px; padding: 2px 8px; border-radius: 99px; font-family: 'Space Mono', monospace; }

.finance .cat-title { color: #0969da; }
.health  .cat-title { color: #1a7f0e; }
.math    .cat-title { color: #d15417; }
.tools   .cat-title { color: #0969da; }
.lifestyle .cat-title { color: #6f42c1; }

/* ── GRID ── */
.calc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(185px, 1fr)); gap: 10px; }

/* ── CALC CARD ── */
.calc-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; cursor: pointer; transition: border-color .15s, transform .1s, background .15s; display: flex; align-items: center; gap: 10px; }
.calc-card:hover { border-color: var(--accent); background: var(--surface2); transform: translateY(-1px); }
.calc-card .icon { font-size: 18px; flex-shrink: 0; }
.calc-card .label { font-size: 13px; font-weight: 600; line-height: 1.3; }
.calc-card .sub { font-size: 10px; color: var(--muted); margin-top: 2px; }

/* ── MODAL ── */
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 16px; backdrop-filter: blur(4px); }
.modal { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; width: 100%; max-width: 500px; max-height: 90vh; overflow-y: auto; box-shadow: 0 10px 40px rgba(0,0,0,.12); }
.modal-header { padding: 18px 20px 14px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
.modal-title { font-family: 'Space Mono', monospace; font-size: 15px; font-weight: 700; color: var(--accent); }
.modal-close { background: none; border: none; color: var(--muted); font-size: 20px; cursor: pointer; line-height: 1; padding: 0 4px; }
.modal-close:hover { color: var(--text); }
.modal-body { padding: 20px; }

/* ── FORM ── */
.field { margin-bottom: 14px; }
.field label { display: block; font-size: 12px; color: var(--muted); margin-bottom: 5px; font-family: 'Space Mono', monospace; }
.field input, .field select { width: 100%; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; color: var(--text); font-size: 13px; font-family: 'Sora', sans-serif; outline: none; transition: border-color .15s; }
.field input:focus, .field select:focus { border-color: var(--accent); }
.field select option { background: var(--bg); }

.btn { width: 100%; padding: 10px; background: var(--accent); color: #0d1117; border: none; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Sora', sans-serif; transition: opacity .15s; margin-top: 4px; }
.btn:hover { opacity: .85; }

/* ── RESULT BOX ── */
.result { background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; margin-top: 16px; }
.result-label { font-size: 11px; color: var(--muted); font-family: 'Space Mono', monospace; margin-bottom: 4px; }
.result-value { font-size: 22px; font-weight: 700; color: var(--accent2); font-family: 'Space Mono', monospace; word-break: break-all; }
.result-sub { font-size: 12px; color: var(--muted); margin-top: 6px; }

/* ── FOOTER ── */
.footer { border-top: 1px solid var(--border); padding: 24px 0; text-align: center; color: var(--muted); font-size: 12px; margin-top: 40px; font-family: 'Space Mono', monospace; }
.footer a { color: var(--accent); text-decoration: none; }

/* ── TICKER ── */
.ticker-bar { background: var(--surface2); border-bottom: 1px solid var(--border); padding: 6px 16px; display: flex; gap: 20px; overflow-x: auto; font-family: 'Space Mono', monospace; font-size: 11px; }
.ticker-item { display: flex; align-items: center; gap: 5px; white-space: nowrap; }
.up { color: var(--accent2); }
.down { color: var(--accent3); }

.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

/* ── LEGAL PAGES ── */
.page-modal { position: fixed; inset: 0; background: rgba(0,0,0,.8); z-index: 300; overflow-y: auto; padding: 24px 16px; backdrop-filter: blur(6px); }
.page-inner { max-width: 680px; margin: 0 auto; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 32px; }
.page-inner h1 { font-family: 'Space Mono', monospace; font-size: 18px; color: var(--accent); margin-bottom: 6px; }
.page-inner .page-date { font-size: 11px; color: var(--muted); font-family: 'Space Mono', monospace; margin-bottom: 24px; }
.page-inner h2 { font-size: 13px; font-weight: 700; color: var(--accent2); margin: 20px 0 6px; font-family: 'Space Mono', monospace; text-transform: uppercase; letter-spacing: .05em; }
.page-inner p, .page-inner li { font-size: 13px; color: var(--muted); line-height: 1.7; }
.page-inner ul { padding-left: 18px; margin-top: 4px; }
.page-inner li { margin-bottom: 4px; }
.page-inner a { color: var(--accent); }
.page-close-btn { display: block; margin: 24px auto 0; padding: 10px 32px; background: var(--accent); color: #0d1117; border: none; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Sora', sans-serif; }

/* ── ADSENSE SLOTS ── */
.ad-slot { width: 100%; margin: 8px 0 24px; display: flex; align-items: center; justify-content: center; }
.ad-slot ins { display: block; width: 100%; }
.ad-placeholder { width: 100%; min-height: 90px; background: var(--surface); border: 1px dashed var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--muted); font-size: 11px; font-family: 'Space Mono', monospace; letter-spacing: .05em; }
`;

// ─── Calculator Definitions ────────────────────────────────────────────────────
const CALCS = {
  // FINANCE
  "Compound Interest": {
    cat: "finance", icon: "📈",
    fields: [
      { id: "principal", label: "Principal ($)", placeholder: "10000", type: "number" },
      { id: "rate", label: "Annual Rate (%)", placeholder: "7", type: "number" },
      { id: "years", label: "Years", placeholder: "10", type: "number" },
      { id: "compounds", label: "Compounding Frequency", type: "select", options: ["Annually (1)", "Semi-annually (2)", "Quarterly (4)", "Monthly (12)", "Daily (365)"] }
    ],
    calc: (v) => {
      const n = { "Annually (1)": 1, "Semi-annually (2)": 2, "Quarterly (4)": 4, "Monthly (12)": 12, "Daily (365)": 365 }[v.compounds] || 12;
      const A = v.principal * Math.pow(1 + (v.rate / 100) / n, n * v.years);
      return { value: `$${A.toFixed(2)}`, sub: `Interest earned: $${(A - v.principal).toFixed(2)}` };
    }
  },
  "Loan Payment": {
    cat: "finance", icon: "🏦",
    fields: [
      { id: "principal", label: "Loan Amount ($)", placeholder: "25000", type: "number" },
      { id: "rate", label: "Annual Rate (%)", placeholder: "6.5", type: "number" },
      { id: "years", label: "Term (years)", placeholder: "5", type: "number" }
    ],
    calc: (v) => {
      const r = (v.rate / 100) / 12, n = v.years * 12;
      const pmt = v.principal * r / (1 - Math.pow(1 + r, -n));
      return { value: `$${pmt.toFixed(2)}/mo`, sub: `Total paid: $${(pmt * n).toFixed(2)} | Interest: $${(pmt * n - v.principal).toFixed(2)}` };
    }
  },
  "401k Saver": {
    cat: "finance", icon: "🏛️",
    fields: [
      { id: "current", label: "Current Balance ($)", placeholder: "15000", type: "number" },
      { id: "monthly", label: "Monthly Contribution ($)", placeholder: "500", type: "number" },
      { id: "rate", label: "Annual Return (%)", placeholder: "7", type: "number" },
      { id: "years", label: "Years Until Retirement", placeholder: "30", type: "number" }
    ],
    calc: (v) => {
      const r = (v.rate / 100) / 12, n = v.years * 12;
      const future = v.current * Math.pow(1 + r, n) + v.monthly * (Math.pow(1 + r, n) - 1) / r;
      return { value: `$${future.toFixed(0)}`, sub: `Contributed: $${(v.monthly * n + Number(v.current)).toFixed(0)} | Growth: $${(future - v.monthly * n - Number(v.current)).toFixed(0)}` };
    }
  },
  "VAT/Tax": {
    cat: "finance", icon: "🧾",
    fields: [
      { id: "amount", label: "Amount ($)", placeholder: "100", type: "number" },
      { id: "rate", label: "VAT/Tax Rate (%)", placeholder: "20", type: "number" },
      { id: "mode", label: "Mode", type: "select", options: ["Add tax to price", "Extract tax from price"] }
    ],
    calc: (v) => {
      if (v.mode === "Add tax to price") {
        const tax = v.amount * v.rate / 100;
        return { value: `$${(Number(v.amount) + tax).toFixed(2)}`, sub: `Tax: $${tax.toFixed(2)}` };
      } else {
        const pre = v.amount / (1 + v.rate / 100);
        return { value: `$${pre.toFixed(2)} pre-tax`, sub: `Tax included: $${(v.amount - pre).toFixed(2)}` };
      }
    }
  },
  "Profit Margin": {
    cat: "finance", icon: "💰",
    fields: [
      { id: "revenue", label: "Revenue ($)", placeholder: "50000", type: "number" },
      { id: "cost", label: "Cost of Goods ($)", placeholder: "30000", type: "number" }
    ],
    calc: (v) => {
      const gross = v.revenue - v.cost;
      const margin = (gross / v.revenue) * 100;
      const markup = (gross / v.cost) * 100;
      return { value: `${margin.toFixed(1)}% margin`, sub: `Gross profit: $${gross.toFixed(2)} | Markup: ${markup.toFixed(1)}%` };
    }
  },
  "Salary Converter": {
    cat: "finance", icon: "💵",
    fields: [
      { id: "amount", label: "Amount ($)", placeholder: "75000", type: "number" },
      { id: "from", label: "Input Period", type: "select", options: ["Annual", "Monthly", "Bi-weekly", "Weekly", "Daily", "Hourly"] }
    ],
    calc: (v) => {
      const multipliers = { Annual: 1, Monthly: 12, "Bi-weekly": 26, Weekly: 52, Daily: 260, Hourly: 2080 };
      const annual = v.amount * multipliers[v.from];
      return { value: `$${annual.toFixed(0)}/yr`, sub: `Monthly: $${(annual / 12).toFixed(0)} | Hourly: $${(annual / 2080).toFixed(2)}` };
    }
  },
  "Retirement": {
    cat: "finance", icon: "🌴",
    fields: [
      { id: "age", label: "Current Age", placeholder: "30", type: "number" },
      { id: "retireAge", label: "Retirement Age", placeholder: "65", type: "number" },
      { id: "savings", label: "Current Savings ($)", placeholder: "50000", type: "number" },
      { id: "monthly", label: "Monthly Savings ($)", placeholder: "1000", type: "number" },
      { id: "rate", label: "Return Rate (%)", placeholder: "7", type: "number" }
    ],
    calc: (v) => {
      const years = v.retireAge - v.age;
      const r = (v.rate / 100) / 12, n = years * 12;
      const nest = v.savings * Math.pow(1 + r, n) + v.monthly * (Math.pow(1 + r, n) - 1) / r;
      const monthly4pct = nest * 0.04 / 12;
      return { value: `$${nest.toFixed(0)}`, sub: `4% rule: $${monthly4pct.toFixed(0)}/mo income | Years: ${years}` };
    }
  },
  "Cash Flow": {
    cat: "finance", icon: "🔄",
    fields: [
      { id: "income", label: "Monthly Income ($)", placeholder: "5000", type: "number" },
      { id: "expenses", label: "Monthly Expenses ($)", placeholder: "3500", type: "number" }
    ],
    calc: (v) => {
      const cf = v.income - v.expenses;
      const pct = ((cf / v.income) * 100).toFixed(1);
      return { value: cf >= 0 ? `+$${cf.toFixed(2)}/mo` : `-$${Math.abs(cf).toFixed(2)}/mo`, sub: `Savings rate: ${pct}% | Annual: $${(cf * 12).toFixed(0)}` };
    }
  },
  "Breakeven": {
    cat: "finance", icon: "⚖️",
    fields: [
      { id: "fixed", label: "Fixed Costs ($)", placeholder: "10000", type: "number" },
      { id: "price", label: "Price Per Unit ($)", placeholder: "50", type: "number" },
      { id: "variable", label: "Variable Cost/Unit ($)", placeholder: "20", type: "number" }
    ],
    calc: (v) => {
      const units = v.fixed / (v.price - v.variable);
      return { value: `${units.toFixed(0)} units`, sub: `Revenue at break-even: $${(units * v.price).toFixed(0)}` };
    }
  },
  "Budget Planner": {
    cat: "finance", icon: "📊",
    fields: [
      { id: "income", label: "Monthly Take-Home ($)", placeholder: "4000", type: "number" }
    ],
    calc: (v) => {
      return { value: `50/30/20 Rule`, sub: `Needs: $${(v.income * .5).toFixed(0)} | Wants: $${(v.income * .3).toFixed(0)} | Savings: $${(v.income * .2).toFixed(0)}` };
    }
  },

  // HEALTH
  "BMI": {
    cat: "health", icon: "⚖️",
    fields: [
      { id: "weight", label: "Weight (kg)", placeholder: "70", type: "number" },
      { id: "height", label: "Height (cm)", placeholder: "175", type: "number" }
    ],
    calc: (v) => {
      const bmi = v.weight / Math.pow(v.height / 100, 2);
      const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
      return { value: bmi.toFixed(1), sub: `Category: ${cat}` };
    }
  },
  "Calorie Counter": {
    cat: "health", icon: "🍎",
    fields: [
      { id: "weight", label: "Weight (kg)", placeholder: "70", type: "number" },
      { id: "height", label: "Height (cm)", placeholder: "175", type: "number" },
      { id: "age", label: "Age", placeholder: "30", type: "number" },
      { id: "gender", label: "Gender", type: "select", options: ["Male", "Female"] },
      { id: "activity", label: "Activity Level", type: "select", options: ["Sedentary", "Light", "Moderate", "Active", "Very Active"] }
    ],
    calc: (v) => {
      const bmr = v.gender === "Male"
        ? 10 * v.weight + 6.25 * v.height - 5 * v.age + 5
        : 10 * v.weight + 6.25 * v.height - 5 * v.age - 161;
      const mults = { Sedentary: 1.2, Light: 1.375, Moderate: 1.55, Active: 1.725, "Very Active": 1.9 };
      const tdee = bmr * (mults[v.activity] || 1.55);
      return { value: `${tdee.toFixed(0)} kcal/day`, sub: `BMR: ${bmr.toFixed(0)} | Cut: ${(tdee - 500).toFixed(0)} | Bulk: ${(tdee + 300).toFixed(0)}` };
    }
  },
  "One Rep Max": {
    cat: "health", icon: "🏋️",
    fields: [
      { id: "weight", label: "Weight Lifted (kg)", placeholder: "100", type: "number" },
      { id: "reps", label: "Reps Performed", placeholder: "5", type: "number" }
    ],
    calc: (v) => {
      const orm = v.weight * (1 + v.reps / 30); // Epley
      return { value: `${orm.toFixed(1)} kg`, sub: `80%: ${(orm * .8).toFixed(1)}kg | 85%: ${(orm * .85).toFixed(1)}kg | 90%: ${(orm * .9).toFixed(1)}kg` };
    }
  },
  "Sleep Calculator": {
    cat: "health", icon: "😴",
    fields: [
      { id: "wakeTime", label: "Wake-up Time", placeholder: "07:00", type: "text" }
    ],
    calc: (v) => {
      const [h, m] = v.wakeTime.split(":").map(Number);
      const wake = h * 60 + (m || 0);
      const cycles = [6, 5, 4].map(c => {
        let bed = wake - c * 90 - 15;
        if (bed < 0) bed += 1440;
        const bh = Math.floor(bed / 60) % 24, bm = bed % 60;
        return `${String(bh).padStart(2, "0")}:${String(bm).padStart(2, "0")} (${c} cycles)`;
      });
      return { value: cycles[0], sub: `Or: ${cycles[1]} | ${cycles[2]}` };
    }
  },
  "Macro Split": {
    cat: "health", icon: "🥗",
    fields: [
      { id: "calories", label: "Daily Calories", placeholder: "2000", type: "number" },
      { id: "goal", label: "Goal", type: "select", options: ["Balanced (40/30/30)", "High Protein (30/40/30)", "Keto (5/25/70)", "Low Carb (20/35/45)"] }
    ],
    calc: (v) => {
      const splits = {
        "Balanced (40/30/30)": [40, 30, 30],
        "High Protein (30/40/30)": [30, 40, 30],
        "Keto (5/25/70)": [5, 25, 70],
        "Low Carb (20/35/45)": [20, 35, 45]
      }[v.goal] || [40, 30, 30];
      const [c, p, f] = splits;
      return {
        value: `${(v.calories * c / 100 / 4).toFixed(0)}g carbs`,
        sub: `Protein: ${(v.calories * p / 100 / 4).toFixed(0)}g | Fat: ${(v.calories * f / 100 / 9).toFixed(0)}g`
      };
    }
  },
  "Days Until Date": {
    cat: "health", icon: "📅",
    fields: [
      { id: "target", label: "Target Date", type: "text", placeholder: "2025-12-25" }
    ],
    calc: (v) => {
      const diff = Math.ceil((new Date(v.target) - new Date()) / 86400000);
      const weeks = Math.floor(Math.abs(diff) / 7);
      return { value: `${diff} days`, sub: diff >= 0 ? `~${weeks} weeks away` : `${Math.abs(diff)} days ago` };
    }
  },
  "Pregnancy Due Date": {
    cat: "health", icon: "🤱",
    fields: [
      { id: "lmp", label: "Last Menstrual Period (YYYY-MM-DD)", placeholder: "2024-01-01", type: "text" }
    ],
    calc: (v) => {
      const due = new Date(new Date(v.lmp).getTime() + 280 * 86400000);
      const days = Math.ceil((due - new Date()) / 86400000);
      return { value: due.toDateString(), sub: days > 0 ? `${days} days remaining (~${Math.floor(days / 7)} weeks)` : "Due date has passed" };
    }
  },

  // MATH
  "Percentage": {
    cat: "math", icon: "➗",
    fields: [
      { id: "value", label: "Value", placeholder: "75", type: "number" },
      { id: "total", label: "Total", placeholder: "200", type: "number" }
    ],
    calc: (v) => {
      const pct = (v.value / v.total) * 100;
      return { value: `${pct.toFixed(2)}%`, sub: `${v.value} is ${pct.toFixed(2)}% of ${v.total}` };
    }
  },
  "Square Root": {
    cat: "math", icon: "√",
    fields: [
      { id: "n", label: "Number", placeholder: "144", type: "number" }
    ],
    calc: (v) => ({ value: Math.sqrt(v.n).toFixed(6), sub: `∛${v.n} = ${Math.cbrt(v.n).toFixed(4)} | ${v.n}² = ${Math.pow(v.n, 2)}` })
  },
  "Prime Numbers": {
    cat: "math", icon: "🔢",
    fields: [{ id: "n", label: "Check if prime (or find primes up to)", placeholder: "97", type: "number" }],
    calc: (v) => {
      const isPrime = n => { if (n < 2) return false; for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false; return true; };
      const primes = [];
      for (let i = 2; i <= Math.min(v.n, 200) && primes.length < 15; i++) if (isPrime(i)) primes.push(i);
      return { value: isPrime(v.n) ? `${v.n} is PRIME ✓` : `${v.n} is NOT prime`, sub: `Primes up to ${Math.min(v.n, 200)}: ${primes.join(", ")}` };
    }
  },
  "Equation Solver": {
    cat: "math", icon: "🧮",
    fields: [
      { id: "a", label: "a (ax² + bx + c = 0)", placeholder: "1", type: "number" },
      { id: "b", label: "b", placeholder: "-5", type: "number" },
      { id: "c", label: "c", placeholder: "6", type: "number" }
    ],
    calc: (v) => {
      const d = v.b * v.b - 4 * v.a * v.c;
      if (d < 0) return { value: "No real roots", sub: "Discriminant < 0" };
      const x1 = (-v.b + Math.sqrt(d)) / (2 * v.a);
      const x2 = (-v.b - Math.sqrt(d)) / (2 * v.a);
      return { value: `x₁ = ${x1.toFixed(4)}`, sub: `x₂ = ${x2.toFixed(4)} | Δ = ${d.toFixed(4)}` };
    }
  },
  "Logarithms": {
    cat: "math", icon: "📐",
    fields: [
      { id: "n", label: "Number", placeholder: "100", type: "number" },
      { id: "base", label: "Base (leave 0 for natural log)", placeholder: "10", type: "number" }
    ],
    calc: (v) => {
      const log = v.base > 0 ? Math.log(v.n) / Math.log(v.base) : Math.log(v.n);
      const label = v.base > 0 ? `log_${v.base}(${v.n})` : `ln(${v.n})`;
      return { value: log.toFixed(6), sub: `${label} = ${log.toFixed(6)} | log₁₀(${v.n}) = ${Math.log10(v.n).toFixed(4)}` };
    }
  },
  "Standard Deviation": {
    cat: "math", icon: "📉",
    fields: [{ id: "data", label: "Comma-separated numbers", placeholder: "4, 8, 15, 16, 23, 42", type: "text" }],
    calc: (v) => {
      const arr = v.data.split(",").map(Number).filter(x => !isNaN(x));
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      const std = Math.sqrt(arr.reduce((s, x) => s + Math.pow(x - mean, 2), 0) / arr.length);
      return { value: `σ = ${std.toFixed(4)}`, sub: `Mean: ${mean.toFixed(4)} | Count: ${arr.length} | Range: ${Math.min(...arr)} – ${Math.max(...arr)}` };
    }
  },
  "Geometry Calculator": {
    cat: "math", icon: "📏",
    fields: [
      { id: "shape", label: "Shape", type: "select", options: ["Circle (r)", "Rectangle (l×w)", "Triangle (b, h)", "Sphere (r)", "Cylinder (r, h)"] },
      { id: "a", label: "Value A (radius / length / base)", placeholder: "5", type: "number" },
      { id: "b2", label: "Value B (width / height — if needed)", placeholder: "3", type: "number" }
    ],
    calc: (v) => {
      const π = Math.PI;
      switch (v.shape) {
        case "Circle (r)": return { value: `Area: ${(π * v.a ** 2).toFixed(3)}`, sub: `Circumference: ${(2 * π * v.a).toFixed(3)}` };
        case "Rectangle (l×w)": return { value: `Area: ${(v.a * v.b2).toFixed(3)}`, sub: `Perimeter: ${(2 * (Number(v.a) + Number(v.b2))).toFixed(3)}` };
        case "Triangle (b, h)": return { value: `Area: ${(0.5 * v.a * v.b2).toFixed(3)}`, sub: `Base: ${v.a} | Height: ${v.b2}` };
        case "Sphere (r)": return { value: `Vol: ${((4 / 3) * π * v.a ** 3).toFixed(3)}`, sub: `Surface: ${(4 * π * v.a ** 2).toFixed(3)}` };
        case "Cylinder (r, h)": return { value: `Vol: ${(π * v.a ** 2 * v.b2).toFixed(3)}`, sub: `Surface: ${(2 * π * v.a * (v.a + Number(v.b2))).toFixed(3)}` };
        default: return { value: "Select a shape", sub: "" };
      }
    }
  },
  "Factorial": {
    cat: "math", icon: "❗",
    fields: [{ id: "n", label: "n (0–20)", placeholder: "10", type: "number" }],
    calc: (v) => {
      const n = Math.min(Math.max(0, Math.floor(v.n)), 20);
      let f = 1n; for (let i = 2n; i <= BigInt(n); i++) f *= i;
      return { value: `${n}! = ${f}`, sub: `Permutations of ${n} items` };
    }
  },

  // EVERYDAY TOOLS
  "Tip Calc": {
    cat: "tools", icon: "🍽️",
    fields: [
      { id: "bill", label: "Bill Amount ($)", placeholder: "75.00", type: "number" },
      { id: "tip", label: "Tip %", placeholder: "18", type: "number" },
      { id: "people", label: "Split Between (people)", placeholder: "3", type: "number" }
    ],
    calc: (v) => {
      const tipAmt = v.bill * v.tip / 100;
      const total = Number(v.bill) + tipAmt;
      const perPerson = total / (v.people || 1);
      return { value: `$${perPerson.toFixed(2)}/person`, sub: `Tip: $${tipAmt.toFixed(2)} | Total: $${total.toFixed(2)}` };
    }
  },
  "Discount": {
    cat: "tools", icon: "🏷️",
    fields: [
      { id: "price", label: "Original Price ($)", placeholder: "120", type: "number" },
      { id: "disc", label: "Discount (%)", placeholder: "25", type: "number" }
    ],
    calc: (v) => {
      const saved = v.price * v.disc / 100;
      return { value: `$${(v.price - saved).toFixed(2)}`, sub: `Save $${saved.toFixed(2)} (${v.disc}% off $${v.price})` };
    }
  },
  "Unit Converter": {
    cat: "tools", icon: "📐",
    fields: [
      { id: "val", label: "Value", placeholder: "10", type: "number" },
      { id: "from", label: "From", type: "select", options: ["miles", "km", "kg", "lbs", "°C", "°F", "inches", "cm", "gallons", "liters", "oz", "grams"] },
      { id: "to", label: "To", type: "select", options: ["km", "miles", "lbs", "kg", "°F", "°C", "cm", "inches", "liters", "gallons", "grams", "oz"] }
    ],
    calc: (v) => {
      const conversions = {
        "miles-km": x => x * 1.60934, "km-miles": x => x / 1.60934,
        "kg-lbs": x => x * 2.20462, "lbs-kg": x => x / 2.20462,
        "°C-°F": x => x * 9 / 5 + 32, "°F-°C": x => (x - 32) * 5 / 9,
        "inches-cm": x => x * 2.54, "cm-inches": x => x / 2.54,
        "gallons-liters": x => x * 3.78541, "liters-gallons": x => x / 3.78541,
        "oz-grams": x => x * 28.3495, "grams-oz": x => x / 28.3495,
      };
      const key = `${v.from}-${v.to}`;
      const fn = conversions[key];
      if (!fn) return { value: "Conversion not available", sub: "Try swapping From/To" };
      return { value: `${fn(v.val).toFixed(4)} ${v.to}`, sub: `${v.val} ${v.from} = ${fn(v.val).toFixed(4)} ${v.to}` };
    }
  },
  "Currency Converter": {
    cat: "tools", icon: "💱",
    fields: [
      { id: "amount", label: "Amount", placeholder: "100", type: "number" },
      { id: "from", label: "From Currency", type: "select", options: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR"] },
      { id: "to", label: "To Currency", type: "select", options: ["EUR", "USD", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR"] }
    ],
    calc: (v) => {
      const rates = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CAD: 1.36, AUD: 1.53, CHF: 0.88, CNY: 7.24, INR: 83.1 };
      const result = v.amount * (rates[v.to] / rates[v.from]);
      return { value: `${result.toFixed(2)} ${v.to}`, sub: `Rate: 1 ${v.from} = ${(rates[v.to] / rates[v.from]).toFixed(4)} ${v.to} (indicative)` };
    }
  },
  "Fuel Cost": {
    cat: "lifestyle", icon: "⛽",
    fields: [
      { id: "dist", label: "Distance (km)", placeholder: "500", type: "number" },
      { id: "eff", label: "Fuel Efficiency (L/100km)", placeholder: "8", type: "number" },
      { id: "price", label: "Fuel Price ($/L)", placeholder: "1.75", type: "number" }
    ],
    calc: (v) => {
      const liters = (v.dist / 100) * v.eff;
      const cost = liters * v.price;
      return { value: `$${cost.toFixed(2)}`, sub: `Fuel used: ${liters.toFixed(1)}L | Per km: $${(cost / v.dist).toFixed(3)}` };
    }
  },
  "Rent Split": {
    cat: "lifestyle", icon: "🏠",
    fields: [
      { id: "rent", label: "Total Rent ($)", placeholder: "2400", type: "number" },
      { id: "people", label: "Number of Roommates", placeholder: "3", type: "number" }
    ],
    calc: (v) => {
      const each = v.rent / v.people;
      return { value: `$${each.toFixed(2)}/person`, sub: `${v.people} people × $${each.toFixed(2)} = $${v.rent}` };
    }
  },
  "Car Loan": {
    cat: "lifestyle", icon: "🚗",
    fields: [
      { id: "price", label: "Car Price ($)", placeholder: "25000", type: "number" },
      { id: "down", label: "Down Payment ($)", placeholder: "5000", type: "number" },
      { id: "rate", label: "Annual Rate (%)", placeholder: "5.9", type: "number" },
      { id: "months", label: "Loan Term (months)", placeholder: "60", type: "number" }
    ],
    calc: (v) => {
      const P = v.price - v.down, r = (v.rate / 100) / 12, n = v.months;
      const pmt = P * r / (1 - Math.pow(1 + r, -n));
      return { value: `$${pmt.toFixed(2)}/mo`, sub: `Total: $${(pmt * n + Number(v.down)).toFixed(0)} | Interest: $${(pmt * n - P).toFixed(0)}` };
    }
  },
  "Gift Ideas": {
    cat: "lifestyle", icon: "🎁",
    fields: [
      { id: "budget", label: "Budget ($)", placeholder: "50", type: "number" },
      { id: "person", label: "Recipient", type: "select", options: ["Partner", "Parent", "Friend", "Child", "Colleague"] }
    ],
    calc: (v) => {
      const ideas = {
        Partner: ["Personalized jewelry", "Experience/Date night", "Spa voucher"],
        Parent: ["Photo book", "Subscription box", "Experience day"],
        Friend: ["Experience/Activity", "Gourmet gift set", "Book + Candle bundle"],
        Child: ["LEGO set", "Art supplies kit", "Books collection"],
        Colleague: ["Quality notebook", "Coffee gift set", "Plant"],
      };
      const list = ideas[v.person] || ["Personalized gift", "Experience", "Subscription"];
      return { value: `Budget: $${v.budget}`, sub: list.map((g, i) => `${i + 1}. ${g}`).join(" | ") };
    }
  },
  "Shopping List Total": {
    cat: "lifestyle", icon: "🛒",
    fields: [
      { id: "items", label: "Items (price,qty pairs e.g. 3.99,2;1.50,4)", placeholder: "3.99,2;1.50,4;5.00,1", type: "text" }
    ],
    calc: (v) => {
      const pairs = v.items.split(";").map(p => p.split(",").map(Number));
      const subtotal = pairs.reduce((s, [price, qty]) => s + (price || 0) * (qty || 1), 0);
      const tax = subtotal * 0.1;
      return { value: `$${subtotal.toFixed(2)}`, sub: `+10% tax: $${(subtotal + tax).toFixed(2)} | Items: ${pairs.length}` };
    }
  },
  "Packing List": {
    cat: "lifestyle", icon: "🧳",
    fields: [
      { id: "days", label: "Trip Length (days)", placeholder: "7", type: "number" },
      { id: "type", label: "Trip Type", type: "select", options: ["Beach", "Business", "Hiking", "City Break"] }
    ],
    calc: (v) => {
      const base = ["Passport/ID", "Phone charger", "Toiletries", "Medications"];
      const specific = {
        Beach: ["Swimsuit ×2", "Sunscreen SPF50", "Flip flops", "Beach towel"],
        Business: ["Suit/formal wear", "Laptop + charger", "Business cards", "Dress shoes"],
        Hiking: ["Trail shoes", "Rain jacket", "First aid kit", "Water bottle"],
        "City Break": ["Comfortable shoes ×2", "Light jacket", "Daypack", "Camera"],
      };
      const clothes = `Clothes: ~${Math.ceil(v.days * 0.8)} outfits`;
      return { value: clothes, sub: [...base, ...(specific[v.type] || [])].slice(0, 5).join(" · ") };
    }
  },
};

// ─── Category Config ────────────────────────────────────────────────────────
const CATS = [
  { key: "finance", label: "Finance", icon: "💳" },
  { key: "health", label: "Health", icon: "❤️" },
  { key: "math", label: "Math", icon: "🔢" },
  { key: "tools", label: "Everyday Tools", icon: "🔧" },
  { key: "lifestyle", label: "Lifestyle", icon: "✨" },
];

// ─── Privacy Policy Page ──────────────────────────────────────────────────────
function PrivacyPolicy({ onClose }) {
  return (
    <div className="page-modal" onClick={e => e.target.classList.contains("page-modal") && onClose()}>
      <div className="page-inner">
        <h1>🔒 Privacy Policy</h1>
        <div className="page-date">Last updated: January 1, 2026</div>

        <h2>1. Who We Are</h2>
        <p>Smart Calculator Hub ("we", "us", "our") operates the website at your domain. We provide free online calculators for finance, health, math, and everyday use.</p>

        <h2>2. Information We Collect</h2>
        <p>We collect minimal data to operate the service:</p>
        <ul>
          <li><strong>Usage data</strong> — calculator inputs and results may be stored anonymously to improve the service.</li>
          <li><strong>Session identifiers</strong> — a randomly generated anonymous ID stored in your browser (localStorage) to link your calculation history. This contains no personal information.</li>
          <li><strong>Log data</strong> — standard server logs including IP address, browser type, and pages visited.</li>
        </ul>
        <p>We do <strong>not</strong> collect names, email addresses, or any personally identifiable information unless you contact us directly.</p>

        <h2>3. Google AdSense & Cookies</h2>
        <p>We use Google AdSense to display advertisements. Google may use cookies and similar technologies to show you personalised ads based on your visits to this and other websites. You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Google Ad Settings</a>.</p>
        <p>Third-party vendors, including Google, use cookies to serve ads based on your prior visits. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</p>

        <h2>4. How We Use Your Data</h2>
        <ul>
          <li>To provide and improve our calculator tools</li>
          <li>To analyse usage patterns and fix errors</li>
          <li>To display relevant advertisements via Google AdSense</li>
        </ul>

        <h2>5. Data Sharing</h2>
        <p>We do not sell, trade, or rent your personal information. We may share anonymised, aggregated data with analytics providers. Google AdSense operates under its own privacy policy.</p>

        <h2>6. Data Retention</h2>
        <p>Anonymous calculation history is retained for up to 90 days and then automatically deleted. Server logs are retained for up to 30 days.</p>

        <h2>7. Your Rights</h2>
        <p>You have the right to request deletion of any data associated with your session. To do so, clear your browser's localStorage for this site. For further requests, contact us at the email below.</p>

        <h2>8. Children's Privacy</h2>
        <p>Our service is not directed at children under 13. We do not knowingly collect data from children under 13. If you believe a child has provided us with personal information, please contact us immediately.</p>

        <h2>9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance.</p>

        <h2>10. Contact Us</h2>
        <p>For privacy questions or data requests, email: <a href="mailto:privacy@yourdomain.com">privacy@yourdomain.com</a></p>

        <button className="page-close-btn" onClick={onClose}>Close ×</button>
      </div>
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────
function AboutPage({ onClose }) {
  return (
    <div className="page-modal" onClick={e => e.target.classList.contains("page-modal") && onClose()}>
      <div className="page-inner">
        <h1>🏠 About Smart Calculator Hub</h1>
        <div className="page-date">Free tools for everyone, forever.</div>

        <h2>What We Do</h2>
        <p>Smart Calculator Hub is a free, ad-supported collection of 25+ calculators covering Finance, Health, Math, and Everyday Tools. Every calculator runs instantly in your browser — no sign-up, no downloads, no fees.</p>

        <h2>Our Calculators</h2>
        <ul>
          <li><strong>Finance</strong> — Compound interest, loan payments, VAT, profit margin, salary converter, retirement planning, breakeven analysis, and more.</li>
          <li><strong>Health</strong> — BMI, calorie counter (TDEE), one rep max, sleep cycles, macro splits, and more.</li>
          <li><strong>Math</strong> — Percentages, square roots, prime numbers, equation solver, logarithms, standard deviation, factorial, geometry.</li>
          <li><strong>Everyday Tools</strong> — Tip calculator, discount finder, unit converter, currency converter, fuel cost, rent split.</li>
          <li><strong>Lifestyle</strong> — Car loan, fuel cost, gift ideas, shopping totals, packing lists.</li>
        </ul>

        <h2>Why Free?</h2>
        <p>We believe financial and mathematical tools should be accessible to everyone. Smart Calculator Hub is funded entirely by advertising revenue through Google AdSense, which allows us to keep every tool completely free.</p>

        <h2>Accuracy Disclaimer</h2>
        <p>All calculators are provided for informational and educational purposes only. Results should not be used as the sole basis for financial, medical, or other professional decisions. Always consult a qualified professional for important decisions.</p>

        <h2>Contact</h2>
        <p>Questions or suggestions? Email us at <a href="mailto:hello@yourdomain.com">hello@yourdomain.com</a></p>

        <button className="page-close-btn" onClick={onClose}>Close ×</button>
      </div>
    </div>
  );
}

// ─── Terms of Service ─────────────────────────────────────────────────────────
function TermsOfService({ onClose }) {
  return (
    <div className="page-modal" onClick={e => e.target.classList.contains("page-modal") && onClose()}>
      <div className="page-inner">
        <h1>📋 Terms of Service</h1>
        <div className="page-date">Last updated: January 1, 2026</div>

        <h2>1. Acceptance of Terms</h2>
        <p>By using Smart Calculator Hub, you agree to these Terms of Service. If you do not agree, please stop using the site.</p>

        <h2>2. Use of the Service</h2>
        <p>You may use our calculators for personal or commercial informational purposes. You may not:</p>
        <ul>
          <li>Scrape, copy, or redistribute our tools without permission</li>
          <li>Use the service for any unlawful purpose</li>
          <li>Attempt to disrupt or damage our service</li>
        </ul>

        <h2>3. No Professional Advice</h2>
        <p>Calculator results are for informational purposes only and do not constitute financial, medical, legal, or professional advice. Always consult a qualified professional before making important decisions.</p>

        <h2>4. Advertising</h2>
        <p>This site displays ads via Google AdSense. We are not responsible for the content of third-party advertisements.</p>

        <h2>5. Limitation of Liability</h2>
        <p>Smart Calculator Hub is provided "as is" without warranties of any kind. We are not liable for any damages arising from use of our calculators or reliance on their results.</p>

        <h2>6. Changes</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>

        <h2>7. Contact</h2>
        <p>Questions about these terms? Email <a href="mailto:legal@yourdomain.com">legal@yourdomain.com</a></p>

        <button className="page-close-btn" onClick={onClose}>Close ×</button>
      </div>
    </div>
  );
}

// ─── AdSense Slot Component ───────────────────────────────────────────────────
// Replace YOUR_PUBLISHER_ID with your ca-pub-XXXXXXXXXXXXXXXX
// Replace each SLOT_ID with the ad unit slot IDs from your AdSense dashboard
const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX"; // ← your publisher ID here

const AD_SLOTS = {
  finance:   "1111111111", // ← replace with real slot IDs from AdSense dashboard
  health:    "2222222222",
  math:      "3333333333",
  tools:     "4444444444",
  lifestyle: "5555555555",
};

function AdSlot({ catKey }) {
  const slotId = AD_SLOTS[catKey];

  // Show placeholder if AdSense not configured yet
  if (!slotId || ADSENSE_CLIENT === "ca-pub-XXXXXXXXXXXXXXXX") {
    return (
      <div className="ad-slot">
        <div className="ad-placeholder">📢 Advertisement — AdSense slot ({catKey})</div>
      </div>
    );
  }

  return (
    <div className="ad-slot">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}


function CalcModal({ name, def, onClose }) {
  const [vals, setVals] = useState({});
  const [result, setResult] = useState(null);

  const handleCalc = useCallback(() => {
    try { setResult(def.calc(vals)); }
    catch (e) { setResult({ value: "Error", sub: e.message }); }
  }, [def, vals]);

  return (
    <div className="overlay" onClick={e => e.target.classList.contains("overlay") && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">{def.icon} {name}</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {def.fields.map(f => (
            <div key={f.id} className="field">
              <label>{f.label}</label>
              {f.type === "select" ? (
                <select value={vals[f.id] || f.options[0]} onChange={e => setVals(p => ({ ...p, [f.id]: e.target.value }))}>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={vals[f.id] ?? ""}
                  onChange={e => setVals(p => ({ ...p, [f.id]: e.target.value }))}
                  onKeyDown={e => e.key === "Enter" && handleCalc()}
                />
              )}
            </div>
          ))}
          <button className="btn" onClick={handleCalc}>Calculate →</button>
          {result && (
            <div className="result">
              <div className="result-label">RESULT</div>
              <div className="result-value">{result.value}</div>
              {result.sub && <div className="result-sub">{result.sub}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(null); // "privacy" | "terms" | "about" | "articles" | "faq" | "blog" | "tools" | "faq" | "blog" | "tools"

  // Load AdSense script once on mount
  useEffect(() => {
    if (ADSENSE_CLIENT === "ca-pub-XXXXXXXXXXXXXXXX") return; // skip if not configured
    if (document.querySelector('script[src*="adsbygoogle"]')) return; // already loaded
    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  // Push ads after each render (AdSense requires this)
  useEffect(() => {
    if (ADSENSE_CLIENT === "ca-pub-XXXXXXXXXXXXXXXX") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {}
  });

  const calcsByCategory = CATS.map(cat => ({
    ...cat,
    calcs: Object.entries(CALCS).filter(([, d]) => d.cat === cat.key)
  }));

  return (
    <>
      <style>{CSS}</style>
      <div className="ticker-bar">
        <span className="ticker-item">🇺🇸 USD/EUR <span className="down">0.92 ▾</span></span>
        <span className="ticker-item">₿ BTC <span className="up">+1.37% ▴</span></span>
        <span className="ticker-item">📈 S&P500 <span className="up">+0.82% ▴</span></span>
        <span className="ticker-item">🟠 ETH <span className="down">-0.54% ▾</span></span>
        <span className="ticker-item">🍎 AAPL <span className="up">+1.97% ▴</span></span>
      </div>
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-brand">🏠 Smart Calculator Hub</span>
          <div className="nav-links">
            {CATS.map(c => (
              <span key={c.key} className="nav-link" onClick={() => {
                document.getElementById(c.key)?.scrollIntoView({ behavior: "smooth" });
              }}>[{c.label}]</span>
            ))}
            <span className="nav-link" onClick={() => setPage("articles")}>[Articles]</span>
            <span className="nav-link" onClick={() => setPage("blog")}>[Blog]</span>
            <span className="nav-link" onClick={() => setPage("tools")}>[Tools]</span>
            <span className="nav-link" onClick={() => setPage("faq")}>[FAQ]</span>
            <span className="nav-link" onClick={() => setPage("about")}>[About]</span>
            <span className="nav-link" onClick={() => setPage("privacy")}>[Privacy]</span>
          </div>
        </div>
      </nav>

      <div className="hub">
        <div className="header">
          <h1>🏠 Smart Calculator Hub – Dashboard</h1>
          <p>25+ free calculators for Finance, Health, Math & Everyday Life</p>
        </div>

        {calcsByCategory.map((cat, idx) => (
          <div key={cat.key}>
            <div id={cat.key} className={`cat-section ${cat.key}`}>
              <div className="cat-header">
                <span className="cat-title">{cat.icon} {cat.label}</span>
                <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "Space Mono" }}>{cat.calcs.length} tools</span>
              </div>
              <div className="calc-grid">
                {cat.calcs.map(([name, def]) => (
                  <div key={name} className="calc-card" onClick={() => setOpen(name)}>
                    <span className="icon">{def.icon}</span>
                    <div>
                      <div className="label">{name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Ad slot after every section except the last */}
            {idx < calcsByCategory.length - 1 && <AdSlot catKey={cat.key} />}
          </div>
        ))}

        <footer className="footer">
          <p>© 2026 Smart Calculator Hub &nbsp;·&nbsp;
            <span style={{cursor:"pointer",color:"var(--accent)"}} onClick={() => setPage("articles")}>Articles</span>
            &nbsp;·&nbsp;
            <span style={{cursor:"pointer",color:"var(--accent)"}} onClick={() => setPage("blog")}>Blog</span>
            &nbsp;·&nbsp;
            <span style={{cursor:"pointer",color:"var(--accent)"}} onClick={() => setPage("tools")}>Tools</span>
            &nbsp;·&nbsp;
            <span style={{cursor:"pointer",color:"var(--accent)"}} onClick={() => setPage("faq")}>FAQ</span>
            &nbsp;·&nbsp;
            <span style={{cursor:"pointer",color:"var(--accent)"}} onClick={() => setPage("terms")}>Terms</span>
            &nbsp;·&nbsp;
            <span style={{cursor:"pointer",color:"var(--accent)"}} onClick={() => setPage("privacy")}>Privacy</span>
            &nbsp;·&nbsp;
            <span style={{cursor:"pointer",color:"var(--accent)"}} onClick={() => setPage("about")}>About</span>
          </p>
          <p style={{ marginTop: 6 }}>All calculations are for informational purposes only.</p>
        </footer>
      </div>

      {open && CALCS[open] && (
        <CalcModal name={open} def={CALCS[open]} onClose={() => setOpen(null)} />
      )}
      {page === "articles" && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 250, overflow: 'auto', paddingTop: 60 }}>
          <Articles />
          <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 251 }}>
            <button 
              onClick={() => setPage(null)} 
              style={{ 
                background: 'var(--accent)', 
                color: '#0d1117', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 700,
                fontSize: 13,
                fontFamily: "'Sora', sans-serif"
              }}
            >
              ← Back
            </button>
          </div>
        </div>
      )}
      {page === "blog" && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 250, overflow: 'auto', paddingTop: 60 }}>
          <Blog />
          <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 251 }}>
            <button 
              onClick={() => setPage(null)} 
              style={{ 
                background: 'var(--accent)', 
                color: '#0d1117', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 700,
                fontSize: 13,
                fontFamily: "'Sora', sans-serif"
              }}
            >
              ← Back
            </button>
          </div>
        </div>
      )}
      {page === "faq" && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 250, overflow: 'auto', paddingTop: 60 }}>
          <FAQ />
          <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 251 }}>
            <button 
              onClick={() => setPage(null)} 
              style={{ 
                background: 'var(--accent)', 
                color: '#0d1117', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 700,
                fontSize: 13,
                fontFamily: "'Sora', sans-serif"
              }}
            >
              ← Back
            </button>
          </div>
        </div>
      )}
      {page === "tools" && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 250, overflow: 'auto', paddingTop: 60 }}>
          <ToolsGuides />
          <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 251 }}>
            <button 
              onClick={() => setPage(null)} 
              style={{ 
                background: 'var(--accent)', 
                color: '#0d1117', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 700,
                fontSize: 13,
                fontFamily: "'Sora', sans-serif"
              }}
            >
              ← Back
            </button>
          </div>
        </div>
      )}
      {page === "privacy" && <PrivacyPolicy onClose={() => setPage(null)} />}
      {page === "terms"   && <TermsOfService onClose={() => setPage(null)} />}
      {page === "about"   && <AboutPage onClose={() => setPage(null)} />}
    </>
  );
}
