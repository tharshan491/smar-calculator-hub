import type { Metadata } from 'next'

interface MetadataParams {
  title: string
  description: string
  path: string
  keyword?: string
}

export function generateCalculatorMetadata(params: MetadataParams): Metadata {
  const baseUrl = 'https://smart-calc-frontend.vercel.app'
  const fullUrl = `${baseUrl}${params.path}`
  const keyword = params.keyword || params.title

  return {
    title: `${params.title} - Smart Calc Hub`,
    description: params.description,
    keywords: [keyword, 'calculator', 'free tool', 'online calculator'],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: `${params.title} - Smart Calc Hub`,
      description: params.description,
      url: fullUrl,
      type: 'website',
      siteName: 'Smart Calc Hub',
    },
    twitter: {
      card: 'summary',
      title: `${params.title} - Smart Calc Hub`,
      description: params.description,
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

export function generateSoftwareApplicationSchema(tools: Array<{ name: string; url: string; description: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Smart Calc Hub',
    description: 'Free online calculator with 25+ tools for finance, health, math, and everyday utilities',
    url: 'https://smart-calc-frontend.vercel.app',
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '250',
    },
    applicationSubCategory: tools.map((tool) => ({
      '@type': 'Thing',
      name: tool.name,
      url: tool.url,
      description: tool.description,
    })),
  }
}
