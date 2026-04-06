'use client'

import { useEffect } from 'react'
import { trackUser } from '../lib/supabase'

export function UserTracker() {
  useEffect(() => {
    const result = trackUser()
    
    return () => {
      // Cleanup on unmount
      if (result && result.timeout) {
        clearTimeout(result.timeout)
      }
    }
  }, [])

  return null
}
