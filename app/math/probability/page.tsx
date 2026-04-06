'use client'

import { useState } from 'react'

export default function ProbabilityCalculator() {
  const [successOutcomes, setSuccessOutcomes] = useState(5)
  const [totalOutcomes, setTotalOutcomes] = useState(20)
  const [probability, setProbability] = useState(0)

  const calculate = () => {
    if (totalOutcomes && successOutcomes <= totalOutcomes) {
      const prob = (successOutcomes / totalOutcomes) * 100
      setProbability(prob)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Probability Calculator</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Success Outcomes</label>
              <input type="number" value={successOutcomes} onChange={(e) => setSuccessOutcomes(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Total Outcomes</label>
              <input type="number" value={totalOutcomes} onChange={(e) => setTotalOutcomes(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <button onClick={calculate} className="w-full rounded-lg bg-orange-600 py-3 text-white font-bold hover:bg-orange-700 transition">Calculate Probability</button>
            {probability > 0 && (
              <div className="rounded-lg bg-orange-50 p-6">
                <p className="text-slate-700">Probability</p>
                <p className="text-4xl font-bold text-orange-600">{probability.toFixed(2)}%</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
