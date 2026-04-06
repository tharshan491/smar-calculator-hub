'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'

interface TimeZoneResult {
  sourceTime: string
  sourceZone: string
  conversions: Array<{
    zone: string
  offset: number
    time: string
  }>
}

// Predefined time zones
const TIMEZONES = [
  { zone: 'UTC', offset: 0 },
  { zone: 'EST', offset: -5 },
  { zone: 'EDT', offset: -4 },
  { zone: 'CST', offset: -6 },
  { zone: 'CDT', offset: -5 },
  { zone: 'MST', offset: -7 },
  { zone: 'MDT', offset: -6 },
  { zone: 'PST', offset: -8 },
  { zone: 'PDT', offset: -7 },
  { zone: 'IST', offset: 5.5 },
  { zone: 'GMT', offset: 0 },
  { zone: 'BST', offset: 1 },
  { zone: 'CET', offset: 1 },
  { zone: 'CEST', offset: 2 },
  { zone: 'EET', offset: 2 },
  { zone: 'JST', offset: 9 },
  { zone: 'AEST', offset: 10 },
  { zone: 'AEDT', offset: 11 },
  { zone: 'NZST', offset: 12 },
  { zone: 'NZDT', offset: 13 },
]

export default function TimeZoneCalculator() {
  const [inputs, setInputs] = useState({
    hours: '12',
    minutes: '0',
    sourceZone: 'UTC',
  })
  const [result, setResult] = useState<TimeZoneResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const convertTime = (hours: number, offset: number): string => {
    let totalMinutes = hours * 60
    totalMinutes += offset * 60
    
    let newHours = Math.floor(totalMinutes / 60)
    while (newHours < 0) newHours += 24
    newHours = newHours % 24

    return newHours.toString().padStart(2, '0') + ':' + inputs.minutes.padStart(2, '0')
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const hours = parseInt(inputs.hours)
      const minutes = parseInt(inputs.minutes)

      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60) {
        setError('Please enter valid time (00-23 hours, 00-59 minutes)')
        setLoading(false)
        return
      }

      const sourceOffset = TIMEZONES.find((tz) => tz.zone === inputs.sourceZone)?.offset || 0

      const conversions = TIMEZONES.map((tz) => {
        const diff = tz.offset - sourceOffset
        return {
          zone: tz.zone,
          offset: tz.offset,
          time: convertTime(hours + diff, 0),
        }
      }).sort((a, b) => a.offset - b.offset)

      setResult({
        sourceTime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        sourceZone: inputs.sourceZone,
        conversions,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Time Zone Converter"
      description="Convert time across different time zones"
      icon={<Globe className="w-12 h-12 text-tools" />}
      color="#f59e0b"
      category="tools"
      result={result ? `${result.sourceTime} ${result.sourceZone}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="form-group">
            <label className="form-label">Hours</label>
            <input
              type="number"
              step="1"
              min="0"
              max="23"
              required
              className="form-input"
              value={inputs.hours}
              onChange={(e) => setInputs({ ...inputs, hours: e.target.value })}
              placeholder="12"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Minutes</label>
            <input
              type="number"
              step="1"
              min="0"
              max="59"
              required
              className="form-input"
              value={inputs.minutes}
              onChange={(e) => setInputs({ ...inputs, minutes: e.target.value })}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Source Time Zone</label>
          <select
            className="form-input"
            value={inputs.sourceZone}
            onChange={(e) => setInputs({ ...inputs, sourceZone: e.target.value })}
          >
            <optgroup label="UTC">
              <option value="UTC">UTC</option>
              <option value="GMT">GMT</option>
            </optgroup>
            <optgroup label="Americas">
              <option value="EST">EST (UTC-5)</option>
              <option value="EDT">EDT (UTC-4)</option>
              <option value="CST">CST (UTC-6)</option>
              <option value="CDT">CDT (UTC-5)</option>
              <option value="MST">MST (UTC-7)</option>
              <option value="MDT">MDT (UTC-6)</option>
              <option value="PST">PST (UTC-8)</option>
              <option value="PDT">PDT (UTC-7)</option>
            </optgroup>
            <optgroup label="Europe">
              <option value="BST">BST (UTC+1)</option>
              <option value="CET">CET (UTC+1)</option>
              <option value="CEST">CEST (UTC+2)</option>
              <option value="EET">EET (UTC+2)</option>
            </optgroup>
            <optgroup label="Asia">
              <option value="IST">IST (UTC+5:30)</option>
              <option value="JST">JST (UTC+9)</option>
            </optgroup>
            <optgroup label="Oceania">
              <option value="AEST">AEST (UTC+10)</option>
              <option value="AEDT">AEDT (UTC+11)</option>
              <option value="NZST">NZST (UTC+12)</option>
              <option value="NZDT">NZDT (UTC+13)</option>
            </optgroup>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Converting...' : 'Convert Time'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">{result.sourceTime}</div>
              <div className="text-sm text-muted">{result.sourceZone}</div>
            </div>
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg max-h-80 overflow-y-auto">
            <h4 className="font-bold text-text mb-3 text-sm">Time in Other Zones</h4>
            <div className="space-y-2">
              {result.conversions.map((conv, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm bg-bg p-2 rounded border border-border/50"
                >
                  <div>
                    <div className="font-semibold text-text">{conv.zone}</div>
                    <div className="text-xs text-muted">UTC{conv.offset > 0 ? '+' : ''}{conv.offset}</div>
                  </div>
                  <div className="text-lg font-bold text-accent">{conv.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
