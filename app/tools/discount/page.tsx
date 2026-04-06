'use client'

import { useState } from 'react'
import { Scissors } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface DiscountResult {
  discountAmount: number
  finalPrice: number
}

export default function DiscountCalculator() {
  const [inputs, setInputs] = useState({
    price: '100',
    discountPercent: '20',
  })
  const [result, setResult] = useState<DiscountResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/tools/discount', {
        price: parseFloat(inputs.price),
        discountPercent: parseFloat(inputs.discountPercent),
      })

      setResult(response.data || response)
      await saveToHistory('Discount Calculator', inputs, response.data || response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Discount Calculator"
      description="Calculate discounts and final prices after savings"
      icon={<Scissors className="w-12 h-12 text-tools" />}
      color="#0070f3"
      category="tools"
      result={result ? `$${formatNumber(result.final || 0, 2)}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Original Price ($)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.price}
            onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
            placeholder="100"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Discount Percentage (%)</label>
          <div className="flex gap-2 mb-2">
            {[10, 20, 30, 50].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setInputs({ ...inputs, discountPercent: pct.toString() })}
                className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                  inputs.discountPercent === pct.toString()
                    ? 'bg-accent text-bg'
                    : 'bg-surface2 border border-border hover:border-accent'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          <input
            type="number"
            step="0.1"
            required
            className="form-input"
            value={inputs.discountPercent}
            onChange={(e) => setInputs({ ...inputs, discountPercent: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Discount'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Discount Amount:</span>
            <span className="font-bold text-accent3">-$${formatNumber(result.saved || 0, 2)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-muted font-semibold">Final Price:</span>
            <span className="font-bold text-accent2">$${formatNumber(result.final || 0, 2)}</span>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
