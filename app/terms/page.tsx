'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function TermsPage() {
  return (
    <article className="min-h-screen bg-bg">
      <Link href="/" className="inline-flex items-center gap-2 text-accent hover:opacity-80 pt-4 px-4 md:pt-6 md:px-6">
        <span>←</span> Back to Home
      </Link>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-space-mono font-bold text-text mb-4">
            Terms of Service
          </h1>
          <div className="text-sm text-muted">
            Last updated: April 2026
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-text">
          
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">1. Acceptance of Terms</h2>
            <p className="text-base leading-relaxed">
              By accessing and using Smart Calc Hub ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">2. Use License</h2>
            <p className="text-base leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on Smart Calc Hub for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-base">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on Smart Calc Hub</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">3. Disclaimer</h2>
            <p className="text-base leading-relaxed">
              The materials on Smart Calc Hub are provided "as is". Smart Calc Hub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">4. Calculator Results</h2>
            <p className="text-base leading-relaxed">
              Our calculators are provided for educational and informational purposes only. While we strive for accuracy:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-base">
              <li>Results are estimates based on provided information</li>
              <li>Results should not be considered professional financial, medical, or legal advice</li>
              <li>Always consult with qualified professionals before making important decisions</li>
              <li>We are not liable for any consequences resulting from the use of our calculators</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">5. Limitations</h2>
            <p className="text-base leading-relaxed">
              In no event shall Smart Calc Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Smart Calc Hub, even if Smart Calc Hub or a Smart Calc Hub authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">6. Accuracy of Materials</h2>
            <p className="text-base leading-relaxed">
              The materials appearing on Smart Calc Hub could include technical, typographical, or photographic errors. Smart Calc Hub does not warrant that any of the materials on its website are accurate, complete, or current. Smart Calc Hub may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">7. Links</h2>
            <p className="text-base leading-relaxed">
              Smart Calc Hub has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Smart Calc Hub of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">8. Modifications</h2>
            <p className="text-base leading-relaxed">
              Smart Calc Hub may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">9. Governing Law</h2>
            <p className="text-base leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Smart Calc Hub operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">10. Contact Information</h2>
            <p className="text-base leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our GitHub repository or website contact page.
            </p>
          </section>

          <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/50 rounded-lg p-6 my-8">
            <p className="font-bold text-text mb-3">Questions?</p>
            <p className="text-sm text-muted mb-4">
              If you have any questions or concerns about these terms, please feel free to reach out.
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
