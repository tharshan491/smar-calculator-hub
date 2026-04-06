'use client'

import { useState } from 'react'
import { Layers } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'

interface PrimeFactorResult {
  number: number
  factors: number[]
  uniqueFactors: Array<{ prime: number; count: number }>
  isPrime: boolean
}

export default function PrimeFactorCalculator() {
  const [inputs, setInputs] = useState({
    number: '84',
  })
  const [result, setResult] = useState<PrimeFactorResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getPrimeFactors = (num: number): number[] => {
    const factors: number[] = []
    let n = num

    // Check for 2
    while (n % 2 === 0) {
      factors.push(2)
      n = n / 2
    }

    // Check for odd factors from 3 onwards
    for (let i = 3; i * i <= n; i += 2) {
      while (n % i === 0) {
        factors.push(i)
        n = n / i
      }
    }

    // If n is still greater than 1, it's a prime factor
    if (n > 1) {
      factors.push(n)
    }

    return factors
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const num = parseInt(inputs.number)

      if (isNaN(num) || num <= 1) {
        setError('Please enter an integer greater than 1')
        setLoading(false)
        return
      }

      const factors = getPrimeFactors(num)

      // Get unique factors with counts
      const factorCounts: { [key: number]: number } = {}
      factors.forEach((factor) => {
        factorCounts[factor] = (factorCounts[factor] || 0) + 1
      })

      const uniqueFactors = Object.entries(factorCounts)
        .map(([prime, count]) => ({
          prime: parseInt(prime),
          count,
        }))
        .sort((a, b) => a.prime - b.prime)

      const isPrime = factors.length === 1 && factors[0] === num

      setResult({
        number: num,
        factors,
        uniqueFactors,
        isPrime,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Prime Factorization Calculator"
      description="Find the prime factors of a number"
      icon={<Layers className="w-12 h-12 text-math" />}
      color="#a855f7"
      category="math"
      result={result ? (result.isPrime ? 'Prime' : `${result.factors.length} factors`) : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Number</label>
          <input
            type="number"
            step="1"
            min="2"
            required
            className="form-input"
            value={inputs.number}
            onChange={(e) => setInputs({ ...inputs, number: e.target.value })}
            placeholder="84"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Factor Number'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-center mb-3">
              <div className="text-3xl font-bold text-accent mb-1">{result.number}</div>
              <div className="text-sm text-muted">
                {result.isPrime ? 'This is a Prime Number' : 'Prime Factorization'}
              </div>
            </div>

            {!result.isPrime && (
              <>
                <div className="space-y-2 text-sm border-t border-accent/30 pt-3">
                  <div className="flex justify-between">
                    <span className="text-muted">Factorization:</span>
                    <span className="font-bold font-mono">
                      {result.uniqueFactors
                        .map((uf) => (uf.count === 1 ? uf.prime : `${uf.prime}^${uf.count}`))
                        .join(' × ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Total Factors:</span>
                    <span className="font-bold">{result.factors.length}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {!result.isPrime && (
            <div className="p-4 bg-surface border border-border rounded-lg">
              <h4 className="font-bold text-text mb-3 text-sm">Prime Factors</h4>
              <div className="space-y-2">
                {result.uniqueFactors.map((uf, idx) => (
                  <div key={idx} className="flex justify-between text-xs bg-bg p-2 rounded">
                    <span className="text-muted">
                      {uf.prime} appears {uf.count} time{uf.count > 1 ? 's' : ''}
                    </span>
                    <span className="font-bold">{uf.prime}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-bold text-text mb-2 text-sm">All Factors</h4>
            <div className="flex flex-wrap gap-2">
              {result.factors.map((factor, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 bg-bg border border-border rounded text-xs font-semibold hover:border-accent transition-colors"
                >
                  {factor}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
