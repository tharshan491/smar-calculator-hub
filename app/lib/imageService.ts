/**
 * Free Image Service for Blog Posts
 * Uses Unsplash Source API and Picsum as fallback
 * Zero cost, no API keys required
 */

interface ImageConfig {
  title: string
  category: 'finance' | 'health' | 'math' | 'tools' | 'blog'
  tags?: string[]
  width?: number
  height?: number
}

// Category-based keyword clusters for better image matching
const categoryKeywords: Record<string, string[]> = {
  finance: ['money', 'investment', 'charts', 'savings', 'growth', 'wealth', 'profit', 'coins'],
  health: ['fitness', 'wellness', 'nutrition', 'exercise', 'body', 'healthy', 'sport', 'running'],
  math: ['equations', 'geometry', 'numbers', 'calculation', 'science', 'data', 'graph', 'formula'],
  tools: ['technology', 'workspace', 'digital', 'code', 'software', 'apps', 'computer', 'device'],
  blog: ['article', 'reading', 'learning', 'education', 'writing', 'knowledge', 'insight'],
}

/**
 * Extract main keywords from title
 * Remove common words and extract meaningful terms
 */
function extractKeywords(title: string): string[] {
  const stopwords = [
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'is', 'are', 'was', 'be', 'being', 'been', 'your', 'our', 'their', 'this', 'that',
    'how', 'what', 'when', 'where', 'why', 'which', 'who', 'guide', 'calculator',
  ]

  return title
    .toLowerCase()
    .split(/[\s\-:,()]+/)
    .filter(word => word.length > 3 && !stopwords.includes(word))
    .slice(0, 3) // Limit to 3 keywords
}

/**
 * Generate intelligent search query based on content
 */
function generateSearchQuery(config: ImageConfig): string {
  const titleKeywords = extractKeywords(config.title)
  const categoryTerms = categoryKeywords[config.category] || []
  const customTags = config.tags || []

  // Combine and prioritize keywords
  const allKeywords = [
    ...titleKeywords,
    ...categoryTerms.slice(0, 2),
    ...customTags.slice(0, 1),
  ]

  // Remove duplicates and create search query
  const uniqueKeywords = [...new Set(allKeywords)].slice(0, 3)
  return uniqueKeywords.join(' ')
}

/**
 * Generate a simple hash for QueryString consistency
 * Ensures same query generates same image variations
 */
function generateQueryHash(query: string): number {
  let hash = 0
  for (let i = 0; i < query.length; i++) {
    const char = query.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

/**
 * Generate featured image URL (1200x675, 16:9 aspect ratio)
 * Uses Unsplash Source API with intelligent keywords
 */
export function generateFeaturedImage(config: ImageConfig): string {
  const query = generateSearchQuery(config)
  const width = config.width || 1200
  const height = config.height || 675

  // Unsplash Source API: https://source.unsplash.com/featured/?{query}
  // Free, no authentication needed
  const unsplashUrl = `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)}`

  return unsplashUrl
}

/**
 * Generate inline image URL (800x450, 16:9 aspect ratio)
 * Rotates queries to provide variety
 */
export function generateInlineImage(config: ImageConfig, index: number = 0): string {
  const query = generateSearchQuery(config)
  const hash = generateQueryHash(query)

  // Rotate query slightly based on index to get different images
  const rotatedQuery = `${query} ${index % 3 === 0 ? 'landscape' : index % 3 === 1 ? 'professional' : 'modern'}`

  const width = config.width || 800
  const height = config.height || 450

  const unsplashUrl = `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(rotatedQuery)}`

  return unsplashUrl
}

/**
 * Fallback image using Picsum (always works)
 * Uses deterministic IDs based on article title
 */
export function generateFallbackImage(config: ImageConfig, type: 'featured' | 'inline' = 'featured'): string {
  const query = generateSearchQuery(config)
  const hash = generateQueryHash(query)

  const width = type === 'featured' ? 1200 : 800
  const height = type === 'featured' ? 675 : 450
  const imageId = (hash % 100) + 1 // Picsum has images 1-100

  // Picsum API: Always returns working images with deterministic IDs
  return `https://picsum.photos/${width}/${height}?random=${imageId}`
}

/**
 * Generate descriptive alt text for accessibility and SEO
 */
export function generateAltText(config: ImageConfig): string {
  const query = generateSearchQuery(config)
  return `${config.title} - ${query} related image illustration`
}

/**
 * Cache management for image URLs
 */
const imageCache = new Map<string, string>()

export function getCachedImage(key: string): string | null {
  return imageCache.get(key) || null
}

export function setCachedImage(key: string, url: string): void {
  imageCache.set(key, url)
}

export function clearImageCache(): void {
  imageCache.clear()
}

/**
 * Main function: Get image URL with fallback strategy
 */
export function getImageUrl(config: ImageConfig, type: 'featured' | 'inline' = 'featured'): {
  primary: string
  fallback: string
  alt: string
} {
  const cacheKey = `${config.title}-${type}`
  const cached = getCachedImage(cacheKey)

  if (cached) {
    return {
      primary: cached,
      fallback: generateFallbackImage(config, type),
      alt: generateAltText(config),
    }
  }

  const primary = type === 'featured'
    ? generateFeaturedImage(config)
    : generateInlineImage(config)

  const result = {
    primary,
    fallback: generateFallbackImage(config, type),
    alt: generateAltText(config),
  }

  setCachedImage(cacheKey, primary)
  return result
}

/**
 * Optimize image URL for performance
 * Adds quality and format parameters
 */
export function optimizeImageUrl(url: string): string {
  // Unsplash supports query parameters
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}q=80&auto=format`
}
