'use client'

import { useState } from 'react'

export default function ProteinCalculator() {
  const [weight, setWeight] = useState(70)
  const [activity, setActivity] = useState('moderate')
  const [proteinNeeds, setProteinNeeds] = useState(0)

  const activityFactors = {
    sedentary: 0.8,
    light: 1.2,
    moderate: 1.6,
    intense: 2.0,
    athlete: 2.2
  }

  const calculate = () => {
    if (weight && activity) {
      const needs = weight * activityFactors[activity]
      setProteinNeeds(needs)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Daily Protein Calculator</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Body Weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Activity Level</label>
              <select value={activity} onChange={(e) => setActivity(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2">
                <option value="sedentary">Sedentary</option>
                <option value="light">Light Activity</option>
                <option value="moderate">Moderate Activity</option>
                <option value="intense">Intense Exercise</option>
                <option value="athlete">Athlete</option>
              </select>
            </div>
            <button onClick={calculate} className="w-full rounded-lg bg-green-600 py-3 text-white font-bold hover:bg-green-700 transition">Calculate Protein Needs</button>
            {proteinNeeds > 0 && (
              <div className="rounded-lg bg-green-50 p-6">
                <p className="text-slate-700">Daily Protein Requirement</p>
                <p className="text-4xl font-bold text-green-600">{proteinNeeds.toFixed(1)}g</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
