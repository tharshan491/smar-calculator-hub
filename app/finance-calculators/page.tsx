'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CALCULATORS } from '../lib/calculators'

export default function FinanceCalculatorsHub() {
  const financeCalcs = CALCULATORS.filter(c => c.category === 'finance')
  
  return (
    <article className="min-h-screen bg-bg">
      <Link href="/" className="inline-flex items-center gap-2 text-accent hover:opacity-80 pt-4 px-4 md:pt-6 md:px-6">
        <span>←</span> Back to Home
      </Link>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-space-mono font-bold text-text mb-4">
            Finance Calculators - 25+ Free Tools
          </h1>
          <p className="text-lg text-muted">
            Master your money with our comprehensive collection of finance calculators. Calculate loans, investments, taxes, and more instantly.
          </p>
        </div>

        {/* SEO Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-text mb-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">What are Finance Calculators?</h2>
            <p>
              Finance calculators are essential tools that help you make better financial decisions. Whether you're planning a loan, calculating compound interest, managing taxes, or analyzing investments, these tools provide instant, accurate calculations without errors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Use Our Finance Calculators?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>100% Free - No hidden charges or premium versions</li>
              <li>Instant Results - Get calculations in milliseconds</li>
              <li>Privacy First - All calculations happen locally in your browser</li>
              <li>No Login Required - Start calculating immediately</li>
              <li>Mobile Friendly - Use on any device, anywhere</li>
            </ul>
          </section>
        </div>

        {/* All Finance Calculators Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">All {financeCalcs.length} Finance Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {financeCalcs.map(calc => {
              const Icon = calc.icon
              return (
                <Link
                  key={calc.id}
                  href={calc.href}
                  className="p-4 bg-surface border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all"
                >
                  <Icon className="text-2xl mb-2" />
                  <h3 className="font-bold text-text mb-2">{calc.name}</h3>
                  <p className="text-sm text-muted mb-3">{calc.description}</p>
                  <div className="inline-flex items-center gap-2 text-accent text-sm font-medium">
                    Use Calculator <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Related Content */}
        <section className="bg-surface border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Related Finance Resources</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-accent mb-4">Financial Planning Articles</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-accent hover:underline">Financial Planning Guide →</Link></li>
                <li><Link href="/blog" className="text-accent hover:underline">Wealth Building Strategies →</Link></li>
                <li><Link href="/blog" className="text-accent hover:underline">Investment Basics →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-accent mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link href="/health-calculators" className="text-accent hover:underline">Health Calculators →</Link></li>
                <li><Link href="/math-tools" className="text-accent hover:underline">Math Tools →</Link></li>
                <li><Link href="/tools-hub" className="text-accent hover:underline">Utility Tools →</Link></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
