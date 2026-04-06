'use client'

import { CALCULATORS } from '../../lib/calculators'
import Link from 'next/link'

export default function MoneySavingArticle() {
  const relatedCalcs = [
    'discount-calculator',
    'tip-calculator',
    'vat-calculator',
    'currency-converter',
    'profit-margin',
  ]
  const related = CALCULATORS.filter((c) =>
    relatedCalcs.includes(c.id)
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-800">
          Money Saving Guide
        </div>
        <h1 className="mb-2 text-4xl font-bold text-slate-900">
          Everyday Money Saving Strategies
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          Save more money with smart spending decisions and simple tactics
        </p>

        <div className="mb-12 h-64 rounded-lg bg-gradient-to-r from-green-600 to-lime-500 flex items-center justify-center overflow-hidden">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🏪</div>
            <p className="text-xl font-semibold">Savings & Smart Spending</p>
          </div>
        </div>

        <article className="prose prose-slate max-w-none">
          <h2>The Power of Small Savings</h2>
          <p>
            Many people think they need to make dramatic changes to save money—cutting
            out all entertainment or switching to a completely different lifestyle.
            Actually, small consistent savings often work better. Save 5% here and 10%
            there, and suddenly you're saving hundreds or thousands per year.
          </p>

          <h2>Smart Shopping Habits</h2>
          <p>
            Most people spend more than they intend to spend. Develop habits that save
            money without sacrificing quality of life. Use coupons and discount codes,
            buy generic brands, compare prices before purchasing, and avoid emotional
            buying.
          </p>
          <ul>
            <li>Use coupons and loyalty programs</li>
            <li>Compare prices across retailers</li>
            <li>Buy generic/store brands</li>
            <li>Shop with a list, not on impulse</li>
            <li>Use cashback and rewards programs</li>
          </ul>

          <h2>Dining Out Smartly</h2>
          <p>
            Restaurant bills add up quickly. You can still enjoy eating out by being
            strategic. Skip appetizers, share entrees, order water instead of drinks,
            and use restaurant coupons. Many restaurants offer discounts at off-peak
            times or for early birds and night owls.
          </p>

          <h2>Negotiating Bills</h2>
          <p>
            Many recurring expenses—internet, insurance, phone plans—can be negotiated
            or switched to cheaper alternatives. Spend an hour calling your providers
            and asking for better rates. Many will match competitors' offers or provide
            discounts just for asking.
          </p>

          <h2>International Shopping</h2>
          <p>
            When traveling or shopping internationally, currency exchange rates matter.
            Understand how much things actually cost in your home currency. Sometimes
            buying online internationally is cheaper even with shipping than buying
            locally—but not always. Calculate before you buy.
          </p>

          <h2>Making Money While Saving</h2>
          <p>
            You can accelerate your savings by side hustles, selling unused items, and
            finding passive income sources. Every bit of extra income that you save
            rather than spend accelerates your financial goals.
          </p>
        </article>

        {/* Falling Content Section */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-8">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              Calculate Your Savings Opportunities
            </h3>
            <p className="mb-8 text-slate-700">
              Use these tools to find where you can save money on everyday expenses:
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
