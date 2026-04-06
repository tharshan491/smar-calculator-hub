'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface BMRResult {
  bmr: number
  tdee: number
  activityBreakdown: {
    level: string
    calories: number
  }[]
  macroSplit: {
    protein: number
    carbs: number
    fats: number
  }
}

export default function BMRTDEECalculator() {
  const [inputs, setInputs] = useState({
    weight: '70',
    height: '175',
    age: '30',
    gender: 'male',
    formula: 'mifflin',
  })
  const [result, setResult] = useState<BMRResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const weight = parseFloat(inputs.weight)
      const height = parseFloat(inputs.height)
      const age = parseFloat(inputs.age)

      if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
        setError('Please enter valid positive numbers')
        setLoading(false)
        return
      }

      let bmr = 0

      if (inputs.formula === 'mifflin') {
        // Mifflin-St Jeor Formula (more accurate)
        if (inputs.gender === 'male') {
          bmr = 10 * weight + 6.25 * height - 5 * age + 5
        } else {
          bmr = 10 * weight + 6.25 * height - 5 * age - 161
        }
      } else {
        // Harris-Benedict Formula (older)
        if (inputs.gender === 'male') {
          bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
        } else {
          bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
        }
      }

      bmr = Math.round(bmr)

      const activityMultipliers = [
        { level: 'Sedentary (no exercise)', multiplier: 1.2 },
        { level: 'Light (1-3 days/week)', multiplier: 1.375 },
        { level: 'Moderate (3-5 days/week)', multiplier: 1.55 },
        { level: 'Heavy (6-7 days/week)', multiplier: 1.725 },
        { level: 'Very Heavy (2x/day)', multiplier: 1.9 },
      ]

      const activityBreakdown = activityMultipliers.map((activity) => ({
        level: activity.level,
        calories: Math.round(bmr * activity.multiplier),
      }))

      // Calculate macros for moderate activity (1.55x)
      const tdee = Math.round(bmr * 1.55)
      const macroSplit = {
        protein: Math.round(tdee * 0.3),
        carbs: Math.round(tdee * 0.45),
        fats: Math.round(tdee * 0.25),
      }

      setResult({
        bmr,
        tdee,
        activityBreakdown,
        macroSplit,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="BMR & TDEE Calculator"
      description="Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure"
      icon={<Zap className="w-12 h-12 text-health" />}
      color="#fbbf24"
      category="health"
      result={result ? `${result.bmr} BMR / ${result.tdee} TDEE` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
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
            <label className="form-label">Height (cm)</label>
            <input
              type="number"
              step="0.1"
              required
              className="form-input"
              value={inputs.height}
              onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
              placeholder="175"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="form-group">
            <label className="form-label">Age (years)</label>
            <input
              type="number"
              step="1"
              required
              className="form-input"
              value={inputs.age}
              onChange={(e) => setInputs({ ...inputs, age: e.target.value })}
              placeholder="30"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              className="form-input"
              value={inputs.gender}
              onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Formula</label>
          <select
            className="form-input"
            value={inputs.formula}
            onChange={(e) => setInputs({ ...inputs, formula: e.target.value })}
          >
            <option value="mifflin">Mifflin-St Jeor (Recommended)</option>
            <option value="harris">Harris-Benedict (Older)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate BMR & TDEE'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">{result.bmr}</div>
                <div className="text-xs text-muted">BMR (kcal/day)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">{result.tdee}</div>
                <div className="text-xs text-muted">TDEE (kcal/day)</div>
              </div>
            </div>
            <p className="text-xs text-muted text-center border-t border-accent/30 pt-2">
              TDEE calculated at moderate activity level (3-5x/week)
            </p>
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-bold text-text mb-3 text-sm">TDEE by Activity Level</h4>
            <div className="space-y-2">
              {result.activityBreakdown.map((activity, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-muted">{activity.level}</span>
                  <span className="font-bold">{activity.calories} kcal</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-bold text-text mb-3 text-sm">Macro Split (30% Protein / 45% Carbs / 25% Fats)</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted">Protein:</span>
                <span className="font-bold text-accent">{result.macroSplit.protein} kcal</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted">Carbohydrates:</span>
                <span className="font-bold text-accent">{result.macroSplit.carbs} kcal</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted">Fats:</span>
                <span className="font-bold text-accent">{result.macroSplit.fats} kcal</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
