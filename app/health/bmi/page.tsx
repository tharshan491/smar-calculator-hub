'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface BMIResult {
  bmi: number
  category: string
}

export default function BMI() {
  const [inputs, setInputs] = useState({
    weight: '70',
    height: '175',
    unit: 'metric',
  })
  const [result, setResult] = useState<BMIResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/health/bmi', {
        weight: parseFloat(inputs.weight),
        height: parseFloat(inputs.height),
      })

      setResult(response.data || response)
      await saveToHistory('BMI Calculator', inputs, response.data || response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="BMI Calculator"
      description="Calculate your Body Mass Index and health category"
      icon={<Heart className="w-12 h-12 text-health" />}
      color="#238636"
      category="health"
      result={result ? `${formatNumber(result.bmi, 1)} • ${result.category}` : null}
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

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate BMI'}
        </button>
      </form>

      <div className="mt-6 bg-bg rounded p-4 text-xs text-muted space-y-2">
        <p><strong>BMI Categories:</strong></p>
        <p>• Underweight: BMI &lt; 18.5</p>
        <p>• Normal weight: BMI 18.5 - 24.9</p>
        <p>• Overweight: BMI 25 - 29.9</p>
        <p>• Obese: BMI ≥ 30</p>
      </div>
    </CalculatorTemplate>
  )
}
