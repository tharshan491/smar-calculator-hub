'use client'

import { CALCULATORS } from '../../lib/calculators'
import Link from 'next/link'

export default function FitnessGuideArticle() {
  const relatedCalcs = [
    'bmi',
    'calorie-intake',
    'macro-calculator',
    'rep-max-calculator',
    'water-intake',
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
          Complete Fitness Guide: Achieve Your Health Goals
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          Master training, nutrition, and recovery to transform your fitness
        </p>

        <div className="mb-12 h-64 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 flex items-center justify-center overflow-hidden">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">💪</div>
            <p className="text-xl font-semibold">Fitness Transformation</p>
          </div>
        </div>

        <article className="prose prose-slate max-w-none">
          <h2>Setting Your Fitness Goals</h2>
          <p>
            Start by defining clear, measurable goals. Whether it's losing weight,
            building muscle, improving endurance, or simply feeling healthier, specific
            goals help you stay motivated and track progress. Use the SMART framework:
            Specific, Measurable, Achievable, Relevant, and Time-bound.
          </p>

          <h2>Understanding Your Fitness Metrics</h2>
          <ul>
            <li>
              <strong>BMI:</strong> Body Mass Index for basic weight assessment
            </li>
            <li>
              <strong>Caloric Needs:</strong> Calculate TDEE (Total Daily Energy
              Expenditure)
            </li>
            <li>
              <strong>Macro Ratios:</strong> Balance proteins, carbs, and fats for your
              goals
            </li>
            <li>
              <strong>Body Composition:</strong> Track muscle-to-fat ratio for better
              insight
            </li>
            <li>
              <strong>One Rep Max:</strong> Measure strength progress with heavy lifting
            </li>
          </ul>

          <h2>Training Principles</h2>
          <ul>
            <li>
              <strong>Progressive Overload:</strong> Gradually increase intensity, weight,
              or volume
            </li>
            <li>
              <strong>Consistency:</strong> Regular training beats occasional intense
              sessions
            </li>
            <li>
              <strong>Recovery:</strong> Rest days are when muscles grow and adapt
            </li>
            <li>
              <strong>Variety:</strong> Mix cardio, strength, and flexibility work
            </li>
          </ul>

          <h2>Nutrition for Fitness</h2>
          <p>
            Nutrition is 70% of your fitness journey. Calculate your daily caloric needs
            and macronutrient ratios based on your goals. Eating too much or too little
            undermines your training. Proper hydration is equally important—your muscles
            are 75% water.
          </p>

          <h2>Recovery and Sleep</h2>
          <p>
            Fitness happens outside the gym. During sleep and rest, your body repairs
            muscle damage from training, consolidates learning, and releases hormones
            that regulate metabolism. Prioritize 7-9 hours of quality sleep nightly.
          </p>

          <h2>Tracking Progress</h2>
          <p>
            Monitor more than just the scale. Track performance metrics like weight
            lifted, reps completed, endurance, body measurements, and how your clothes
            fit. Regular progress pictures and fitness assessments show changes that
            scales can't capture.
          </p>
        </article>

        {/* Falling Content Section */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <div className="rounded-lg border border-green-200 bg-green-50 p-8">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              Plan Your Fitness Program
            </h3>
            <p className="mb-8 text-slate-700">
              Use these calculators to design and track your fitness program:
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
