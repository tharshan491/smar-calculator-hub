'use client'

import { useState } from 'react'
import { Target } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface IdealWeightResult {
  idlehalWeightMin: number
  idealWeightMax: number
  devlinFormula: number
  millerFormula: number
  robinsonFormula: number
  dhindsaFormula: number
  bmiRange: string
}

export default function IdealWeightCalculator() {
  const [inputs, setInputs] = useState({
    height: '175',
    gender: 'male',
    formula: 'all',
  })
  const [result, setResult] = useState<IdealWeightResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const height = parseFloat(inputs.height)

      if (isNaN(height) || height <= 0) {
        setError('Please enter a valid height')
        setLoading(false)
        return
      }

      // Convert to inches for formulas
      const inches = height / 2.54

      // Different formulas for ideal weight
      
      // Robinson Formula
      let robinson = 0
      if (inputs.gender === 'male') {
        robinson = 52 + 1.9 * (inches - 60)
      } else {
        robinson = 49 + 1.7 * (inches - 60)
      }

      // Miller Formula
      let miller = 0
      if (inputs.gender === 'male') {
        miller = 56.2 + 1.41 * (inches - 60)
      } else {
        miller = 53.1 + 1.36 * (inches - 60)
      }

      // Devlin Formula
      let devlin = 0
      if (inputs.gender === 'male') {
        devlin = 50 + 2.3 * (inches - 60)
      } else {
        devlin = 45.5 + 2.3 * (inches - 60)
      }

      // Devine Formula
      let devine = 0
      if (inputs.gender === 'male') {
        devine = 50 + 2.3 * (inches - 60)
      } else {
        devine = 45.5 + 2.3 * (inches - 60)
      }

      // BMI-based range (healthy BMI is 18.5-24.9)
      const heightInMeters = height / 100
      const minBMI = 18.5 * heightInMeters * heightInMeters
      const maxBMI = 24.9 * heightInMeters * heightInMeters

      const average = (robinson + miller + devlin) / 3

      setResult({
        idlehalWeightMin: Math.round(minBMI * 10) / 10,
        idealWeightMax: Math.round(maxBMI * 10) / 10,
        devlinFormula: Math.round(devlin * 10) / 10,
        millerFormula: Math.round(miller * 10) / 10,
        robinsonFormula: Math.round(robinson * 10) / 10,
        dhindsaFormula: Math.round(average * 10) / 10,
        bmiRange: `${Math.round(minBMI * 10) / 10} - ${Math.round(maxBMI * 10) / 10} kg`,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Ideal Weight Calculator"
      description="Calculate your ideal body weight using multiple formulas"
      icon={<Target className="w-12 h-12 text-health" />}
      color="#06b6d4"
      category="health"
      result={result ? `${result.dhindsaFormula} kg` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
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

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Ideal Weight'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-center mb-3">
              <div className="text-3xl font-bold text-accent mb-1">{result.dhindsaFormula} kg</div>
              <div className="text-sm text-muted">Average Ideal Weight</div>
            </div>
            <div className="space-y-2 text-sm border-t border-accent/30 pt-3">
              <div className="flex justify-between">
                <span className="text-muted">BMI Range (18.5-24.9):</span>
                <span className="font-bold">{result.bmiRange}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-bold text-text mb-3 text-sm">Formula Comparison</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted">Robinson Formula:</span>
                <span className="font-bold">{result.robinsonFormula} kg</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted">Miller Formula:</span>
                <span className="font-bold">{result.millerFormula} kg</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted">Devlin Formula:</span>
                <span className="font-bold">{result.devlinFormula} kg</span>
              </div>
              <div className="flex justify-between text-xs border-t border-border pt-2">
                <span className="text-muted">Average:</span>
                <span className="font-bold text-accent">{result.dhindsaFormula} kg</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-bold text-text mb-2 text-sm">Note</h4>
            <p className="text-xs text-muted">
              Ideal weight varies based on muscle mass, bone density, and overall body composition. Consult with a healthcare provider for personalized guidance.
            </p>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
