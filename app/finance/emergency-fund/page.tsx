'use client'

import { useState } from 'react'

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000)
  const [months, setMonths] = useState(6)
  const [emergencyFund, setEmergencyFund] = useState(0)

  const calculate = () => {
    if (monthlyExpenses && months) {
      setEmergencyFund(monthlyExpenses * months)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Emergency Fund Calculator</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Monthly Expenses ($)</label>
              <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Months of Coverage</label>
              <input type="number" value={months} onChange={(e) => setMonths(parseFloat(e.target.value))} min="3" max="12" className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <button onClick={calculate} className="w-full rounded-lg bg-blue-600 py-3 text-white font-bold hover:bg-blue-700 transition">Calculate Emergency Fund</button>
            {emergencyFund > 0 && (
              <div className="rounded-lg bg-green-50 p-6">
                <p className="text-slate-700">Recommended Emergency Fund</p>
                <p className="text-4xl font-bold text-green-600">${emergencyFund.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
