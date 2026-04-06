'use client'

import { useState } from 'react'

export default function InvestmentReturnCalculator() {
  const [principal, setPrincipal] = useState(10000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(10)
  const [finalAmount, setFinalAmount] = useState(0)
  const [returns, setReturns] = useState(0)

  const calculate = () => {
    if (principal && rate && years) {
      const final = principal * Math.pow(1 + rate / 100, years)
      const ret = final - principal
      setFinalAmount(final)
      setReturns(ret)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Investment Return Calculator</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Initial Investment ($)</label>
              <input type="number" value={principal} onChange={(e) => setPrincipal(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Annual Return Rate (%)</label>
              <input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Years</label>
              <input type="number" value={years} onChange={(e) => setYears(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <button onClick={calculate} className="w-full rounded-lg bg-blue-600 py-3 text-white font-bold hover:bg-blue-700 transition">Calculate Returns</button>
            {finalAmount > 0 && (
              <div className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-6">
                  <p className="text-slate-700">Final Amount</p>
                  <p className="text-4xl font-bold text-blue-600">${finalAmount.toFixed(2)}</p>
                </div>
                <div className="rounded-lg bg-green-50 p-6">
                  <p className="text-slate-700">Total Returns</p>
                  <p className="text-4xl font-bold text-green-600">${returns.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
