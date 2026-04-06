'use client'

import { useState } from 'react'

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState(5000)
  const [apr, setApr] = useState(18)
  const [monthlyPayment, setMonthlyPayment] = useState(250)
  const [monthsToPayoff, setMonthsToPayoff] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  const calculate = () => {
    if (balance && apr && monthlyPayment) {
      let remaining = balance
      let months = 0
      let interest = 0
      const monthlyRate = apr / 100 / 12

      while (remaining > 0 && months < 600) {
        const monthlyInterest = remaining * monthlyRate
        interest += monthlyInterest
        remaining += monthlyInterest - monthlyPayment
        months++
      }

      setMonthsToPayoff(months)
      setTotalInterest(interest)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Credit Card Payoff Calculator</h1>
        
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Credit Card Balance ($)</label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(parseFloat(e.target.value))}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>

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
              <label className="block text-sm font-medium text-slate-700">Monthly Payment ($)</label>
              <input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(parseFloat(e.target.value))}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>

            <button
              onClick={calculate}
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-bold hover:bg-blue-700 transition"
            >
              Calculate Payoff
            </button>

            {monthsToPayoff > 0 && (
              <div className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-6">
                  <p className="text-slate-700">Months to Payoff</p>
                  <p className="text-4xl font-bold text-blue-600">{monthsToPayoff}</p>
                </div>
                <div className="rounded-lg bg-red-50 p-6">
                  <p className="text-slate-700">Total Interest Paid</p>
                  <p className="text-3xl font-bold text-red-600">${totalInterest.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
