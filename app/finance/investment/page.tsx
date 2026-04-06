'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface InvestmentResult {
  finalAmount: number
  totalInvested: number
  totalGain: number
  gainPercentage: number
}

export default function InvestmentCalculator() {
  const [inputs, setInputs] = useState({
    initialInvestment: '10000',
    monthlyContribution: '500',
    annualReturn: '7',
    years: '20',
  })
  const [result, setResult] = useState<InvestmentResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const initial = parseFloat(inputs.initialInvestment)
    const monthly = parseFloat(inputs.monthlyContribution)
    const annualRate = parseFloat(inputs.annualReturn) / 100 / 12
    const months = parseFloat(inputs.years) * 12

    // Future value of initial investment
    const fvInitial = initial * Math.pow(1 + annualRate, months)

    // Future value of monthly contributions (annuity)
    const fvMonthly = monthly * ((Math.pow(1 + annualRate, months) - 1) / annualRate)

    const finalAmount = fvInitial + fvMonthly
    const totalInvested = initial + monthly * months
    const totalGain = finalAmount - totalInvested
    const gainPercentage = (totalGain / totalInvested) * 100

    setResult({
      finalAmount: Math.round(finalAmount * 100) / 100,
      totalInvested: Math.round(totalInvested * 100) / 100,
      totalGain: Math.round(totalGain * 100) / 100,
      gainPercentage: Math.round(gainPercentage * 100) / 100,
    })
  }

  return (
    <CalculatorTemplate
      title="Investment Growth Calculator"
      description="Project your investment growth over time with regular contributions"
      icon={<TrendingUp className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `$${formatNumber(result.finalAmount, 2)}` : null}
      loading={false}
      error=""
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Initial Investment ($)</label>
          <input
            type="number"
            step="1000"
            required
            className="form-input"
            value={inputs.initialInvestment}
            onChange={(e) => setInputs({ ...inputs, initialInvestment: e.target.value })}
            placeholder="10000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Monthly Contribution ($)</label>
          <input
            type="number"
            step="100"
            required
            className="form-input"
            value={inputs.monthlyContribution}
            onChange={(e) => setInputs({ ...inputs, monthlyContribution: e.target.value })}
            placeholder="500"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Annual Return (%)</label>
          <div className="flex gap-2 mb-2">
            {[5, 7, 10, 12].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setInputs({ ...inputs, annualReturn: rate.toString() })}
                className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                  inputs.annualReturn === rate.toString()
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
            value={inputs.annualReturn}
            onChange={(e) => setInputs({ ...inputs, annualReturn: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Time Period (Years)</label>
          <div className="flex gap-2 mb-2">
            {[10, 20, 30].map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setInputs({ ...inputs, years: yr.toString() })}
                className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                  inputs.years === yr.toString()
                    ? 'bg-accent text-bg'
                    : 'bg-surface2 border border-border hover:border-accent'
                }`}
              >
                {yr}yr
              </button>
            ))}
          </div>
          <input
            type="number"
            step="1"
            required
            className="form-input"
            value={inputs.years}
            onChange={(e) => setInputs({ ...inputs, years: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6">
          Calculate Growth
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Total Invested:</span>
                <span className="font-bold">${formatNumber(result.totalInvested, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Total Gain:</span>
                <span className="font-bold text-accent2">${formatNumber(result.totalGain, 2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Return %:</span>
                <span className="font-bold text-accent2">{result.gainPercentage}%</span>
              </div>
              <div className="flex justify-between border-t border-accent/30 pt-2">
                <span className="text-muted font-bold">Final Amount:</span>
                <span className="font-bold text-lg text-accent2">${formatNumber(result.finalAmount, 2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
