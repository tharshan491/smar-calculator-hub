'use client'

import { useState } from 'react'

export default function LeaseVsBuyCalculator() {
  const [carPrice, setCarPrice] = useState(30000)
  const [downPayment, setDownPayment] = useState(6000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(60)
  const [resaleValue, setResaleValue] = useState(15000)
  const [leaseMonthly, setLeaseMonthly] = useState(400)
  const [leaseMonths, setLeaseMonths] = useState(36)
  const [buyCost, setBuyCost] = useState(0)
  const [leaseCost, setLeaseCost] = useState(0)

  const calculate = () => {
    const principal = carPrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1)
    const totalLoanCost = monthlyPayment * loanTerm + downPayment - resaleValue
    const totalLeaseCost = leaseMonthly * leaseMonths
    
    setBuyCost(totalLoanCost)
    setLeaseCost(totalLeaseCost)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Lease vs Buy Calculator</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Car Price ($)</label>
                <input type="number" value={carPrice} onChange={(e) => setCarPrice(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-2 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Down Payment ($)</label>
                <input type="number" value={downPayment} onChange={(e) => setDownPayment(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-2 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Interest Rate (%)</label>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-2 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Loan Term (months)</label>
                <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-2 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Resale Value ($)</label>
                <input type="number" value={resaleValue} onChange={(e) => setResaleValue(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-2 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Lease Monthly ($)</label>
                <input type="number" value={leaseMonthly} onChange={(e) => setLeaseMonthly(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-2 py-2" />
              </div>
            </div>
            <button onClick={calculate} className="w-full rounded-lg bg-blue-600 py-3 text-white font-bold hover:bg-blue-700 transition">Compare</button>
            {buyCost > 0 && (
              <div className="space-y-4">
                <div className={`rounded-lg p-6 ${buyCost < leaseCost ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="text-slate-700">Total Buy Cost</p>
                  <p className={`text-4xl font-bold ${buyCost < leaseCost ? 'text-green-600' : 'text-red-600'}`}>${buyCost.toFixed(2)}</p>
                </div>
                <div className={`rounded-lg p-6 ${leaseCost < buyCost ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="text-slate-700">Total Lease Cost</p>
                  <p className={`text-4xl font-bold ${leaseCost < buyCost ? 'text-green-600' : 'text-red-600'}`}>${leaseCost.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
