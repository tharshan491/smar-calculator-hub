'use client'

import { useState } from 'react'
import { DollarSign } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface LoanResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  principal: number
  rate: number
  term: number
}

export default function LoanCalculator() {
  const [inputs, setInputs] = useState({
    principal: '200000',
    rate: '5',
    years: '30',
  })
  const [result, setResult] = useState<LoanResult | null>(null)
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

      if (isNaN(principal) || isNaN(rate) || isNaN(years) || principal <= 0 || rate < 0 || years <= 0) {
        setError('Please enter valid positive numbers')
        setLoading(false)
        return
      }

      const monthlyRate = rate / 100 / 12
      const numPayments = years * 12

      let monthlyPayment, totalPayment, totalInterest

      if (monthlyRate === 0) {
        monthlyPayment = principal / numPayments
        totalPayment = principal
        totalInterest = 0
      } else {
        monthlyPayment =
          (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)
        totalPayment = monthlyPayment * numPayments
        totalInterest = totalPayment - principal
      }

      setResult({
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        totalPayment: Math.round(totalPayment * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        principal,
        rate,
        term: years,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Loan Payment Calculator"
      description="Calculate monthly loan payments and total interest costs"
      icon={<DollarSign className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `$${formatNumber(result.monthlyPayment, 2)}/mo` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Loan Amount ($)</label>
          <input
            type="number"
            step="1000"
            required
            className="form-input"
            value={inputs.principal}
            onChange={(e) => setInputs({ ...inputs, principal: e.target.value })}
            placeholder="200000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Annual Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            required
            className="form-input"
            value={inputs.rate}
            onChange={(e) => setInputs({ ...inputs, rate: e.target.value })}
            placeholder="5"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Loan Term (Years)</label>
          <div className="flex gap-2 mb-2">
            {[5, 10, 15, 20, 30].map((yrs) => (
              <button
                key={yrs}
                type="button"
                onClick={() => setInputs({ ...inputs, years: yrs.toString() })}
                className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                  inputs.years === yrs.toString()
                    ? 'bg-accent text-bg'
                    : 'bg-surface border border-border hover:border-accent'
                }`}
              >
                {yrs}yr
              </button>
            ))}
          </div>
          <input
            type="number"
            step="1"
            required
            className="form-input"
            value={inputs.years}
            onChange={(e) => setInputs({ ...inputs, years: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Payment'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          {/* Main Result Box */}
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-center mb-3">
              <div className="text-3xl font-bold text-accent mb-1">
                ${formatNumber(result.monthlyPayment, 2)}
              </div>
              <div className="text-sm text-muted">Monthly Payment</div>
            </div>
            <div className="space-y-2 text-sm border-t border-accent/30 pt-3">
              <div className="flex justify-between">
                <span className="text-muted">Loan Amount:</span>
                <span className="font-bold">${formatNumber(result.principal, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Interest Rate:</span>
                <span className="font-bold">{result.rate}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Loan Term:</span>
                <span className="font-bold">{result.term} years ({Math.round(result.term * 12)} months)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-accent/30">
                <span className="text-muted">Total Interest:</span>
                <span className="font-bold text-accent3">${formatNumber(result.totalInterest, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Total Amount to Pay:</span>
                <span className="font-bold text-accent">${formatNumber(result.totalPayment, 2)}</span>
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-bold text-text mb-3">Loan Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Cost of Interest:</span>
                <span className="text-accent3">${formatNumber(result.totalInterest, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Interest as % of Principal:</span>
                <span className="font-bold">{((result.totalInterest / result.principal) * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Total Payments:</span>
                <span className="font-bold">{Math.round(result.term * 12)} payments</span>
              </div>
            </div>
          </div>

          {/* Formula Info */}
          <div className="text-xs text-muted bg-muted/20 p-3 rounded-lg">
            <strong>Formula:</strong> M = P[r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup>-1]
            <br />
            where M = Monthly Payment, P = Principal, r = Monthly Rate, n = Number of Payments
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
