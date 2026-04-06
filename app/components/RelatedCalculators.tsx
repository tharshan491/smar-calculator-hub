'use client'

import Link from 'next/link'
import { CALCULATORS } from '../lib/calculators'
import { ArrowRight } from 'lucide-react'

interface RelatedCalculatorsProps {
  currentCalculatorId: string
  category: string
  maxItems?: number
}

export function RelatedCalculators({ currentCalculatorId, category, maxItems = 3 }: RelatedCalculatorsProps) {
  const relatedCalcs = CALCULATORS
    .filter(c => c.category === category && c.id !== currentCalculatorId)
    .slice(0, maxItems)

  if (relatedCalcs.length === 0) return null

  return (
    <section className="mt-12 p-6 bg-surface border border-border rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-text mb-2">Related Calculators</h3>
        <p className="text-sm text-muted">Explore other {category} tools</p>
      </div>
      <div className="space-y-3">
        {relatedCalcs.map(calc => (
          <Link
            key={calc.id}
            href={calc.href}
            className="group flex items-start gap-4 p-3 hover:bg-accent/5 rounded-lg transition-colors"
          >
            <div className="text-2xl flex-shrink-0">{typeof calc.icon === 'function' ? <calc.icon /> : calc.icon as React.ReactNode}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-text group-hover:text-accent transition-colors">{calc.name}</h4>
              <p className="text-sm text-muted truncate">{calc.description}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-accent flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </section>
  )
}
