// app/lib/content-service.ts
// Next.js Content Service for SEO Calculator Content
// SERVERLESS-SAFE: No file system operations - uses embedded data

interface CalculatorContent {
  id: string;
  title: string;
  slug: string;
  category: string;
  priority: string;
  keywords: string[];
  metaTags: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
  };
  sections: Array<{
    heading: string;
    content: string;
  }>;
  relatedCalculators?: string[];
  publishedAt: string;
}

// Embedded sample content - serverless compatible
const SAMPLE_CONTENT: CalculatorContent[] = [
  {
    id: 'fin-001',
    title: 'Loan EMI Calculator',
    slug: 'loan-calculator',
    category: 'finance',
    priority: 'high',
    keywords: ['loan', 'emi', 'calculator', 'monthly payment'],
    metaTags: {
      title: 'Loan EMI Calculator - Calculate Monthly Payments',
      description: 'Free online loan EMI calculator. Calculate your monthly loan payment instantly.',
      keywords: 'loan calculator, emi calculator, monthly payment',
      canonical: 'https://smart-calculator-hub.vercel.app/calculators/loan-calculator'
    },
    sections: [
      {
        heading: 'About Loan EMI Calculator',
        content: 'Calculate your monthly loan payments with our free online EMI calculator. Get accurate results for any loan amount, interest rate, and tenure.'
      },
      {
        heading: 'How to Use',
        content: 'Enter your loan amount, interest rate, and loan tenure. The calculator will instantly show your monthly EMI payment.'
      },
      {
        heading: 'Features',
        content: 'Fast calculations, accurate amortization schedule, supports all loan types, completely free.'
      }
    ],
    publishedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'fin-002',
    title: 'Mortgage Calculator',
    slug: 'mortgage-calculator',
    category: 'finance',
    priority: 'high',
    keywords: ['mortgage', 'home loan', 'calculator', 'payment'],
    metaTags: {
      title: 'Mortgage Calculator - Calculate Home Loan Payments',
      description: 'Calculate your monthly mortgage payment with our free online calculator.',
      keywords: 'mortgage calculator, home loan, monthly payment',
      canonical: 'https://smart-calculator-hub.vercel.app/calculators/mortgage-calculator'
    },
    sections: [
      {
        heading: 'About Mortgage Calculator',
        content: 'Our mortgage calculator helps you understand your home loan payments and total interest.'
      },
      {
        heading: 'How to Use',
        content: 'Enter your home price, down payment, interest rate, and loan term to calculate your monthly payment.'
      },
      {
        heading: 'Features',
        content: 'Detailed amortization, property tax estimates, insurance calculations, accurate results.'
      }
    ],
    publishedAt: '2024-01-16T00:00:00Z'
  },
  {
    id: 'health-001',
    title: 'BMI Calculator',
    slug: 'bmi-calculator',
    category: 'health',
    priority: 'high',
    keywords: ['bmi', 'body mass index', 'weight', 'health'],
    metaTags: {
      title: 'BMI Calculator - Calculate Body Mass Index',
      description: 'Calculate your BMI and understand your health metrics with our free calculator.',
      keywords: 'bmi calculator, body mass index, weight calculator',
      canonical: 'https://smart-calculator-hub.vercel.app/calculators/bmi-calculator'
    },
    sections: [
      {
        heading: 'About BMI Calculator',
        content: 'Calculate your Body Mass Index (BMI) instantly with our free online tool.'
      },
      {
        heading: 'What is BMI?',
        content: 'BMI is a measure of body fat based on height and weight. It helps assess overall health.'
      },
      {
        heading: 'How to Use',
        content: 'Enter your height and weight to instantly see your BMI and health category.'
      }
    ],
    publishedAt: '2024-01-17T00:00:00Z'
  },
  {
    id: 'math-001',
    title: 'Percentage Calculator',
    slug: 'percentage-calculator',
    category: 'math',
    priority: 'high',
    keywords: ['percentage', 'percent', 'math', 'calculation'],
    metaTags: {
      title: 'Percentage Calculator - Calculate Percentages Instantly',
      description: 'Free online percentage calculator. Calculate percentages for any value.',
      keywords: 'percentage calculator, percent calculator, math',
      canonical: 'https://smart-calculator-hub.vercel.app/calculators/percentage-calculator'
    },
    sections: [
      {
        heading: 'About Percentage Calculator',
        content: 'Calculate percentages quickly with our free online percentage calculator.'
      },
      {
        heading: 'How to Use',
        content: 'Enter the value and percentage to calculate the result instantly.'
      },
      {
        heading: 'Features',
        content: 'Simple interface, fast calculations, accurate results, free to use.'
      }
    ],
    publishedAt: '2024-01-18T00:00:00Z'
  }
];

export class ContentService {
  constructor() {
    // No file system initialization needed
  }

  /**
   * Get content by calculator slug
   */
  async getContentBySlug(slug: string): Promise<CalculatorContent | null> {
    try {
      const found = SAMPLE_CONTENT.find(c => c.slug === slug);
      if (found) return found;
      return this.getDefaultContent(slug);
    } catch (error) {
      console.error(`Error loading content for ${slug}:`, error);
      return this.getDefaultContent(slug);
    }
  }

  /**
   * Get default content for unknown calculators
   */
  private getDefaultContent(slug: string): CalculatorContent {
    const title = slug
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      id: `default-${slug}`,
      title: `${title} Calculator`,
      slug,
      category: 'tools',
      priority: 'medium',
      keywords: [slug, 'calculator', title.toLowerCase()],
      metaTags: {
        title: `${title} Calculator - Free Online Tool`,
        description: `Use our free ${title.toLowerCase()} calculator. Calculate and solve problems instantly.`,
        keywords: `${slug}, calculator, tool`,
        canonical: `https://smart-calculator-hub.vercel.app/calculators/${slug}`
      },
      sections: [
        {
          heading: `About ${title} Calculator`,
          content: `Our ${title.toLowerCase()} calculator helps you quickly and accurately calculate and solve problems. Perfect for students, professionals, and anyone needing quick calculations.`
        },
        {
          heading: 'How to Use',
          content: `Enter your values into the calculator fields and click calculate to get instant results. Our calculator is accurate, fast, and easy to use.`
        },
        {
          heading: 'Features',
          content: `Fast calculations, accurate results, simple interface, mobile friendly, and completely free. No registration required.`
        }
      ],
      publishedAt: new Date().toISOString()
    };
  }

  /**
   * Get content by calculator ID
   */
  async getContentById(id: string): Promise<CalculatorContent | null> {
    try {
      const found = SAMPLE_CONTENT.find(c => c.id === id);
      return found || null;
    } catch (error) {
      console.error(`Error loading content for ${id}:`, error);
      return null;
    }
  }

  /**
   * Get all available content
   */
  async getAllContent(): Promise<CalculatorContent[]> {
    return [...SAMPLE_CONTENT];
  }

  /**
   * Get content by category
   */
  async getContentByCategory(category: string): Promise<CalculatorContent[]> {
    return SAMPLE_CONTENT.filter(c => c.category === category);
  }

  /**
   * Get content by priority
   */
  async getContentByPriority(priority: string): Promise<CalculatorContent[]> {
    return SAMPLE_CONTENT.filter(c => c.priority === priority);
  }

  /**
   * Search content
   */
  async searchContent(query: string): Promise<CalculatorContent[]> {
    const lowerQuery = query.toLowerCase();

    return SAMPLE_CONTENT.filter(c =>
      c.title.toLowerCase().includes(lowerQuery) ||
      c.keywords.some(k => k.toLowerCase().includes(lowerQuery)) ||
      c.id.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get featured content (highest priority)
   */
  async getFeaturedContent(limit = 10): Promise<CalculatorContent[]> {
    return SAMPLE_CONTENT
      .filter(c => c.priority === 'high')
      .slice(0, limit);
  }

  /**
   * Check if content exists
   */
  async contentExists(id: string): Promise<boolean> {
    return SAMPLE_CONTENT.some(c => c.id === id);
  }

  /**
   * Get content statistics
   */
  async getStats(): Promise<{
    total: number;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
    lastUpdated: string;
  }> {
    const byCategory: Record<string, number> = {};
    const byPriority: Record<string, number> = {};

    SAMPLE_CONTENT.forEach(c => {
      byCategory[c.category] = (byCategory[c.category] || 0) + 1;
      byPriority[c.priority] = (byPriority[c.priority] || 0) + 1;
    });

    return {
      total: SAMPLE_CONTENT.length,
      byCategory,
      byPriority,
      lastUpdated: new Date().toISOString()
    };
  }
}

export const contentService = new ContentService();
