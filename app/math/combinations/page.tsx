'use client'

import { useState } from 'react'

export default function CombinationsPermutationsCalculator() {
  const [n, setN] = useState(10)
  const [r, setR] = useState(3)
  const [combinations, setCombinations] = useState(0)
  const [permutations, setPermutations] = useState(0)

  const factorial = (num) => {
    if (num <= 1) return 1
    return num * factorial(num - 1)
  }

  const calculate = () => {
    if (n >= r && r >= 0) {
      const c = factorial(n) / (factorial(r) * factorial(n - r))
      const p = factorial(n) / factorial(n - r)
      setCombinations(c)
      setPermutations(p)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Combinations & Permutations</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Total Items (n)</label>
              <input type="number" value={n} onChange={(e) => setN(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Choose Items (r)</label>
              <input type="number" value={r} onChange={(e) => setR(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <button onClick={calculate} className="w-full rounded-lg bg-orange-600 py-3 text-white font-bold hover:bg-orange-700 transition">Calculate</button>
            {combinations > 0 && (
              <div className="space-y-4">
                <div className="rounded-lg bg-orange-50 p-6">
                  <p className="text-slate-700">Combinations C(n,r)</p>
                  <p className="text-4xl font-bold text-orange-600">{combinations.toFixed(0)}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-6">
                  <p className="text-slate-700">Permutations P(n,r)</p>
                  <p className="text-4xl font-bold text-slate-900">{permutations.toFixed(0)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
