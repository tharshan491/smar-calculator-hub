'use client'

import { useState } from 'react'
import { Newspaper } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  category: string
  excerpt: string
  author: string
  date: string
  readTime: string
  content: string
  calculators?: { path: string; label: string }[]
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Common Personal Finance Mistakes That Cost You Money',
    category: 'Finance',
    excerpt: 'Learn the most common financial mistakes and how to avoid them to build lasting wealth.',
    author: 'Sarah Chen',
    date: '2024-03-20',
    readTime: '7 min',
    content: 'Most people make predictable financial mistakes that compound over time. Not having an emergency fund leaves you vulnerable to high-interest debt. Keeping too much money in checking accounts means missing out on interest. High-fee investments can significantly reduce your returns over decades. Not automating savings makes it easy to spend money impulsively. Finally, ignoring your credit score costs you money through higher interest rates on loans and mortgages. By being aware of these mistakes, you can take steps to avoid them.',
    calculators: [
      { path: '/finance/loan', label: 'Loan EMI Calculator' },
      { path: '/finance/compound-interest', label: 'Compound Interest Calculator' }
    ]
  },
  {
    id: '2',
    title: 'The Science Behind Effective Weight Loss and Fitness',
    category: 'Health',
    excerpt: 'Evidence-based strategies for sustainable weight loss and building a healthier lifestyle.',
    author: 'Dr. James Mitchell',
    date: '2024-03-18',
    readTime: '9 min',
    content: 'Effective weight loss isn\'t about extreme diets or exhausting workout routines - it\'s about sustainable changes. Create a moderate caloric deficit through a combination of diet and exercise. Protein is essential for preserving muscle during weight loss. Resistance training builds muscle, which increases metabolic rate. Sleep quality affects hunger hormones and recovery. Consistency matters more than intensity - small daily habits compound into major results. The best approach is one you can maintain long-term, combining sensible nutrition with regular physical activity.',
    calculators: [
      { path: '/health/calories', label: 'Calorie Calculator' },
      { path: '/health/macro', label: 'Macro Calculator' },
      { path: '/health/tdee', label: 'TDEE Calculator' }
    ]
  },
  {
    id: '3',
    title: 'Retirement Planning in Your 30s: Why It\'s Never Too Early',
    category: 'Finance',
    excerpt: 'Start your retirement planning early and watch compound interest work in your favor.',
    author: 'Michael Torres',
    date: '2024-03-15',
    readTime: '8 min',
    content: 'Starting retirement planning in your 30s gives you the most powerful advantage: time. A person who invests $500/month starting at age 30 will have significantly more by retirement age than someone who starts at 40, even if they invest more per month. This is the magic of compound interest. Take advantage of employer 401(k) matches - it\'s free money. Consider opening an IRA for additional tax-advantaged savings. Diversify your investments based on your risk tolerance and time horizon. Review your plan annually and adjust as needed.',
    calculators: [
      { path: '/finance/retirement', label: 'Retirement Calculator' },
      { path: '/finance/investment', label: 'Investment Growth Calculator' },
      { path: '/finance/compound-interest', label: 'Compound Interest Calculator' }
    ]
  },
  {
    id: '4',
    title: 'Cryptocurrency Basics: What You Need to Know Before Investing',
    category: 'Finance',
    excerpt: 'Understanding cryptocurrency fundamentals and the risks before you invest.',
    author: 'Alex Rodriguez',
    date: '2024-03-12',
    readTime: '10 min',
    content: 'Cryptocurrency is a digital form of money secured by cryptography instead of a central bank. Bitcoin was the first cryptocurrency, but thousands exist today. Blockchain technology ensures transactions are secure and transparent. However, crypto is highly volatile and regulated differently in different jurisdictions. Never invest more than you can afford to lose. Understand the project\'s fundamentals before investing. Secure your holdings with hardware wallets for long-term storage. Be wary of scams and unrealistic promises of guaranteed returns. Crypto can be part of a diversified portfolio, but it should not be your entire investment strategy.',
    calculators: [
      { path: '/finance/investment', label: 'Investment Growth Calculator' },
      { path: '/tools/currency', label: 'Currency Converter' }
    ]
  },
  {
    id: '5',
    title: 'Tax Optimization Strategies for Self-Employed Professionals',
    category: 'Finance',
    excerpt: 'Legal strategies to minimize your tax burden and keep more of what you earn.',
    author: 'Patricia Johnson',
    date: '2024-03-08',
    readTime: '6 min',
    content: 'Self-employed individuals have unique tax advantages if you know how to use them. Keep detailed records of all business expenses - home office, equipment, travel, and professional services are often deductible. Quarterly estimated tax payments prevent large surprises at tax time. Consider a SEP IRA or Solo 401(k) for tax-advantaged retirement savings with much higher contribution limits than a regular IRA. Business structure matters - an S-Corp can sometimes save you significant self-employment taxes compared to being a sole proprietor. Work with a tax professional who understands self-employed taxation to optimize your strategy legally.',
    calculators: [
      { path: '/finance/tax', label: 'Income Tax Calculator' },
      { path: '/finance/profit', label: 'Profit Calculator' }
    ]
  },
  {
    id: '6',
    title: 'Building Muscle While Cutting Fat: A Beginner\'s Guide',
    category: 'Health',
    excerpt: 'How to achieve body composition goals through intelligent training and nutrition.',
    author: 'Coach Emma Davis',
    date: '2024-03-05',
    readTime: '8 min',
    content: 'Body recomposition - losing fat while building muscle - is possible, especially for beginners. Prioritize strength training with progressive overload. Maintain adequate protein intake (0.7-1g per pound of goal body weight). Create only a moderate caloric deficit - aggressive cutting loses muscle. Track your progress through body composition measurements, not just scale weight. Resistance training is essential - it signals your body to build muscle during a deficit. Be patient - this process takes time and consistency. Progressive overload in the gym, combined with sensible nutrition, yields consistent results.',
    calculators: [
      { path: '/health/body-fat', label: 'Body Fat % Calculator' },
      { path: '/health/macro', label: 'Macro Calculator' },
      { path: '/health/tdee', label: 'TDEE Calculator' }
    ]
  },
  {
    id: '7',
    title: 'How to Use Financial Calculators to Plan Your Future',
    category: 'Finance',
    excerpt: 'Leverage calculators to make data-driven financial decisions.',
    author: 'Tom Wilson',
    date: '2024-03-01',
    readTime: '7 min',
    content: 'Financial calculators are powerful tools that help you model different scenarios and understand the impact of your financial decisions. A loan calculator shows how different interest rates and terms affect monthly payments. An investment calculator demonstrates the power of compound growth over time. A retirement calculator helps you understand if you\'re saving enough for your future. A debt payoff calculator shows how extra payments accelerate your path to financial freedom. By regularly using these calculators, you can optimize your financial strategy. Most importantly, these tools help you visualize the long-term consequences of today\'s decisions, making it easier to stay motivated toward your financial goals.',
    calculators: [
      { path: '/finance/loan', label: 'Loan EMI Calculator' },
      { path: '/finance/investment', label: 'Investment Growth Calculator' },
      { path: '/finance/retirement', label: 'Retirement Calculator' }
    ]
  },
  {
    id: '8',
    title: 'Understanding Interest Rates: Simple vs Compound',
    category: 'Finance',
    excerpt: 'The critical difference between interest calculation methods and how they affect your money.',
    author: 'Rebecca Green',
    date: '2024-02-25',
    readTime: '8 min',
    content: 'Simple interest is calculated only on the principal amount, while compound interest is calculated on both the principal and accumulated interest. For example, $1,000 at 10% simple interest earns $100 per year regardless of how long you hold it. The same amount at 10% compound interest grows exponentially - year one you earn $100, year two you earn $110 on $1,100, and so on. This difference becomes dramatic over long periods. A $10,000 investment at 8% simple interest over 20 years yields $26,000. The same investment with annual compounding yields approximately $46,610. This demonstrates why compound interest is the engine of wealth building. Most savings accounts and investment accounts use compound interest, which works in your favor as a saver but against you as a borrower.',
    calculators: [
      { path: '/finance/simple-interest', label: 'Simple Interest Calculator' },
      { path: '/finance/compound-interest', label: 'Compound Interest Calculator' }
    ]
  },
  {
    id: '9',
    title: 'The True Cost of Borrowing: What APR Really Means',
    category: 'Finance',
    excerpt: 'Understanding APR helps you compare loans and avoid expensive borrowing mistakes.',
    author: 'David Martinez',
    date: '2024-02-20',
    readTime: '9 min',
    content: 'APR (Annual Percentage Rate) includes the interest rate plus all other costs associated with the loan, expressed as an annual percentage. This standardized measure makes it easy to compare different loan offers. A credit card might advertise 18% APR. A personal loan might be 12% APR. A mortgage might be 6.5% APR. The Truth in Lending Act requires lenders to disclose APR so you can make informed comparisons. When comparing loans, APR is more important than interest rate alone because it includes fees and other charges. A loan with a slightly higher interest rate but much lower fees (lower APR) is often the better deal. Use loan calculators when comparing options to see the actual dollar impact of different APRs over the loan term. Small differences in APR compound into thousands of dollars over a 15 or 30-year mortgage.',
    calculators: [
      { path: '/finance/loan', label: 'Loan EMI Calculator' },
      { path: '/finance/mortgage', label: 'Mortgage Calculator' }
    ]
  },
  {
    id: '10',
    title: 'Smart Shopping: Using Calculators to Find Real Deals',
    category: 'Finance',
    excerpt: 'How to use discount and percentage calculators when shopping to ensure you\'re getting good deals.',
    author: 'Jessica Lee',
    date: '2024-02-15',
    readTime: '6 min',
    content: 'Discount calculators help you quickly determine the actual price after a discount. A 30% off sale seems great, but do you know the exact savings? On a $150 item, 30% off saves $45, making the final price $105. Without calculating, shoppers sometimes overestimate savings or make poor purchasing decisions based on discount percentages rather than actual value. Retailers know this and use large percentage discounts to trigger impulse purchases. Use calculators when shopping during sales to determine if the final price aligns with your budget. Compare the final prices of different items to ensure you\'re getting the best value. Remember that the best deal is the one you don\'t buy - if you weren\'t planning to purchase an item before the sale, the discount doesn\'t make it a good deal. Smart shoppers use calculators to make rational, data-driven purchasing decisions.',
    calculators: [
      { path: '/tools/discount', label: 'Discount Calculator' },
      { path: '/math/percentage', label: 'Percentage Calculator' }
    ]
  },
  {
    id: '11',
    title: 'Understanding Your Net Worth: Why It Matters',
    category: 'Finance',
    excerpt: 'Learn to calculate and track your net worth as a key indicator of financial health.',
    author: 'Rachel Thompson',
    date: '2024-02-10',
    readTime: '7 min',
    content: 'Net worth is the ultimate measure of personal wealth - it\'s everything you own (assets) minus everything you owe (liabilities). Your net worth tells the real story of your financial position. Two people earning $100,000 annually can have vastly different net worth based on their spending and saving habits. Assets include cash, savings, investments, real estate, vehicles, and personal property. Liabilities include mortgages, student loans, credit card debt, and car loans. Tracking your net worth annually shows your financial progress. A positive net worth means you have more assets than liabilities. Even if your net worth is currently negative, the key is the trend - is it improving? Use net worth calculators to track your progress quarterly or annually. Set net worth goals for yourself and monitor your progress toward them regularly.',
    calculators: [
      { path: '/finance/net-worth', label: 'Net Worth Calculator' },
      { path: '/finance/investment', label: 'Investment Growth Calculator' }
    ]
  },
  {
    id: '12',
    title: 'Optimizing Your Investment Strategy: Simple vs Compound Interest',
    category: 'Finance',
    excerpt: 'Maximize returns by understanding how different interest calculation methods affect your wealth.',
    author: 'Kevin Park',
    date: '2024-02-05',
    readTime: '8 min',
    content: 'While simple interest is straightforward, compound interest is the path to wealth. Most investment vehicles use compound interest, which means you earn returns on your returns. A $10,000 investment at 8% simple interest over 20 years grows to $26,000 in interest earnings. That same investment at 8% compound interest (compounded annually) grows to about $46,610. The longer your investment horizon, the more dramatic the difference becomes. This is why starting early matters so much - a 25-year-old investing $5,000 annually until age 65 can accumulate over $2 million at 8% returns. A 35-year-old starting the same strategy has only about half that amount. Use investment calculators to model different scenarios. Understand your specific investment timeline and choose vehicles that maximize compound growth for your situation.',
    calculators: [
      { path: '/finance/compound-interest', label: 'Compound Interest Calculator' },
      { path: '/finance/investment', label: 'Investment Growth Calculator' },
      { path: '/finance/simple-interest', label: 'Simple Interest Calculator' }
    ]
  },
  {
    id: '13',
    title: 'Hydration Hacks: Calculating Your Daily Water Needs',
    category: 'Health',
    excerpt: 'Science-backed methods to determine exactly how much water you should drink daily.',
    author: 'Dr. Amanda Foster',
    date: '2024-01-30',
    readTime: '6 min',
    content: 'Proper hydration is fundamental to health, but the "8 glasses a day" rule is oversimplified. Your actual water needs depend on your weight, activity level, climate, and individual factors. A common formula is half your body weight in ounces daily - so a 180 lb person should aim for 90 oz (about 2.7 liters). If you exercise regularly, you need more water to replace what you lose through sweat. Hot climates and high altitudes increase water needs. Use water intake calculators to determine your personalized daily target. Monitor your urine color - pale yellow indicates good hydration while dark yellow suggests dehydration. Start your day hydrated by drinking water with breakfast. Spread your water intake throughout the day rather than chugging large amounts at once. Your body can only absorb about 600-800ml of water per hour efficiently.',
    calculators: [
      { path: '/health/water-intake', label: 'Water Intake Calculator' },
      { path: '/health/tdee', label: 'TDEE Calculator' }
    ]
  },
  {
    id: '14',
    title: 'Body Composition: Beyond the Scale - Understanding Your Body Fat Percentage',
    category: 'Health',
    excerpt: 'Learn why body fat percentage is more important than scale weight for true health.',
    author: 'Coach Marcus Johnson',
    date: '2024-01-25',
    readTime: '9 min',
    content: 'Scale weight is misleading because muscle weighs more than fat. Two people at the same weight can look completely different based on body composition. Body fat percentage reflects the ratio of fat mass to total body weight and is a better indicator of fitness and health. Essential fat percentage (3-5% for men, 8-12% for women) is the minimum needed for basic physiological functions. Athletes typically have 6-13% for men and 14-20% for women. Average body fat ranges from 18-25% for men and 25-32% for women. Use body fat calculators using measurements to track changes in composition over time. The goal isn\'t necessarily to be extremely lean - it\'s to be healthy and fit at a sustainable body composition. Progressive strength training combined with proper nutrition can improve body composition while scale weight stays the same.',
    calculators: [
      { path: '/health/body-fat', label: 'Body Fat % Calculator' },
      { path: '/health/bmi', label: 'BMI Calculator' }
    ]
  },
  {
    id: '15',
    title: 'Home Affordability: Using Mortgage Calculators to Plan Your Purchase',
    category: 'Finance',
    excerpt: 'Determine how much house you can afford and understand the true costs of home ownership.',
    author: 'Susan Bradley',
    date: '2024-01-20',
    readTime: '8 min',
    content: 'Most people focus only on the monthly payment, but true home affordability is more complex. Mortgage calculators show you the monthly payment, total interest paid, and amortization schedule. Down payment size matters significantly - 20% down eliminates PMI costs. Interest rates vary based on credit score and market conditions - a 0.5% difference on a $300k mortgage costs tens of thousands over the loan term. Loan terms matter too - a 15-year mortgage costs less total interest than 30 years but has higher monthly payments. Factor in property taxes, home insurance, HOA fees, and maintenance costs (typically 1% of home value annually). Use mortgage calculators to compare different scenarios. Run calculations for different down payments, interest rates, and loan terms to understand your options. Consider getting pre-approved before house hunting to know your actual budget based on lending capacity.',
    calculators: [
      { path: '/finance/mortgage', label: 'Mortgage Calculator' },
      { path: '/finance/loan', label: 'Loan EMI Calculator' }
    ]
  },
  {
    id: '16',
    title: 'Water Intake Calculator Guide: How Much Water Should You Drink Daily?',
    category: 'Health',
    excerpt: 'Proper hydration is essential for health. Learn exactly how much water you need and how to stay optimally hydrated with our complete guide.',
    author: 'Dr. Amanda Foster',
    date: '2024-03-25',
    readTime: '10 min',
    content: 'Water intake refers to the amount of water your body needs to consume daily to maintain optimal health and function. The common "8 glasses a day" recommendation is outdated and doesn\'t account for individual factors like body weight, activity level, and climate. Medical professionals use the formula: Body Weight (lbs) ÷ 2 = Daily Water in Ounces. However, your actual needs may be higher based on exercise, hot climates, pregnancy, or altitude. Common mistakes include only drinking when thirsty (too late for hydration), relying on caffeinated drinks (diuretic effect), and ignoring individual needs. Proper hydration is crucial for temperature regulation, nutrient transport, waste removal, joint lubrication, and brain function. Start your day with water, drink before meals, monitor urine color (pale yellow = well-hydrated), and spread intake throughout the day. Use our water intake calculator to determine your personalized daily requirement.',
    calculators: [
      { path: '/health/water-intake', label: 'Water Intake Calculator' },
      { path: '/health/calories', label: 'Calorie Calculator' },
      { path: '/health/bmi', label: 'BMI Calculator' }
    ]
  },
  {
    id: '17',
    title: 'Compound Interest Calculator: Harness the Exponential Power of Money',
    category: 'Finance',
    excerpt: 'Learn how compound interest turns modest investments into substantial wealth. Understand the formula, see real examples, and use our calculator to plan your financial future.',
    author: 'Michael Torres',
    date: '2024-03-28',
    readTime: '12 min',
    content: 'Compound interest is interest earned on both your principal and accumulated interest—the engine of wealth building. A $25,000 investment at 7% annual returns grows to over $189,000 in 30 years. Time is your most valuable asset: starting 10 years earlier often increases final wealth more than investing twice the amount later. The formula A=P(1+r/n)^(nt) becomes exponential over decades. Benefits include passive wealth growth, time leverage, retirement feasibility, and inflation protection. Common mistakes include starting too late, ignoring fees, over-optimistic return assumptions, early withdrawals, and not reinvesting dividends. Strategies to maximize returns: start early, invest consistently, maximize employer matching, choose low-fee index funds, reinvest all income, and stay invested through market cycles. Compound interest dramatically outpaces simple interest over time—$10k at 8% compounds to $46,610 in 20 years versus just $26,000 with simple interest. The key is discipline: consistent contributions in low-fee vehicles, compounding uninterrupted for decades.',
    calculators: [
      { path: '/finance/compound-interest', label: 'Compound Interest Calculator' },
      { path: '/finance/retirement', label: 'Retirement Calculator' },
      { path: '/finance/simple-interest', label: 'Simple Interest Calculator' },
      { path: '/finance/investment', label: 'Investment Growth Calculator' }
    ]
  }
]

const CATEGORIES = ['All', 'Finance', 'Health']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-bg">
      <Link href="/" className="inline-flex items-center gap-2 text-accent hover:opacity-80 pt-4 px-4 md:pt-6 md:px-6">
        <span>←</span> Back to Calculators
      </Link>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center gap-3 mb-8">
          <Newspaper className="w-10 h-10 text-accent" />
          <h1 className="text-4xl md:text-5xl font-space-mono font-bold text-text">Blog</h1>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-text hover:border-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="bg-surface border border-border rounded-lg p-6 transition-all hover:shadow-lg hover:border-accent hover:-translate-y-0.5 cursor-pointer"
              role="article"
              onClick={() => setSelectedPost(post)}
            >
              <header className="mb-4">
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <span className="inline-block bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded">
                    {post.category}
                  </span>
                  <time dateTime={post.date} className="text-xs text-muted">
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                </div>
                <h2 className="text-2xl font-space-mono font-bold text-text mb-2 hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
              </header>
              
              <p className="text-muted text-sm mb-4">{post.excerpt}</p>
              
              <footer className="flex items-center justify-between text-xs text-muted pt-3 border-t border-border/30">
                <span>By {post.author}</span>
                <span className="text-accent font-medium">{post.readTime}</span>
              </footer>
            </article>
          ))}

          {/* SEO Blog Posts Links */}
          <div className="border-t-2 border-border pt-8 mt-8">
            <p className="text-sm text-muted mb-4 font-medium">📚 In-Depth Calculator Guides:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Link href="/seo-blog/loan-calculator-guide" className="bg-surface border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all">
                <div className="text-xs font-medium text-accent mb-2">💰 Finance</div>
                <h4 className="text-lg font-space-mono font-bold text-text mb-2">EMI Calculators Guide</h4>
                <p className="text-sm text-muted">Calculate monthly loan payments, compare interest costs, and make smart borrowing decisions.</p>
              </Link>
              <Link href="/seo-blog/compound-interest-guide" className="bg-surface border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all">
                <div className="text-xs font-medium text-accent mb-2">💰 Finance</div>
                <h4 className="text-lg font-space-mono font-bold text-text mb-2">Compound Interest Guide</h4>
                <p className="text-sm text-muted">Learn wealth-building math and harness compound growth for long-term financial success.</p>
              </Link>
              <Link href="/seo-blog/bmi-calculator-guide" className="bg-surface border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all">
                <div className="text-xs font-medium text-accent mb-2">❤️ Health</div>
                <h4 className="text-lg font-space-mono font-bold text-text mb-2">BMI Calculator Guide</h4>
                <p className="text-sm text-muted">Discover your healthy weight range, understand BMI categories, and achieve optimal fitness goals.</p>
              </Link>
              <Link href="/seo-blog/discount-calculator-guide" className="bg-surface border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all">
                <div className="text-xs font-medium text-accent mb-2">🛍️ Tools</div>
                <h4 className="text-lg font-space-mono font-bold text-text mb-2">Smart Shopping Guide</h4>
                <p className="text-sm text-muted">Master discount calculations and find real deals while shopping online and in-store.</p>
              </Link>
            </div>
            <p className="text-xs text-muted text-center py-4 border-t border-border mt-4">
              📝 More in-depth guides coming soon for all calculator categories
            </p>
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-center justify-between">
              <div>
                <span className="inline-block bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded mb-2">
                  {selectedPost.category}
                </span>
                <h2 className="text-2xl font-space-mono font-bold text-text">{selectedPost.title}</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-2xl text-muted hover:text-text"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-muted mb-6 pb-6 border-b border-border flex-wrap">
                <span>By {selectedPost.author}</span>
                <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <div className="prose prose-invert max-w-none text-text">
                <p className="text-lg leading-relaxed mb-4">{selectedPost.content}</p>
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
                  <p className="text-sm font-medium text-accent mb-2">💡 Pro Tip:</p>
                  <p className="text-sm">Use our free online calculators to apply the concepts from this article. See real calculations and understand how these financial principles impact your money.</p>
                </div>
              </div>

              {selectedPost.calculators && selectedPost.calculators.length > 0 && (
                <div className="border-t border-border pt-6 mt-6">
                  <h4 className="text-sm font-bold text-text mb-4">Related Calculators</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedPost.calculators.map((calc, idx) => (
                      <Link
                        key={idx}
                        href={calc.path}
                        className="px-4 py-2 bg-accent/20 border border-accent text-accent text-sm font-medium rounded hover:bg-accent hover:text-white transition-all"
                      >
                        {calc.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <Link href="/" className="flex-1 px-4 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 text-center">
                  → Back to Home
                </Link>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="flex-1 px-4 py-3 bg-surface border border-border text-text rounded-lg font-medium hover:border-accent transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
