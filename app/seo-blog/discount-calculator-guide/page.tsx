'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function DiscountCalculatorGuidePage() {
  return (
    <article className="min-h-screen bg-bg">
      <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:opacity-80 pt-4 px-4 md:pt-6 md:px-6">
        <span>←</span> Back to Blog
      </Link>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <span className="inline-block bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded mb-4">Money Saving Tools</span>
          <h1 className="text-4xl md:text-5xl font-space-mono font-bold text-text mb-4">
            Discount Calculator: How to Find Real Deals While Shopping
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>By Smart Shopper</span>
            <span>•</span>
            <span>April 2024</span>
            <span>•</span>
            <span>8 min read</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-text">
          
          <section>
            <p className="text-lg leading-relaxed font-medium">
              Retail stores use math as a weapon. Stores advertise discounts, but do you know if they're really good deals? Most people guess—and lose money. Savvy shoppers use calculation. A discount calculator turns you into a master deal-hunter, helping you spot real savings versus marketing tricks.
            </p>
            
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
              <p className="text-sm font-medium text-accent mb-2">🛍️ Calculate Your Savings:</p>
              <p className="text-sm"><Link href="/tools/discount" className="text-accent hover:underline">Use our free discount calculator →</Link> to find the real sale price instantly.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Why Most People Get Discounts Wrong</h2>
            <p className="text-base leading-relaxed mt-4">
              Your brain isn't built for fast percentage calculations. When a store shows "30% OFF," most shoppers feel excited and buy. But they don't actually calculate the final price. This is exactly what retailers want.
            </p>
            
            <div className="bg-surface border-l-4 border-accent rounded-lg p-4 my-6">
              <p className="text-sm">Example: A $50 jacket at 30% off</p>
              <p className="text-xs text-muted mt-2">Quick guess? Most say "$35" or "$38"</p>
              <p className="text-xs text-muted">Actual price? $35 (only 5 people out of 100 calculate correctly)</p>
            </div>

            <p className="text-base leading-relaxed mt-4">
              But knowing how to calculate discounts correctly can save you hundreds annually. Each purchase where you verify the discount is money in your pocket.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">The Discount Calculation Formula</h2>
            
            <div className="bg-surface border border-border rounded-lg p-6 my-6 font-mono text-sm">
              <p className="mb-4 font-bold text-accent">Final Price = Original Price × (1 - Discount %)</p>
              <p className="text-xs mb-3 text-muted">Or step-by-step:</p>
              <ul className="text-xs space-y-2">
                <li>1) Discount Amount = Original Price × Discount %</li>
                <li>2) Final Price = Original Price - Discount Amount</li>
              </ul>
              <p className="text-xs mt-4 text-muted border-t border-border pt-4 font-normal">Example: $100 item with 25% discount</p>
              <p className="text-xs text-muted mt-2">Discount Amount = $100 × 0.25 = $25</p>
              <p className="text-xs text-muted">Final Price = $100 - $25 = $75</p>
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
              <p className="text-sm font-medium text-accent mb-2">💡 Smart Shopping Tip:</p>
              <p className="text-sm">Always calculate the final price before deciding. A 30% discount on a $200 item is different from 30% off a $50 item—the percentage looks the same, but the actual savings differ wildly.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">How to Use a Discount Calculator</h2>
            
            <h3 className="text-xl font-bold text-text mt-6">Step 1: Know the Original Price</h3>
            <p className="text-base leading-relaxed">
              Check the tag or receipt. This is the starting price before any discount.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Step 2: Find the Discount Percentage</h3>
            <p className="text-base leading-relaxed">
              Look at signs, email promotions, or coupon codes. Stores must clearly state the discount percentage.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Step 3: Input Both Numbers</h3>
            <p className="text-base leading-relaxed">
              Enter the original price and discount percentage into your calculator.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Step 4: Get the Final Price Instantly</h3>
            <p className="text-base leading-relaxed">
              The calculator shows you the actual amount you'll pay and how much you're saving.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Step 5: Compare Multiple Options</h3>
            <p className="text-base leading-relaxed">
              Compare discounted prices across stores to find the real best deal.
            </p>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
              <p className="text-sm font-medium text-accent mb-2">🎯 Compare Deals Now:</p>
              <p className="text-sm"><Link href="/tools/discount" className="text-accent hover:underline">Use our discount calculator →</Link> to compare prices across multiple stores.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Real-World Examples: Finding True Deals</h2>
            
            <h3 className="text-xl font-bold text-text mt-6">Scenario 1: Black Friday Confusion</h3>
            <div className="bg-surface border border-border rounded-lg p-4 my-6">
              <p className="font-bold text-text mb-2">Store A: "40% OFF Electronics"</p>
              <p className="text-sm text-muted mb-4">A $500 laptop at 40% off:</p>
              <ul className="text-sm space-y-1 text-muted">
                <li>Discount: $500 × 0.40 = $200</li>
                <li><strong>Final Price: $300</strong></li>
              </ul>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4 my-6">
              <p className="font-bold text-text mb-2">Store B: "30% OFF + Extra 15% for Members"</p>
              <p className="text-sm text-muted mb-4">Same $500 laptop with both discounts:</p>
              <ul className="text-sm space-y-1 text-muted">
                <li>After 30% off: $500 × 0.70 = $350</li>
                <li>After 15% member discount: $350 × 0.85 = $297.50</li>
                <li><strong>Final Price: $297.50</strong></li>
              </ul>
            </div>

            <p className="text-base leading-relaxed">
              Without calculation, Store A's 40% looks better. But Store B saves you $2.50 more. On large purchases, these details compound quickly.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Scenario 2: Coupon Code Comparison</h3>
            <div className="bg-surface border border-border rounded-lg p-4 my-6">
              <p className="font-bold text-text mb-2">Option A: "SAVE20" - 20% off</p>
              <p className="text-sm text-muted mb-2">$150 order × 0.20 = $30 savings | <strong>Pay: $120</strong></p>
              
              <p className="font-bold text-text mb-2 mt-4">Option B: "FLAT30" - Flat $30 off</p>
              <p className="text-sm text-muted mb-2">$150 order - $30 = <strong>Pay: $120</strong></p>
            </div>

            <p className="text-base leading-relaxed">
              Both codes save the same amount here. But on a $200 order, Option A saves $40 while Option B only saves $30. Always calculate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Discount Shopping Strategies</h2>
            
            <h3 className="text-xl font-bold text-text mt-6">1. Stack Your Discounts (When Allowed)</h3>
            <p className="text-base leading-relaxed">
              Some retailers allow multiple codes. Apply percentage discounts first, then flat-amount coupons, to maximize savings.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">2. Watch for Hidden Markups</h3>
            <p className="text-base leading-relaxed">
              Stores sometimes raise prices before marking them down. A $100 item increased to $150, then "discounted" 30% becomes $105—a fake deal.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">3. Compare Original Prices Across Retailers</h3>
            <p className="text-base leading-relaxed">
              A 50% discount on an expensive store's item might cost more than a full-price item at a cheaper store.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">4. Calculate Loyalty Program Savings</h3>
            <p className="text-base leading-relaxed">
              Many stores give members percentage discounts. Compare the final price with the loyalty benefit included.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">5. Factor in Shipping Costs</h3>
            <p className="text-base leading-relaxed">
              An online discount might disappear once you add shipping. Always calculate total price, not just the item discount.
            </p>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
              <p className="text-sm font-medium text-accent mb-2">🛒 Master Deal Hunting:</p>
              <p className="text-sm"><Link href="/tools/discount" className="text-accent hover:underline">Use our calculator →</Link> for every online purchase and black-tag item in-store.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Common Discounting Tactics Retailers Use</h2>
            
            <h3 className="text-xl font-bold text-text mt-6">The Anchoring Trick</h3>
            <p className="text-base leading-relaxed">
              Stores display inflated "original prices" so the discount looks huge. Always verify the real MSRP before the sale started.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Bulk Discounts That Aren't</h3>
            <p className="text-base leading-relaxed">
              "Buy 3 for 20% off" might be less than buying them individually at regular price elsewhere. Calculate each option.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Percentage vs. Fixed Amount</h3>
            <p className="text-base leading-relaxed">
              Stores use whichever discount type benefits them most. On expensive items, percentage discounts help the store. On cheap items, fixed discounts are actually better for them.
            </p>

            <div className="bg-surface border border-border rounded-lg p-4 my-6">
              <p className="text-sm"><strong>Pro Tip:</strong> Never trust your gut on discounts. Your brain's intuition about percentages is usually wrong. Always use a calculator.</p>
            </div>
          </section>

          {/* Section - Seasonal Discounts */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">When to Shop: Seasonal Discount Patterns Throughout the Year</h2>
            
            <h3 className="text-xl font-bold text-text mt-6">January: Post-Holiday Clearance</h3>
            <p className="text-base leading-relaxed">
              After holiday shopping, retailers clear inventory. Expect 40-70% off holiday items, winter clothing, and gift items. This is one of the best sale periods of the year.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">May-June: Summer Preparation Sales</h3>
            <p className="text-base leading-relaxed">
              Spring clothing gets discounted as summer inventory arrives. You'll see 25-50% off spring/summer transition fashion and home goods.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">July-August: Peak Summer Clearance</h3>
            <p className="text-base leading-relaxed">
              Back-to-school sales dominate. Kids' items, office supplies, and clothing see significant discounts (30-60% in many categories).
            </p>

            <h3 className="text-xl font-bold text-text mt-6">September-October: Fall Inventory Changes</h3>
            <p className="text-base leading-relaxed">
              Summer clearance deepens, and fall inventory begins. Watch for 40-60% off summer items as retailers make space for fall merchandise.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">November: Black Friday & Cyber Monday</h3>
            <p className="text-base leading-relaxed">
              The biggest sale event. Discounts range from 25-70% depending on category. Use a discount calculator intensively during this period—deals are everywhere but so are marketing tricks.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">December: Holiday Sales & Final Clearance</h3>
            <p className="text-base leading-relaxed">
              Holiday shopping + year-end clearance creates opportunities. Expect 20-50% off many items as retailers try to clear inventory before year-end.
            </p>

            <div className="bg-surface border border-border rounded-lg p-4 my-6">
              <p className="text-sm"><strong>Best Times to Save:</strong></p>
              <ul className="text-sm mt-2 space-y-1">
                <li>✓ Clothing: January, July, October</li>
                <li>✓ Home Goods: January, July</li>
                <li>✓ Electronics: Black Friday, Cyber Monday</li>
                <li>✓ Office Supplies: August (back-to-school)</li>
              </ul>
            </div>
          </section>

          {/* Section - Online vs In-Store */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Online vs. In-Store Discounts: Where to Actually Find Better Deals</h2>
            
            <h3 className="text-xl font-bold text-text mt-6">Online Shopping Advantages</h3>
            <ul className="list-disc list-inside space-y-2 mt-4 text-base">
              <li>Price transparency - easily compare across retailers</li>
              <li>Coupon codes - stacks of codes available online</li>
              <li>Price match policies - many retailers match competitor prices</li>
              <li>No sales tax in some states (tax saving is effectively a discount)</li>
              <li>Wider selection - access to more items in different sizes/colors</li>
            </ul>

            <h3 className="text-xl font-bold text-text mt-6">Online Shopping Disadvantages</h3>
            <ul className="list-disc list-inside space-y-2 mt-4 text-base">
              <li>Shipping costs - can eliminate or reduce discount impact</li>
              <li>Free shipping minimums - force you to buy more to qualify</li>
              <li>Return complications - shipping returns back costs money</li>
              <li>Longer delivery - can't use item immediately</li>
              <li>Sale timing - sales may end before delivery arrives</li>
            </ul>

            <h3 className="text-xl font-bold text-text mt-6">In-Store Shopping Advantages</h3>
            <ul className="list-disc list-inside space-y-2 mt-4 text-base">
              <li>Immediate use - take home today</li>
              <li>Physical inspection - see quality before buying</li>
              <li>No shipping costs - discount isn't reduced by delivery fees</li>
              <li>Easy returns - physical store location makes returns simple</li>
              <li>Clearance aisle surprises - manager markdowns you won't find online</li>
            </ul>

            <h3 className="text-xl font-bold text-text mt-6">In-Store Shopping Disadvantages</h3>
            <ul className="list-disc list-inside space-y-2 mt-4 text-base">
              <li>Limited selection - less variety than online</li>
              <li>Harder to compare - need to visit multiple stores</li>
              <li>Impulse buying - in-store environment encourages unplanned purchases</li>
              <li>Time investment - traveling and shopping takes time</li>
              <li>Inventory gaps - popular sizes/colors often sold out</li>
            </ul>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
              <p className="text-sm font-medium text-accent mb-2">💡 Pro Strategy:</p>
              <p className="text-sm">Check online prices with a discount calculator BEFORE going to the store. If the online price (including shipping) is better, buy online. Otherwise, head to the physical store to inspect and buy immediately.</p>
            </div>
          </section>

          {/* Section - Annual Savings */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Calculate Your Annual Savings: A Year of Smart Shopping</h2>
            
            <p className="text-base leading-relaxed">
              If you use a discount calculator consistently, you avoid common discount miscalculation mistakes. Here's what realistic savings look like:
            </p>

            <div className="bg-surface border border-border rounded-lg p-6 my-6">
              <p className="font-bold text-text mb-3">Average American Spending & Potential Savings</p>
              
              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <p className="text-sm"><strong>Monthly Clothing:</strong> $150</p>
                  <p className="text-xs text-muted mt-1">Typical discount error margin: 5-10%</p>
                  <p className="text-xs text-muted">Annual overspend: $90-180 (if you use calculator: $0)</p>
                  <p className="text-xs text-accent font-semibold mt-1">SAVE: $90-180/year</p>
                </div>

                <div className="pb-4 border-b border-border">
                  <p className="text-sm"><strong>Electronics (quarterly purchases):</strong> $400/year</p>
                  <p className="text-xs text-muted mt-1">High ticket items have 10-15% miscalculation errors</p>
                  <p className="text-xs text-muted">Annual overspend: $40-60</p>
                  <p className="text-xs text-accent font-semibold mt-1">SAVE: $40-60/year</p>
                </div>

                <div className="pb-4 border-b border-border">
                  <p className="text-sm"><strong>Groceries & Household Items:</strong> $250/month</p>
                  <p className="text-xs text-muted mt-1">Take advantage of calculated discounts vs. impulse buying</p>
                  <p className="text-xs text-muted">Potential savings from better deal selection: $20-30/month</p>
                  <p className="text-xs text-accent font-semibold mt-1">SAVE: $240-360/year</p>
                </div>

                <div>
                  <p className="text-sm"><strong>Online Shopping:</strong> $100/month average</p>
                  <p className="text-xs text-muted mt-1">Comparing prices saves 10-20% on many items</p>
                  <p className="text-xs text-muted">Annual overspend: $120-240</p>
                  <p className="text-xs text-accent font-semibold mt-1">SAVE: $120-240/year</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border bg-accent/10 rounded p-3">
                <p className="font-bold text-text">TOTAL ANNUAL SAVINGS FROM SMART DISCOUNT CALCULATION</p>
                <p className="text-xl font-bold text-accent mt-2">$490-840 per year</p>
                <p className="text-xs text-muted mt-1">That's equivalent to 5-10 extra days of salary for average workers!</p>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
              <p className="text-sm font-medium text-accent mb-2">📊 Get Started Today:</p>
              <p className="text-sm"><Link href="/tools/discount" className="text-accent hover:underline">Begin using our discount calculator now →</Link> and track your savings over the next 12 months. You might be surprised how much you recoup!</p>
            </div>
          </section>

          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-space-mono font-bold text-text mb-6">FAQ: Discount Calculator Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-text mb-2">What's the difference between percentage and fixed discounts?</h3>
                <p className="text-base leading-relaxed text-muted">
                  Percentage discounts take a % off the price (scales with item cost). Fixed discounts take a flat amount off (same savings regardless of price). A 20% discount on a $100 item saves $20, but the same discount on a $50 item saves $10. A fixed "$10 off" always saves $10.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text mb-2">How do I calculate multiple discounts?</h3>
                <p className="text-base leading-relaxed text-muted">
                  Apply the first discount to get a new price, then apply the second discount to that new price (not the original). This is called "compounding." Our calculator handles this automatically.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text mb-2">Is there a difference between "20% off" and "pay 80%"?</h3>
                <p className="text-base leading-relaxed text-muted">
                  No—they're mathematically identical. "20% off" means you pay 80% of the original price. Both calculations give the same final price. Use whichever is clearer to you.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text mb-2">Do tax and shipping factor into discount calculations?</h3>
                <p className="text-base leading-relaxed text-muted">
                  Discounts usually apply to the pre-tax price, then tax is added to the discounted price. Shipping typically doesn't get discounted unless specifically stated. Always verify how the store applies discounts.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text mb-2">How much can I realistically save using a discount calculator?</h3>
                <p className="text-base leading-relaxed text-muted">
                  On average, people overpay by 5-15% on discounted items because they miscalculate. Using a calculator saves that margin on every purchase. On $500/month average spending, that's $250-900/year in savings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text mb-2">Are there any discounts where calculators don't help?</h3>
                <p className="text-base leading-relaxed text-muted">
                  No. Even "BOGO" (buy one get one) deals benefit from calculating the per-item cost to compare with competitors. Calculators always provide clarity.
                </p>
              </div>
            </div>
          </section>

          {/* Section - Related Shopping Tools */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Related Money-Saving Tools & Calculators</h2>
            
            <p className="text-base leading-relaxed mt-4">
              Discount calculators are one piece of smart shopping. These related tools help you save even more money:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Link href="/tools/currency" className="p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all">
                <p className="font-bold text-accent mb-2">💱 Currency Converter</p>
                <p className="text-xs text-muted">Convert international prices to verify you're getting good deals</p>
              </Link>
              
              <Link href="/finance/salary" className="p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all">
                <p className="font-bold text-accent mb-2">💵 Salary Calculator</p>
                <p className="text-xs text-muted">Calculate net pay to understand true shopping budget</p>
              </Link>

              <Link href="/tools/tip" className="p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all">
                <p className="font-bold text-accent mb-2">💳 Tip Calculator</p>
                <p className="text-xs text-muted">Calculate fair tips without overpaying or underpaying</p>
              </Link>

              <Link href="/finance/compound-interest" className="p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all">
                <p className="font-bold text-accent mb-2">💰 Savings Calculator</p>
                <p className="text-xs text-muted">See how money saved from discounts compounds over time</p>
              </Link>

              <Link href="/finance/profit" className="p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all">
                <p className="font-bold text-accent mb-2">📊 Profit Margin Calculator</p>
                <p className="text-xs text-muted">Understand retailer markups to negotiate better prices</p>
              </Link>

              <Link href="/tools/fuel" className="p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all">
                <p className="font-bold text-accent mb-2">⛽ Fuel Cost Calculator</p>
                <p className="text-xs text-muted">Calculate drive time vs shopping online costs</p>
              </Link>
            </div>
          </section>

          {/* Section - Discount Comparison Table */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Discount Comparison: Which Deal is Actually Better?</h2>
            
            <p className="text-base leading-relaxed mt-4">
              When multiple deals exist, which is truly best? Use this comparison framework:
            </p>

            <div className="bg-surface border border-border rounded-lg overflow-x-auto my-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-accent/10">
                    <th className="px-4 py-3 text-left font-bold">Products</th>
                    <th className="px-4 py-3 text-left font-bold">Original</th>
                    <th className="px-4 py-3 text-left font-bold">Deal</th>
                    <th className="px-4 py-3 text-left font-bold">Final Price</th>
                    <th className="px-4 py-3 text-left font-bold">Savings</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b border-border">
                    <td className="px-4 py-2 font-semibold">Laptop</td>
                    <td className="px-4 py-2">$500</td>
                    <td className="px-4 py-2 text-yellow-400">40% Off</td>
                    <td className="px-4 py-2 font-bold text-accent">$300</td>
                    <td className="px-4 py-2 text-green-400">$200</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2 font-semibold">Monitor</td>
                    <td className="px-4 py-2">$200</td>
                    <td className="px-4 py-2 text-yellow-400">30% Off</td>
                    <td className="px-4 py-2 font-bold text-accent">$140</td>
                    <td className="px-4 py-2 text-green-400">$60</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2 font-semibold">Keyboard</td>
                    <td className="px-4 py-2">$80</td>
                    <td className="px-4 py-2 text-yellow-400">$20 Off</td>
                    <td className="px-4 py-2 font-bold text-accent">$60</td>
                    <td className="px-4 py-2 text-green-400">$20</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-accent">Combined</td>
                    <td className="px-4 py-2 font-semibold">$780</td>
                    <td className="px-4 py-2 text-accent">Mixed</td>
                    <td className="px-4 py-2 font-bold bg-accent/10">$500</td>
                    <td className="px-4 py-2 text-green-400 font-bold">$280</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted">
              Different products have different discount amounts. Always calculate each to ensure you're picking the best overall deal, not just the highest percentage off.
            </p>
          </section>

          {/* Section - Retail Tricks */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">7 Retail Tricks That Make Fake Discounts Look Real</h2>
            
            <h3 className="text-xl font-bold text-text mt-6">Trick #1: The Fake "Original Price" Tag</h3>
            <p className="text-base leading-relaxed">
              Retailers raise prices before "discounting" them. That "$199 marked down from $299" was never sold at $299. Verify real MSRP online.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Trick #2: The Limited-Time Pressure</h3>
            <p className="text-base leading-relaxed">
              "Sale ends tonight!" creates urgency so you skip calculating. Real deals still exist tomorrow. Never let time pressure stop you from calculating.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Trick #3: The Percentage Psychology</h3>
            <p className="text-base leading-relaxed">
              "70% Off" sounds amazing. "$30 Off" sounds boring. They're both the same on a $100 item, but percentages manipulate emotions.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Trick #4: The Bundled Deal Trap</h3>
            <p className="text-base leading-relaxed">
              "Buy 2 get 1 free" sounds great until you calculate per-item costs. You may be overpaying compared to buying items individually elsewhere.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Trick #5: The Clearance "Gone Tomorrow"</h3>
            <p className="text-base leading-relaxed">
              Constantly marked clearance items rotate in and out. That "last one at this price" is often restocked next week.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Trick #6: The Fine Print Exclusion</h3>
            <p className="text-base leading-relaxed">
              "40% off select brands" or "not valid on clearance" means the discount doesn't apply to items you actually want. Always read terms.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Trick #7: The "Loyalty" Club Markup</h3>
            <p className="text-base leading-relaxed">
              Membership clubs raise prices for non-members, then offer "member discounts" back to normal prices. You're not saving; you're paying normal price after membership.
            </p>

            <div className="bg-surface border border-border rounded-lg p-4 my-6">
              <p className="text-sm"><strong>Defense Strategy:</strong> Calculate EVERYTHING. Compare prices across retailers. Ignore percentages and focus on final price. Use our discount calculator before every purchase.</p>
            </div>
          </section>

          {/* Section - Master the Math of Savings */}
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">Master the Math of Savings</h2>
            <p className="text-base leading-relaxed">
              Discounts are everywhere. But without calculation, you're guessing. Every guessed discount is money left on the table. Smart shoppers know: percentages and prices are not intuitive. That's why calculators exist.
            </p>
            <p className="text-base leading-relaxed mt-4 font-medium">
              The next time you see a deal, don't feel the excitement yet. Calculate first. You'll find real deals, compare true prices, and save hundreds annually. That's the power of math.
            </p>

            <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/50 rounded-lg p-6 my-8 text-center">
              <p className="font-bold text-text mb-3">Calculate Your Next Purchase</p>
              <Link href="/tools/discount" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90">
                Use Discount Calculator <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-xs text-muted mt-3">Compare prices. Find real deals. Save money instantly.</p>
            </div>
          </section>

          <section className="mt-12 py-8 border-t border-border bg-surface/50 rounded-lg p-6 hidden" style={{display: 'none'}}>
            <h3 className="font-bold text-text mb-4">📋 SEO Information</h3>
            <div className="space-y-4 text-sm font-mono">
              <div>
                <p className="text-accent font-bold">Meta Title (60 chars):</p>
                <p className="text-muted">Discount Calculator: Find Real Deals While Shopping</p>
              </div>
              <div>
                <p className="text-accent font-bold">Meta Description (160 chars):</p>
                <p className="text-muted">Learn how to calculate discounts correctly, find real deals, and avoid retail tricks. Use our free discount calculator to verify sale prices.</p>
              </div>
              <div>
                <p className="text-accent font-bold">Keywords:</p>
                <p className="text-muted">Discount calculator, sale price, percentage off, how to calculate discounts, shopping deals, verify prices</p>
              </div>
            </div>
          </section>

          <section className="mt-12 py-8 border-t border-border">
            <div className="text-center">
              <p className="text-muted mb-4">Explore other money-saving calculators</p>
              <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:opacity-80 font-medium">
                ← Back to Blog
              </Link>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
