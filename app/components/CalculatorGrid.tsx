'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { CALCULATORS, Category, CATEGORIES } from '../lib/calculators'

interface CalculatorGridProps {
  category: Category
  searchQuery?: string
}

const ITEMS_PER_PAGE = 6

export function CalculatorGrid({ category, searchQuery = '' }: CalculatorGridProps) {
  const [showMore, setShowMore] = useState(false)

  const calcs = useMemo(() => {
    return CALCULATORS.filter((calc) => {
      const matchesCategory = calc.category === category
      const matchesSearch = calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && (searchQuery ? matchesSearch : true)
    })
  }, [category, searchQuery])

  const displayedCalcs = showMore ? calcs : calcs.slice(0, ITEMS_PER_PAGE)
  const categoryInfo = CATEGORIES[category]
  const hasMore = calcs.length > ITEMS_PER_PAGE

  return (
    <section id={category} className="category-section">
      <div className="category-header">
        <h2 className="category-title" style={{ color: categoryInfo.color }}>
          <span>{categoryInfo.icon}</span>
          {categoryInfo.name}
        </h2>
        <span className="category-badge">{calcs.length} tools</span>
      </div>

      <div className="calc-grid">
        {displayedCalcs.map((calc) => {
          const Icon = calc.icon
          return (
            <Link
              key={calc.id}
              href={calc.href}
              className="calc-card glow-effect group"
            >
              <Icon className="calc-card-icon" />
              <div>
                <p className="calc-card-label">{calc.name}</p>
                <p className="calc-card-sub">{calc.description}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowMore(!showMore)}
            className="btn btn-secondary"
          >
            {showMore ? 'Show Less' : `Show More (${calcs.length - ITEMS_PER_PAGE} more)`}
          </button>
        </div>
      )}
    </section>
  )
}
