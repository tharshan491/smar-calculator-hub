'use client'

import { useState } from 'react'

export default function CalorieBurnCalculator() {
  const [weight, setWeight] = useState(70)
  const [activity, setActivity] = useState(5)
  const [duration, setDuration] = useState(30)
  const [caloriesBurned, setCaloriesBurned] = useState(0)

  const activities = {
    1: { name: 'Resting', factor: 0.5 },
    2: { name: 'Walking', factor: 3.5 },
    3: { name: 'Jogging', factor: 7 },
    4: { name: 'Running', factor: 10 },
    5: { name: 'Cycling', factor: 7 },
    6: { name: 'Swimming', factor: 8 },
    7: { name: 'HIIT', factor: 12 }
  }

  const calculate = () => {
    if (weight && activity && duration) {
      const burned = weight * activities[activity].factor * (duration / 60)
      setCaloriesBurned(burned)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Calorie Burn Calculator</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Activity</label>
              <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2">
                {Object.entries(activities).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Duration (minutes)</label>
              <input type="number" value={duration} onChange={(e) => setDuration(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <button onClick={calculate} className="w-full rounded-lg bg-green-600 py-3 text-white font-bold hover:bg-green-700 transition">Calculate</button>
            {caloriesBurned > 0 && (
              <div className="rounded-lg bg-green-50 p-6">
                <p className="text-slate-700">Calories Burned</p>
                <p className="text-4xl font-bold text-green-600">{caloriesBurned.toFixed(0)} kcal</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
