'use client'

import { useState } from 'react'
import { Fuel } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface FuelResult {
  liters: number
  cost: number
  perKm: number
  per100km: number
}

export default function FuelCostCalculator() {
  const [inputs, setInputs] = useState({
    distance: '100',
    efficiency: '7',
    pricePerLiter: '1.5',
  })
  const [result, setResult] = useState<FuelResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/tools/fuel', {
        distance: parseFloat(inputs.distance),
        efficiency: parseFloat(inputs.efficiency),
        pricePerLiter: parseFloat(inputs.pricePerLiter),
      })

      setResult(response)
      await saveToHistory('Fuel Cost Calculator', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Fuel Cost Calculator"
      description="Calculate fuel consumption and trip cost"
      icon={<Fuel className="w-12 h-12 text-tools" />}
      color="#bf8700"
      category="tools"
      result={result ? `$${formatNumber(result.cost, 2)}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Distance (km)</label>
          <input
            type="number"
            step="1"
            required
            className="form-input"
            value={inputs.distance}
            onChange={(e) => setInputs({ ...inputs, distance: e.target.value })}
            placeholder="100"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Fuel Efficiency (L/100km)</label>
          <input
            type="number"
            step="0.1"
            required
            className="form-input"
            value={inputs.efficiency}
            onChange={(e) => setInputs({ ...inputs, efficiency: e.target.value })}
            placeholder="7"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price Per Liter ($)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.pricePerLiter}
            onChange={(e) => setInputs({ ...inputs, pricePerLiter: e.target.value })}
            placeholder="1.5"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Cost'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Fuel Needed:</span>
            <span className="font-bold text-accent">{formatNumber(result.liters, 2)} L</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Total Cost:</span>
            <span className="font-bold">${formatNumber(result.cost, 2)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-muted">Cost per km:</span>
            <span className="font-bold text-accent">${formatNumber(result.perKm, 4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Cost per 100km:</span>
            <span className="font-bold">${formatNumber(result.per100km, 2)}</span>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
