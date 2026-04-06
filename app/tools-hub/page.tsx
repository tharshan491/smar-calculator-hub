'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CALCULATORS } from '../lib/calculators'

export default function ToolsHub() {
  const toolCalcs = CALCULATORS.filter(c => c.category === 'tools')
  
  return (
    <article className="min-h-screen bg-bg">
      <Link href="/" className="inline-flex items-center gap-2 text-accent hover:opacity-80 pt-4 px-4 md:pt-6 md:px-6">
        <span>←</span> Back to Home
      </Link>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-space-mono font-bold text-text mb-4">
            Utility Tools & Converters - 12+ Free Tools
          </h1>
          <p className="text-lg text-muted">
            Convert units, format data, calculate conversions, and solve everyday problems with our utility tools collection.
          </p>
        </div>

        {/* SEO Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-text mb-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Everyday Utility Tools</h2>
            <p>
              Simplify daily tasks with our suite of practical utility tools. Convert currencies, temperatures, and units. Format JSON, generate passwords, and more. Every tool you need, right here.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Use Our Utility Tools?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Wide Range of Tools - Currency, temperature, JSON, passwords, and more</li>
              <li>Real-Time Conversion - Instant results as you type</li>
              <li>No Installation - Web-based, works everywhere</li>
              <li>Totally Free - Zero cost, no ads, no upgrades</li>
              <li>Secure - All processing happens in your browser</li>
            </ul>
          </section>
        </div>

        {/* All Tools Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">All {toolCalcs.length} Utility Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolCalcs.map(calc => {
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
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-accent mb-4">Helpful Guides</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-accent hover:underline">Tool Guides →</Link></li>
                <li><Link href="/blog" className="text-accent hover:underline">Conversion Tips →</Link></li>
                <li><Link href="/blog" className="text-accent hover:underline">Data Formatting →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-accent mb-4">All Categories</h3>
              <ul className="space-y-2">
                <li><Link href="/finance-calculators" className="text-accent hover:underline">Finance Calculators →</Link></li>
                <li><Link href="/health-calculators" className="text-accent hover:underline">Health Calculators →</Link></li>
                <li><Link href="/math-tools" className="text-accent hover:underline">Math Tools →</Link></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
