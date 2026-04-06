'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface CurrencyResult {
  convertedAmount: number
}

export default function CurrencyConverter() {
  const [inputs, setInputs] = useState({
    amount: '100',
    from: 'USD',
    to: 'EUR',
  })
  const [result, setResult] = useState<CurrencyResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/tools/currency', {
        amount: parseFloat(inputs.amount),
        from: inputs.from,
        to: inputs.to,
      })

      setResult(response.data || response)
      await saveToHistory('Currency Converter', inputs, response.data || response)
    } catch (err: any) {
      setError(err.message || 'Failed to convert')
    } finally {
      setLoading(false)
    }
  }

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'INR', 'CNY', 'SGD']

  return (
    <CalculatorTemplate
      title="Currency Converter"
      description="Convert between different currencies with real exchange rates"
      icon={<Globe className="w-12 h-12 text-tools" />}
      color="#0070f3"
      category="tools"
      result={result ? `${formatNumber(result.convertedAmount || (result as any).amount || 0, 2)} ${inputs.to}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Amount</label>
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

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">From</label>
            <select
              className="form-select"
              value={inputs.from}
              onChange={(e) => setInputs({ ...inputs, from: e.target.value })}
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">To</label>
            <select
              className="form-select"
              value={inputs.to}
              onChange={(e) => setInputs({ ...inputs, to: e.target.value })}
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </form>
    </CalculatorTemplate>
  )
}
