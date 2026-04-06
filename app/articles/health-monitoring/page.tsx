'use client'

import { CALCULATORS } from '../../lib/calculators'
import Link from 'next/link'

export default function HealthMonitoringArticle() {
  const relatedCalcs = [
    'bmi',
    'body-fat',
    'bmr-tdee',
    'water-intake',
    'sleep-calculator',
  ]
  const related = CALCULATORS.filter((c) =>
    relatedCalcs.includes(c.id)
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800">
          Health Guide
        </div>
        <h1 className="mb-2 text-4xl font-bold text-slate-900">
          Personal Health Monitoring
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          Track your metrics and make data-driven health decisions
        </p>

        <div className="mb-12 h-64 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center overflow-hidden">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">❤️</div>
            <p className="text-xl font-semibold">Health & Wellness Tracking</p>
          </div>
        </div>

        <article className="prose prose-slate max-w-none">
          <h2>Why Monitor Your Health?</h2>
          <p>
            Preventive health care is far more effective than treating problems after
            they develop. By regularly monitoring key health metrics, you can spot
            trends early, make adjustments, and maintain optimal health throughout
            your life.
          </p>

          <h2>Understanding Body Composition</h2>
          <p>
            BMI is a common metric, but body composition—the ratio of muscle to fat—
            is more meaningful. Your body weight alone doesn't tell the full story.
            Track body fat percentage, muscle mass, and how your clothes fit for a
            complete picture of your health.
          </p>
          <ul>
            <li>Check BMI as a general health indicator</li>
            <li>Measure body fat percentage monthly</li>
            <li>Track changes in measurements</li>
            <li>Monitor how you feel and perform</li>
          </ul>

          <h2>Nutrition and Hydration</h2>
          <p>
            Most people are chronically dehydrated and don't eat enough balanced
            nutrition. Calculate your daily water needs and macro requirements.
            Slight changes in hydration and nutrition can dramatically improve energy,
            focus, and overall health.
          </p>

          <h2>Sleep Quality and Recovery</h2>
          <p>
            Sleep is when your body repairs itself, consolidates memories, and
            regulates hormones. Optimize your sleep schedule by calculating when you
            should go to bed to wake up at optimal times in your sleep cycle. Quality
            sleep improves everything—weight management, mood, immunity, and performance.
          </p>

          <h2>Metabolic Health</h2>
          <p>
            Your metabolic rate determines how many calories you burn at rest. This
            affects energy needs, weight management, and overall vitality. Different
            factors like age, muscle mass, activity level, and genetics influence
            metabolism. Understanding yours helps you make better nutrition and
            exercise choices.
          </p>

          <h2>Consistent Tracking</h2>
          <p>
            The best monitoring system is one you'll use consistently. Choose metrics
            that matter to you, check them regularly, and celebrate progress. Small
            improvements compound into transformed health over time.
          </p>
        </article>

        {/* Falling Content Section */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <div className="rounded-lg border border-green-200 bg-green-50 p-8">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              Start Monitoring Today
            </h3>
            <p className="mb-8 text-slate-700">
              Use these health calculators to understand your metrics and track
              your progress:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((calc) => (
                <Link
                  key={calc.id}
                  href={calc.href}
                  className="flex items-center justify-between rounded-lg border border-green-300 bg-white p-4 transition hover:bg-green-100"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{calc.name}</p>
                    <p className="text-sm text-slate-600">{calc.description}</p>
                  </div>
                  <div className="text-2xl">→</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
