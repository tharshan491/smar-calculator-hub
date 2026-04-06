'use client'

import { useState } from 'react'
import { Moon } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory, formatNumber } from '../../lib/api'

interface SleepResult {
  sleepTime: string
  wakeTime: string
  cycles: number
  quality: string
}

export default function SleepCalculator() {
  const [inputs, setInputs] = useState({
    wakeTime: '07:00',
    cycles: '5',
  })
  const [result, setResult] = useState<SleepResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const [hours, minutes] = inputs.wakeTime.split(':').map(Number)
      const response = await callCalculator('/health/sleep', {
        wakeHour: hours,
        wakeMinute: minutes,
        cycles: parseInt(inputs.cycles),
      })

      setResult(response)
      await saveToHistory('Sleep Calculator', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Sleep Calculator"
      description="Calculate ideal sleep times based on sleep cycles"
      icon={<Moon className="w-12 h-12 text-health" />}
      color="#8b5cf6"
      category="health"
      result={result ? `Go to bed at ${result.sleepTime}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Wake Up Time</label>
          <input
            type="time"
            required
            className="form-input"
            value={inputs.wakeTime}
            onChange={(e) => setInputs({ ...inputs, wakeTime: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Sleep Cycles (90 min each)</label>
          <select
            className="form-select"
            value={inputs.cycles}
            onChange={(e) => setInputs({ ...inputs, cycles: e.target.value })}
          >
            {[4, 5, 6, 7, 8].map((c) => (
              <option key={c} value={c}>{c} cycles (~{c * 90} min)</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Sleep Time'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Go to bed:</span>
            <span className="font-bold text-accent">{result.sleepTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Wake up:</span>
            <span className="font-bold">{result.wakeTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Cycles:</span>
            <span className="font-bold">{result.cycles}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-muted">Sleep Quality:</span>
            <span className="font-bold text-accent">{result.quality}</span>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
