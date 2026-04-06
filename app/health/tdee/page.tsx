'use client'

import { useState } from 'react'
import { Activity } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface TDEEResult {
  bmr: number
  tdee: number
  cutting: number
  bulking: number
  maintenance: number
}

export default function TDEECalculator() {
  const [inputs, setInputs] = useState({
    age: '30',
    gender: 'male',
    weight: '180',
    height: '70',
    activity: '1.55',
  })
  const [result, setResult] = useState<TDEEResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const weight = parseFloat(inputs.weight)
    const height = parseFloat(inputs.height)
    const age = parseFloat(inputs.age)
    const activity = parseFloat(inputs.activity)

    // Mifflin-St Jeor formula for BMR
    let bmr: number
    if (inputs.gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    const tdee = bmr * activity
    const cutting = tdee - 500
    const bulking = tdee + 500
    const maintenance = tdee

    setResult({
      bmr: Math.round(bmr * 100) / 100,
      tdee: Math.round(tdee * 100) / 100,
      cutting: Math.round(cutting * 100) / 100,
      bulking: Math.round(bulking * 100) / 100,
      maintenance: Math.round(maintenance * 100) / 100,
    })
  }

  const activityLevels = [
    { value: '1.2', label: 'Sedentary' },
    { value: '1.375', label: 'Lightly Active' },
    { value: '1.55', label: 'Moderately Active' },
    { value: '1.725', label: 'Very Active' },
    { value: '1.9', label: 'Extremely Active' },
  ]

  return (
    <CalculatorTemplate
      title="TDEE Calculator (Advanced)"
      description="Calculate your Total Daily Energy Expenditure and calorie needs by activity level"
      icon={<Activity className="w-12 h-12 text-health" />}
      color="#d15417"
      category="health"
      result={result ? `${formatNumber(result.tdee, 0)} cal/day` : null}
      loading={false}
      error=""
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
              className="form-select"
              value={inputs.gender}
              onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Weight (lbs)</label>
            <input
              type="number"
              step="1"
              required
              className="form-input"
              value={inputs.weight}
              onChange={(e) => setInputs({ ...inputs, weight: e.target.value })}
              placeholder="180"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Height (inches)</label>
            <input
              type="number"
              step="0.1"
              required
              className="form-input"
              value={inputs.height}
              onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
              placeholder="70"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Activity Level</label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {activityLevels.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setInputs({ ...inputs, activity: value })}
                className={`py-2 rounded text-xs font-semibold transition-all ${
                  inputs.activity === value
                    ? 'bg-accent text-bg'
                    : 'bg-surface2 border border-border hover:border-accent'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <select
            className="form-select w-full"
            value={inputs.activity}
            onChange={(e) => setInputs({ ...inputs, activity: e.target.value })}
          >
            {activityLevels.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6">
          Calculate TDEE
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="p-3 bg-accent/10 rounded-lg border border-accent/30 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">BMR:</span>
              <span className="font-bold">{formatNumber(result.bmr, 0)} cal/day</span>
            </div>
          </div>

          <div className="p-3 bg-accent/10 rounded-lg border border-accent/30 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">TDEE (Maintenance):</span>
              <span className="font-bold text-accent">{formatNumber(result.maintenance, 0)} cal/day</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-accent3/10 rounded-lg border border-accent3/30 text-sm">
              <div className="text-xs text-muted mb-1">Weight Loss</div>
              <div className="font-bold text-accent3">{formatNumber(result.cutting, 0)}</div>
              <div className="text-xs text-muted mt-1">(-500 cal)</div>
            </div>

            <div className="p-3 bg-accent2/10 rounded-lg border border-accent2/30 text-sm">
              <div className="text-xs text-muted mb-1">Muscle Gain</div>
              <div className="font-bold text-accent2">{formatNumber(result.bulking, 0)}</div>
              <div className="text-xs text-muted mt-1">(+500 cal)</div>
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
