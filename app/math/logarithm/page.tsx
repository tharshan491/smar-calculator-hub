'use client'

import { useState } from 'react'
import { LineChart } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface LogResult {
  result: number
  log2: number
  log10: number
  ln: number
}

export default function LogarithmCalculator() {
  const [inputs, setInputs] = useState({
    n: '100',
    base: '10',
  })
  const [result, setResult] = useState<LogResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/math/log', {
        n: parseFloat(inputs.n),
        base: inputs.base === '' ? 0 : parseFloat(inputs.base),
      })

      setResult(response)
      await saveToHistory('Logarithm Calculator', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Logarithm Calculator"
      description="Calculate logarithms with any base"
      icon={<LineChart className="w-12 h-12 text-math" />}
      color="#9e6a03"
      category="math"
      result={result ? `log(${inputs.n}) = ${formatNumber(result.result, 6)}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Number (n)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.n}
            onChange={(e) => setInputs({ ...inputs, n: e.target.value })}
            placeholder="100"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Base (leave empty for natural log)</label>
          <input
            type="number"
            step="0.1"
            className="form-input"
            value={inputs.base}
            onChange={(e) => setInputs({ ...inputs, base: e.target.value })}
            placeholder="10"
          />
          <p className="text-xs text-muted mt-1">Default: 10 (common log)</p>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Result:</span>
            <span className="font-bold text-accent">{formatNumber(result.result, 10)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Log₂ (binary):</span>
            <span className="font-bold">{formatNumber(result.log2, 10)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Log₁₀ (common):</span>
            <span className="font-bold">{formatNumber(result.log10, 10)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-muted font-semibold">Ln (natural):</span>
            <span className="font-bold text-accent">{formatNumber(result.ln, 10)}</span>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
