'use client'

import { useState } from 'react'

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState(25)
  const [fahrenheit, setFahrenheit] = useState(77)
  const [kelvin, setKelvin] = useState(298.15)

  const handleCelsius = (value) => {
    setCelsius(value)
    setFahrenheit(value * 9/5 + 32)
    setKelvin(value + 273.15)
  }

  const handleFahrenheit = (value) => {
    setFahrenheit(value)
    const c = (value - 32) * 5/9
    setCelsius(c)
    setKelvin(c + 273.15)
  }

  const handleKelvin = (value) => {
    setKelvin(value)
    const c = value - 273.15
    setCelsius(c)
    setFahrenheit(c * 9/5 + 32)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Temperature Converter</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Celsius (°C)</label>
            <input type="number" value={celsius} onChange={(e) => handleCelsius(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Fahrenheit (°F)</label>
            <input type="number" value={fahrenheit} onChange={(e) => handleFahrenheit(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Kelvin (K)</label>
            <input type="number" value={kelvin} onChange={(e) => handleKelvin(parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
          </div>
        </div>
      </div>
    </div>
  )
}
