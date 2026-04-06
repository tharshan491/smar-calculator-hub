'use client'

import { CALCULATORS } from '../../lib/calculators'
import Link from 'next/link'

export default function DecisionMakingArticle() {
  const relatedCalcs = [
    'percentage',
    'roi',
    'profit-margin',
    'profit',
    'standard-deviation',
  ]
  const related = CALCULATORS.filter((c) =>
    relatedCalcs.includes(c.id)
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-800">
          Decision Making
        </div>
        <h1 className="mb-2 text-4xl font-bold text-slate-900">
          Math-Based Decision Making
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          Use data and mathematics to make better decisions in life and business
        </p>

        <div className="mb-12 h-64 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center overflow-hidden">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🧠</div>
            <p className="text-xl font-semibold">Strategic Decision Making</p>
          </div>
        </div>

        <article className="prose prose-slate max-w-none">
          <h2>The Power of Data-Driven Decisions</h2>
          <p>
            Humans are notoriously bad at making decisions based on intuition alone.
            We have cognitive biases, emotional reactions, and limited experience. By
            bringing mathematics and data into our decisions, we can make better
            choices with higher probability of success.
          </p>

          <h2>Understanding Percentages</h2>
          <p>
            Percentages are everywhere in decision-making—discounts, interest rates,
            returns, risk factors, and growth rates. Truly understanding how percentages
            work prevents you from being misled by marketing or making poor financial
            decisions. A 50% off sale after a 100% price increase is actually returning
            to original price, not a discount.
          </p>
          <ul>
            <li>Learn to calculate percentage changes</li>
            <li>Understand compound percentage growth</li>
            <li>Compare percentage-based offers accurately</li>
            <li>Calculate your actual savings and earnings</li>
          </ul>

          <h2>Calculating Return on Investment</h2>
          <p>
            Before you invest time, money, or effort into something, calculate the
            expected ROI. Whether it's education, starting a business, or home
            renovation, understanding the return helps you make rational decisions.
            Not all investments with the same profit potential have the same time frame
            or risk level.
          </p>

          <h2>Risk and Variance</h2>
          <p>
            Not all profitable investments are equally attractive. One might reliably
            return 5% annually, while another might return 20% some years and -10% in
            others. Standard deviation and variance help you understand risk, which is
            crucial for good decision-making.
          </p>

          <h2>Comparing Options</h2>
          <p>
            When you have multiple options, calculate their outcomes mathematically
            rather than relying on gut feeling. Compare profit margins for business
            ventures, calculate lifetime costs for purchases, and quantify benefits
            and drawbacks in measurable terms.
          </p>

          <h2>The Compound Effect</h2>
          <p>
            Small differences in percentage rates, applied over time, create massive
            differences in outcomes. This principle applies to salary increases, return
            on investments, debt interest, and many life decisions. Always factor in
            the time component when making decisions.
          </p>
        </article>

        {/* Falling Content Section */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-8">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              Make Data-Driven Decisions
            </h3>
            <p className="mb-8 text-slate-700">
              Use these mathematical tools to analyze options and make better decisions:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((calc) => (
                <Link
                  key={calc.id}
                  href={calc.href}
                  className="flex items-center justify-between rounded-lg border border-orange-300 bg-white p-4 transition hover:bg-orange-100"
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
