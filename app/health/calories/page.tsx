'use client'

import { useState } from 'react'
import { Utensils } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface CalorieResult {
  tdee: number
  bmr: number
}

export default function CalorieCalculator() {
  const [inputs, setInputs] = useState({
    weight: '70',
    height: '175',
    age: '30',
    gender: 'male',
    activity: '1.55',
  })
  const [result, setResult] = useState<CalorieResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/health/calories', {
        weight: parseFloat(inputs.weight),
        height: parseFloat(inputs.height),
        age: parseInt(inputs.age),
        gender: inputs.gender,
        activity: parseFloat(inputs.activity),
      })

      setResult(response.data || response)
      await saveToHistory('Calorie Calculator', inputs, response.data || response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Daily Calorie Calculator"
      description="Estimate your daily caloric needs"
      icon={<Utensils className="w-12 h-12 text-health" />}
      color="#238636"
      category="health"
      result={result ? `${formatNumber(result.tdee || 0, 0)} kcal/day` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              required
              className="form-input"
              value={inputs.weight}
              onChange={(e) => setInputs({ ...inputs, weight: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Height (cm)</label>
            <input
              type="number"
              step="0.1"
              required
              className="form-input"
              value={inputs.height}
              onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="number"
              min="1"
              max="120"
              required
              className="form-input"
              value={inputs.age}
              onChange={(e) => setInputs({ ...inputs, age: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              value={inputs.gender}
              onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Activity Level</label>
          <select
            className="form-select"
            value={inputs.activity}
            onChange={(e) => setInputs({ ...inputs, activity: e.target.value })}
          >
            <option value="1.2">Sedentary (little/no exercise)</option>
            <option value="1.375">Light (1-3 days/week)</option>
            <option value="1.55">Moderate (3-5 days/week)</option>
            <option value="1.725">Very Active (6-7 days/week)</option>
            <option value="1.9">Extremely Active (physical job)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Calories'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">BMR (Basal Metabolic Rate):</span>
            <span className="font-bold text-accent">{formatNumber(result.bmr || 0, 0)} kcal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">TDEE (Daily Calories):</span>
            <span className="font-bold text-accent2">{formatNumber(result.tdee || 0, 0)} kcal</span>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
