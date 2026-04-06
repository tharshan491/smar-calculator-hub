'use client'

import { useState } from 'react'

export default function SavingsGoalCalculator() {
  const [goalAmount, setGoalAmount] = useState(10000)
  const [currentSavings, setCurrentSavings] = useState(0)
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [monthsNeeded, setMonthsNeeded] = useState(0)

  const calculate = () => {
    if (goalAmount && monthlyContribution) {
      const remaining = goalAmount - currentSavings
      const months = Math.ceil(remaining / monthlyContribution)
      setMonthsNeeded(months)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Savings Goal Calculator</h1>
        
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Goal Amount ($)</label>
              <input type="number" value={goalAmount} onChange={(e) => setGoalAmount(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Current Savings ($)</label>
              <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Monthly Contribution ($)</label>
              <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <button onClick={calculate} className="w-full rounded-lg bg-blue-600 py-3 text-white font-bold hover:bg-blue-700 transition">Calculate</button>
            {monthsNeeded > 0 && (
              <div className="rounded-lg bg-blue-50 p-6">
                <p className="text-slate-700">Time to Reach Goal</p>
                <p className="text-4xl font-bold text-blue-600">{monthsNeeded} months</p>
                <p className="mt-2 text-sm text-slate-600">({(monthsNeeded / 12).toFixed(1)} years)</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
