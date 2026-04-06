import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if both credentials are provided
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function trackUser() {
  if (!supabase) {
    return null
  }

  try {
    const userId = generateUserId()
    
    // Insert user into online_users
    const { data, error } = await supabase
      .from('online_users')
      .insert([
        {
          id: userId,
          last_seen: new Date().toISOString(),
        }
      ])

    if (error) {
      console.error('Error tracking user:', error)
      return null
    }

    // Set timeout to remove user from online list after 5 minutes of inactivity
    const timeout = setTimeout(async () => {
      if (supabase) {
        await supabase
          .from('online_users')
          .delete()
          .eq('id', userId)
      }
    }, 5 * 60 * 1000)

    return { userId, timeout }
  } catch (err) {
    console.error('Failed to track user:', err)
    return null
  }
}

export async function getLiveUserCount() {
  if (!supabase) {
    return 0
  }

  try {
    const { data, error } = await supabase
      .from('online_users')
      .select('id')
      .gt('last_seen', new Date(Date.now() - 5 * 60 * 1000).toISOString())

    if (error) {
      console.error('Error fetching user count:', error)
      return 0
    }

    return data?.length || 0
  } catch (err) {
    console.error('Failed to get user count:', err)
    return 0
  }
}

function generateUserId(): string {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('userId')
    if (stored) return stored
  }

  const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  if (typeof window !== 'undefined') {
    localStorage.setItem('userId', userId)
  }
  return userId
}
