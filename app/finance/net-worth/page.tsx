'use client'

import { useState } from 'react'
import { PieChart } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface NetWorthResult {
  totalAssets: number
  totalLiabilities: number
  netWorth: number
}

export default function NetWorthCalculator() {
  const [inputs, setInputs] = useState({
    cash: '5000',
    savings: '20000',
    investments: '50000',
    realEstate: '300000',
    vehicles: '30000',
    other: '10000',
    mortgage: '240000',
    creditCard: '5000',
    loans: '15000',
  })
  const [result, setResult] = useState<NetWorthResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const assets =
      parseFloat(inputs.cash) +
      parseFloat(inputs.savings) +
      parseFloat(inputs.investments) +
      parseFloat(inputs.realEstate) +
      parseFloat(inputs.vehicles) +
      parseFloat(inputs.other)

    const liabilities =
      parseFloat(inputs.mortgage) +
      parseFloat(inputs.creditCard) +
      parseFloat(inputs.loans)

    const netWorth = assets - liabilities

    setResult({
      totalAssets: Math.round(assets * 100) / 100,
      totalLiabilities: Math.round(liabilities * 100) / 100,
      netWorth: Math.round(netWorth * 100) / 100,
    })
  }

  return (
    <CalculatorTemplate
      title="Net Worth Calculator"
      description="Calculate your total net worth by tracking assets and liabilities"
      icon={<PieChart className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? `$${formatNumber(result.netWorth, 2)}` : null}
      loading={false}
      error=""
    >
      <form onSubmit={handleCalculate} className="space-y-6">
        <div>
          <h3 className="font-bold text-text mb-3">💰 Assets</h3>
          <div className="space-y-3">
            {[
              { key: 'cash', label: 'Cash on Hand ($)' },
              { key: 'savings', label: 'Savings Accounts ($)' },
              { key: 'investments', label: 'Investments ($)' },
              { key: 'realEstate', label: 'Real Estate ($)' },
              { key: 'vehicles', label: 'Vehicles ($)' },
              { key: 'other', label: 'Other Assets ($)' },
            ].map(({ key, label }) => (
              <input
                key={key}
                type="number"
                step="1000"
                className="form-input"
                placeholder="0"
                value={inputs[key as keyof typeof inputs]}
                onChange={(e) => setInputs({ ...inputs, [key]: e.target.value })}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-text mb-3">📉 Liabilities</h3>
          <div className="space-y-3">
            {[
              { key: 'mortgage', label: 'Mortgage Balance ($)' },
              { key: 'creditCard', label: 'Credit Card Debt ($)' },
              { key: 'loans', label: 'Other Loans ($)' },
            ].map(({ key, label }) => (
              <input
                key={key}
                type="number"
                step="1000"
                className="form-input"
                placeholder="0"
                value={inputs[key as keyof typeof inputs]}
                onChange={(e) => setInputs({ ...inputs, [key]: e.target.value })}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Calculate Net Worth
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="p-4 bg-accent2/10 rounded-lg border border-accent2/30">
            <div className="flex justify-between">
              <span className="text-muted">Total Assets:</span>
              <span className="font-bold text-accent2">${formatNumber(result.totalAssets, 2)}</span>
            </div>
          </div>
          <div className="p-4 bg-accent3/10 rounded-lg border border-accent3/30">
            <div className="flex justify-between">
              <span className="text-muted">Total Liabilities:</span>
              <span className="font-bold text-accent3">${formatNumber(result.totalLiabilities, 2)}</span>
            </div>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="flex justify-between">
              <span className="text-muted font-bold">Net Worth:</span>
              <span className={`font-bold text-lg ${result.netWorth >= 0 ? 'text-accent2' : 'text-accent3'}`}>
                {result.netWorth >= 0 ? '+' : ''} ${formatNumber(result.netWorth, 2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
