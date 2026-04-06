'use client'

import { useState } from 'react'
import { Home } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface MortgageResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  principal: number
  homePrice: number
  downPayment: number
  rate: number
  term: number
}

export default function MortgageCalculator() {
  const [inputs, setInputs] = useState({
    loanAmount: '300000',
    interestRate: '6.5',
    loanTerm: '30',
    downPayment: '60000',
  })
  const [result, setResult] = useState<MortgageResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const homePrice = parseFloat(inputs.loanAmount)
      const downPayment = parseFloat(inputs.downPayment)
      const principal = homePrice - downPayment
      const rate = parseFloat(inputs.interestRate)
      const term = parseFloat(inputs.loanTerm)

      if (isNaN(homePrice) || isNaN(downPayment) || isNaN(rate) || isNaN(term) || 
          homePrice <= 0 || downPayment < 0 || rate < 0 || term <= 0) {
        setError('Please enter valid positive numbers')
        setLoading(false)
        return
      }

      if (downPayment >= homePrice) {
        setError('Down payment must be less than home price')
        setLoading(false)
        return
      }

      const monthlyRate = rate / 100 / 12
      const numPayments = term * 12

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
        principal: Math.round(principal * 100) / 100,
        homePrice,
        downPayment,
        rate,
        term,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payment and total interest costs"
      icon={<Home className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `$${formatNumber(result.monthlyPayment, 2)}/mo` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Home Price ($)</label>
          <input
            type="number"
            step="1000"
            required
            className="form-input"
            value={inputs.loanAmount}
            onChange={(e) => setInputs({ ...inputs, loanAmount: e.target.value })}
            placeholder="300000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Down Payment ($)</label>
          <input
            type="number"
            step="1000"
            required
            className="form-input"
            value={inputs.downPayment}
            onChange={(e) => setInputs({ ...inputs, downPayment: e.target.value })}
            placeholder="60000"
          />
          <p className="text-xs text-muted mt-1">
            Down Payment %: {inputs.loanAmount && inputs.downPayment 
              ? ((parseFloat(inputs.downPayment) / parseFloat(inputs.loanAmount)) * 100).toFixed(1) 
              : '0'}%
          </p>
        </div>

        <div className="form-group">
          <label className="form-label">Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            required
            className="form-input"
            value={inputs.interestRate}
            onChange={(e) => setInputs({ ...inputs, interestRate: e.target.value })}
            placeholder="6.5"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Loan Term (Years)</label>
          <div className="flex gap-2 mb-2">
            {[15, 20, 30].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setInputs({ ...inputs, loanTerm: term.toString() })}
                className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                  inputs.loanTerm === term.toString()
                    ? 'bg-accent text-bg'
                    : 'bg-surface border border-border hover:border-accent'
                }`}
              >
                {term}yr
              </button>
            ))}
          </div>
          <input
            type="number"
            step="1"
            required
            className="form-input"
            value={inputs.loanTerm}
            onChange={(e) => setInputs({ ...inputs, loanTerm: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Mortgage'}
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
                <span className="text-muted">Home Price:</span>
                <span className="font-bold">${formatNumber(result.homePrice, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Down Payment:</span>
                <span className="font-bold">${formatNumber(result.downPayment, 2)}</span>
              </div>
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
                <span className="text-muted">Total Amount Paid:</span>
                <span className="font-bold text-accent">${formatNumber(result.totalPayment + result.downPayment, 2)}</span>
              </div>
            </div>
          </div>

          {/* Breakdown Box */}
          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-bold text-text mb-3">Mortgage Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Principal vs Interest:</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Principal:</span>
                <span className="font-bold">${formatNumber(result.principal, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Interest Cost:</span>
                <span className="font-bold text-accent3">${formatNumber(result.totalInterest, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Interest % of Principal:</span>
                <span className="font-bold">{((result.totalInterest / result.principal) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Formula */}
          <div className="text-xs text-muted bg-muted/20 p-3 rounded-lg">
            <strong>Formula:</strong> M = P[r(1+r)<sup>n</sup>]/[(1+r)<sup>n</sup>-1]
            <br />
            where M = Monthly Payment, P = Loan Amount, r = Monthly Rate, n = Number of Payments
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
