'use client'

import { useState } from 'react'
import { Apple } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface MacroResult {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export default function MacroCalculator() {
  const [inputs, setInputs] = useState({
    weight: '70',
    goal: 'maintenance',
    activity: 'moderate',
  })
  const [result, setResult] = useState<MacroResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/health/macro', {
        weight: parseFloat(inputs.weight),
        goal: inputs.goal,
        activity: inputs.activity,
      })

      setResult(response)
      await saveToHistory('Macro Calculator', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Macronutrient Calculator"
      description="Calculate daily protein, carbs, and fat targets"
      icon={<Apple className="w-12 h-12 text-health" />}
      color="#ef4444"
      category="health"
      result={result ? `${formatNumber(result.calories)} cal/day` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            required
            className="form-input"
            value={inputs.weight}
            onChange={(e) => setInputs({ ...inputs, weight: e.target.value })}
            placeholder="70"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Goal</label>
          <select
            className="form-select"
            value={inputs.goal}
            onChange={(e) => setInputs({ ...inputs, goal: e.target.value })}
          >
            <option value="cut">Cut (lose weight)</option>
            <option value="maintenance">Maintenance</option>
            <option value="bulk">Bulk (gain weight)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Activity Level</label>
          <select
            className="form-select"
            value={inputs.activity}
            onChange={(e) => setInputs({ ...inputs, activity: e.target.value })}
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="heavy">Heavy</option>
            <option value="intense">Very Intense</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Macros'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Daily Calories:</span>
            <span className="font-bold text-accent">{formatNumber(result.calories)} kcal</span>
          </div>
          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted">Protein:</span>
              <span className="font-bold">{formatNumber(result.protein)}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Carbs:</span>
              <span className="font-bold">{formatNumber(result.carbs)}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Fat:</span>
              <span className="font-bold">{formatNumber(result.fat)}g</span>
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
