'use client'

import { useState, useEffect } from 'react'
import { Users } from 'lucide-react'
import { getLiveUserCount } from '../lib/supabase'

export function LiveUserCount() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCount = async () => {
      setLoading(true)
      const liveCount = await getLiveUserCount()
      setCount(liveCount)
      setLoading(false)
    }

    fetchCount()

    // Poll every 5 seconds to update live count
    const interval = setInterval(fetchCount, 5000)

    return () => clearInterval(interval)
  }, [])

  if (loading || count === null) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted">
        <Users className="w-4 h-4" />
        <span>--</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <div className="relative">
        <Users className="w-4 h-4 text-accent" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
      </div>
      <span className="text-text">{count} online</span>
    </div>
  )
}
