'use client'

import { useState } from 'react'

export default function DividendCalculator() {
  const [sharePrice, setSharePrice] = useState(100)
  const [dividendPerShare, setDividendPerShare] = useState(5)
  const [shares, setShares] = useState(100)
  const [annualDividend, setAnnualDividend] = useState(0)
  const [yieldPercent, setYieldPercent] = useState(0)

  const calculate = () => {
    if (sharePrice && dividendPerShare && shares) {
      const annual = dividendPerShare * shares
      const yield_ = (dividendPerShare / sharePrice) * 100
      setAnnualDividend(annual)
      setYieldPercent(yield_)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Dividend Calculator</h1>
        
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Share Price ($)</label>
              <input
                type="number"
                value={sharePrice}
                onChange={(e) => setSharePrice(parseFloat(e.target.value))}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Dividend per Share ($)</label>
              <input
                type="number"
                value={dividendPerShare}
                onChange={(e) => setDividendPerShare(parseFloat(e.target.value))}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Number of Shares</label>
              <input
                type="number"
                value={shares}
                onChange={(e) => setShares(parseFloat(e.target.value))}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>

            <button
              onClick={calculate}
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-bold hover:bg-blue-700 transition"
            >
              Calculate Dividends
            </button>

            {annualDividend > 0 && (
              <div className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-6">
                  <p className="text-slate-700">Annual Dividend Income</p>
                  <p className="text-4xl font-bold text-blue-600">${annualDividend.toFixed(2)}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-6">
                  <p className="text-slate-700">Dividend Yield</p>
                  <p className="text-3xl font-bold text-slate-900">{yieldPercent.toFixed(2)}%</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
