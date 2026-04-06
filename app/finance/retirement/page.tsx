'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface RetirementResult {
  nestEgg: number
  monthly4pct: number
  monthly3pct: number
  years: number
}

export default function RetirementCalculator() {
  const [inputs, setInputs] = useState({
    currentAge: '30',
    retireAge: '65',
    savings: '100000',
    monthly: '1000',
    rate: '7',
  })
  const [result, setResult] = useState<RetirementResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/finance/retirement', {
        currentAge: parseInt(inputs.currentAge),
        retireAge: parseInt(inputs.retireAge),
        savings: parseFloat(inputs.savings),
        monthly: parseFloat(inputs.monthly),
        rate: parseFloat(inputs.rate),
      })

      setResult(response)
      await saveToHistory('Retirement Calculator', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Retirement Calculator"
      description="Calculate your retirement nest egg and income"
      icon={<TrendingUp className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `$${formatNumber(result.nestEgg, 0)}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Current Age</label>
            <input
              type="number"
              required
              className="form-input"
              value={inputs.currentAge}
              onChange={(e) => setInputs({ ...inputs, currentAge: e.target.value })}
              placeholder="30"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Retirement Age</label>
            <input
              type="number"
              required
              className="form-input"
              value={inputs.retireAge}
              onChange={(e) => setInputs({ ...inputs, retireAge: e.target.value })}
              placeholder="65"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Current Savings ($)</label>
          <input
            type="number"
            step="1000"
            required
            className="form-input"
            value={inputs.savings}
            onChange={(e) => setInputs({ ...inputs, savings: e.target.value })}
            placeholder="100000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Monthly Contribution ($)</label>
          <input
            type="number"
            step="100"
            required
            className="form-input"
            value={inputs.monthly}
            onChange={(e) => setInputs({ ...inputs, monthly: e.target.value })}
            placeholder="1000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Annual Return Rate (%)</label>
          <input
            type="number"
            step="0.1"
            required
            className="form-input"
            value={inputs.rate}
            onChange={(e) => setInputs({ ...inputs, rate: e.target.value })}
            placeholder="7"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Retirement'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Retirement Nest Egg:</span>
            <span className="font-bold text-accent">${formatNumber(result.nestEgg, 2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Monthly Income (4% rule):</span>
            <span className="font-bold">${formatNumber(result.monthly4pct, 2)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-muted font-semibold">Monthly Income (3% rule):</span>
            <span className="font-bold text-accent">${formatNumber(result.monthly3pct, 2)}</span>
          </div>
          <div className="text-xs text-muted mt-2">
            <p>Years until retirement: <strong>{result.years} years</strong></p>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
