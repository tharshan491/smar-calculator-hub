'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <article className="min-h-screen bg-bg">
      <Link href="/" className="inline-flex items-center gap-2 text-accent hover:opacity-80 pt-4 px-4 md:pt-6 md:px-6">
        <span>←</span> Back to Home
      </Link>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-space-mono font-bold text-text mb-4">
            Privacy Policy
          </h1>
          <div className="text-sm text-muted">
            Last updated: April 2026
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-text">
          
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">Introduction</h2>
            <p className="text-base leading-relaxed">
              At Smart Calc Hub, we're committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our calculators and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">Data Collection</h2>
            <p className="text-base leading-relaxed">
              <strong>We do not collect, store, or transmit your personal data.</strong> All calculations are performed entirely in your browser using JavaScript. Your input data never leaves your device.
            </p>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
              <p className="text-sm font-medium text-accent mb-2">🔒 Complete Privacy:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>No server-side data storage</li>
                <li>No cookies tracking your activities</li>
                <li>No third-party data sharing</li>
                <li>No user login required</li>
                <li>No analytics on personal data</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">How Our Calculators Work</h2>
            <p className="text-base leading-relaxed">
              All our calculators use only basic mathematics and formulas. When you:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-base">
              <li>Enter your values into a calculator</li>
              <li>Click "Calculate"</li>
              <li>Your browser performs the calculation locally</li>
              <li>Results are displayed on your screen only</li>
              <li>Nothing is sent to our servers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">Browser Storage</h2>
            <p className="text-base leading-relaxed">
              We may use your browser's localStorage to enhance your experience:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-base">
              <li>Calculator history is stored locally on your device only</li>
              <li>This data never leaves your browser</li>
              <li>You can clear your browser data anytime to remove this information</li>
              <li>We cannot access this data from our servers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">Third-Party Services</h2>
            <p className="text-base leading-relaxed">
              Our website may include links to third-party services. We are not responsible for their privacy practices. We recommend reviewing their privacy policies before using them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">Changes to This Policy</h2>
            <p className="text-base leading-relaxed">
              We may update this Privacy Policy occasionally. We'll notify you of significant changes by updating the date at the top of this page. Your continued use of our service constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">Contact Us</h2>
            <p className="text-base leading-relaxed">
              If you have questions about this Privacy Policy, please contact us through our GitHub repository or website contact page.
            </p>
          </section>

          <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/50 rounded-lg p-6 my-8">
            <p className="font-bold text-text mb-3">Your Privacy is Our Priority</p>
            <p className="text-sm text-muted mb-4">
              We've designed Smart Calc Hub with privacy-first principles. Your data stays with you, always.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90">
              Back to Calculators <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
