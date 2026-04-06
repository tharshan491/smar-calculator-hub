'use client'

import { useState } from 'react'
import { Percent } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

export default function PercentageCalculator() {
  const [inputs, setInputs] = useState({
    value: '25',
    total: '100',
  })
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/math/percentage', {
        value: parseFloat(inputs.value),
        total: parseFloat(inputs.total),
      })

      setResult(response.percentage)
      await saveToHistory('Percentage Calculator', inputs, percentage)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Percentage Calculator"
      description="Calculate what percentage one number is of another"
      icon={<Percent className="w-12 h-12 text-math" />}
      color="#9e6a03"
      category="math"
      result={result !== null ? `${formatNumber(result, 2)}%` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Value</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.value}
            onChange={(e) => setInputs({ ...inputs, value: e.target.value })}
            placeholder="25"
          />
          <p className="text-xs text-muted mt-1">The number you want to find the percentage of</p>
        </div>

        <div className="form-group">
          <label className="form-label">Total</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.total}
            onChange={(e) => setInputs({ ...inputs, total: e.target.value })}
            placeholder="100"
          />
          <p className="text-xs text-muted mt-1">The total amount</p>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Percentage'}
        </button>
      </form>

      <div className="mt-6 bg-bg rounded p-4 text-xs text-muted">
        <p><strong>Formula:</strong> (Value ÷ Total) × 100</p>
        <p className="mt-2">Example: What% is 25 of 100?</p>
        <p>(25 ÷ 100) × 100 = <strong>25%</strong></p>
      </div>
    </CalculatorTemplate>
  )
}
