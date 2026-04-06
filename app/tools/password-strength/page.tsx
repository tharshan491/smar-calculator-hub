'use client'

import { useState } from 'react'

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState(0)

  const checkStrength = (pwd) => {
    setPassword(pwd)
    let score = 0
    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (/[a-z]/.test(pwd)) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^a-zA-Z0-9]/.test(pwd)) score++
    setStrength(score)
  }

  const strengths = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong', 'Excellent']
  const colors = ['red', 'orange', 'yellow', 'lime', 'green', 'blue', 'purple']

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Password Strength Checker</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Enter Password</label>
              <input type="password" value={password} onChange={(e) => checkStrength(e.target.value)} placeholder="Type your password" className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            {password && (
              <div className="space-y-4">
                <div className="rounded-lg bg-slate-100 p-4">
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium text-slate-700">Strength</span>
                    <span className="text-sm font-bold text-slate-900">{strengths[strength]}</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full w-${strength * 16 + 1}/6`} style={{width: `${(strength / 6) * 100}%`, backgroundColor: `var(--color-${colors[strength]})`}} />
                  </div>
                </div>
                <div className="text-sm space-y-1 text-slate-600">
                  <p>✓ Length ≥ 8: {password.length >= 8 ? '✓' : '✗'}</p>
                  <p>✓ Length ≥ 12: {password.length >= 12 ? '✓' : '✗'}</p>
                  <p>✓ Lowercase: {/[a-z]/.test(password) ? '✓' : '✗'}</p>
                  <p>✓ Uppercase: {/[A-Z]/.test(password) ? '✓' : '✗'}</p>
                  <p>✓ Numbers: {/[0-9]/.test(password) ? '✓' : '✗'}</p>
                  <p>✓ Special Chars: {/[^a-zA-Z0-9]/.test(password) ? '✓' : '✗'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
