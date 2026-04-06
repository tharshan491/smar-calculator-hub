'use client'

import { useState } from 'react'
import { Droplet } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface WaterIntakeResult {
  dailyWater: number
  hourlyWater: number
  waterBottles: number
  recommendations: string
}

export default function WaterIntakeCalculator() {
  const [inputs, setInputs] = useState({
    weight: '180',
    unit: 'lbs',
    gender: 'male',
    activityLevel: 'moderate',
    climate: 'temperate',
  })
  const [result, setResult] = useState<WaterIntakeResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    let weight = parseFloat(inputs.weight)
    
    // Convert to lbs if kg
    if (inputs.unit === 'kg') {
      weight = weight * 2.20462
    }

    // Base formula: 0.5-1 oz per lb of body weight
    let baseWater = weight * 0.67 // 0.67 oz per lb

    // Activity adjustment
    const activityMultiplier: { [key: string]: number } = {
      sedentary: 1.0,
      light: 1.1,
      moderate: 1.3,
      active: 1.5,
      veryActive: 1.7,
    }
    baseWater *= activityMultiplier[inputs.activityLevel] || 1.2

    // Climate adjustment
    const climateMultiplier: { [key: string]: number } = {
      cold: 0.9,
      temperate: 1.0,
      hot: 1.2,
      humid: 1.3,
      tropical: 1.35,
    }
    baseWater *= climateMultiplier[inputs.climate] || 1.0

    // Gender adjustment (women typically need 15% less)
    if (inputs.gender === 'female') {
      baseWater *= 0.85
    }

    // Convert oz to ml (1 oz = 29.5735 ml)
    let dailyWaterMl = baseWater * 29.5735
    dailyWaterMl = Math.round(dailyWaterMl / 50) * 50 // Round to nearest 50ml

    const hourlyWater = Math.round(dailyWaterMl / 16) // Spread over 16 waking hours
    const waterBottles = Math.ceil(dailyWaterMl / 500) // 500ml bottle size

    let recommendations = 'Drink water consistently throughout the day'
    if (inputs.activityLevel === 'veryActive') {
      recommendations = 'Hydrate before, during, and after exercise'
    }
    if (inputs.climate === 'hot' || inputs.climate === 'tropical') {
      recommendations = 'Increase water intake in hot weather; drink electrolytes if exercising'
    }

    setResult({
      dailyWater: dailyWaterMl,
      hourlyWater,
      waterBottles,
      recommendations,
    })
  }

  return (
    <CalculatorTemplate
      title="Daily Water Intake Calculator"
      description="Calculate your recommended daily water consumption based on your lifestyle"
      icon={<Droplet className="w-12 h-12 text-health" />}
      color="#0ea5e9"
      category="health"
      result={result ? `${formatNumber(result.dailyWater)} ml/day` : null}
      loading={false}
      error=""
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group col-span-1">
            <label className="form-label">Weight</label>
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
          <div className="form-group col-span-1">
            <label className="form-label">Unit</label>
            <select
              className="form-select"
              value={inputs.unit}
              onChange={(e) => setInputs({ ...inputs, unit: e.target.value })}
            >
              <option value="lbs">Pounds (lbs)</option>
              <option value="kg">Kilograms (kg)</option>
            </select>
          </div>
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

        <div className="form-group">
          <label className="form-label">Activity Level</label>
          <select
            className="form-select"
            value={inputs.activityLevel}
            onChange={(e) => setInputs({ ...inputs, activityLevel: e.target.value })}
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly Active</option>
            <option value="moderate">Moderately Active</option>
            <option value="active">Very Active</option>
            <option value="veryActive">Extremely Active</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Climate</label>
          <select
            className="form-select"
            value={inputs.climate}
            onChange={(e) => setInputs({ ...inputs, climate: e.target.value })}
          >
            <option value="cold">Cold</option>
            <option value="temperate">Temperate</option>
            <option value="hot">Hot & Dry</option>
            <option value="humid">Humid</option>
            <option value="tropical">Tropical</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6">
          Calculate Water Intake
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-center mb-3">
              <div className="text-3xl font-bold text-accent mb-1">
                {formatNumber(result.dailyWater)} ml
              </div>
              <div className="text-sm text-muted">per day</div>
            </div>
            <div className="space-y-2 text-sm border-t border-accent/30 pt-3">
              <div className="flex justify-between">
                <span className="text-muted">Hourly Intake:</span>
                <span className="font-bold">{formatNumber(result.hourlyWater)} ml</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">500ml Bottles/Day:</span>
                <span className="font-bold">{result.waterBottles} bottles</span>
              </div>
              <div className="text-xs text-muted italic mt-3">{result.recommendations}</div>
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
