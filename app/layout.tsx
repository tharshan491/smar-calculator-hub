import type { Metadata } from 'next'
import './globals.css'
import { UserTracker } from './components/UserTracker'
import { Analytics } from '@vercel/analytics/react'

const siteConfig = {
  name: 'Smart Calc Hub',
  description: 'Smart Calculator Hub – 25+ free online calculators for Finance, Health, Math, and Tools. Accurate, fast, and privacy-focused.',
  url: 'https://smart-calc-frontend.vercel.app',
  ogImage: 'https://og-image.vercel.app/Smart%20Calc%20Hub.png',
  links: {
    twitter: 'https://x.com',
    github: 'https://github.com',
  },
}

export const metadata: Metadata = {
  title: 'Smart Calc Hub – 25+ Free Online Calculators | Finance, Health & Math',
  description: siteConfig.description,
  keywords: ['calculator', 'finance calculator', 'BMI calculator', 'compound interest', 'loan calculator', 'free tools', 'online calculator'],
  authors: [{ name: 'Smart Calc', url: 'https://smart-calc-frontend.vercel.app' }],
  creator: 'Smart Calc Team',
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'Smart Calc Hub – 25+ Free Online Calculators',
    description: siteConfig.description,
    siteName: 'Smart Calc Hub',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Smart Calc Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Calc Hub',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Async Font Loading - Non-blocking */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Sora:wght@300;400;600;700&display=swap" />
        
        {/* Favicon and SEO */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={siteConfig.url} />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-bg text-text font-sora antialiased">
        <UserTracker />
        {children}
        {/* Defer Analytics - Load after page interaction */}
        <noscript><img src="https://vercel.com/_next/image?url=%2F&w=1&q=75" /></noscript>
        <script defer src="https://cdn.vercel-analytics.com/v1/analytics.js" />
        <Analytics />
      </body>
    </html>
  )
}
