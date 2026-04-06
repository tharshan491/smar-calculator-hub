'use client'

import { useState } from 'react'
import { PieChart } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface ProfitResult {
  profitAmount: number
  profitMargin: number
  markupPercentage: number
}

export default function ProfitMarginCalculator() {
  const [inputs, setInputs] = useState({
    revenue: '1000',
    cost: '700',
  })
  const [result, setResult] = useState<ProfitResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/finance/profit', {
        revenue: parseFloat(inputs.revenue),
        cost: parseFloat(inputs.cost),
      })

      setResult(response.data || response)
      await saveToHistory('Profit Margin Calculator', inputs, response.data || response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Profit Margin Calculator"
      description="Calculate profit margins and markup percentages"
      icon={<PieChart className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `${formatNumber((result as any).profitMargin || 0, 2)}%` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Revenue ($)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.revenue}
            onChange={(e) => setInputs({ ...inputs, revenue: e.target.value })}
            placeholder="1000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Cost ($)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.cost}
            onChange={(e) => setInputs({ ...inputs, cost: e.target.value })}
            placeholder="700"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Profit'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Profit:</span>
            <span className="font-bold text-accent2">${formatNumber((result as any).profitAmount || 0, 2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Profit Margin:</span>
            <span className="font-bold text-accent">{formatNumber((result as any).profitMargin || 0, 2)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Markup:</span>
            <span className="font-bold">{formatNumber((result as any).markupPercentage || 0, 2)}%</span>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
