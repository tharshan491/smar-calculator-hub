'use client'

import { useState } from 'react'
import { Fuel } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface GasCalculatorResult {
  mpg: number
  kmpl: number
  costPer100km: number
  costPerMile: number
  fuelNeeded: number
  fuelCost: number
  distance: number
}

export default function GasCalculatorCalculator() {
  const [inputs, setInputs] = useState({
    distance: '500',
    distanceUnit: 'km',
    fuelUsed: '40',
    fuelUnit: 'liters',
    fuelPrice: '1.5',
    currency: 'USD',
  })
  const [result, setResult] = useState<GasCalculatorResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let distance = parseFloat(inputs.distance)
      let fuelUsed = parseFloat(inputs.fuelUsed)
      const fuelPrice = parseFloat(inputs.fuelPrice)

      if (isNaN(distance) || isNaN(fuelUsed) || isNaN(fuelPrice) || distance <= 0 || fuelUsed <= 0 || fuelPrice < 0) {
        setError('Please enter valid positive numbers')
        setLoading(false)
        return
      }

      // Convert to metric if needed
      if (inputs.distanceUnit === 'miles') {
        distance = distance * 1.60934
      }

      if (inputs.fuelUnit === 'gallons') {
        fuelUsed = fuelUsed * 3.78541
      }

      // Calculate MPG and KMPL
      const kmpl = distance / fuelUsed
      const mpg = kmpl * 1.60934

      // Cost calculations
      const costPer100km = (fuelPrice * 100) / kmpl
      const costPerMile = (fuelPrice * 1.60934) / kmpl

      setResult({
        mpg: Math.round(mpg * 10) / 10,
        kmpl: Math.round(kmpl * 10) / 10,
        costPer100km: Math.round(costPer100km * 100) / 100,
        costPerMile: Math.round(costPerMile * 100) / 100,
        fuelNeeded: fuelUsed,
        fuelCost: Math.round(fuelUsed * fuelPrice * 100) / 100,
        distance,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Gas Mileage Calculator"
      description="Calculate fuel efficiency and costs"
      icon={<Fuel className="w-12 h-12 text-tools" />}
      color="#f59e0b"
      category="tools"
      result={result ? `${result.kmpl} km/L` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Distance</label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              required
              className="form-input flex-1"
              value={inputs.distance}
              onChange={(e) => setInputs({ ...inputs, distance: e.target.value })}
              placeholder="500"
            />
            <select
              className="form-input w-24"
              value={inputs.distanceUnit}
              onChange={(e) => setInputs({ ...inputs, distanceUnit: e.target.value })}
            >
              <option value="km">km</option>
              <option value="miles">miles</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Fuel Used</label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              required
              className="form-input flex-1"
              value={inputs.fuelUsed}
              onChange={(e) => setInputs({ ...inputs, fuelUsed: e.target.value })}
              placeholder="40"
            />
            <select
              className="form-input w-24"
              value={inputs.fuelUnit}
              onChange={(e) => setInputs({ ...inputs, fuelUnit: e.target.value })}
            >
              <option value="liters">liters</option>
              <option value="gallons">gallons</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="form-group">
            <label className="form-label">Fuel Price</label>
            <input
              type="number"
              step="0.01"
              required
              className="form-input"
              value={inputs.fuelPrice}
              onChange={(e) => setInputs({ ...inputs, fuelPrice: e.target.value })}
              placeholder="1.5"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Currency</label>
            <select
              className="form-input"
              value={inputs.currency}
              onChange={(e) => setInputs({ ...inputs, currency: e.target.value })}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Efficiency'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">{result.kmpl}</div>
                <div className="text-xs text-muted">km/L</div>
              </div>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">{result.mpg}</div>
                <div className="text-xs text-muted">MPG</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-bold text-text mb-3 text-sm">Cost Analysis</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Cost per 100 km:</span>
                <span className="font-bold">{inputs.currency} {formatNumber(result.costPer100km, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Cost per mile:</span>
                <span className="font-bold">{inputs.currency} {formatNumber(result.costPerMile, 2)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted">Total fuel cost:</span>
                <span className="font-bold text-accent">{inputs.currency} {formatNumber(result.fuelCost, 2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
