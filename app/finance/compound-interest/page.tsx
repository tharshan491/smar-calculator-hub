'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface CompoundResult {
  principal: number
  rate: number
  years: number
  frequency: number
  finalAmount: number
  totalInterest: number
  effectiveRate: number
  yearlyData: Array<{
    year: number
    amount: number
    interest: number
  }>
}

export default function CompoundInterest() {
  const [inputs, setInputs] = useState({
    principal: '1000',
    rate: '5',
    years: '10',
    n: '12',
  })
  const [result, setResult] = useState<CompoundResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const principal = parseFloat(inputs.principal)
      const rate = parseFloat(inputs.rate)
      const years = parseFloat(inputs.years)
      const n = parseInt(inputs.n)

      if (isNaN(principal) || isNaN(rate) || isNaN(years) || principal <= 0 || rate < 0 || years <= 0) {
        setError('Please enter valid positive numbers')
        setLoading(false)
        return
      }

      // Compound interest formula: A = P(1 + r/n)^(nt)
      const r = rate / 100
      const finalAmount = principal * Math.pow(1 + r / n, n * years)
      const totalInterest = finalAmount - principal
      const effectiveRate = Math.pow(1 + r / n, n) - 1

      // Calculate year-by-year breakdown
      const yearlyData = []
      for (let year = 1; year <= Math.ceil(years); year++) {
        if (year <= years) {
          const yearAmount = principal * Math.pow(1 + r / n, n * year)
          const yearInterest = yearAmount - principal
          yearlyData.push({
            year,
            amount: Math.round(yearAmount * 100) / 100,
            interest: Math.round(yearInterest * 100) / 100,
          })
        }
      }

      setResult({
        principal,
        rate,
        years,
        frequency: n,
        finalAmount: Math.round(finalAmount * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        effectiveRate: Math.round(effectiveRate * 10000) / 100,
        yearlyData,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  const frequencyLabel = {
    '1': 'Annually',
    '2': 'Semi-annually',
    '4': 'Quarterly',
    '12': 'Monthly',
    '365': 'Daily',
  }

  return (
    <CalculatorTemplate
      title="Compound Interest Calculator"
      description="Calculate how your investments grow with compound interest over time"
      icon={<TrendingUp className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `$${formatNumber(result.finalAmount, 2)}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Principal Amount ($)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.principal}
            onChange={(e) => setInputs({ ...inputs, principal: e.target.value })}
            placeholder="1000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Annual Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.rate}
            onChange={(e) => setInputs({ ...inputs, rate: e.target.value })}
            placeholder="5"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Time Period (Years)</label>
          <input
            type="number"
            step="0.1"
            required
            className="form-input"
            value={inputs.years}
            onChange={(e) => setInputs({ ...inputs, years: e.target.value })}
            placeholder="10"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Compounding Frequency</label>
          <select
            className="form-select"
            value={inputs.n}
            onChange={(e) => setInputs({ ...inputs, n: e.target.value })}
          >
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Interest'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          {/* Main Result Box */}
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-center mb-3">
              <div className="text-3xl font-bold text-accent mb-1">
                ${formatNumber(result.finalAmount, 2)}
              </div>
              <div className="text-sm text-muted">Final Amount After {result.years} Year(s)</div>
            </div>
            <div className="space-y-2 text-sm border-t border-accent/30 pt-3">
              <div className="flex justify-between">
                <span className="text-muted">Principal:</span>
                <span className="font-bold">${formatNumber(result.principal, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Total Interest Earned:</span>
                <span className="font-bold text-green-500">${formatNumber(result.totalInterest, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Interest Rate:</span>
                <span className="font-bold">{result.rate}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Compounding:</span>
                <span className="font-bold">{frequencyLabel[String(result.frequency) as keyof typeof frequencyLabel]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Effective Annual Rate:</span>
                <span className="font-bold">{result.effectiveRate}%</span>
              </div>
            </div>
          </div>

          {/* Year-by-Year Breakdown */}
          {result.yearlyData.length > 0 && (
            <div className="p-4 bg-surface border border-border rounded-lg">
              <h4 className="font-bold text-text mb-3">Year-by-Year Breakdown</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-2 text-muted">Year</th>
                      <th className="text-right py-2 text-muted">Amount</th>
                      <th className="text-right py-2 text-muted">Interest</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {result.yearlyData.slice(0, 10).map((row) => (
                      <tr key={row.year} className="hover:bg-muted/10">
                        <td className="py-2 text-text font-medium">{row.year}</td>
                        <td className="text-right text-text font-bold">${formatNumber(row.amount, 2)}</td>
                        <td className="text-right text-green-500 font-bold">${formatNumber(row.interest, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Formula Info */}
          <div className="text-xs text-muted bg-muted/20 p-3 rounded-lg">
            <strong>Formula:</strong> A = P(1 + r/n)<sup>nt</sup>
            <br />
            where P = Principal, r = Rate, n = Frequency, t = Time (years)
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
