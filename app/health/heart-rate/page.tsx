'use client'

import { useState } from 'react'

export default function HeartRateCalculator() {
  const [age, setAge] = useState(30)
  const [restingHeartRate, setRestingHeartRate] = useState(60)
  const [maxHeartRate, setMaxHeartRate] = useState(190)
  const [zones, setZones] = useState({})

  const calculate = () => {
    const max = 220 - age
    const zones_obj = {
      z1: { min: max * 0.5, max: max * 0.6, name: 'Very Light' },
      z2: { min: max * 0.6, max: max * 0.7, name: 'Light' },
      z3: { min: max * 0.7, max: max * 0.8, name: 'Moderate' },
      z4: { min: max * 0.8, max: max * 0.9, name: 'Hard' },
      z5: { min: max * 0.9, max: max, name: 'Maximum' }
    }
    setMaxHeartRate(max)
    setZones(zones_obj)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Heart Rate Training Zones</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Age</label>
              <input type="number" value={age} onChange={(e) => setAge(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Resting Heart Rate (bpm)</label>
              <input type="number" value={restingHeartRate} onChange={(e) => setRestingHeartRate(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <button onClick={calculate} className="w-full rounded-lg bg-green-600 py-3 text-white font-bold hover:bg-green-700 transition">Calculate Zones</button>
            {maxHeartRate > 0 && (
              <div className="space-y-4">
                <div className="rounded-lg bg-slate-50 p-6">
                  <p className="text-slate-700">Max Heart Rate</p>
                  <p className="text-4xl font-bold text-slate-900">{maxHeartRate.toFixed(0)} bpm</p>
                </div>
                {Object.values(zones).map((zone, i) => (
                  <div key={i} className="rounded-lg bg-green-50 border border-green-200 p-4">
                    <p className="font-semibold text-slate-900">{zone.name}</p>
                    <p className="text-slate-600">{zone.min.toFixed(0)} - {zone.max.toFixed(0)} bpm</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
