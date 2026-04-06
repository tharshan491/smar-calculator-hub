'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { Copy, ChevronLeft } from 'lucide-react'
import { copyToClipboard, saveToHistory, formatNumber } from '../lib/api'
import { Navigation } from './Navigation'
import { Footer } from './Footer'
import { RelatedCalculators } from './RelatedCalculators'

interface CalculatorTemplateProps {
  title: string
  description: string
  icon: ReactNode
  color: string
  category: string
  calculatorId?: string
  children: ReactNode
  onCalculate?: (result: any) => Promise<void>
  result?: any
  loading?: boolean
  error?: string
}

export function CalculatorTemplate({
  title,
  description,
  icon,
  color,
  category,
  calculatorId,
  children,
  result,
  loading = false,
  error,
}: CalculatorTemplateProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyResult = () => {
    if (result) {
      const text = typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)
      copyToClipboard(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="bg-bg text-text min-h-screen">
      <Navigation />

      <main className="container-main py-12">
        {/* Back Button */}
        <Link href="/" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
          <ChevronLeft className="w-4 h-4" />
          Back to Calculators
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{icon}</div>
            <div>
              <h1 className="hero-title mb-2">{title}</h1>
              <p className="text-muted">{description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-surface border border-border rounded-lg p-6">
              {children}
            </div>
          </div>

          {/* Result Panel */}
          <div className="lg:col-span-1">
            {result && (
              <div className="sticky top-20">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-sm text-muted font-space-mono mb-4">RESULT</h3>
                  <div className="result-value mb-6" style={{ color }}>
                    {typeof result === 'object' ? JSON.stringify(result) : formatNumber(result)}
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopyResult}
                    className="btn btn-copy w-full mb-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy Result'}
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title,
                          text: `Check out this ${title} calculator`,
                          url: shareUrl,
                        })
                      }
                    }}
                    className="btn btn-secondary w-full"
                  >
                    Share Link
                  </button>
                </div>
              </div>
            )}

            {loading && (
              <div className="bg-surface border border-border rounded-lg p-6 text-center">
                <p className="text-muted">Calculating...</p>
              </div>
            )}

            {error && (
              <div className="bg-accent3/10 border border-accent3 rounded-lg p-6">
                <p className="text-accent3 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface border border-border rounded-lg p-6 animate-in fade-in slide-in-from-bottom duration-700">
          <div>
            <h3 className="text-lg font-bold text-accent mb-2">How to Use</h3>
            <p className="text-muted text-sm">
              Fill in the input fields with your values and click Calculate to see results instantly.
              All calculations are performed locally and securely.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-accent mb-2">Privacy</h3>
            <p className="text-muted text-sm">
              Your data is never stored. All calculations happen in your browser.
              We don't collect or track any personal information.
            </p>
          </div>
        </div>

        {/* Related Calculators - 2-way linking */}
        {calculatorId && <RelatedCalculators currentCalculatorId={calculatorId} category={category} maxItems={3} />}
      </main>

      <Footer />
    </div>
  )
}
