'use client'

import { useState } from 'react'
import { Coffee } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface TipResult {
  tipAmount: number
  totalPerPerson: number
  totalBill: number
}

export default function TipCalculator() {
  const [inputs, setInputs] = useState({
    bill: '100',
    tipPercent: '15',
    people: '1',
  })
  const [result, setResult] = useState<TipResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/tools/tip', {
        bill: parseFloat(inputs.bill),
        tipPercent: parseFloat(inputs.tipPercent),
        people: parseInt(inputs.people),
      })

      setResult(response.data || response)
      await saveToHistory('Tip Calculator', inputs, response.data || response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Tip Calculator"
      description="Calculate tips and split bills fairly"
      icon={<Coffee className="w-12 h-12 text-tools" />}
      color="#0070f3"
      category="tools"
      result={result ? `$${formatNumber(result.totalAmount || result.totalPerPerson, 2)}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Bill Amount ($)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.bill}
            onChange={(e) => setInputs({ ...inputs, bill: e.target.value })}
            placeholder="100"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Tip Percentage (%)</label>
          <div className="flex gap-2">
            {[10, 15, 20, 25].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setInputs({ ...inputs, tipPercent: pct.toString() })}
                className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                  inputs.tipPercent === pct.toString()
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
            className="form-input mt-2"
            value={inputs.tipPercent}
            onChange={(e) => setInputs({ ...inputs, tipPercent: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Number of People</label>
          <input
            type="number"
            min="1"
            step="1"
            required
            className="form-input"
            value={inputs.people}
            onChange={(e) => setInputs({ ...inputs, people: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Tip'}
        </button>
      </form>
    </CalculatorTemplate>
  )
}
