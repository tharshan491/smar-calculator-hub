'use client'

import { useState } from 'react'
import { TrendingDown } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface StdDevResult {
  mean: number
  stddev: number
  stddevSample: number
  variance: number
  min: number
  max: number
}

export default function StandardDeviationCalculator() {
  const [inputs, setInputs] = useState({
    data: '1, 2, 3, 4, 5',
  })
  const [result, setResult] = useState<StdDevResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const numbers = inputs.data
        .split(',')
        .map((x) => parseFloat(x.trim()))
        .filter((x) => !isNaN(x))

      if (numbers.length < 2) {
        setError('Please provide at least 2 numbers')
        setLoading(false)
        return
      }

      const response = await callCalculator('/math/stddev', {
        data: numbers,
      })

      setResult(response)
      await saveToHistory('Standard Deviation Calculator', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Standard Deviation Calculator"
      description="Calculate mean, variance, and standard deviation"
      icon={<TrendingDown className="w-12 h-12 text-math" />}
      color="#9e6a03"
      category="math"
      result={result ? `σ = ${formatNumber(result.stddev, 4)}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Numbers (comma separated)</label>
          <textarea
            className="form-input"
            rows={3}
            value={inputs.data}
            onChange={(e) => setInputs({ ...inputs, data: e.target.value })}
            placeholder="1, 2, 3, 4, 5"
          />
          <p className="text-xs text-muted mt-1">Separate numbers with commas</p>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Mean (Average):</span>
            <span className="font-bold text-accent">{formatNumber(result.mean, 6)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Std Dev (Population):</span>
            <span className="font-bold">{formatNumber(result.stddev, 6)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Std Dev (Sample):</span>
            <span className="font-bold">{formatNumber(result.stddevSample, 6)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Variance:</span>
            <span className="font-bold">{formatNumber(result.variance, 6)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-muted">Min:</span>
            <span className="font-bold">{formatNumber(result.min, 2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Max:</span>
            <span className="font-bold text-accent">{formatNumber(result.max, 2)}</span>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
