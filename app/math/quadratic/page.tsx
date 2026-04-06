'use client'

import { useState } from 'react'
import { PlusSquare } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface QuadraticResult {
  discriminant: number
  root1: number
  root2: number
}

export default function QuadraticCalculator() {
  const [inputs, setInputs] = useState({
    a: '1',
    b: '-5',
    c: '6',
  })
  const [result, setResult] = useState<QuadraticResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/math/quadratic', {
        a: parseFloat(inputs.a),
        b: parseFloat(inputs.b),
        c: parseFloat(inputs.c),
      })

      setResult(response.data || response)
      await saveToHistory('Quadratic Calculator', inputs, response.data || response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Quadratic Equation Solver"
      description="Solve ax² + bx + c = 0"
      icon={<PlusSquare className="w-12 h-12 text-math" />}
      color="#9e6a03"
      category="math"
      result={result ? `x₁ = ${formatNumber(result.root1 || (result as any).roots?.[0] || 0, 3)}, x₂ = ${formatNumber(result.root2 || (result as any).roots?.[1] || 0, 3)}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <p className="text-sm text-muted mb-4 font-space-mono">Equation: ax² + bx + c = 0</p>
        </div>

        <div className="form-group">
          <label className="form-label">a (coefficient of x²)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.a}
            onChange={(e) => setInputs({ ...inputs, a: e.target.value })}
            placeholder="1"
          />
        </div>

        <div className="form-group">
          <label className="form-label">b (coefficient of x)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.b}
            onChange={(e) => setInputs({ ...inputs, b: e.target.value })}
            placeholder="-5"
          />
        </div>

        <div className="form-group">
          <label className="form-label">c (constant)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.c}
            onChange={(e) => setInputs({ ...inputs, c: e.target.value })}
            placeholder="6"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Solving...' : 'Solve Equation'}
        </button>
      </form>

      <div className="mt-6 bg-bg rounded p-4 text-xs text-muted">
        <p><strong>Formula:</strong> x = (-b ± √(b² - 4ac)) / 2a</p>
        <p className="mt-2"><strong>Example:</strong> x² - 5x + 6 = 0</p>
        <p className="text-accent2">Roots: x₁ = 3, x₂ = 2</p>
      </div>
    </CalculatorTemplate>
  )
}
