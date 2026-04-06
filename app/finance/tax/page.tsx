'use client'

import { useState } from 'react'
import { DollarSign } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface TaxResult {
  tax: number
  afterTax: number
  effectiveRate: number
}

export default function TaxCalculator() {
  const [inputs, setInputs] = useState({
    income: '50000',
    filingStatus: 'single',
    dependents: '0',
  })
  const [result, setResult] = useState<TaxResult | null>(null)
  const [loading, setLoading] = useState(false)

  const getTaxBrackets = (status: string) => {
    const brackets: Record<string, Array<[number, number]>> = {
      single: [[11000, 0.1], [44725, 0.12], [95375, 0.22], [182100, 0.24], [231250, 0.32], [578125, 0.35], [Infinity, 0.37]],
      married: [[22000, 0.1], [89075, 0.12], [190750, 0.22], [364200, 0.24], [462500, 0.32], [693750, 0.35], [Infinity, 0.37]],
      headOfHousehold: [[15700, 0.1], [59850, 0.12], [95350, 0.22], [182100, 0.24], [231250, 0.32], [578100, 0.35], [Infinity, 0.37]],
    }
    return brackets[status] || brackets.single
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const income = parseFloat(inputs.income)
    const brackets = getTaxBrackets(inputs.filingStatus)
    const standardDeduction = inputs.filingStatus === 'married' ? 27700 : inputs.filingStatus === 'headOfHousehold' ? 20800 : 13850
    const childCredit = parseFloat(inputs.dependents) * 2000

    const taxableIncome = Math.max(0, income - standardDeduction)
    let tax = 0
    let previousLimit = 0

    for (const [limit, rate] of brackets) {
      if (taxableIncome <= previousLimit) break
      const taxableInThisBracket = Math.min(taxableIncome, limit) - previousLimit
      tax += taxableInThisBracket * rate
      previousLimit = limit
    }

    tax = Math.max(0, tax - childCredit)

    setResult({
      tax: Math.round(tax * 100) / 100,
      afterTax: Math.round((income - tax) * 100) / 100,
      effectiveRate: Math.round((tax / income) * 10000) / 100,
    })

    setLoading(false)
  }

  return (
    <CalculatorTemplate
      title="Income Tax Calculator"
      description="Estimate your federal income tax and after-tax income"
      icon={<DollarSign className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `$${formatNumber(result.tax, 2)}` : null}
      loading={loading}
      error=""
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Annual Income ($)</label>
          <input
            type="number"
            step="1000"
            required
            className="form-input"
            value={inputs.income}
            onChange={(e) => setInputs({ ...inputs, income: e.target.value })}
            placeholder="50000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Filing Status</label>
          <select
            className="form-select"
            value={inputs.filingStatus}
            onChange={(e) => setInputs({ ...inputs, filingStatus: e.target.value })}
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="headOfHousehold">Head of Household</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Number of Dependents</label>
          <input
            type="number"
            step="1"
            min="0"
            required
            className="form-input"
            value={inputs.dependents}
            onChange={(e) => setInputs({ ...inputs, dependents: e.target.value })}
            placeholder="0"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Tax'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Estimated Tax:</span>
              <span className="font-bold text-accent3">${formatNumber(result.tax, 2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">After-Tax Income:</span>
              <span className="font-bold text-accent2">${formatNumber(result.afterTax, 2)}</span>
            </div>
            <div className="flex justify-between border-t border-accent/30 pt-2">
              <span className="text-muted">Effective Tax Rate:</span>
              <span className="font-bold">{result.effectiveRate}%</span>
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
