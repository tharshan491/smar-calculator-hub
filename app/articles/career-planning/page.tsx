'use client'

import { CALCULATORS } from '../../lib/calculators'
import Link from 'next/link'

export default function CareerPlanningArticle() {
  const relatedCalcs = [
    'salary-converter',
    'profit-margin',
    'roi',
    'bmi-tdee',
    'sleep-calculator',
  ]
  const related = CALCULATORS.filter((c) =>
    relatedCalcs.includes(c.id)
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-800">
          Career Guide
        </div>
        <h1 className="mb-2 text-4xl font-bold text-slate-900">
          Strategic Career Planning
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          Maximize your earning potential and achieve work-life balance
        </p>

        <div className="mb-12 h-64 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center overflow-hidden">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-xl font-semibold">Career Advancement & Success</p>
          </div>
        </div>

        <article className="prose prose-slate max-w-none">
          <h2>Understanding Your True Income</h2>
          <p>
            Your salary is just one component of your total compensation. Benefits,
            bonuses, and flexibility all add value. Understanding your total
            compensation helps you compare job offers accurately and negotiate better.
          </p>

          <h2>Salary Negotiations</h2>
          <p>
            Most people don't negotiate their salary, leaving money on the table.
            Research what others in similar roles earn, document your accomplishments,
            and have a conversation about compensation. Even a 5% increase compounds
            over your career.
          </p>
          <ul>
            <li>Know your market value</li>
            <li>Prepare data to support your request</li>
            <li>Ask for more than your target</li>
            <li>Get offers in writing</li>
          </ul>

          <h2>Career Progression Paths</h2>
          <p>
            Plan your career progression strategically. Consider which positions will
            develop the skills you need, which will increase your salary, and which
            will provide experience for your dream role. Not every move is about money—
            sometimes a lateral move leads to better opportunities.
          </p>

          <h2>Skills Development</h2>
          <p>
            Invest in yourself through continuous learning. The most valuable
            employees are those who adapt to changing industries and markets. Whether
            through formal education, online courses, or self-study, developing
            in-demand skills increases your earning power.
          </p>

          <h2>Work-Life Balance</h2>
          <p>
            A high salary means nothing if you're burned out. Consider job flexibility,
            remote work options, vacation time, and manage your stress. Your health
            and happiness should be part of your career planning.
          </p>

          <h2>Long-Term Career Strategy</h2>
          <p>
            Think 5, 10, and 20 years ahead. Where do you want to be? What skills do
            you need to develop? Which industries are growing? Align your choices with
            your long-term goals rather than just taking whatever opportunity comes next.
          </p>
        </article>

        {/* Falling Content Section */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-8">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              Plan Your Career Finances
            </h3>
            <p className="mb-8 text-slate-700">
              Use these tools to evaluate salary offers, manage your health, and
              make better career decisions:
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
