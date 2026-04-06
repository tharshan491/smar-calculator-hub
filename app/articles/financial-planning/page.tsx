'use client'

import { CALCULATORS } from '../../lib/calculators'
import Link from 'next/link'

export default function FinancialPlanningArticle() {
  const relatedCalcs = [
    'retirement',
    'net-worth',
    'debt-payoff',
    'investment',
    'compound-interest',
  ]
  const related = CALCULATORS.filter((c) =>
    relatedCalcs.includes(c.id)
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-800">
          Finance Guide
        </div>
        <h1 className="mb-2 text-4xl font-bold text-slate-900">
          Comprehensive Financial Planning
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          Create a complete financial roadmap for your future
        </p>

        <div className="mb-12 h-64 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-xl font-semibold">Build Your Financial Future</p>
          </div>
        </div>

        <article className="prose prose-slate max-w-none">
          <h2>Assess Your Current Situation</h2>
          <p>
            Before making any plans, understand where you currently stand financially.
            Calculate your net worth—everything you own minus everything you owe.
            This baseline helps you measure progress and make informed decisions about
            your financial future.
          </p>

          <h2>Create Your Financial Goals</h2>
          <p>
            Financial goals should be specific and time-bound. Rather than "I want to
            be rich," aim for "I want $500,000 in retirement savings by age 65" or "I
            want to pay off my debt within 3 years." Specific goals guide your decisions
            and make your progress measurable.
          </p>
          <ul>
            <li>Short-term (1-3 years): Emergency fund, vacation, car</li>
            <li>Medium-term (3-10 years): Home purchase, education</li>
            <li>Long-term (10+ years): Retirement, wealth building</li>
          </ul>

          <h2>Debt Management Strategy</h2>
          <p>
            High-interest debt is wealth's biggest enemy. Create a debt payoff plan
            and track your progress. Different strategies work for different people—
            some prefer paying off small debts first for motivation (snowball method),
            while others target high-interest debt first (avalanche method).
          </p>

          <h2>Build Your Investment Plan</h2>
          <p>
            Investments are crucial for long-term wealth. Your investment strategy
            should match your timeline and risk tolerance. Younger investors can take
            more risk because they have time to recover from market downturns. Calculate
            how much you need to invest regularly to reach your goals.
          </p>

          <h2>Plan for Retirement</h2>
          <p>
            Retirement planning starts with calculating how much you'll need. It depends
            on your lifestyle, health, and lifespan assumptions. Work backwards from your
            retirement goal to determine how much you need to save monthly and what your
            investment returns need to be.
          </p>

          <h2>Review and Adjust</h2>
          <p>
            Financial planning isn't set-and-forget. Review your progress annually.
            Adjust your plan as your circumstances change—income increases, family
            changes, major expenses, or market conditions. Flexibility is essential to
            long-term financial success.
          </p>
        </article>

        {/* Falling Content Section */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-8">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              Start Your Financial Plan
            </h3>
            <p className="mb-8 text-slate-700">
              Use these tools to build your complete financial roadmap:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((calc) => (
                <Link
                  key={calc.id}
                  href={calc.href}
                  className="flex items-center justify-between rounded-lg border border-blue-300 bg-white p-4 transition hover:bg-blue-100"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{calc.name}</p>
                    <p className="text-sm text-slate-600">{calc.description}</p>
                  </div>
                  <div className="text-2xl">→</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
