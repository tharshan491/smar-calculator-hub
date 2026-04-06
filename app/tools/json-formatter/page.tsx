'use client'

import { useState } from 'react'

export default function JSONFormatter() {
  const [input, setInput] = useState('{"name":"John","age":30}')
  const [output, setOutput] = useState('')
  const [isValid, setIsValid] = useState(true)

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setIsValid(true)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Invalid JSON'
      setOutput(`Error: ${errorMsg}`)
      setIsValid(false)
    }
  }

  const minify = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setIsValid(true)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Invalid JSON'
      setOutput(`Error: ${errorMsg}`)
      setIsValid(false)
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">JSON Formatter</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Input JSON</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-40 rounded-lg border border-slate-300 p-3 font-mono text-sm" />
          </div>
          <div className="flex gap-3">
            <button onClick={format} className="flex-1 rounded-lg bg-blue-600 py-2 text-white font-bold hover:bg-blue-700">Format</button>
            <button onClick={minify} className="flex-1 rounded-lg bg-slate-600 py-2 text-white font-bold hover:bg-slate-700">Minify</button>
            <button onClick={copy} className="flex-1 rounded-lg bg-green-600 py-2 text-white font-bold hover:bg-green-700">Copy</button>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Output</label>
            <textarea value={output} readOnly className={`w-full h-40 rounded-lg border p-3 font-mono text-sm ${isValid ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
