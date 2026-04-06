'use client'

import { useState } from 'react'
import { Box } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber } from '../../lib/api'

interface GeometryResult {
  type: string
  area?: number
  perimeter?: number
  volume?: number
  surfaceArea?: number
  [key: string]: any
}

export default function GeometryCalculator() {
  const [shape, setShape] = useState('circle')
  const [inputs, setInputs] = useState({
    radius: '5',
    length: '10',
    width: '8',
    height: '6',
    base: '5',
    side: '4',
  })
  const [result, setResult] = useState<GeometryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let res: GeometryResult = { type: shape }

      if (shape === 'circle') {
        const radius = parseFloat(inputs.radius)
        if (isNaN(radius) || radius <= 0) throw new Error('Invalid radius')
        res.area = Math.PI * radius * radius
        res.perimeter = 2 * Math.PI * radius
      } else if (shape === 'rectangle') {
        const length = parseFloat(inputs.length)
        const width = parseFloat(inputs.width)
        if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) throw new Error('Invalid dimensions')
        res.area = length * width
        res.perimeter = 2 * (length + width)
      } else if (shape === 'triangle') {
        const base = parseFloat(inputs.base)
        const height = parseFloat(inputs.height)
        if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) throw new Error('Invalid dimensions')
        res.area = (base * height) / 2
        res.base = base
        res.height = height
      } else if (shape === 'sphere') {
        const radius = parseFloat(inputs.radius)
        if (isNaN(radius) || radius <= 0) throw new Error('Invalid radius')
        res.volume = (4 / 3) * Math.PI * Math.pow(radius, 3)
        res.surfaceArea = 4 * Math.PI * Math.pow(radius, 2)
      } else if (shape === 'cube') {
        const side = parseFloat(inputs.side)
        if (isNaN(side) || side <= 0) throw new Error('Invalid side')
        res.volume = Math.pow(side, 3)
        res.surfaceArea = 6 * Math.pow(side, 2)
        res.side = side
      } else if (shape === 'cylinder') {
        const radius = parseFloat(inputs.radius)
        const height = parseFloat(inputs.height)
        if (isNaN(radius) || isNaN(height) || radius <= 0 || height <= 0) throw new Error('Invalid dimensions')
        res.volume = Math.PI * Math.pow(radius, 2) * height
        res.surfaceArea = 2 * Math.PI * radius * (radius + height)
      } else if (shape === 'rectangular-box') {
        const length = parseFloat(inputs.length)
        const width = parseFloat(inputs.width)
        const height = parseFloat(inputs.height)
        if (isNaN(length) || isNaN(width) || isNaN(height) || length <= 0 || width <= 0 || height <= 0)
          throw new Error('Invalid dimensions')
        res.volume = length * width * height
        res.surfaceArea = 2 * (length * width + width * height + height * length)
      }

      // Round to 2 decimal places
      Object.keys(res).forEach((key) => {
        if (typeof res[key] === 'number') {
          res[key] = Math.round(res[key] * 100) / 100
        }
      })

      setResult(res)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Geometry Calculator"
      description="Calculate area, perimeter, volume, and surface area"
      icon={<Box className="w-12 h-12 text-math" />}
      color="#a855f7"
      category="math"
      result={
        result
          ? result.area
            ? `Area: ${formatNumber(result.area, 2)}`
            : result.volume
              ? `Volume: ${formatNumber(result.volume, 2)}`
              : 'Calculated'
          : null
      }
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Shape</label>
          <select
            className="form-input"
            value={shape}
            onChange={(e) => {
              setShape(e.target.value)
              setResult(null)
            }}
          >
            <optgroup label="2D Shapes">
              <option value="circle">Circle</option>
              <option value="rectangle">Rectangle</option>
              <option value="triangle">Triangle</option>
            </optgroup>
            <optgroup label="3D Shapes">
              <option value="sphere">Sphere</option>
              <option value="cube">Cube</option>
              <option value="cylinder">Cylinder</option>
              <option value="rectangular-box">Rectangular Box</option>
            </optgroup>
          </select>
        </div>

        {(shape === 'circle' || shape === 'sphere' || shape === 'cylinder') && (
          <div className="form-group">
            <label className="form-label">Radius</label>
            <input
              type="number"
              step="0.1"
              required
              className="form-input"
              value={inputs.radius}
              onChange={(e) => setInputs({ ...inputs, radius: e.target.value })}
              placeholder="5"
            />
          </div>
        )}

        {(shape === 'rectangle' || shape === 'rectangular-box' || shape === 'cylinder') && (
          <div className="form-group">
            <label className="form-label">Length / Width</label>
            <input
              type="number"
              step="0.1"
              required
              className="form-input"
              value={inputs.length}
              onChange={(e) => setInputs({ ...inputs, length: e.target.value })}
              placeholder="10"
            />
          </div>
        )}

        {(shape === 'rectangle' || shape === 'rectangular-box') && (
          <div className="form-group">
            <label className="form-label">Width</label>
            <input
              type="number"
              step="0.1"
              required
              className="form-input"
              value={inputs.width}
              onChange={(e) => setInputs({ ...inputs, width: e.target.value })}
              placeholder="8"
            />
          </div>
        )}

        {(shape === 'triangle' && (
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group">
              <label className="form-label">Base</label>
              <input
                type="number"
                step="0.1"
                required
                className="form-input"
                value={inputs.base}
                onChange={(e) => setInputs({ ...inputs, base: e.target.value })}
                placeholder="5"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Height</label>
              <input
                type="number"
                step="0.1"
                required
                className="form-input"
                value={inputs.height}
                onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
                placeholder="6"
              />
            </div>
          </div>
        )) ||
          (shape === 'cube' && (
            <div className="form-group">
              <label className="form-label">Side Length</label>
              <input
                type="number"
                step="0.1"
                required
                className="form-input"
                value={inputs.side}
                onChange={(e) => setInputs({ ...inputs, side: e.target.value })}
                placeholder="4"
              />
            </div>
          )) ||
          (shape === 'cylinder' && (
            <div className="form-group">
              <label className="form-label">Height</label>
              <input
                type="number"
                step="0.1"
                required
                className="form-input"
                value={inputs.height}
                onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
                placeholder="6"
              />
            </div>
          )) ||
          (shape === 'rectangular-box' && (
            <div className="form-group">
              <label className="form-label">Height</label>
              <input
                type="number"
                step="0.1"
                required
                className="form-input"
                value={inputs.height}
                onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
                placeholder="6"
              />
            </div>
          ))}

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="space-y-2 text-sm">
              {result.area && (
                <div className="flex justify-between">
                  <span className="text-muted">Area:</span>
                  <span className="font-bold text-accent">{formatNumber(result.area, 2)} sq units</span>
                </div>
              )}
              {result.perimeter && (
                <div className="flex justify-between">
                  <span className="text-muted">Perimeter:</span>
                  <span className="font-bold text-accent">{formatNumber(result.perimeter, 2)} units</span>
                </div>
              )}
              {result.volume && (
                <div className="flex justify-between">
                  <span className="text-muted">Volume:</span>
                  <span className="font-bold text-accent">{formatNumber(result.volume, 2)} cubic units</span>
                </div>
              )}
              {result.surfaceArea && (
                <div className="flex justify-between">
                  <span className="text-muted">Surface Area:</span>
                  <span className="font-bold text-accent">{formatNumber(result.surfaceArea, 2)} sq units</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
