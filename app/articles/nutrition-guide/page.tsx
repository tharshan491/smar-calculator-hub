'use client'

import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import Link from 'next/link'

export default function NutritionGuide() {
  return (
    <div className="bg-bg text-text min-h-screen flex flex-col">
      <Navigation />

      <main className="container-main flex-1 py-12">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold">Health</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">The Science of Nutrition: Eat Smart for Better Health</h1>
            <p className="text-muted">Published March 20, 2026 • 9 min read</p>
          </header>

          <div className="mb-12 h-64 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center overflow-hidden">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🥗</div>
              <p className="text-xl font-semibold">Nutrition & Diet Optimization</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 mb-12">
            <p className="text-lg leading-relaxed">
              Nutrition is the foundation of good health. Understanding how different nutrients work in your body helps you make informed dietary choices that support your fitness goals and overall wellbeing.
            </p>

            <h2 className="text-2xl font-bold mt-8">Understanding Macronutrients</h2>
            <div className="space-y-4">
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-bold mb-2">Protein</h3>
                <p className="text-sm text-muted">Essential for muscle repair and growth. Aim for 1.6-2.2g per kg of body weight for strength training.</p>
                <p className="text-xs text-muted mt–2">Sources: Chicken, fish, eggs, legumes, dairy</p>
              </div>
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-bold mb-2">Carbohydrates</h3>
                <p className="text-sm text-muted">Your body's primary fuel source. Choose complex carbs for steady energy.</p>
                <p className="text-xs text-muted mt-2">Sources: Whole grains, vegetables, fruits, legumes</p>
              </div>
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-bold mb-2">Fats</h3>
                <p className="text-sm text-muted">Important for hormone production and nutrient absorption. Don't fear healthy fats.</p>
                <p className="text-xs text-muted mt-2">Sources: Nuts, avocados, olive oil, fish</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8">Micronutrients Matter</h2>
            <p>
              Vitamins and minerals regulate countless processes in your body. A varied diet with plenty of whole foods ensures you get adequate micronutrients. Key micronutrients include:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Iron:</strong> Oxygen transport</li>
              <li><strong>Calcium:</strong> Bone health</li>
              <li><strong>Vitamin D:</strong> Immune function</li>
              <li><strong>Magnesium:</strong> Muscle recovery</li>
              <li><strong>Zinc:</strong> Immune support</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">Meal Timing & Frequency</h2>
            <p>
              There's no "perfect" meal timing, but eating protein and carbs around workouts can support recovery. Consistency matters more than meal timing. Most people do well with 3 meals or 3-4 smaller meals per day.
            </p>

            <h2 className="text-2xl font-bold mt-8">Common Nutrition Mistakes</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Eating too little protein</li>
              <li>Not eating enough vegetables</li>
              <li>Underestimating calorie intake</li>
              <li>Relying on supplements instead of whole foods</li>
              <li>Extreme dietary restrictions</li>
              <li>Ignoring hydration needs</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">Practical Tips</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Meal prep for consistency</li>
              <li>Focus on whole, minimally processed foods</li>
              <li>Track nutrition to learn your habits</li>
              <li>Aim for gradual, sustainable changes</li>
              <li>Don't aim for perfection – consistency over perfection wins</li>
              <li>Stay hydrated (aim for 2-3 liters of water daily)</li>
            </ul>
          </div>

          {/*Falling Content Section */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 mb-12 animate-in fade-in slide-in-from-bottom duration-1000">
            <h3 className="font-bold mb-4 text-lg">Nutrition Calculators</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/health/macro-calculator" className="block p-3 bg-bg border border-border rounded hover:border-accent transition-colors">
                <div className="font-bold">Macro Calculator</div>
                <div className="text-xs text-muted">Calculate your macronutrient needs</div>
              </Link>
              <Link href="/health/protein-calculator" className="block p-3 bg-bg border border-border rounded hover:border-accent transition-colors">
                <div className="font-bold">Protein Calculator</div>
                <div className="text-xs text-muted">Calculate daily protein requirements</div>
              </Link>
              <Link href="/health/calorie-burn" className="block p-3 bg-bg border border-border rounded hover:border-accent transition-colors">
                <div className="font-bold">Calorie Burn Calculator</div>
                <div className="text-xs text-muted">Estimate calories burned per activity</div>
              </Link>
              <Link href="/health/water-intake" className="block p-3 bg-bg border border-border rounded hover:border-accent transition-colors">
                <div className="font-bold">Water Intake Calculator</div>
                <div className="text-xs text-muted">Calculate daily hydration needs</div>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
