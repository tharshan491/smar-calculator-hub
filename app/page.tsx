'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, TrendingUp, Calculator, DollarSign, Heart, Zap, Tools, BookOpen } from 'lucide-react'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const trendingCalculators = [
    { name: 'Compound Interest', icon: TrendingUp, href: '/finance/compound-interest' },
    { name: 'BMI Calculator', icon: Heart, href: '/health/bmi' },
    { name: 'Loan EMI', icon: DollarSign, href: '/finance/loan' },
    { name: 'Calorie Burn', icon: Zap, href: '/health/calories' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-green-50/30 dark:from-bg dark:via-bg dark:to-bg">
      {/* Navigation */}
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-24 px-4 md:pt-28 md:pb-32">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-5xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-text tracking-tight">
              Smart Calc<span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Hub</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto font-light">
              100+ Free Calculators for Finance, Health, Math & Tools
            </p>

            {/* Search Bar */}
            <div className="relative mb-12 max-w-2xl mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search 100+ calculators... (e.g., 'Loan', 'BMI', 'Compound Interest')"
                  className="w-full pl-12 pr-6 py-4 rounded-full bg-white dark:bg-bg-secondary border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 focus:border-blue-500 focus:outline-none transition shadow-lg hover:shadow-xl text-text placeholder-text-tertiary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <p className="text-xs text-text-tertiary mt-3">Search by keyword or calculator name</p>
            </div>

            {/* Trending Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="text-sm text-text-secondary font-semibold">Popular Now:</span>
              {trendingCalculators.map((calc) => {
                const Icon = calc.icon
                return (
                  <Link
                    key={calc.name}
                    href={calc.href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-bg-secondary border border-border hover:border-blue-400 dark:hover:border-blue-600 text-text-secondary hover:text-text transition group"
                  >
                    <Icon className="w-4 h-4 group-hover:text-blue-500 transition" />
                    <span className="text-sm font-medium">{calc.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Finance Section */}
        <section className="py-16 md:py-24 px-4 bg-white/40 dark:bg-bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-200 dark:border-blue-800">
                <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text">Finance</h2>
              <Link href="/finance-calculators" className="ml-auto text-accent hover:opacity-70 transition font-semibold text-sm">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Compound Interest Calculator', desc: 'Visualize exponential wealth growth', href: '/finance/compound-interest' },
                { name: 'Loan EMI Calculator', desc: 'Calculate monthly payments instantly', href: '/finance/loan' },
                { name: 'Retirement Planner', desc: 'Plan your financial future', href: '/finance/retirement' },
                { name: 'Investment Growth', desc: 'Model investment returns', href: '/finance/investment' },
                { name: 'Salary Calculator', desc: 'Calculate net pay and deductions', href: '/finance/salary' },
                { name: 'Discount Calculator', desc: 'Calculate discounts and savings', href: '/tools/discount' },
              ].map((calc, idx) => (
                <Link
                  key={idx}
                  href={calc.href}
                  className="group relative bg-white dark:bg-bg-secondary rounded-2xl p-6 border border-border hover:border-transparent transition shadow-sm hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative z-10">
                    <div className="inline-block p-3 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-bg-tertiary dark:to-bg-secondary group-hover:from-blue-500/20 group-hover:to-green-500/20 transition mb-4">
                      <Calculator className="w-6 h-6 text-accent group-hover:text-blue-600 transition" />
                    </div>
                    <h3 className="text-lg font-bold text-text mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{calc.name}</h3>
                    <p className="text-text-secondary text-sm mb-4">{calc.desc}</p>
                    <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:translate-x-1 transition">
                      <span>Open Calculator</span>
                      <span>→</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/50 dark:group-hover:border-white/10 transition pointer-events-none"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Health Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-red-500/10 to-pink-600/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-500/10 to-pink-600/10 border border-red-200 dark:border-red-800">
                <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text">Health & Wellness</h2>
              <Link href="/health-calculators" className="ml-auto text-accent hover:opacity-70 transition font-semibold text-sm">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'BMI Calculator', desc: 'Calculate your body mass index', href: '/health/bmi' },
                { name: 'Calorie Calculator', desc: 'Find your daily calorie needs', href: '/health/calories' },
                { name: 'Macro Calculator', desc: 'Calculate macronutrient ratios', href: '/health/macro' },
                { name: 'Water Intake Calculator', desc: 'Determine daily hydration needs', href: '/health/water-intake' },
                { name: 'Rep Max Calculator', desc: 'Estimate your one-rep max', href: '/health/rep-max' },
                { name: 'Sleep Calculator', desc: 'Optimize your sleep schedule', href: '/health/sleep' },
              ].map((calc, idx) => (
                <Link
                  key={idx}
                  href={calc.href}
                  className="group relative bg-white dark:bg-bg-secondary rounded-2xl p-6 border border-border hover:border-transparent transition shadow-sm hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative z-10">
                    <div className="inline-block p-3 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-bg-tertiary dark:to-bg-secondary group-hover:from-red-500/20 group-hover:to-pink-500/20 transition mb-4">
                      <Calculator className="w-6 h-6 text-accent group-hover:text-red-600 transition" />
                    </div>
                    <h3 className="text-lg font-bold text-text mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition">{calc.name}</h3>
                    <p className="text-text-secondary text-sm mb-4">{calc.desc}</p>
                    <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:translate-x-1 transition">
                      <span>Open Calculator</span>
                      <span>→</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/50 dark:group-hover:border-white/10 transition pointer-events-none"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Math Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-green-500/10 to-emerald-600/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-200 dark:border-green-800">
                <Calculator className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text">Mathematics</h2>
              <Link href="/math-tools" className="ml-auto text-accent hover:opacity-70 transition font-semibold text-sm">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Percentage Calculator', desc: 'Calculate percentages easily', href: '/math/percentage' },
                { name: 'Compound Interest', desc: 'Calculate compound returns', href: '/finance/compound-interest' },
                { name: 'Quadratic Equation', desc: 'Solve quadratic equations', href: '/math/quadratic' },
                { name: 'Standard Deviation', desc: 'Calculate statistical variance', href: '/math/stddev' },
                { name: 'Prime Number Checker', desc: 'Identify prime numbers', href: '/math/primes' },
                { name: 'Factorial Calculator', desc: 'Calculate factorials', href: '/math/factorial' },
              ].map((calc, idx) => (
                <Link
                  key={idx}
                  href={calc.href}
                  className="group relative bg-white dark:bg-bg-secondary rounded-2xl p-6 border border-border hover:border-transparent transition shadow-sm hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative z-10">
                    <div className="inline-block p-3 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-bg-tertiary dark:to-bg-secondary group-hover:from-green-500/20 group-hover:to-emerald-500/20 transition mb-4">
                      <Calculator className="w-6 h-6 text-accent group-hover:text-green-600 transition" />
                    </div>
                    <h3 className="text-lg font-bold text-text mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition">{calc.name}</h3>
                    <p className="text-text-secondary text-sm mb-4">{calc.desc}</p>
                    <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:translate-x-1 transition">
                      <span>Open Calculator</span>
                      <span>→</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/50 dark:group-hover:border-white/10 transition pointer-events-none"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Smart Financial Decisions Start Here
            </h2>
            <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
              Join thousands of users making better financial, health, and mathematical decisions with our free calculator tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-blue-600 font-bold hover:shadow-lg transition"
              >
                <BookOpen className="w-5 h-5" />
                Read Our Guides
              </Link>
              <Link 
                href="/finance-calculators"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/20 text-white font-bold border-2 border-white hover:bg-white/30 transition"
              >
                Explore Calculators
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 px-4 bg-white/40 dark:bg-bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  100+
                </div>
                <p className="text-text-secondary font-semibold">Free Calculators</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  4
                </div>
                <p className="text-text-secondary font-semibold">Categories</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  0$
                </div>
                <p className="text-text-secondary font-semibold">Cost Forever</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <p className="text-text-secondary font-semibold">Always Available</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
