import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer container-main">
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Categories */}
          <div>
            <h4 className="font-bold text-text mb-3">Calculator Hubs</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/finance-calculators" className="text-muted hover:text-accent transition">Finance Tools</Link></li>
              <li><Link href="/health-calculators" className="text-muted hover:text-accent transition">Health Tools</Link></li>
              <li><Link href="/math-tools" className="text-muted hover:text-accent transition">Math Tools</Link></li>
              <li><Link href="/tools-hub" className="text-muted hover:text-accent transition">Utility Tools</Link></li>
            </ul>
          </div>

          {/* Popular Calculators */}
          <div>
            <h4 className="font-bold text-text mb-3">Popular Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/finance/loan" className="text-muted hover:text-accent transition">Loan Calculator</Link></li>
              <li><Link href="/health/bmi" className="text-muted hover:text-accent transition">BMI Calculator</Link></li>
              <li><Link href="/finance/compound-interest" className="text-muted hover:text-accent transition">Compound Interest</Link></li>
              <li><Link href="/health/calories" className="text-muted hover:text-accent transition">Calorie Calculator</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-text mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/articles" className="text-muted hover:text-accent transition">Articles</Link></li>
              <li><Link href="/blog" className="text-muted hover:text-accent transition">Blog</Link></li>
              <li><Link href="/privacy" className="text-muted hover:text-accent transition">Privacy</Link></li>
              <li><Link href="/terms" className="text-muted hover:text-accent transition">Terms</Link></li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="font-bold text-text mb-3">Follow</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition">GitHub</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition">Twitter</a></li>
              <li><a href="mailto:contact@smartcalc.hub" className="text-muted hover:text-accent transition">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted mb-3">Smart Calc Hub – 64+ Free Online Calculators for Finance, Health, Math & Tools</p>
          <p className="text-xs text-muted">© {currentYear} Smart Calc Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
