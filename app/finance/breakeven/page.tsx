'use client'

import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface BreakevenResult {
  units: number
  revenueAtBreakeven: number
  contributionMargin: number
}

export default function BreakevenCalculator() {
  const [inputs, setInputs] = useState({
    fixedCosts: '10000',
    pricePerUnit: '50',
    variableCostPerUnit: '30',
  })
  const [result, setResult] = useState<BreakevenResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/finance/breakeven', {
        fixedCosts: parseFloat(inputs.fixedCosts),
        pricePerUnit: parseFloat(inputs.pricePerUnit),
        variableCostPerUnit: parseFloat(inputs.variableCostPerUnit),
      })

      setResult(response)
      await saveToHistory('Breakeven Calculator', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Breakeven Calculator"
      description="Find how many units you need to sell to break even"
      icon={<BarChart3 className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `${formatNumber(result.units, 0)} units` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Fixed Costs ($)</label>
          <input
            type="number"
            step="100"
            required
            className="form-input"
            value={inputs.fixedCosts}
            onChange={(e) => setInputs({ ...inputs, fixedCosts: e.target.value })}
            placeholder="10000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price Per Unit ($)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.pricePerUnit}
            onChange={(e) => setInputs({ ...inputs, pricePerUnit: e.target.value })}
            placeholder="50"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Variable Cost Per Unit ($)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.variableCostPerUnit}
            onChange={(e) => setInputs({ ...inputs, variableCostPerUnit: e.target.value })}
            placeholder="30"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Breakeven'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Breakeven Units:</span>
            <span className="font-bold text-accent">{formatNumber(result.units, 0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Revenue at Breakeven:</span>
            <span className="font-bold">${formatNumber(result.revenueAtBreakeven, 2)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-muted font-semibold">Contribution Margin:</span>
            <span className="font-bold text-accent">${formatNumber(result.contributionMargin, 2)}</span>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
