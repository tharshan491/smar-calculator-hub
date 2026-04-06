'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getImageUrl, optimizeImageUrl } from '../lib/imageService'

interface BlogImageProps {
  title: string
  category: 'finance' | 'health' | 'math' | 'tools' | 'blog'
  tags?: string[]
  type?: 'featured' | 'inline'
  width?: number
  height?: number
  className?: string
}

/**
 * BlogImage Component
 * - Automatically fetches images from Unsplash
 * - Lazy loads with loading="lazy"
 * - Fallback to Picsum if Unsplash fails
 * - Modern styling with rounded corners and shadows
 * - Error handling with graceful degradation
 */
export function BlogImage({
  title,
  category,
  tags = [],
  type = 'featured',
  width = type === 'featured' ? 1200 : 800,
  height = type === 'featured' ? 675 : 450,
  className = '',
}: BlogImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Get image URLs (primary + fallback)
    const images = getImageUrl({ title, category, tags }, type)
    const optimizedUrl = optimizeImageUrl(images.primary)
    setImageSrc(optimizedUrl)
  }, [title, category, tags, type])

  const handleError = () => {
    // Fall back to Picsum on error
    const images = getImageUrl({ title, category, tags }, type)
    setImageSrc(images.fallback)
    setError(false)
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const images = getImageUrl({ title, category, tags }, type)
  const altText = images.alt

  // Styling based on type
  const containerClasses = type === 'featured'
    ? 'w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'
    : 'w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 my-6'

  const imageClasses = type === 'featured'
    ? 'w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300'
    : 'w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300'

  return (
    <div className={`group ${containerClasses} ${className}`}>
      {/* Skeleton Loading Placeholder */}
      {isLoading && (
        <div className="bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 animate-pulse"
          style={{ width: '100%', aspectRatio: `${width}/${height}` }}>
        </div>
      )}

      {/* Image Container */}
      {imageSrc && (
        <div style={{ width: '100%', aspectRatio: `${width}/${height}`, overflow: 'hidden' }}>
          <img
            src={imageSrc}
            alt={altText}
            loading="lazy"
            className={`${imageClasses} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onLoad={handleLoadingComplete}
            onError={handleError}
            width={width}
            height={height}
          />
        </div>
      )}

      {/* Error State: Fallback Gradient */}
      {error && (
        <div className="w-full bg-gradient-to-br from-blue-500/10 to-green-500/10 dark:from-blue-900/20 dark:to-green-900/20 flex items-center justify-center"
          style={{ aspectRatio: `${width}/${height}` }}>
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Image Caption with Accessibility */}
      <div className="sr-only">{altText}</div>
    </div>
  )
}

/**
 * BlogImageGrid Component
 * Display multiple related images in a grid
 */
export function BlogImageGrid({
  title,
  category,
  tags = [],
  count = 3,
}: Omit<BlogImageProps, 'type' | 'width' | 'height'> & { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {Array.from({ length: count }).map((_, index) => (
        <BlogImage
          key={index}
          title={`${title} - variation ${index + 1}`}
          category={category}
          tags={tags}
          type="inline"
          width={400}
          height={300}
        />
      ))}
    </div>
  )
}
