import Link from 'next/link'
import { Droplet, CheckCircle, AlertCircle } from 'lucide-react'
import { BlogImage } from '../../components/BlogImage'

export const metadata = {
  title: 'Water Intake Calculator Guide: Daily Hydration Requirements',
  description: 'Learn how much water you should drink daily. Complete guide with calculator, examples, common mistakes, and FAQs for optimal hydration.',
  keywords: 'water intake, daily water intake, how much water to drink, hydration, water consumption',
}

export default function WaterIntakeGuide() {
  return (
    <article className="min-h-screen bg-bg">
      {/* Breadcrumb Navigation */}
      <nav className="bg-bg-secondary border-b border-border px-4 py-3" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto text-sm text-text-secondary">
          <Link href="/" className="text-accent hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/health" className="text-accent hover:underline">Health</Link>
          <span className="mx-2">/</span>
          <span className="text-text">Water Intake Guide</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Droplet className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-text">
              Water Intake Calculator Guide: How Much Water Should You Drink Daily?
            </h1>
          </div>
          <p className="text-lg text-text-secondary mb-4">
            Proper hydration is essential for health, but most people don't drink enough water. Learn exactly how much water you need and how to stay hydrated.
          </p>
          <p className="text-sm text-text-tertiary">
            Last updated: April 2026 | Reading time: 8 minutes
          </p>
        </header>

        {/* Featured Image */}
        <BlogImage
          title="Water Intake Calculator Guide Daily Hydration"
          category="health"
          tags={['water', 'hydration', 'health', 'wellness']}
          type="featured"
          className="mb-12"
        />

        {/* Table of Contents */}
        <aside className="bg-bg-secondary border-l-4 border-l-blue-500 p-6 mb-12 rounded">
          <h2 className="text-xl font-bold mb-4 text-text">Quick Navigation</h2>
          <ul className="space-y-2 text-text-secondary">
            <li><a href="#what-is" className="text-accent hover:underline">What is Water Intake?</a></li>
            <li><a href="#how-it-works" className="text-accent hover:underline">How Water Intake Works</a></li>
            <li><a href="#formula" className="text-accent hover:underline">The Formula & Examples</a></li>
            <li><a href="#mistakes" className="text-accent hover:underline">Common Mistakes</a></li>
            <li><a href="#tips" className="text-accent hover:underline">Hydration Tips</a></li>
            <li><a href="#faqs" className="text-accent hover:underline">FAQs</a></li>
          </ul>
        </aside>

        {/* What is Water Intake */}
        <section id="what-is" className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-text">What is Water Intake?</h2>
          <p className="text-lg text-text-secondary mb-4">
            Water intake refers to the amount of water your body needs to consume daily to maintain optimal health and function. Unlike calories or macronutrients, water doesn't provide energy, but it's absolutely critical for:
          </p>
          <ul className="space-y-2 mb-6 text-text-secondary">
            <li className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span><strong>Temperature regulation:</strong> Sweating and perspiration cool your body during exercise and heat</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span><strong>Nutrient transport:</strong> Water carries vitamins, minerals, and glucose to your cells</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span><strong>Waste removal:</strong> Helps kidneys filter waste and maintain proper pH balance</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span><strong>Joint lubrication:</strong> Maintains cartilage and keeps joints flexible</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span><strong>Brain function:</strong> Even mild dehydration reduces focus, memory, and mood</span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            The common "8 glasses a day" recommendation is actually outdated. Your water needs depend on your body weight, activity level, climate, and overall health.
          </p>
        </section>

        {/* Inline Image 1 */}
        <BlogImage
          title="Water Hydration Health Benefits"
          category="health"
          tags={['water', 'hydration', 'benefits']}
          type="inline"
          className="mb-12"
        />

        {/* How Water Intake Works */}
        <section id="how-it-works" className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-text">How Water Intake Requirements Work</h2>
          <p className="text-lg text-text-secondary mb-6">
            Medical professionals use a simple formula to calculate your daily water intake based on body weight. This method, endorsed by the National Academies of Sciences, Engineering, and Medicine, is more accurate than generic recommendations.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 pp-6 mb-8 rounded-lg">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-3">Basic Formula:</h3>
            <p className="text-blue-900 dark:text-blue-100 font-mono text-lg">Body Weight (lbs) ÷ 2 = Daily Water in Ounces</p>
            <p className="text-sm text-blue-800 dark:text-blue-300 mt-3">Or in metric: Body Weight (kg) × 0.033 = Daily Water in Liters</p>
          </div>

          <p className="text-text-secondary mb-4">
            However, your actual needs may be higher based on several factors:
          </p>

          <table className="w-full border-collapse mb-8">
            <thead>
              <tr className="bg-bg-secondary">
                <th className="border border-border p-3 text-left text-text font-bold">Factor</th>
                <th className="border border-border p-3 text-left text-text font-bold">Additional Water Needed</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-bg-secondary transition">
                <td className="border border-border p-3 text-text-secondary">Regular Exercise</td>
                <td className="border border-border p-3 text-text-secondary">Add 12-16 oz per 30 mins of activity</td>
              </tr>
              <tr className="hover:bg-bg-secondary transition">
                <td className="border border-border p-3 text-text-secondary">Hot/Humid Climate</td>
                <td className="border border-border p-3 text-text-secondary">Increase by 1-2 liters daily</td>
              </tr>
              <tr className="hover:bg-bg-secondary transition">
                <td className="border border-border p-3 text-text-secondary">Pregnancy/Breastfeeding</td>
                <td className="border border-border p-3 text-text-secondary">Add 2.5 cups (600ml) daily</td>
              </tr>
              <tr className="hover:bg-bg-secondary transition">
                <td className="border border-border p-3 text-text-secondary">Illness/Fever</td>
                <td className="border border-border p-3 text-text-secondary">Add 1-2 liters depending on severity</td>
              </tr>
              <tr className="hover:bg-bg-secondary transition">
                <td className="border border-border p-3 text-text-secondary">High Altitude</td>
                <td className="border border-border p-3 text-text-secondary">Increase by 1-1.5 liters daily</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Step-by-Step Example */}
        <section id="formula" className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-text">Step-by-Step Example: Calculate Your Daily Water Intake</h2>

          <div className="bg-bg-secondary p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-4 text-text">Scenario: Sarah's Daily Water Needs</h3>
            <p className="text-text-secondary mb-4"><strong>Background:</strong> Sarah weighs 140 lbs, exercises 4 days a week, lives in a temperate climate.</p>

            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <div>
                  <p className="font-bold text-text">Calculate base water intake</p>
                  <p className="text-text-secondary">140 lbs ÷ 2 = <strong>70 oz/day</strong></p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <div>
                  <p className="font-bold text-text">Add water for exercise (3-4 days/week)</p>
                  <p className="text-text-secondary">Average 30-45 mins per session: +40 oz = <strong>110 oz/day average</strong></p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <div>
                  <p className="font-bold text-text">Final recommendation</p>
                  <p className="text-text-secondary"><strong>14-15 cups of water per day</strong> (or about 1 gallon)</p>
                </div>
              </li>
            </ol>
          </div>

          <p className="text-text-secondary mb-4">
            <strong>Pro tip:</strong> Use our <Link href="/health/water-intake" className="text-accent hover:underline">water intake calculator</Link> to instantly find your personalized recommendation based on your weight and activity level.
          </p>
        </section>

        {/* Common Mistakes */}
        <section id="mistakes" className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-text">Common Mistakes People Make with Hydration</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20 p-6 rounded">
              <h3 className="font-bold text-lg text-red-900 dark:text-red-200 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Mistake 1: Only Drinking When Thirsty
              </h3>
              <p className="text-red-800 dark:text-red-300 mb-3">
                Thirst is a late indicator of dehydration. By the time you feel thirsty, you're already mildly dehydrated, which affects cognitive function and physical performance.
              </p>
              <p className="text-sm text-red-700 dark:text-red-400"><strong>Fix:</strong> Drink water consistently throughout the day, not just when you feel thirsty.</p>
            </div>

            <div className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20 p-6 rounded">
              <h3 className="font-bold text-lg text-red-900 dark:text-red-200 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Mistake 2: Relying on Caffeinated Drinks
              </h3>
              <p className="text-red-800 dark:text-red-300 mb-3">
                Coffee, tea, and energy drinks contain caffeine, which is a mild diuretic. While they contribute some hydration, they shouldn't be your primary water source.
              </p>
              <p className="text-sm text-red-700 dark:text-red-400"><strong>Fix:</strong> Count only plain water and unsweetened beverages toward your daily intake.</p>
            </div>

            <div className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20 p-6 rounded">
              <h3 className="font-bold text-lg text-red-900 dark:text-red-200 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Mistake 3: Drinking Too Much Water Too Quickly
              </h3>
              <p className="text-red-800 dark:text-red-300 mb-3">
                Consuming excessive water in a short period can cause hyponatremia (low sodium), leading to nausea, confusion, and even seizures. This is rare but serious.
              </p>
              <p className="text-sm text-red-700 dark:text-red-400"><strong>Fix:</strong> Spread your water intake throughout the day. Aim for 200-300ml every 15-20 minutes during exercise.</p>
            </div>

            <div className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20 p-6 rounded">
              <h3 className="font-bold text-lg text-red-900 dark:text-red-200 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Mistake 4: Ignoring Individual Needs
              </h3>
              <p className="text-red-800 dark:text-red-300 mb-3">
                "8 glasses a day" isn't one-size-fits-all. A 120 lb sedentary person needs far less than a 200 lb athlete in a hot environment.
              </p>
              <p className="text-sm text-red-700 dark:text-red-400"><strong>Fix:</strong> Calculate your personal water needs based on weight and lifestyle.</p>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section id="tips" className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-text">7 Practical Tips to Stay Properly Hydrated</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-green-900 dark:text-green-200 mb-2">1. Start Your Day with Water</h3>
              <p className="text-green-800 dark:text-green-300 text-sm">Drink 16-20 oz of water immediately after waking to rehydrate after 8 hours of sleep.</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-green-900 dark:text-green-200 mb-2">2. Drink Water Before Meals</h3>
              <p className="text-green-800 dark:text-green-300 text-sm">Drinking water 20-30 minutes before eating aids digestion and helps prevent overeating.</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-green-900 dark:text-green-200 mb-2">3. Use a Water Bottle Tracker</h3>
              <p className="text-green-800 dark:text-green-300 text-sm">Get a 1-liter water bottle and aim to refill it 2-3 times daily. Visual tracking increases consistency.</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-green-900 dark:text-green-200 mb-2">4. Infuse Your Water</h3>
              <p className="text-green-800 dark:text-green-300 text-sm">Add lemon, cucumber, or berries for flavor without added sugars or calories. Makes hydration more enjoyable.</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-green-900 dark:text-green-200 mb-2">5. Monitor Urine Color</h3>
              <p className="text-green-800 dark:text-green-300 text-sm">Pale yellow = well hydrated. Dark yellow = dehydrated. Adjust intake accordingly.</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-green-900 dark:text-green-200 mb-2">6. Drink During Exercise</h3>
              <p className="text-green-800 dark:text-green-300 text-sm">For activities over 60 minutes, drink 200-300ml every 15-20 minutes to maintain performance.</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-green-900 dark:text-green-200 mb-2">7. Set Phone Reminders</h3>
              <p className="text-green-800 dark:text-green-300 text-sm">Set hourly reminders until drinking water becomes a habit. Most people need 2-3 weeks to build the habit.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-text">Frequently Asked Questions About Water Intake</h2>

          <div className="space-y-6">
            <details className="group border border-border rounded-lg p-6 cursor-pointer hover:bg-bg-secondary transition">
              <summary className="flex justify-between items-center font-bold text-text">
                <span>Is drinking too much water dangerous?</span>
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-text-secondary mt-4">
                In rare cases, yes. Hyponatremia occurs when sodium levels drop too low due to excessive water consumption without electrolyte replacement. This mainly affects endurance athletes. For daily hydration, drinking your calculated amount plus a little extra is safe for most people. The key is spreading intake throughout the day rather than chugging large amounts at once.
              </p>
            </details>

            <details className="group border border-border rounded-lg p-6 cursor-pointer hover:bg-bg-secondary transition">
              <summary className="flex justify-between items-center font-bold text-text">
                <span>Do I need to drink pure water, or can other beverages count?</span>
              </summary>
              <p className="text-text-secondary mt-4">
                While tea, coffee, and milk contain water and can contribute to hydration, plain water is ideal because it doesn't contain added sugars or caffeine. For your primary water intake, aim for plain water. Other beverages can supplement but shouldn't be your main source. Avoid sugary drinks and soft drinks as your primary hydration method.
              </p>
            </details>

            <details className="group border border-border rounded-lg p-6 cursor-pointer hover:bg-bg-secondary transition">
              <summary className="flex justify-between items-center font-bold text-text">
                <span>How do I know if I'm drinking enough water?</span>
              </summary>
              <p className="text-text-secondary mt-4">
                The easiest indicator is urine color. Pale or clear urine means you're well-hydrated; dark yellow indicates dehydration. You should also feel alert and focused. If you experience headaches, dry mouth, or fatigue, increase your water intake. Using our water intake calculator ensures you're hitting the right target for your body and lifestyle.
              </p>
            </details>

            <details className="group border border-border rounded-lg p-6 cursor-pointer hover:bg-bg-secondary transition">
              <summary className="flex justify-between items-center font-bold text-text">
                <span>Do elderly people need the same amount of water?</span>
              </summary>
              <p className="text-text-secondary mt-4">
                Elderly individuals often have a reduced thirst sensation, making them more prone to dehydration. The basic formula (body weight ÷ 2) still applies, but seniors should be more intentional about drinking water regularly. They may need less if they have certain kidney conditions, so consulting a doctor is recommended. Conditions like diabetes or taking diuretics also affect water needs.
              </p>
            </details>

            <details className="group border border-border rounded-lg p-6 cursor-pointer hover:bg-bg-secondary transition">
              <summary className="flex justify-between items-center font-bold text-text">
                <span>Does food contribute to my daily water intake?</span>
              </summary>
              <p className="text-text-secondary mt-4">
                Yes! About 20% of daily water intake typically comes from food, especially fruits and vegetables (watermelon 92%, cucumber 96%, strawberries 91%). However, this varies based on diet. The water intake calculator typically provides recommendations for drinking water, and food provides additional hydration on top of this. If you eat lots of fruits and vegetables, you may need slightly less drinking water.
              </p>
            </details>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-300 dark:border-blue-700 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-text mb-4">Calculate Your Personal Water Intake</h2>
          <p className="text-text-secondary mb-6">
            Instead of guessing, use our accurate water intake calculator to determine your exact daily hydration requirements based on your weight and activity level. It takes just 10 seconds!
          </p>
          <Link 
            href="/health/water-intake"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Go to Water Intake Calculator →
          </Link>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-text">Final Thoughts</h2>
          <p className="text-text-secondary mb-4">
            Proper hydration is one of the simplest yet most impactful health habits you can develop. By understanding your personal water needs—using factors like body weight, activity level, and climate—you can optimize your hydration and experience improved energy, focus, and overall health.
          </p>
          <p className="text-text-secondary mb-4">
            The takeaway: Stop following generic "8 glasses" advice. Calculate your personal requirement, spread your water intake throughout the day, and monitor your urine color to ensure you're hitting the mark. Your body will thank you.
          </p>
          <p className="text-text-secondary font-semibold">
            Start hydrating smarter today with our water intake calculator! 💧
          </p>
        </section>

        {/* Related Calculators */}
        <section className="mt-16 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-6 text-text">Related Health Calculators</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/health/bmi" className="p-4 bg-bg-secondary hover:bg-accent/10 rounded-lg transition border border-border">
              <h3 className="font-bold text-text text-lg mb-2">BMI Calculator</h3>
              <p className="text-text-secondary text-sm">Calculate your Body Mass Index and understand your health metrics</p>
            </Link>
            <Link href="/health/calories" className="p-4 bg-bg-secondary hover:bg-accent/10 rounded-lg transition border border-border">
              <h3 className="font-bold text-text text-lg mb-2">Calorie Calculator</h3>
              <p className="text-text-secondary text-sm">Find your daily calorie needs for weight loss or gain</p>
            </Link>
            <Link href="/health/macro" className="p-4 bg-bg-secondary hover:bg-accent/10 rounded-lg transition border border-border">
              <h3 className="font-bold text-text text-lg mb-2">Macro Calculator</h3>
              <p className="text-text-secondary text-sm">Get personalized macronutrient recommendations</p>
            </Link>
            <Link href="/health/sleep" className="p-4 bg-bg-secondary hover:bg-accent/10 rounded-lg transition border border-border">
              <h3 className="font-bold text-text text-lg mb-2">Sleep Calculator</h3>
              <p className="text-text-secondary text-sm">Determine optimal sleep duration for your age</p>
            </Link>
          </div>
        </section>
      </div>
    </article>
  )
}
