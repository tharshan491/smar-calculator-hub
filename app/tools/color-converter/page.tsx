'use client'

import { useState } from 'react'

export default function ColorConverter() {
  const [hex, setHex] = useState('#FF5733')
  const [rgb, setRgb] = useState({ r: 255, g: 87, b: 51 })

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    }
  }

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('').toUpperCase()
  }

  const handleHexChange = (value) => {
    setHex(value)
    const newRgb = hexToRgb(value)
    if (newRgb) setRgb(newRgb)
  }

  const handleRgbChange = (channel, value) => {
    const newRgb = { ...rgb, [channel]: value }
    setRgb(newRgb)
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Color Converter</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div className="h-32 rounded-lg" style={{backgroundColor: hex}} />
            <div>
              <label className="block text-sm font-medium text-slate-700">HEX</label>
              <input type="text" value={hex} onChange={(e) => handleHexChange(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Red</label>
                <input type="number" min="0" max="255" value={rgb.r} onChange={(e) => handleRgbChange('r', parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Green</label>
                <input type="number" min="0" max="255" value={rgb.g} onChange={(e) => handleRgbChange('g', parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Blue</label>
                <input type="number" min="0" max="255" value={rgb.b} onChange={(e) => handleRgbChange('b', parseFloat(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-600">RGB: ({rgb.r}, {rgb.g}, {rgb.b})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
