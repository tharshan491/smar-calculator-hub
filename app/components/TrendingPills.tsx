'use client'

import Link from 'next/link'
import { TrendingUp, Heart, Percent, DollarSign } from 'lucide-react'

const TRENDING = [
  {
    name: 'Compound Interest',
    icon: TrendingUp,
    href: '/finance/compound-interest',
    color: 'text-finance',
  },
  {
    name: 'BMI Calculator',
    icon: Heart,
    href: '/health/bmi',
    color: 'text-health',
  },
  {
    name: 'Tip Calculator',
    icon: DollarSign,
    href: '/tools/tip',
    color: 'text-tools',
  },
  {
    name: 'Discount',
    icon: Percent,
    href: '/tools/discount',
    color: 'text-accent3',
  },
]

export function TrendingPills() {
  return (
    <div className="trending-section">
      <span className="trending-label">📈 Trending Now</span>
      <div className="trending-pills">
        {TRENDING.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="trending-pill"
          >
            <item.icon className={`trending-pill-icon ${item.color}`} />
            <span className="trending-pill-text">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
