'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'

// Lazy load LiveUserCount - it makes API calls and is non-critical
const LiveUserCount = dynamic(() => import('./LiveUserCount').then(mod => ({ default: mod.LiveUserCount })), {
  ssr: false,
  loading: () => <div className="flex items-center gap-2 text-sm text-muted">--</div>
})

export function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <span className="text-lg">✨</span>
          Smart Calc
        </Link>
        <div className="nav-links">
          <Link href="/finance-calculators" className="nav-link">Finance</Link>
          <Link href="/health-calculators" className="nav-link">Health</Link>
          <Link href="/math-tools" className="nav-link">Math</Link>
          <Link href="/tools-hub" className="nav-link">Tools</Link>
          <Link href="/articles" className="nav-link">Articles</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <div className="ml-auto pl-4 border-l border-border">
            <LiveUserCount />
          </div>
        </div>
      </div>
    </nav>
  )
}
