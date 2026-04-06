'use client'

import { useState } from 'react'
import { Dumbbell } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface RepMaxResult {
  oneRepMax: number
  reps: { reps: number; weight: number }[]
}

export default function RepMaxCalculator() {
  const [inputs, setInputs] = useState({
    weight: '100',
    reps: '10',
    formula: 'epley',
  })
  const [result, setResult] = useState<RepMaxResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/health/rep-max', {
        weight: parseFloat(inputs.weight),
        reps: parseInt(inputs.reps),
        formula: inputs.formula,
      })

      setResult(response)
      await saveToHistory('Rep Max Calculator', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="One Rep Max Calculator"
      description="Estimate your maximum lift weight"
      icon={<Dumbbell className="w-12 h-12 text-health" />}
      color="#f59e0b"
      category="health"
      result={result ? `1RM: ${formatNumber(result.oneRepMax)} kg` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Weight Lifted (kg)</label>
          <input
            type="number"
            step="0.5"
            required
            className="form-input"
            value={inputs.weight}
            onChange={(e) => setInputs({ ...inputs, weight: e.target.value })}
            placeholder="100"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Reps Performed</label>
          <input
            type="number"
            min="1"
            max="50"
            required
            className="form-input"
            value={inputs.reps}
            onChange={(e) => setInputs({ ...inputs, reps: e.target.value })}
            placeholder="10"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Formula</label>
          <select
            className="form-select"
            value={inputs.formula}
            onChange={(e) => setInputs({ ...inputs, formula: e.target.value })}
          >
            <option value="epley">Epley</option>
            <option value="brzycki">Brzycki</option>
            <option value="lander">Lander</option>
            <option value="lombardi">Lombardi</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate 1RM'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">One Rep Max:</span>
            <span className="font-bold text-accent text-lg">{formatNumber(result.oneRepMax)} kg</span>
          </div>
          <div className="border-t border-border pt-3">
            <p className="text-muted mb-2">Estimated weights for reps:</p>
            <div className="space-y-1">
              {result.reps.map(({ reps, weight }) => (
                <div key={reps} className="flex justify-between text-xs">
                  <span>{reps}x</span>
                  <span className="font-semibold">{formatNumber(weight)} kg</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
