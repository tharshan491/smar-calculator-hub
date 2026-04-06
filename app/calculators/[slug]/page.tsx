// app/calculators/[slug]/page.tsx
// Dynamic calculator page with auto-generated SEO content

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentService } from '@/lib/content-service';

interface Props {
  params: {
    slug: string;
  };
}

// Generate metadata dynamically from SEO content
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await contentService.getContentBySlug(params.slug);

  if (!content) {
    return {
      title: 'Calculator Not Found',
      description: 'The calculator you are looking for does not exist.'
    };
  }

  return {
    title: content.metaTags.title,
    description: content.metaTags.description,
    keywords: content.metaTags.keywords,
    canonical: content.metaTags.canonical,
    openGraph: {
      title: content.metaTags.title,
      description: content.metaTags.description,
      type: 'website',
      url: content.metaTags.canonical
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTags.title,
      description: content.metaTags.description
    }
  };
}

// Generate static paths for high-priority content
export async function generateStaticParams() {
  const highPriority = await contentService.getContentByPriority('high');

  return highPriority.map((content) => ({
    slug: content.slug
  }));
}

export default async function CalculatorPage({ params }: Props) {
  const content = await contentService.getContentBySlug(params.slug);

  if (!content) {
    notFound();
  }

  // Get related calculators
  const allContent = await contentService.getContentByCategory(content.category);
  const related = allContent
    .filter(c => c.id !== content.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Schema markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Tool',
            name: content.title,
            description: content.metaTags.description,
            keywords: content.keywords.join(', '),
            category: content.category,
            url: content.metaTags.canonical
          })
        }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Main Content */}
        <article>
          <header className="mb-12">
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {content.category.charAt(0).toUpperCase() + content.category.slice(1)} Calculator
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {content.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {content.metaTags.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {content.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </header>

          {/* Interactive Calculator Component */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="bg-blue-50 p-6 rounded border-l-4 border-blue-500">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Try Our {content.title}
              </h2>
              {/* Calculator component would be rendered here */}
              <p className="text-gray-700">
                The interactive calculator component will be loaded here based on the calculator type.
              </p>
            </div>
          </div>

          {/* Generated SEO Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {content.sections && content.sections.map((section, idx) => (
              <div key={idx} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </article>

        {/* Related Calculators */}
        {related.length > 0 && (
          <aside className="mt-16 pt-12 border-t border-gray-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((calc) => (
                <a
                  key={calc.id}
                  href={`/calculators/${calc.slug}`}
                  className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <p className="text-sm text-blue-600 font-medium mb-2">
                    {calc.category}
                  </p>
                  <h3 className="font-semibold text-gray-900 hover:text-blue-600">
                    {calc.title}
                  </h3>
                </a>
              ))}
            </div>
          </aside>
        )}

        {/* Last Updated Info */}
        <footer className="mt-12 pt-8 border-t border-gray-300 text-center text-gray-600 text-sm">
          <p>
            Last updated: {new Date(content.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="mt-2">
            Content automatically generated and optimized for search engines
          </p>
        </footer>
      </main>
    </div>
  );
}
