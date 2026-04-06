'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface BodyFatResult {
  bodyFatPercentage: number
  fatMass: number
  leanMass: number
  category: string
}

export default function BodyFatCalculator() {
  const [inputs, setInputs] = useState({
    gender: 'male',
    weight: '200',
    waist: '35',
    neck: '16',
    hip: '40',
  })
  const [result, setResult] = useState<BodyFatResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const weight = parseFloat(inputs.weight)
    const waist = parseFloat(inputs.waist)
    const neck = parseFloat(inputs.neck)

    let bodyFatPercentage: number

    if (inputs.gender === 'male') {
      // Navy formula for men: BF% = 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
      // Simplified version without height
      bodyFatPercentage = 86.010 * Math.log10(waist - neck) - 70.041
    } else {
      const hip = parseFloat(inputs.hip)
      // Navy formula for women: BF% = 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
      // Simplified without height
      bodyFatPercentage = 163.205 * Math.log10(waist + hip - neck) - 457.787
    }

    bodyFatPercentage = Math.max(2, Math.min(50, bodyFatPercentage)) // Clamp between 2-50%

    const fatMass = (weight * bodyFatPercentage) / 100
    const leanMass = weight - fatMass

    let category = 'Average'
    if (inputs.gender === 'male') {
      if (bodyFatPercentage < 6) category = 'Essential Fat'
      else if (bodyFatPercentage < 13) category = 'Athletes'
      else if (bodyFatPercentage < 17) category = 'Fit'
      else if (bodyFatPercentage < 25) category = 'Average'
      else category = 'Obese'
    } else {
      if (bodyFatPercentage < 13) category = 'Essential Fat'
      else if (bodyFatPercentage < 20) category = 'Athletes'
      else if (bodyFatPercentage < 24) category = 'Fit'
      else if (bodyFatPercentage < 32) category = 'Average'
      else category = 'Obese'
    }

    setResult({
      bodyFatPercentage: Math.round(bodyFatPercentage * 10) / 10,
      fatMass: Math.round(fatMass * 10) / 10,
      leanMass: Math.round(leanMass * 10) / 10,
      category,
    })
  }

  return (
    <CalculatorTemplate
      title="Body Fat Percentage Calculator"
      description="Estimate your body composition using military/anthropometric methods"
      icon={<TrendingUp className="w-12 h-12 text-health" />}
      color="#d15417"
      category="health"
      result={result ? `${formatNumber(result.bodyFatPercentage, 1)}%` : null}
      loading={false}
      error=""
    >
      <form onSubmit={handleCalculate} className="space-y-4">
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

        <div className="form-group">
          <label className="form-label">Weight (lbs)</label>
          <input
            type="number"
            step="1"
            required
            className="form-input"
            value={inputs.weight}
            onChange={(e) => setInputs({ ...inputs, weight: e.target.value })}
            placeholder="200"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Neck Circumference (inches)</label>
          <input
            type="number"
            step="0.1"
            required
            className="form-input"
            value={inputs.neck}
            onChange={(e) => setInputs({ ...inputs, neck: e.target.value })}
            placeholder="16"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Waist Circumference (inches)</label>
          <input
            type="number"
            step="0.1"
            required
            className="form-input"
            value={inputs.waist}
            onChange={(e) => setInputs({ ...inputs, waist: e.target.value })}
            placeholder="35"
          />
        </div>

        {inputs.gender === 'female' && (
          <div className="form-group">
            <label className="form-label">Hip Circumference (inches)</label>
            <input
              type="number"
              step="0.1"
              required
              className="form-input"
              value={inputs.hip}
              onChange={(e) => setInputs({ ...inputs, hip: e.target.value })}
              placeholder="40"
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-full mt-6">
          Calculate Body Fat
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-center mb-3">
              <div className="text-3xl font-bold text-accent mb-1">{result.bodyFatPercentage}%</div>
              <div className="text-sm text-muted">{result.category}</div>
            </div>
            <div className="space-y-2 text-sm border-t border-accent/30 pt-3">
              <div className="flex justify-between">
                <span className="text-muted">Fat Mass:</span>
                <span className="font-bold">{formatNumber(result.fatMass, 1)} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Lean Mass:</span>
                <span className="font-bold">{formatNumber(result.leanMass, 1)} lbs</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
