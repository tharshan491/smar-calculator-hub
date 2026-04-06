'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface RootsResult {
  sqrt: number
  cbrt: number
  square: number
  cube: number
  sqrt4: number
}

export default function RootsCalculator() {
  const [inputs, setInputs] = useState({
    n: '16',
  })
  const [result, setResult] = useState<RootsResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/math/roots', {
        n: parseFloat(inputs.n),
      })

      setResult(response)
      await saveToHistory('Square Roots Calculator', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Square Roots & Powers Calculator"
      description="Calculate square root, cube root, and powers"
      icon={<Calculator className="w-12 h-12 text-math" />}
      color="#9e6a03"
      category="math"
      result={result ? `√${inputs.n} = ${formatNumber(result.sqrt, 4)}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Number</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.n}
            onChange={(e) => setInputs({ ...inputs, n: e.target.value })}
            placeholder="16"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Square Root (√):</span>
            <span className="font-bold text-accent">{formatNumber(result.sqrt, 8)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Cube Root (∛):</span>
            <span className="font-bold">{formatNumber(result.cbrt, 8)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">4th Root:</span>
            <span className="font-bold">{formatNumber(result.sqrt4, 8)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-muted">Number Squared (n²):</span>
            <span className="font-bold text-accent">{formatNumber(result.square, 2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Number Cubed (n³):</span>
            <span className="font-bold">{formatNumber(result.cube, 2)}</span>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
