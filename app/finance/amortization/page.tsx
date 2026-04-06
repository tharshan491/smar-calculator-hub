'use client'

import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface AmortizationSchedule {
  payment: number
  principal: number
  interest: number
  balance: number
}

interface AmortizationResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  schedule: AmortizationSchedule[]
}

export default function AmortizationCalculator() {
  const [inputs, setInputs] = useState({
    loanAmount: '300000',
    interestRate: '6.5',
    loanTerm: '30',
  })
  const [result, setResult] = useState<AmortizationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSchedule, setShowSchedule] = useState(true)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const principal = parseFloat(inputs.loanAmount)
      const rate = parseFloat(inputs.interestRate)
      const term = parseFloat(inputs.loanTerm)

      if (isNaN(principal) || isNaN(rate) || isNaN(term) || principal <= 0 || rate < 0 || term <= 0) {
        setError('Please enter valid positive numbers')
        setLoading(false)
        return
      }

      const monthlyRate = rate / 100 / 12
      const numPayments = term * 12

      let monthlyPayment = 0
      if (monthlyRate === 0) {
        monthlyPayment = principal / numPayments
      } else {
        monthlyPayment =
          (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)
      }

      monthlyPayment = Math.round(monthlyPayment * 100) / 100

      // Generate amortization schedule (show first 12 months + last 3)
      const schedule: AmortizationSchedule[] = []
      let remainingBalance = principal

      for (let i = 1; i <= numPayments; i++) {
        const interestPayment = Math.round(remainingBalance * monthlyRate * 100) / 100
        const principalPayment = Math.round((monthlyPayment - interestPayment) * 100) / 100
        remainingBalance = Math.round((remainingBalance - principalPayment) * 100) / 100

        // Show first 12 months, last 3 months, and selected months
        if (i <= 12 || i > numPayments - 3) {
          schedule.push({
            payment: monthlyPayment,
            principal: principalPayment,
            interest: interestPayment,
            balance: Math.max(remainingBalance, 0), // prevent negative due to rounding
          })
        }
      }

      const totalPayment = monthlyPayment * numPayments
      const totalInterest = totalPayment - principal

      setResult({
        monthlyPayment,
        totalPayment: Math.round(totalPayment * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        schedule,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Amortization Schedule"
      description="Generate a detailed loan amortization schedule"
      icon={<BarChart3 className="w-12 h-12 text-finance" />}
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
            value={inputs.loanAmount}
            onChange={(e) => setInputs({ ...inputs, loanAmount: e.target.value })}
            placeholder="300000"
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
            placeholder="6.5"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Loan Term (Years)</label>
          <div className="flex gap-2 mb-2">
            {[5, 10, 15, 20, 30].map((term) => (
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
          {loading ? 'Calculating...' : 'Generate Schedule'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-center mb-3">
              <div className="text-3xl font-bold text-accent mb-1">
                ${formatNumber(result.monthlyPayment, 2)}
              </div>
              <div className="text-sm text-muted">Monthly Payment</div>
            </div>
            <div className="space-y-2 text-sm border-t border-accent/30 pt-3">
              <div className="flex justify-between">
                <span className="text-muted">Total Payment:</span>
                <span className="font-bold">${formatNumber(result.totalPayment, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Total Interest:</span>
                <span className="font-bold text-accent3">${formatNumber(result.totalInterest, 2)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-text text-sm">Amortization Schedule</h4>
              <button
                type="button"
                onClick={() => setShowSchedule(!showSchedule)}
                className="text-xs text-accent hover:text-accent/80"
              >
                {showSchedule ? 'Hide' : 'Show'}
              </button>
            </div>

            {showSchedule && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2 text-muted">Month</th>
                      <th className="text-right py-2 px-2 text-muted">Payment</th>
                      <th className="text-right py-2 px-2 text-muted">Principal</th>
                      <th className="text-right py-2 px-2 text-muted">Interest</th>
                      <th className="text-right py-2 px-2 text-muted">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.slice(0, 15).map((row, idx) => (
                      <tr key={idx} className="border-b border-border/50">
                        <td className="py-2 px-2 font-semibold">{idx + 1}</td>
                        <td className="text-right py-2 px-2">${formatNumber(row.payment, 2)}</td>
                        <td className="text-right py-2 px-2 text-accent">${formatNumber(row.principal, 2)}</td>
                        <td className="text-right py-2 px-2 text-accent3">${formatNumber(row.interest, 2)}</td>
                        <td className="text-right py-2 px-2 font-bold">${formatNumber(row.balance, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-muted mt-2 text-center">
                  Showing first 12 months + last 3 months
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
