'use client'

import { useState } from 'react'

export default function InflationCalculator() {
  const [presentValue, setPresentValue] = useState(1000)
  const [inflationRate, setInflationRate] = useState(3)
  const [years, setYears] = useState(5)
  const [futureValue, setFutureValue] = useState(0)

  const calculate = () => {
    if (presentValue && inflationRate && years) {
      const result = presentValue * Math.pow(1 + inflationRate / 100, years)
      setFutureValue(result)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Inflation Calculator</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Amount ($)</label>
              <input type="number" value={presentValue} onChange={(e) => setPresentValue(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Annual Inflation Rate (%)</label>
              <input type="number" value={inflationRate} onChange={(e) => setInflationRate(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Years</label>
              <input type="number" value={years} onChange={(e) => setYears(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <button onClick={calculate} className="w-full rounded-lg bg-blue-600 py-3 text-white font-bold hover:bg-blue-700 transition">Calculate</button>
            {futureValue > 0 && (
              <div className="rounded-lg bg-slate-50 p-6">
                <p className="text-slate-700">Future Value</p>
                <p className="text-4xl font-bold text-slate-900">${futureValue.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
