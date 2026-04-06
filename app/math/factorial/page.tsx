'use client'

import { useState } from 'react'
import { Infinity } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface FactorialResult {
  n: number
  factorial: number
}

export default function FactorialCalculator() {
  const [inputs, setInputs] = useState({
    n: '5',
  })
  const [result, setResult] = useState<FactorialResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const n = parseInt(inputs.n)
      if (n < 0) {
        setError('Number must be non-negative')
        setLoading(false)
        return
      }
      if (n > 170) {
        setError('Number too large (max 170)')
        setLoading(false)
        return
      }

      const response = await callCalculator('/math/factorial', {
        n,
      })

      setResult(response)
      await saveToHistory('Factorial Calculator', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Factorial Calculator"
      description="Calculate factorial (n!)"
      icon={<Infinity className="w-12 h-12 text-math" />}
      color="#9e6a03"
      category="math"
      result={result ? `${result.n}! = ${formatNumber(result.factorial, 0)}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Number (n)</label>
          <input
            type="number"
            step="1"
            min="0"
            max="170"
            required
            className="form-input"
            value={inputs.n}
            onChange={(e) => setInputs({ ...inputs, n: e.target.value })}
            placeholder="5"
          />
          <p className="text-xs text-muted mt-1">Range: 0 to 170</p>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Factorial'}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-bg rounded p-4 text-sm">
          <div className="text-center">
            <p className="text-muted text-xs mb-1">Factorial Result</p>
            <p className="text-2xl font-bold text-accent">{result.n}!</p>
            <p className="text-2xl font-bold mt-2">{formatNumber(result.factorial, 0)}</p>
          </div>
          <div className="mt-4 text-xs text-muted">
            <p>Calculation: {result.n}! = {result.n} × {Math.max(1, result.n - 1)} × ... × 1</p>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
