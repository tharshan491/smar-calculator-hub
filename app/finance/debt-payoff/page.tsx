'use client'

import { useState } from 'react'
import { TrendingDown } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface DebtPayoffResult {
  months: number
  totalPayment: number
  totalInterest: number
  monthlyPayment: number
}

export default function DebtPayoffCalculator() {
  const [inputs, setInputs] = useState({
    debtAmount: '10000',
    interestRate: '18',
    monthlyPayment: '500',
  })
  const [result, setResult] = useState<DebtPayoffResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const debt = parseFloat(inputs.debtAmount)
      const rate = parseFloat(inputs.interestRate)
      const payment = parseFloat(inputs.monthlyPayment)

      if (isNaN(debt) || isNaN(rate) || isNaN(payment) || debt <= 0 || rate < 0 || payment <= 0) {
        setError('Please enter valid positive numbers')
        setLoading(false)
        return
      }

      const monthlyRate = rate / 100 / 12
      let balance = debt
      let months = 0
      let totalInterest = 0

      while (balance > 0 && months < 600) {
        const interest = balance * monthlyRate
        const principal = payment - interest

        if (principal <= 0) {
          setError('Monthly payment is too low to pay off debt')
          setLoading(false)
          return
        }

        balance -= principal
        totalInterest += interest
        months++
      }

      setResult({
        months,
        totalPayment: debt + totalInterest,
        totalInterest: Math.round(totalInterest * 100) / 100,
        monthlyPayment: payment,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Debt Payoff Calculator"
      description="Calculate how long it takes to pay off debt"
      icon={<TrendingDown className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `${result.months} months` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Total Debt Amount ($)</label>
          <input
            type="number"
            step="100"
            required
            className="form-input"
            value={inputs.debtAmount}
            onChange={(e) => setInputs({ ...inputs, debtAmount: e.target.value })}
            placeholder="10000"
          />
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
            placeholder="18"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Monthly Payment ($)</label>
          <input
            type="number"
            step="10"
            required
            className="form-input"
            value={inputs.monthlyPayment}
            onChange={(e) => setInputs({ ...inputs, monthlyPayment: e.target.value })}
            placeholder="500"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Payoff Time'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-center mb-3">
              <div className="text-2xl font-bold text-accent mb-1">{result.months} months</div>
              <div className="text-sm text-muted">Time to pay off debt</div>
              <div className="text-xs text-muted mt-1">({Math.floor(result.months / 12)} years {result.months % 12} months)</div>
            </div>
            <div className="space-y-2 text-sm border-t border-accent/30 pt-3">
              <div className="flex justify-between">
                <span className="text-muted">Total Interest Paid:</span>
                <span className="font-bold text-accent3">${formatNumber(result.totalInterest, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Total Amount Paid:</span>
                <span className="font-bold">${formatNumber(result.totalPayment, 2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
