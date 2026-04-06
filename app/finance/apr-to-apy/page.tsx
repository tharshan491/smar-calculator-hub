'use client'

import { useState } from 'react'

export default function APRtoAPYConverter() {
  const [apr, setApr] = useState(5)
  const [compoundingFrequency, setCompoundingFrequency] = useState(12)
  const [apy, setApy] = useState(0)

  const calculate = () => {
    if (apr && compoundingFrequency) {
      const result = Math.pow(1 + apr / 100 / compoundingFrequency, compoundingFrequency) - 1
      setApy(result * 100)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">APR to APY Converter</h1>
        
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">APR (%)</label>
              <input
                type="number"
                value={apr}
                onChange={(e) => setApr(parseFloat(e.target.value))}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Compounding Frequency</label>
              <select
                value={compoundingFrequency}
                onChange={(e) => setCompoundingFrequency(parseFloat(e.target.value))}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
              >
                <option value={1}>Annually</option>
                <option value={2}>Semi-annually</option>
                <option value={4}>Quarterly</option>
                <option value={12}>Monthly</option>
                <option value={365}>Daily</option>
              </select>
            </div>

            <button
              onClick={calculate}
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-bold hover:bg-blue-700 transition"
            >
              Calculate APY
            </button>

            {apy > 0 && (
              <div className="rounded-lg bg-blue-50 p-6">
                <p className="text-slate-700">Annual Percentage Yield (APY)</p>
                <p className="text-4xl font-bold text-blue-600">{apy.toFixed(3)}%</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
