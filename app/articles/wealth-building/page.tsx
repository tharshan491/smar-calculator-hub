'use client'

import { CALCULATORS } from '../../lib/calculators'
import Link from 'next/link'

export default function WealthBuildingArticle() {
  const relatedCalcs = [
    'compound-interest',
    'retirement',
    'investment',
    'roi',
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
          Build Long-Term Wealth
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          Master the art of compound growth and strategic investing
        </p>

        <div className="mb-12 h-64 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center overflow-hidden">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">💎</div>
            <p className="text-xl font-semibold">Wealth Growth & Prosperity</p>
          </div>
        </div>

        <article className="prose prose-slate max-w-none">
          <h2>The Foundation of Wealth Building</h2>
          <p>
            Wealth building is not about getting rich quick. It's about making
            smart financial decisions today that compound into substantial assets
            tomorrow. The most successful investors understand that time and
            consistency are more powerful than timing.
          </p>

          <h2>Start with Compound Interest</h2>
          <p>
            Albert Einstein called compound interest the eighth wonder of the world.
            When you earn returns on your returns, your money grows exponentially.
            Even small amounts invested early can turn into significant wealth over
            decades.
          </p>
          <ul>
            <li>Save consistently, no matter the amount</li>
            <li>Start investing as early as possible</li>
            <li>Choose investments that compound your returns</li>
            <li>Reinvest your earnings</li>
          </ul>

          <h2>Diversify Your Portfolio</h2>
          <p>
            Putting all your money into one investment is extremely risky. Instead,
            spread your investments across different asset classes, industries, and
            geographic regions. This reduces risk while maintaining growth potential.
          </p>
          <p>
            Different investments perform differently in various economic conditions.
            By diversifying, you ensure that even if one investment underperforms,
            others may compensate.
          </p>

          <h2>Regular Investment Strategy</h2>
          <p>
            Dollar-cost averaging—investing a fixed amount regularly—removes emotion
            from investing and can improve your average cost basis over time. Whether
            it's monthly or yearly, consistency matters more than finding the perfect
            time to invest.
          </p>

          <h2>Maximize Your Returns</h2>
          <p>
            Track your investment returns and understand your ROI. Make adjustments
            when necessary, but avoid constantly trading, which increases costs and
            taxes. Calculate your expected retirement needs and adjust your savings
            accordingly.
          </p>

          <h2>The Long View</h2>
          <p>
            Wealth building requires patience and discipline. You won't see dramatic
            results in weeks or months, but over 10, 20, or 30 years, the power of
            compound growth becomes remarkable. Start today, stay consistent, and
            watch your wealth grow.
          </p>
        </article>

        {/* Falling Content Section */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-8">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              Start Building Your Wealth Today
            </h3>
            <p className="mb-8 text-slate-700">
              Use these calculators to plan your financial future and see how your
              money can grow:
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
