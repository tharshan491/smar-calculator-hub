const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://smart-calc-api.30259256blackpool.workers.dev/api'

export async function callCalculator(endpoint: string, data: Record<string, any>) {
  const sessionId = typeof window !== 'undefined' ? 
    localStorage.getItem('sessionId') || generateSessionId() : 
    generateSessionId()

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': sessionId,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error(`API error: ${response.status}`)
    
    return await response.json()
  } catch (error) {
    throw error
  }
}

function generateSessionId(): string {
  if (typeof window !== 'undefined') {
    const id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('sessionId', id)
    return id
  }
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export async function saveToHistory(calculatorName: string, inputs: Record<string, any>, result: any) {
  try {
    const sessionId = typeof window !== 'undefined' ? 
      localStorage.getItem('sessionId') || generateSessionId() : 
      generateSessionId()

    await fetch(`${API_BASE}/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': sessionId,
      },
      body: JSON.stringify({
        calculator_name: calculatorName,
        inputs: JSON.stringify(inputs),
        result: JSON.stringify(result),
      }),
    })
  } catch (error) {
    console.error('Failed to save to history:', error)
  }
}

export function copyToClipboard(text: string) {
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(text)
  }
}

export function formatNumber(num: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

/**
 * Format number as currency (USD)
 * Handles NaN and undefined values safely
 */
export function formatCurrency(value: any): string {
  const num = Number(value) || 0
  if (isNaN(num)) return '$0.00'
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

/**
 * Sanitize amount input to prevent NaN
 * Returns 0 if value is invalid
 */
export function sanitizeAmount(value: any): number {
  const num = Number(value) || 0
  return isNaN(num) ? 0 : Math.max(0, num)
}
