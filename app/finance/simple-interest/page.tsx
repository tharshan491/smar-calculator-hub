'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface SimpleInterestResult {
  principal: number
  rate: number
  time: number
  interest: number
  amount: number
  monthlyReturn: number
}

export default function SimpleInterestCalculator() {
  const [inputs, setInputs] = useState({
    principal: '10000',
    rate: '8',
    time: '5',
  })
  const [result, setResult] = useState<SimpleInterestResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const principal = parseFloat(inputs.principal)
    const rate = parseFloat(inputs.rate)
    const time = parseFloat(inputs.time)

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate < 0 || time <= 0) {
      return
    }

    // Simple Interest Formula: SI = (P × R × T) / 100
    const interest = (principal * rate * time) / 100
    const amount = principal + interest
    const monthlyReturn = interest / (time * 12)

    setResult({
      principal,
      rate,
      time,
      interest: Math.round(interest * 100) / 100,
      amount: Math.round(amount * 100) / 100,
      monthlyReturn: Math.round(monthlyReturn * 100) / 100,
    })
  }

  return (
    <CalculatorTemplate
      title="Simple Interest Calculator"
      description="Calculate simple interest earnings on deposits or loans"
      icon={<TrendingUp className="w-12 h-12 text-finance" />}
      color="#10b981"
      category="finance"
      result={result ? `$${formatNumber(result.interest, 2)}` : null}
      loading={false}
      error=""
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Principal Amount ($)</label>
          <input
            type="number"
            step="100"
            required
            className="form-input"
            value={inputs.principal}
            onChange={(e) => setInputs({ ...inputs, principal: e.target.value })}
            placeholder="10000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Annual Rate of Interest (%)</label>
          <input
            type="number"
            step="0.1"
            required
            className="form-input"
            value={inputs.rate}
            onChange={(e) => setInputs({ ...inputs, rate: e.target.value })}
            placeholder="8"
          />
          <p className="text-xs text-muted mt-1">Annual interest rate (e.g., 8 for 8%)</p>
        </div>

        <div className="form-group">
          <label className="form-label">Time Period (Years)</label>
          <input
            type="number"
            step="0.5"
            required
            className="form-input"
            value={inputs.time}
            onChange={(e) => setInputs({ ...inputs, time: e.target.value })}
            placeholder="5"
          />
        </div>

        <div className="flex gap-2">
          {[
            { time: '1', label: '1 Year' },
            { time: '3', label: '3 Years' },
            { time: '5', label: '5 Years' },
            { time: '10', label: '10 Years' },
          ].map((preset) => (
            <button
              key={preset.time}
              type="button"
              onClick={() => setInputs({ ...inputs, time: preset.time })}
              className="px-3 py-1 text-sm rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6">
          Calculate Interest
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-center mb-3">
              <div className="text-3xl font-bold text-accent mb-1">
                ${formatNumber(result.interest, 2)}
              </div>
              <div className="text-sm text-muted">Simple Interest Earned</div>
            </div>
            <div className="space-y-2 text-sm border-t border-accent/30 pt-3">
              <div className="flex justify-between">
                <span className="text-muted">Principal:</span>
                <span className="font-bold">${formatNumber(result.principal, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Rate:</span>
                <span className="font-bold">{result.rate}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Time Period:</span>
                <span className="font-bold">{result.time} years</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-accent/20">
                <span className="text-muted">Total Amount:</span>
                <span className="font-bold text-accent">${formatNumber(result.amount, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Monthly Return:</span>
                <span className="font-bold">${formatNumber(result.monthlyReturn, 2)}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted bg-muted/20 p-3 rounded-lg">
            <strong>Formula:</strong> SI = (P × R × T) ÷ 100
            <br />
            where P = Principal, R = Rate, T = Time
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
