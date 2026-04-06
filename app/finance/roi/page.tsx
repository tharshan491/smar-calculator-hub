'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    investmentAmount: '10000',
    gainOrLoss: '2000',
    time: '1',
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const investment = parseFloat(inputs.investmentAmount)
      const gainLoss = parseFloat(inputs.gainOrLoss)
      const time = parseFloat(inputs.time)

      if (isNaN(investment) || isNaN(gainLoss) || isNaN(time) || investment <= 0 || time <= 0) {
        setError('Please enter valid positive numbers')
        setLoading(false)
        return
      }

      const roi = (gainLoss / investment) * 100
      const annualROI = roi / time
      const totalValue = investment + gainLoss

      setResult({
        roi: Math.round(roi * 100) / 100,
        annualROI: Math.round(annualROI * 100) / 100,
        gainLoss: gainLoss,
        totalValue: totalValue,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="ROI Calculator"
      description="Calculate return on investment"
      icon={<TrendingUp className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `${result.roi}%` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Investment Amount ($)</label>
          <input
            type="number"
            step="100"
            required
            className="form-input"
            value={inputs.investmentAmount}
            onChange={(e) => setInputs({ ...inputs, investmentAmount: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Gain or Loss ($)</label>
          <input
            type="number"
            step="100"
            required
            className="form-input"
            value={inputs.gainOrLoss}
            onChange={(e) => setInputs({ ...inputs, gainOrLoss: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Time Period (Years)</label>
          <input
            type="number"
            step="0.1"
            required
            className="form-input"
            value={inputs.time}
            onChange={(e) => setInputs({ ...inputs, time: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate ROI'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-center mb-3">
              <div className="text-3xl font-bold text-accent mb-1">{result.roi}%</div>
              <div className="text-sm text-muted">Return on Investment</div>
            </div>
            <div className="space-y-2 text-sm border-t border-accent/30 pt-3">
              <div className="flex justify-between">
                <span className="text-muted">Annual ROI:</span>
                <span className="font-bold">{result.annualROI}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Total Gain/Loss:</span>
                <span className="font-bold text-accent">${formatNumber(result.gainLoss, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Current Value:</span>
                <span className="font-bold">${formatNumber(result.totalValue, 2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
