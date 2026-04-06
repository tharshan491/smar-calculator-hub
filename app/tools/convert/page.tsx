'use client'

import { useState } from 'react'
import { ArrowRightLeft } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface ConvertResult {
  result: number
  from: string
  to: string
  value: number
}

const unitGroups = {
  Length: ['m', 'km', 'miles', 'yards', 'feet', 'inches', 'cm', 'mm'],
  Weight: ['kg', 'lbs', 'oz', 'grams', 'tonnes', 'stones'],
  Volume: ['liters', 'gallons', 'fl_oz', 'ml', 'cups', 'pints', 'quarts'],
  Temperature: ['C', 'F', 'K'],
  Speed: ['km/h', 'mph', 'm/s', 'knots'],
}

export default function UnitConverterCalculator() {
  const [inputs, setInputs] = useState({
    value: '100',
    from: 'm',
    to: 'km',
  })
  const [result, setResult] = useState<ConvertResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/tools/convert', {
        value: parseFloat(inputs.value),
        from: inputs.from,
        to: inputs.to,
      })

      setResult(response)
      await saveToHistory('Unit Converter', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to convert')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Unit Converter"
      description="Convert between different units of measurement"
      icon={<ArrowRightLeft className="w-12 h-12 text-tools" />}
      color="#bf8700"
      category="tools"
      result={result ? `${formatNumber(result.result, 8)} ${result.to}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Value</label>
          <input
            type="number"
            step="0.01"
            required
            className="form-input"
            value={inputs.value}
            onChange={(e) => setInputs({ ...inputs, value: e.target.value })}
            placeholder="100"
          />
        </div>

        <div className="form-group">
          <label className="form-label">From Unit</label>
          <select
            className="form-select"
            value={inputs.from}
            onChange={(e) => setInputs({ ...inputs, from: e.target.value })}
          >
            {Object.entries(unitGroups).map(([group, units]) => (
              <optgroup label={group} key={group}>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">To Unit</label>
          <select
            className="form-select"
            value={inputs.to}
            onChange={(e) => setInputs({ ...inputs, to: e.target.value })}
          >
            {Object.entries(unitGroups).map(([group, units]) => (
              <optgroup label={group} key={group}>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-bg rounded p-4 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">
              {formatNumber(result.value, 2)} {result.from}
            </p>
            <p className="text-muted text-xs my-2">equals</p>
            <p className="text-2xl font-bold">
              {formatNumber(result.result, 8)} {result.to}
            </p>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
