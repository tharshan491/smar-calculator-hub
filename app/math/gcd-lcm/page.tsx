'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'

interface GCDLCMResult {
  gcd: number
  lcm: number
}

export default function GCDLCMCalculator() {
  const [inputs, setInputs] = useState({
    number1: '48',
    number2: '18',
  })
  const [result, setResult] = useState<GCDLCMResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const findGCD = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }

  const findLCM = (a: number, b: number): number => {
    return Math.abs(a * b) / findGCD(a, b)
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const num1 = parseInt(inputs.number1)
      const num2 = parseInt(inputs.number2)

      if (isNaN(num1) || isNaN(num2) || num1 === 0 || num2 === 0) {
        setError('Please enter non-zero integers')
        setLoading(false)
        return
      }

      const a = Math.abs(num1)
      const b = Math.abs(num2)

      const gcd = findGCD(a, b)
      const lcm = findLCM(a, b)

      setResult({
        gcd,
        lcm,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="GCD & LCM Calculator"
      description="Find the Greatest Common Divisor and Least Common Multiple"
      icon={<Calculator className="w-12 h-12 text-math" />}
      color="#a855f7"
      category="math"
      result={result ? `GCD: ${result.gcd} / LCM: ${result.lcm}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">First Number</label>
          <input
            type="number"
            step="1"
            required
            className="form-input"
            value={inputs.number1}
            onChange={(e) => setInputs({ ...inputs, number1: e.target.value })}
            placeholder="48"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Second Number</label>
          <input
            type="number"
            step="1"
            required
            className="form-input"
            value={inputs.number2}
            onChange={(e) => setInputs({ ...inputs, number2: e.target.value })}
            placeholder="18"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate GCD & LCM'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">{result.gcd}</div>
                <div className="text-xs text-muted">Greatest Common Divisor</div>
              </div>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">{result.lcm}</div>
                <div className="text-xs text-muted">Least Common Multiple</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-bold text-text mb-2 text-sm">Definitions</h4>
            <div className="text-xs space-y-2 text-muted">
              <div>
                <strong className="text-text">GCD:</strong> The largest number that divides both numbers without a remainder.
              </div>
              <div>
                <strong className="text-text">LCM:</strong> The smallest number that is a multiple of both numbers.
              </div>
              <div className="pt-2 border-t border-border">
                <strong className="text-text">Relationship:</strong> GCD(a,b) × LCM(a,b) = |a × b|
              </div>
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
