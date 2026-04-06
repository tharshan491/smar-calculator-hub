// app/components/SEOContent.tsx
// Component for rendering SEO content sections

export interface Section {
  heading: string;
  content: string;
}

interface SEOContentProps {
  sections?: Section[];
  title?: string;
}

export default function SEOContent({ sections = [], title }: SEOContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {title && <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>}
      
      {sections && sections.length > 0 ? (
        sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {section.heading}
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No content available for this calculator.</p>
      )}
    </div>
  );
}
