'use client'

import { useState } from 'react'
import { Banknote } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface SalaryResult {
  annual: number
  monthly: number
  biWeekly: number
  weekly: number
  daily: number
  hourly: number
}

export default function SalaryCalculator() {
  const [inputs, setInputs] = useState({
    amount: '50000',
    period: 'annual',
  })
  const [result, setResult] = useState<SalaryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/finance/salary', {
        amount: parseFloat(inputs.amount),
        period: inputs.period,
      })

      setResult(response)
      await saveToHistory('Salary Calculator', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Salary Calculator"
      description="Convert salary between different time periods"
      icon={<Banknote className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `$${formatNumber(result.annual, 0)}/year` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Amount ($)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.amount}
            onChange={(e) => setInputs({ ...inputs, amount: e.target.value })}
            placeholder="50000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Current Period</label>
          <select
            className="form-select"
            value={inputs.period}
            onChange={(e) => setInputs({ ...inputs, period: e.target.value })}
          >
            <option value="annual">Annual</option>
            <option value="monthly">Monthly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Salary'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Annual:</span>
            <span className="font-bold text-accent">${formatNumber(result.annual, 2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Monthly:</span>
            <span className="font-bold">${formatNumber(result.monthly, 2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Bi-Weekly:</span>
            <span className="font-bold">${formatNumber(result.biWeekly, 2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Weekly:</span>
            <span className="font-bold">${formatNumber(result.weekly, 2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Daily:</span>
            <span className="font-bold">${formatNumber(result.daily, 2)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-muted font-semibold">Hourly:</span>
            <span className="font-bold text-accent">${formatNumber(result.hourly, 2)}</span>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
