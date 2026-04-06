'use client'

import { useState } from 'react'
import { PieChart, Trash2 } from 'lucide-react'
import { CalculatorTemplate } from '../../components/CalculatorTemplate'
import { formatNumber, formatCurrency, sanitizeAmount } from '../../lib/api'

interface ExpenseCategory {
  id: string
  name: string
  amount: number
}

interface ExpenseResult {
  totalExpense: number
  categories: ExpenseCategory[]
  categoryBreakdown: Array<{
    name: string
    amount: number
    percentage: number
  }>
}

export default function ExpenseTrackerCalculator() {
  const [expenses, setExpenses] = useState<ExpenseCategory[]>([
    { id: '1', name: 'Housing', amount: 1000 },
    { id: '2', name: 'Food', amount: 300 },
    { id: '3', name: 'Transportation', amount: 200 },
  ])
  const [categoryName, setCategoryName] = useState('')
  const [categoryAmount, setCategoryAmount] = useState('')
  const [result, setResult] = useState<ExpenseResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addExpense = () => {
    // Strict form validation
    if (!categoryName || !categoryName.trim()) {
      setError('Please enter a category name')
      return
    }

    if (!categoryAmount || categoryAmount.trim() === '') {
      setError('Please enter an amount')
      return
    }

    // Sanitize amount - prevents NaN
    const amount = sanitizeAmount(categoryAmount)
    if (amount <= 0) {
      setError('Amount must be greater than 0')
      return
    }

    setExpenses([
      ...expenses,
      {
        id: Date.now().toString(),
        name: categoryName.trim(),
        amount,
      },
    ])
    setCategoryName('')
    setCategoryAmount('')
    setError('')
  }

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id))
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (expenses.length === 0) {
        setError('Please add at least one expense')
        setLoading(false)
        return
      }

      // Sanitize all expense amounts to prevent NaN in calculations
      const sanitizedExpenses = expenses.map(exp => ({
        ...exp,
        amount: sanitizeAmount(exp.amount)
      }))
      
      const totalExpense = sanitizedExpenses.reduce((sum, exp) => sum + exp.amount, 0)

      if (totalExpense <= 0) {
        setError('Total expenses must be greater than 0')
        setLoading(false)
        return
      }

      // Safe calculation with fallback to 0
      const categoryBreakdown = sanitizedExpenses
        .map((exp) => ({
          name: exp.name,
          amount: exp.amount,
          percentage: totalExpense > 0 ? Math.round((exp.amount / totalExpense) * 1000) / 10 : 0,
        }))
        .sort((a, b) => b.amount - a.amount)

      setResult({
        totalExpense: Math.max(0, Math.round(totalExpense * 100) / 100),
        categories: sanitizedExpenses,
        categoryBreakdown,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to calculate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CalculatorTemplate
      title="Expense Tracker"
      description="Track and analyze your spending by category"
      icon={<PieChart className="w-12 h-12 text-finance" />}
      color="#1f6feb"
      category="finance"
      result={result ? formatCurrency(result.totalExpense) : null}
      loading={loading}
      error={error}
    >
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="bg-surface border border-border rounded-lg p-4 mb-4">
          <h3 className="font-bold text-text mb-3 text-sm">Add Expense</h3>
          <div className="space-y-3">
            <input
              type="text"
              className="form-input"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category name (e.g., Food, Rent)"
            />
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                className="form-input flex-1"
                value={categoryAmount}
                onChange={(e) => setCategoryAmount(e.target.value)}
                placeholder="Amount"
              />
              <button
                type="button"
                onClick={addExpense}
                disabled={!categoryName.trim() || !categoryAmount || sanitizeAmount(categoryAmount) <= 0}
                className="btn btn-secondary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="max-h-60 overflow-y-auto bg-surface border border-border rounded-lg p-3">
          {expenses.length === 0 ? (
            <p className="text-xs text-muted text-center py-4">No expenses added yet</p>
          ) : (
            <div className="space-y-2">
              {expenses.map((exp) => (
                <div
                  key={exp.id}
                  className="flex justify-between items-center text-xs bg-bg p-2 rounded"
                >
                  <div>
                    <div className="font-bold text-text">{exp.name}</div>
                    <div className="text-muted">{formatCurrency(exp.amount)}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExpense(exp.id)}
                    className="p-1 hover:bg-muted/20 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-accent3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Calculating...' : 'Analyze Expenses'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-6 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg border-l-4 border-l-blue-500 shadow-lg">
            <div className="text-center">
              <div className="text-sm text-muted uppercase tracking-wide mb-2">Total Expenses</div>
              <div className="text-5xl font-bold text-accent mb-1">
                {formatCurrency(result.totalExpense)}
              </div>
              <div className="text-xs text-muted mt-2">across {result.categoryBreakdown.length} categories</div>
            </div>
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="font-bold text-text mb-3 text-sm">Breakdown by Category</h4>
            <div className="space-y-2">
              {result.categoryBreakdown.map((cat, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-text">{cat.name}</span>
                    <span className="font-bold text-accent">{cat.percentage}%</span>
                  </div>
                  <div className="w-full bg-bg rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-accent h-full transition-all"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                  <div className="text-muted mt-1">${formatNumber(cat.amount, 2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </CalculatorTemplate>
  )
}
