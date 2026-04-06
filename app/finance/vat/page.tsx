'use client'

import { useState } from 'react'
import { Percent } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface VATResult {
  total: number
  tax: number
  preTax: number
}

export default function VATCalculator() {
  const [inputs, setInputs] = useState({
    amount: '100',
    rate: '20',
    mode: 'add',
  })
  const [result, setResult] = useState<VATResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const amount = parseFloat(inputs.amount)
      const rate = parseFloat(inputs.rate)

      if (isNaN(amount) || isNaN(rate)) {
        setError('Please enter valid numbers')
        setLoading(false)
        return
      }

      const response = await callCalculator('/finance/vat', {
        amount: amount,
        rate: rate,
        mode: inputs.mode,
      })

      const resultData = response.data || response
      if (!resultData.total && resultData.total !== 0) {
        setError('Invalid calculation response')
        setLoading(false)
        return
      }

      setResult(resultData)
      await saveToHistory('VAT Calculator', inputs, resultData)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="VAT / Sales Tax Calculator"
      description="Calculate VAT (Value Added Tax) and sales tax quickly"
      icon={<Percent className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `$${formatNumber(result.total || 0, 2)}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Amount ($)</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.amount}
            onChange={(e) => setInputs({ ...inputs, amount: e.target.value })}
            placeholder="100"
          />
        </div>

        <div className="form-group">
          <label className="form-label">VAT Rate (%)</label>
          <div className="flex gap-2 mb-2">
            {[10, 15, 20, 25].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setInputs({ ...inputs, rate: rate.toString() })}
                className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                  inputs.rate === rate.toString()
                    ? 'bg-accent text-bg'
                    : 'bg-surface2 border border-border hover:border-accent'
                }`}
              >
                {rate}%
              </button>
            ))}
          </div>
          <input
            type="number"
            step="0.1"
            required
            className="form-input"
            value={inputs.rate}
            onChange={(e) => setInputs({ ...inputs, rate: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Mode</label>
          <select
            className="form-select"
            value={inputs.mode}
            onChange={(e) => setInputs({ ...inputs, mode: e.target.value })}
          >
            <option value="add">Add VAT (Gross)</option>
            <option value="extract">Extract VAT (Net)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate VAT'}
        </button>
      </form>
    </CalculatorTemplate>
  )
}
