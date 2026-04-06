'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { callCalculator, saveToHistory } from '../../lib/api'

interface PrimesResult {
  n: number
  isPrime: boolean
  primes: number[]
  primeCount: number
  primeFactors: number[]
}

export default function PrimesCalculator() {
  const [inputs, setInputs] = useState({
    n: '20',
  })
  const [result, setResult] = useState<PrimesResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await callCalculator('/math/primes', {
        n: parseInt(inputs.n),
      })

      setResult(response)
      await saveToHistory('Prime Checker', inputs, response)
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Prime Checker & Factorization"
      description="Check if number is prime and find prime factors"
      icon={<Zap className="w-12 h-12 text-math" />}
      color="#9e6a03"
      category="math"
      result={result ? (result.isPrime ? `${result.n} is PRIME` : `${result.n} is NOT prime`) : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Number</label>
          <input
            type="number"
            step="1"
            required
            className="form-input"
            value={inputs.n}
            onChange={(e) => setInputs({ ...inputs, n: e.target.value })}
            placeholder="20"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Check Number'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 bg-bg rounded p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Is Prime?</span>
            <span className={`font-bold ${result.isPrime ? 'text-accent' : 'text-red-500'}`}>
              {result.isPrime ? 'YES ✓' : 'NO ✗'}
            </span>
          </div>
          {result.primeFactors.length > 0 && (
            <div className="flex justify-between">
              <span className="text-muted">Prime Factors:</span>
              <span className="font-bold">{result.primeFactors.join(' × ')}</span>
            </div>
          )}
          <div className="border-t border-border pt-3">
            <p className="text-muted text-xs mb-2">Primes up to {result.n || 1000}:</p>
            <p className="font-mono text-xs bg-surface rounded p-2 max-h-24 overflow-y-auto">
              {result.primes.slice(0, 50).join(', ')}
              {result.primes.length > 50 && `, ... (${result.primes.length} total)`}
            </p>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
