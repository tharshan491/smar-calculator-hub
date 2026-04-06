'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'

interface FibonacciResult {
  term: number
  value: string
  sequence: number[]
}

export default function FibonacciCalculator() {
  const [inputs, setInputs] = useState({
    term: '10',
  })
  const [result, setResult] = useState<FibonacciResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const calculateFibonacci = (n: number): number[] => {
    if (n <= 0) return []
    if (n === 1) return [0]
    if (n === 2) return [0, 1]

    const sequence: number[] = [0, 1]
    for (let i = 2; i < n; i++) {
      sequence.push(sequence[i - 1] + sequence[i - 2])
    }
    return sequence
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const term = parseInt(inputs.term)

      if (isNaN(term) || term <= 0) {
        setError('Please enter a positive integer')
        setLoading(false)
        return
      }

      if (term > 100) {
        setError('Please enter a number 100 or less')
        setLoading(false)
        return
      }

      const sequence = calculateFibonacci(term)
      const value = sequence[sequence.length - 1]

      // Use string for very large numbers
      let valueStr = value.toString()
      if (value > Number.MAX_SAFE_INTEGER) {
        valueStr = 'Very large number'
      }

      setResult({
        term,
        value: valueStr,
        sequence: sequence.slice(0, Math.min(20, sequence.length)),
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Fibonacci Sequence Calculator"
      description="Generate Fibonacci sequence up to the nth term"
      icon={<Sparkles className="w-12 h-12 text-math" />}
      color="#a855f7"
      category="math"
      result={result ? `F(${result.term}) = ${result.value}` : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Number of Terms (1-100)</label>
          <input
            type="number"
            step="1"
            min="1"
            max="100"
            required
            className="form-input"
            value={inputs.term}
            onChange={(e) => setInputs({ ...inputs, term: e.target.value })}
            placeholder="10"
          />
          <p className="text-xs text-muted mt-1">
            Generate the first n numbers in the Fibonacci sequence
          </p>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Generate Sequence'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">F({result.term})</div>
              <div className="text-lg font-semibold text-text mb-1">{result.value}</div>
              <div className="text-xs text-muted">Term {result.term}</div>
            </div>
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-bold text-text mb-3 text-sm">Fibonacci Sequence</h4>
            <div className="flex flex-wrap gap-2">
              {result.sequence.map((num, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 bg-bg border border-border rounded text-xs font-mono hover:border-accent transition-colors"
                >
                  {idx}: {num}
                </div>
              ))}
            </div>
            {result.sequence.length < result.term && (
              <p className="text-xs text-muted mt-2">Showing first {result.sequence.length} terms...</p>
            )}
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-bold text-text mb-2 text-sm">About Fibonacci</h4>
            <p className="text-xs text-muted">
              The Fibonacci sequence is a series where each number is the sum of the two preceding ones.
              It starts with 0 and 1, and continues: 0, 1, 1, 2, 3, 5, 8, 13, 21...
            </p>
            <p className="text-xs text-muted mt-2">
              The sequence appears frequently in nature, art, and music, and has many mathematical properties.
            </p>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
