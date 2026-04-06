'use client'

import { CALCULATORS } from '../../lib/calculators'
import Link from 'next/link'

export default function SmartInvestingArticle() {
  const relatedCalcs = [
    'compound-interest',
    'roi',
    'investment',
    'retirement',
    'net-worth',
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
          Smart Investing Guide: From Beginner to Pro
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          Master the fundamentals of investing and build wealth over time
        </p>

        <div className="mb-12 h-64 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">📈</div>
            <p className="text-xl font-semibold">Investment Strategies</p>
          </div>
        </div>

        <article className="prose prose-slate max-w-none">
          <h2>Why Invest?</h2>
          <p>
            Money sitting in a regular savings account loses value over time due to
            inflation. By investing, you can earn returns that outpace inflation and
            grow your wealth exponentially through compound interest. The earlier you
            start investing, the more time your money has to grow.
          </p>

          <h2>Types of Investments</h2>
          <ul>
            <li>
              <strong>Stocks:</strong> Own shares of companies. Potential for high
              returns but higher risk.
            </li>
            <li>
              <strong>Bonds:</strong> Lend money to governments or corporations. Lower
              returns, lower risk.
            </li>
            <li>
              <strong>Mutual Funds & ETFs:</strong> Diversified portfolios managed by
              professionals. Good for beginners.
            </li>
            <li>
              <strong>Real Estate:</strong> Property investment with rental income or
              appreciation potential.
            </li>
          </ul>

          <h2>Investment Strategy Tips</h2>
          <ul>
            <li>Start early to benefit from compound interest</li>
            <li>Diversify your portfolio across different asset types</li>
            <li>Invest regularly (dollar-cost averaging)</li>
            <li>Focus on long-term goals, not short-term fluctuations</li>
            <li>Monitor and rebalance your portfolio annually</li>
            <li>Keep costs low (watch for fees)</li>
          </ul>

          <h2>Getting Started</h2>
          <p>
            The best time to start investing was yesterday. The second-best time is
            today. Begin with an amount you're comfortable with, educate yourself
            continuously, and let compound interest work its magic.
          </p>
        </article>

        {/* Falling Content Section */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-8">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              Start Your Investment Journey
            </h3>
            <p className="mb-8 text-slate-700">
              Use these calculators to plan your investments and maximize your returns:
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
