'use client'

import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  category: string
  excerpt: string
  date: string
  readTime: string
  content: string
  calculators?: { path: string; label: string }[]
}

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Power of Compound Interest: Einstein\'s Eighth Wonder',
    category: 'Finance',
    excerpt: 'Learn how compound interest can transform your financial future and why starting early makes all the difference.',
    date: '2024-03-15',
    readTime: '8 min',
    content: 'Compound interest is the process of earning returns on both your initial investment and the accumulated interest over time. Albert Einstein famously called it "the eighth wonder of the world," and for good reason. When you invest money, you earn interest. That interest then earns interest itself, creating exponential growth over time. This concept is fundamental to building long-term wealth. Starting early is crucial because time is your greatest asset in compound interest.',
    calculators: [
      { path: '/finance/compound-interest', label: 'Compound Interest Calculator' },
      { path: '/finance/investment', label: 'Investment Growth Calculator' },
      { path: '/finance/simple-interest', label: 'Simple Interest Calculator' }
    ]
  },
  {
    id: '2',
    title: 'BMI vs Body Composition: What Really Matters',
    category: 'Health',
    excerpt: 'Understanding the limitations of BMI and why body composition is more important for your health goals.',
    date: '2024-03-10',
    readTime: '6 min',
    content: 'Body Mass Index (BMI) is a simple calculation based on height and weight, but it tells only part of the story. BMI doesn\'t distinguish between muscle and fat, so someone who is very muscular might have a "high" BMI while being in excellent health. Body composition - the ratio of muscle to fat - is a much better indicator of health and fitness. This is why athletes often have BMI values in the "overweight" range despite being in peak condition.',
    calculators: [
      { path: '/health/bmi', label: 'BMI Calculator' },
      { path: '/health/body-fat', label: 'Body Fat % Calculator' }
    ]
  },
  {
    id: '3',
    title: 'Smart Salary Negotiation: Know Your Worth',
    category: 'Career',
    excerpt: 'Practical strategies for negotiating a better salary and understanding the true value of your compensation package.',
    date: '2024-03-05',
    readTime: '7 min',
    content: 'Salary negotiation is one of the most impactful conversations you\'ll have in your career. Many people accept the first offer without realizing how much extra money they could earn over lifetime by negotiating. Research your market value, document your achievements, and approach the conversation professionally. Consider the entire compensation package including benefits, retirement contributions, and flexible work arrangements.',
    calculators: [
      { path: '/finance/salary', label: 'Salary Calculator' },
      { path: '/finance/tax', label: 'Income Tax Calculator' }
    ]
  },
  {
    id: '4',
    title: 'Retirement Planning: The Math Behind Your Numbers',
    category: 'Finance',
    excerpt: 'How to calculate your retirement number and create a realistic plan for financial independence.',
    date: '2024-02-28',
    readTime: '9 min',
    content: 'Retirement planning requires understanding how much money you\'ll need and how long it needs to last. The 4% rule suggests you can safely withdraw 4% of your retirement portfolio annually. To retire comfortably, you need to accumulate enough capital so that 4% of it covers your annual expenses. Start early, contribute consistently, and let compound interest do the heavy lifting.',
    calculators: [
      { path: '/finance/retirement', label: 'Retirement Calculator' },
      { path: '/finance/investment', label: 'Investment Growth Calculator' },
      { path: '/finance/compound-interest', label: 'Compound Interest Calculator' }
    ]
  },
  {
    id: '5',
    title: 'The Science of Weight Loss: Calories, Metabolism & More',
    category: 'Health',
    excerpt: 'Beyond calories - understand the complex factors that influence weight loss and sustainable lifestyle changes.',
    date: '2024-02-20',
    readTime: '10 min',
    content: 'Weight loss is fundamentally about caloric deficit, but the path to sustainable weight loss is more nuanced. Your metabolic rate, hormones, sleep quality, and stress levels all play important roles. Building muscle through exercise increases your resting metabolic rate. Adequate protein and regular strength training help preserve muscle during weight loss. The most sustainable approach combines sensible nutrition with regular physical activity and adequate sleep.',
    calculators: [
      { path: '/health/calories', label: 'Calorie Calculator' },
      { path: '/health/macro', label: 'Macro Calculator' },
      { path: '/health/tdee', label: 'TDEE Calculator' }
    ]
  },
  {
    id: '6',
    title: 'Emergency Fund Essentials: Building Your Financial Safety Net',
    category: 'Finance',
    excerpt: 'Why an emergency fund is crucial and how to build one that actually covers your needs.',
    date: '2024-02-15',
    readTime: '5 min',
    content: 'An emergency fund is money set aside for unexpected expenses - medical emergencies, job loss, or urgent repairs. Financial experts recommend keeping 3-6 months of living expenses in an easily accessible account. An emergency fund prevents you from going into debt when life happens. Start small if needed, but make building it a priority. Once established, your emergency fund provides peace of mind and financial stability.',
    calculators: [
      { path: '/finance/net-worth', label: 'Net Worth Calculator' },
      { path: '/finance/salary', label: 'Salary Calculator' }
    ]
  },
  {
    id: '7',
    title: 'Understanding Mortgage APR: More Than Just Interest Rate',
    category: 'Finance',
    excerpt: 'Demystifying Annual Percentage Rate and how it affects your mortgage costs.',
    date: '2024-02-10',
    readTime: '9 min',
    content: 'APR (Annual Percentage Rate) is an all-inclusive annualized cost indicator of a loan that includes interest plus fees and other charges. Many borrowers confuse APR with the interest rate, but they are different. The interest rate is the amount of compensation per period for borrowing money and includes the cost of principal only. APR, however, includes the interest rate plus other loan costs like origination fees, discount points, and PMI. For mortgage loans in the U.S., the Truth in Lending Act requires lenders to display APRs so borrowers can easily compare lending costs between competitors. Understanding APR helps you make informed borrowing decisions.',
    calculators: [
      { path: '/finance/mortgage', label: 'Mortgage Calculator' },
      { path: '/finance/loan', label: 'Loan EMI Calculator' }
    ]
  },
  {
    id: '8',
    title: 'Loan Calculator Guide: Understanding Your Monthly Payments',
    category: 'Finance',
    excerpt: 'How loan calculators work and why they\'re essential for comparing borrowing options.',
    date: '2024-02-05',
    readTime: '7 min',
    content: 'A loan calculator helps you understand the true cost of borrowing by showing monthly payments, total interest paid, and total loan cost. When comparing loans, examine the interest rate, loan term, and fees. A lower interest rate doesn\'t always mean the best deal if there are higher fees. Longer loan terms mean lower monthly payments but significantly more total interest paid. Use a calculator to explore different scenarios: the impact of different down payments, loan terms, and interest rates. This comparison helps you make an informed decision about which loan option fits your financial situation best.',
    calculators: [
      { path: '/finance/loan', label: 'Loan EMI Calculator' },
      { path: '/finance/mortgage', label: 'Mortgage Calculator' }
    ]
  },
  {
    id: '9',
    title: 'Percentage Calculations: From Discounts to Interest',
    category: 'Math',
    excerpt: 'Master percentages in everyday financial and shopping situations.',
    date: '2024-02-01',
    readTime: '6 min',
    content: 'Percentage calculations are everywhere in daily life. Shopping discounts: a 20% discount on a $100 item saves $20, leaving the final price at $80. Tipping: a 15% tip on a $60 bill equals $9. Interest calculations: simple or compound interest on savings or debt. Tax: sales tax or VAT increases the final price. Understanding percentages helps you make smart financial decisions. A percentage is simply a fraction of 100. When you see "25% off," it means 25 out of every 100 units are discounted. Use percentage calculators to verify calculations and ensure you\'re getting fair deals.',
    calculators: [
      { path: '/math/percentage', label: 'Percentage Calculator' },
      { path: '/tools/discount', label: 'Discount Calculator' },
      { path: '/tools/tip', label: 'Tip Calculator' }
    ]
  },
  {
    id: '10',
    title: 'VAT and Sales Tax Explained: What You Really Pay',
    category: 'Finance',
    excerpt: 'Understanding consumption taxes and how they affect the prices you pay.',
    date: '2024-01-28',
    readTime: '6 min',
    content: 'Value-Added Tax (VAT) is a consumption tax collected at each stage of the production and distribution chain. It\'s used in over 170 countries and is a major government revenue source. VAT rates vary by country and product type, typically ranging from 5% to 27%. In the U.S., sales tax is similar but applied only at the final retail sale. The key difference is that VAT is collected incrementally through the supply chain, with each stage adding VAT on the value they add. When you buy a product with VAT, the final price you pay includes all accumulated VAT. Understanding VAT helps you calculate true product costs and understand tax obligations.',
    calculators: [
      { path: '/finance/vat', label: 'VAT Calculator' },
      { path: '/finance/tax', label: 'Income Tax Calculator' }
    ]
  },
  {
    id: '11',
    title: 'Currency Conversion Basics: Exchange Rates Explained',
    category: 'Finance',
    excerpt: 'Understanding foreign exchange rates and how to convert currencies accurately.',
    date: '2024-01-20',
    readTime: '6 min',
    content: 'Exchange rates determine how much of one currency you can get for another. They fluctuate daily based on market factors like interest rates, inflation, and political stability. When traveling or conducting international business, understanding exchange rates helps you get the best value. Bank exchange rates differ from market rates - banks add a markup called the spread. Online currency converters provide real-time rates but may still include small fees. Always compare multiple sources when converting large amounts. Historical rate tracking helps you identify the best times to exchange currency for international transactions.',
    calculators: [
      { path: '/tools/currency', label: 'Currency Converter' }
    ]
  },
  {
    id: '12',
    title: 'Fuel Economy and Mileage: Calculate True Transportation Costs',
    category: 'Tools',
    excerpt: 'Understanding fuel consumption to make informed vehicle and travel decisions.',
    date: '2024-01-15',
    readTime: '5 min',
    content: 'Fuel economy is typically measured in miles per gallon (MPG) in the U.S. or liters per 100km in other countries. Calculating actual fuel costs helps you understand the true cost of vehicle ownership. Aggressive acceleration, idling, and highway driving at high speeds reduce efficiency. Regular maintenance maintains fuel economy - proper tire pressure and engine condition significantly impact consumption. For long trips, calculating fuel costs helps you budget accurately. Comparing vehicles by fuel economy reveals significant long-term cost differences. Electric vehicles have zero fuel costs but electricity costs and charging time to consider.',
    calculators: [
      { path: '/tools/fuel', label: 'Fuel Economy Calculator' }
    ]
  },
  {
    id: '13',
    title: 'Macronutrient Balance: Getting Your Calories from the Right Sources',
    category: 'Health',
    excerpt: 'Understand proteins, carbs, and fats to support your fitness and health goals.',
    date: '2024-01-10',
    readTime: '7 min',
    content: 'Macronutrients - proteins, carbohydrates, and fats - are the three calorie sources your body needs. Protein builds and repairs muscle, contains 4 calories per gram, and requires more energy to digest. Carbohydrates fuel your brain and muscles, contain 4 calories per gram, and range from simple sugars to complex starches. Fats support hormone production and absorption of fat-soluble vitamins, contain 9 calories per gram. Optimal macronutrient ratio depends on your goals. Athletes often aim for higher protein (0.7-1g per pound of body weight). Low-carb diets restrict carbohydrates while emphasizing protein and fats. Most health experts recommend a balanced approach: 40-50% carbohydrates, 25-35% fat, and 15-25% protein, adjusted for individual goals.',
    calculators: [
      { path: '/health/macro', label: 'Macro Calculator' },
      { path: '/health/calories', label: 'Calorie Calculator' },
      { path: '/health/tdee', label: 'TDEE Calculator' }
    ]
  },
  {
    id: '14',
    title: 'Profit Margin vs Markup: Essential Business Math',
    category: 'Career',
    excerpt: 'Understanding the difference between profit margin and markup for business pricing.',
    date: '2024-01-05',
    readTime: '5 min',
    content: 'Profit margin and markup are often confused but measure different things. Markup is the percentage increase from cost to selling price. Profit margin is the percentage of revenue that represents profit. If you buy an item for $10 and sell it for $15, you have a 50% markup ($5 increase on $10 cost) but only 33% profit margin ($5 profit on $15 revenue). For small businesses, understanding the difference prevents pricing errors that cut into profitability. Using profit margin helps you understand actual profitability relative to revenue. Tracking both metrics provides valuable business insights.',
    calculators: [
      { path: '/math/percentage', label: 'Percentage Calculator' },
      { path: '/finance/profit', label: 'Profit Calculator' }
    ]
  },
  {
    id: '15',
    title: 'Sleep Science: How Rest Impacts Your Health and Fitness Goals',
    category: 'Health',
    excerpt: 'Understanding sleep\'s crucial role in recovery, performance, and long-term health.',
    date: '2023-12-30',
    readTime: '8 min',
    content: 'Sleep is when your body repairs itself and consolidates learning. Most adults need 7-9 hours of quality sleep nightly. During sleep, your body releases growth hormone essential for muscle repair and recovery. Deep sleep (stages 3) is most restorative and crucial for physical recovery. REM sleep is important for mental health and memory consolidation. Inadequate sleep increases hunger hormones and cravings for unhealthy foods, making weight management harder. Regular sleep schedule supports hormonal balance and circadian rhythm. Poor sleep impairs athletic performance and increases injury risk. Prioritizing sleep is often overlooked but fundamental to health and fitness success.',
    calculators: [
      { path: '/health/sleep', label: 'Sleep Calculator' },
      { path: '/health/tdee', label: 'TDEE Calculator' }
    ]
  }
]

const CATEGORIES = ['All', 'Finance', 'Health', 'Career']

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const filteredArticles = selectedCategory === 'All' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === selectedCategory)

  return (
    <div className="min-h-screen bg-bg">
      <Link href="/" className="inline-flex items-center gap-2 text-accent hover:opacity-80 pt-4 px-4 md:pt-6 md:px-6">
        <span>←</span> Back to Calculators
      </Link>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-10 h-10 text-accent" />
          <h1 className="text-4xl md:text-5xl font-space-mono font-bold text-text">Educational Articles</h1>
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

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredArticles.map(article => (
            <button
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-surface border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="inline-block bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded">
                  {article.category}
                </span>
                <span className="text-xs text-muted">{article.readTime}</span>
              </div>
              <h3 className="text-xl font-space-mono font-bold text-text mb-2">{article.title}</h3>
              <p className="text-muted text-sm mb-4">{article.excerpt}</p>
              <span className="text-xs text-muted">{new Date(article.date).toLocaleDateString()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-center justify-between">
              <div>
                <span className="inline-block bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded mb-2">
                  {selectedArticle.category}
                </span>
                <h2 className="text-2xl font-space-mono font-bold text-text">{selectedArticle.title}</h2>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-2xl text-muted hover:text-text"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-muted mb-6 pb-6 border-b border-border">
                <span>{new Date(selectedArticle.date).toLocaleDateString()}</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div className="prose prose-invert max-w-none text-text">
                <p className="text-lg leading-relaxed mb-4">{selectedArticle.content}</p>
              </div>

              {selectedArticle.calculators && selectedArticle.calculators.length > 0 && (
                <div className="border-t border-border pt-6 mt-6">
                  <h4 className="text-sm font-bold text-text mb-4">Related Calculators</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedArticle.calculators.map((calc, idx) => (
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
                  onClick={() => setSelectedArticle(null)}
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
