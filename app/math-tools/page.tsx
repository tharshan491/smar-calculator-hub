'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CALCULATORS } from '../lib/calculators'

export default function MathToolsHub() {
  const mathCalcs = CALCULATORS.filter(c => c.category === 'math')
  
  return (
    <article className="min-h-screen bg-bg">
      <Link href="/" className="inline-flex items-center gap-2 text-accent hover:opacity-80 pt-4 px-4 md:pt-6 md:px-6">
        <span>←</span> Back to Home
      </Link>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-space-mono font-bold text-text mb-4">
            Math Tools & Calculators - 13+ Free Tools
          </h1>
          <p className="text-lg text-muted">
            Solve complex math problems instantly. From algebra to statistics, get accurate calculations for every mathematical challenge.
          </p>
        </div>

        {/* SEO Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-text mb-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Mathematical Problem Solver</h2>
            <p>
              Mathematics doesn't have to be difficult. Our collection of math calculators and tools simplifies complex calculations, from basic arithmetic to advanced statistical analysis. Perfect for students, professionals, and anyone who works with numbers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Our Math Tools?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Comprehensive Coverage - Algebra, geometry, statistics, and more</li>
              <li>Step-by-Step Results - Understand the calculation process</li>
              <li>Error-Free Calculations - Advanced algorithms ensure accuracy</li>
              <li>Completely Free - No registration or payment required</li>
              <li>Works Offline - Works without internet connection</li>
            </ul>
          </section>
        </div>

        {/* All Math Calculators Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">All {mathCalcs.length} Math Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mathCalcs.map(calc => {
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
          <h2 className="text-2xl font-bold mb-6">Related Math Resources</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-accent mb-4">Math Learning Guides</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-accent hover:underline">Math Fundamentals →</Link></li>
                <li><Link href="/blog" className="text-accent hover:underline">Advanced Mathematics →</Link></li>
                <li><Link href="/blog" className="text-accent hover:underline">Statistical Analysis →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-accent mb-4">Other Categories</h3>
              <ul className="space-y-2">
                <li><Link href="/finance-calculators" className="text-accent hover:underline">Finance Calculators →</Link></li>
                <li><Link href="/health-calculators" className="text-accent hover:underline">Health Calculators →</Link></li>
                <li><Link href="/tools-hub" className="text-accent hover:underline">Utility Tools →</Link></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
