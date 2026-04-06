'use client'

import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import Link from 'next/link'

export default function PowerOfMath() {
  return (
    <div className="bg-bg text-text min-h-screen flex flex-col">
      <Navigation />

      <main className="container-main flex-1 py-12">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold">Math</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">The Power of Mathematics: From Everyday Life to Big Decisions</h1>
            <p className="text-muted">Published March 18, 2026 • 7 min read</p>
          </header>

          <div className="mb-12 h-64 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🔢</div>
              <p className="text-xl font-semibold">Mathematical Problem Solving</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 mb-12">
            <p className="text-lg leading-relaxed">
              Mathematics isn't just for scientists and engineers. It's the foundation for making smart decisions in your personal finance, health, and everyday life. Understanding mathematical concepts helps you think more clearly and avoid costly mistakes.
            </p>

            <h2 className="text-2xl font-bold mt-8">Math in Personal Finance</h2>
            <p>
              Every financial decision involves math. Calculating compound interest, understanding loan payments, evaluating investments, and optimizing your budget all rely on mathematical principles. A small difference in interest rates or investment returns can mean thousands of dollars over time.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>1% difference in savings rate = thousands in compound interest</li>
              <li>Understanding percentages helps you evaluate deals</li>
              <li>Break-even analysis helps with major decisions (buy vs. lease)</li>
              <li>ROI calculations guide investment decisions</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">Statistics & Probability</h2>
            <p>
              Understanding statistics helps you evaluate claims and make better decisions. Learn to question statistics and understand confidence intervals, standard deviation, and probability distributions. These concepts help you avoid scams and make informed choices.
            </p>
            <p>
              For example, understanding probability helps you evaluate lottery odds, insurance decisions, and risk management.
            </p>

            <h2 className="text-2xl font-bold mt-8">Math in Health & Fitness</h2>
            <p>
              Your health decisions also involve math:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>BMI and body composition calculations</li>
              <li>Calorie intake calculations for weight management</li>
              <li>Heart rate zone calculations for training</li>
              <li>Macronutrient ratios for optimal nutrition</li>
              <li>Running pace calculations for training</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">Practical Mathematical Thinking</h2>
            <p>
              You don't need advanced math skills, but understanding these concepts helps:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Always ask "what's the math here?" before decisions</li>
              <li>Learn to estimate and do back-of-envelope calculations</li>
              <li>Understand exponential growth and compound effects</li>
              <li>Question averages – look for distributions</li>
              <li>Think in percentages and ratios, not just absolute numbers</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">The Future is Quantitative</h2>
            <p>
              As our world becomes more data-driven, mathematical literacy becomes more important. Developing comfort with numbers and statistics makes you better equipped to navigate the modern world, from understanding AI and data analysis to making informed personal decisions.
            </p>
          </div>

          {/* Falling Content Animation */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <h3 className="font-bold mb-4 text-lg">Math Tools & Calculators</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/math/statistics" className="block p-3 bg-bg border border-border rounded hover:border-accent transition-colors">
                <div className="font-bold">Statistics Calculator</div>
                <div className="text-xs text-muted">Calculate statistical measures</div>
              </Link>
              <Link href="/math/probability" className="block p-3 bg-bg border border-border rounded hover:border-accent transition-colors">
                <div className="font-bold">Probability Calculator</div>
                <div className="text-xs text-muted">Calculate probability and odds</div>
              </Link>
              <Link href="/math/percentage" className="block p-3 bg-bg border border-border rounded hover:border-accent transition-colors">
                <div className="font-bold">Percentage Calculator</div>
                <div className="text-xs text-muted">Quick percentage calculations</div>
              </Link>
              <Link href="/math/distance-calculator" className="block p-3 bg-bg border border-border rounded hover:border-accent transition-colors">
                <div className="font-bold">Distance Calculator</div>
                <div className="text-xs text-muted">Calculate distances between points</div>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
