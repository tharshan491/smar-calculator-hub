import { useState } from "react";

// ─── Articles Data ────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    id: 1,
    title: "Wind Chill & Weather",
    icon: "❄️",
    category: "weather",
    excerpt: "Understanding how wind affects perceived temperature and your safety in cold conditions.",
    date: "January 2026",
    readTime: "8 min read",
    content: `
      <h2>What is Wind Chill?</h2>
      <p>Wind chill is the apparent temperature felt by exposed skin due to wind. It's how cold the air feels when the effects of wind and temperature are combined. The faster the wind blows, the more body heat is lost, and the colder it feels.</p>
      
      <div class="fact-box">
        <strong>💡 Key Fact:</strong> At -10°F with 20 mph winds, wind chill feels like -34°F. Your skin can freeze in as little as 30 minutes.
      </div>

      <h2>How Wind Accelerates Heat Loss</h2>
      <p>Your body naturally radiates heat. Still air acts as a buffer, but wind strips away this protective layer. The faster the wind, the more efficiently it carries heat away from your skin. This is why a windy cold day feels much more biting than a calm cold day at the same temperature.</p>

      <h3>Heat Loss Mechanisms:</h3>
      <ul>
        <li><strong>Convection</strong> – Wind carries warm air away from skin</li>
        <li><strong>Evaporation</strong> – Moisture on skin evaporates faster in wind</li>
        <li><strong>Conduction</strong> – Direct contact with cold air/surfaces</li>
        <li><strong>Radiation</strong> – Body continuously radiates infrared heat</li>
      </ul>

      <h2>Frostbite Risk Stages</h2>
      <p>Frostbite occurs when skin and tissues freeze. The speed of onset depends on temperature, wind, and skin exposure.</p>

      <h3>Frostbite Timeline:</h3>
      <ul>
        <li><strong>30 minutes:</strong> Exposed skin at -35°F wind chill</li>
        <li><strong>10 minutes:</strong> Exposed skin at -55°F wind chill</li>
        <li><strong>5 minutes:</strong> Exposed skin at -75°F wind chill</li>
      </ul>

      <h2>Symptoms to Watch For</h2>
      <ul>
        <li>Numbness or tingling in extremities</li>
        <li>White or grayish skin, waxy appearance</li>
        <li>Blisters after skin warms</li>
        <li>Severe pain as feeling returns</li>
      </ul>

      <div class="fact-box">
        <strong>🚨 Warning Signs:</strong> If you notice numbness that doesn't go away quickly after warming, seek medical attention immediately. Do not rub frostbitten skin.
      </div>

      <h2>Protection & Prevention</h2>
      <ul>
        <li><strong>Dress in layers</strong> – Trap air for insulation</li>
        <li><strong>Wear wind-resistant outer layer</strong> – Breaks wind speed</li>
        <li><strong>Cover extremities</strong> – Gloves, socks, hat mandatory</li>
        <li><strong>Stay dry</strong> – Moisture accelerates heat loss</li>
        <li><strong>Take breaks indoors</strong> – Warm up regularly</li>
        <li><strong>Avoid alcohol & caffeine</strong> – Reduces vasoconstriction</li>
      </ul>

      <h2>Wind Chill Formula</h2>
      <p>The U.S. National Weather Service uses this formula:</p>
      <p style="font-family: monospace; background: var(--surface); padding: 12px; border-radius: 6px; margin: 12px 0;">
        Wind Chill = 35.74 + 0.6215T − 35.75(V^0.16) + 0.4275T(V^0.16)
      </p>
      <p>Where T = temperature (°F) and V = wind speed (mph)</p>

      <div class="fact-box">
        <strong>📌 Remember:</strong> Wind chill only affects exposed skin. Properly insulated skin won't freeze regardless of wind chill value, but exposed skin remains at serious risk.
      </div>
    `
  },
  {
    id: 2,
    title: "Frostbite & Hypothermia",
    icon: "🥶",
    category: "health",
    excerpt: "Learn the differences between frostbite and hypothermia, and how to recognize and treat them.",
    date: "January 2026",
    readTime: "10 min read",
    content: `
      <h2>Understanding Frostbite & Hypothermia</h2>
      <p>While often discussed together, frostbite and hypothermia are two different cold-related emergencies. Frostbite is localized freezing of skin. Hypothermia is a dangerous drop in core body temperature.</p>

      <div class="fact-box">
        <strong>⚠️ Critical Difference:</strong> You can have frostbite without hypothermia, but severe hypothermia almost always comes with some frostbite.
      </div>

      <h2>Frostbite: Stages & Progression</h2>
      
      <h3>First-Degree Frostbite (Frostnip)</h3>
      <ul>
        <li>Redness and swelling of skin</li>
        <li>Temporary numbness</li>
        <li>Usually resolves with gentle warming</li>
        <li>No permanent damage</li>
      </ul>

      <h3>Second-Degree Frostbite (Superficial)</h3>
      <ul>
        <li>Blistering within 24 hours of warming</li>
        <li>Clear or milky fluid in blisters</li>
        <li>Increased pain with rewarming</li>
        <li>Possible scarring</li>
      </ul>

      <h3>Third-Degree Frostbite (Deep/Full-Thickness)</h3>
      <ul>
        <li>Tissue below skin freezes completely</li>
        <li>Black or dark blue appearance after thawing</li>
        <li>Tissue death (necrosis) is likely</li>
        <li>May require amputation</li>
        <li>Permanent scarring and loss of function</li>
      </ul>

      <h3>Fourth-Degree Frostbite (Severe)</h3>
      <ul>
        <li>Entire limb is affected</li>
        <li>Blackened, mummified appearance</li>
        <li>Tissue death is certain</li>
        <li>Amputation almost always required</li>
      </ul>

      <h2>Hypothermia: Core Temperature Drop</h2>
      <p>Hypothermia occurs when core body temperature drops below 95°F (35°C). The body loses heat faster than it can generate it.</p>

      <h3>Stages of Hypothermia</h3>
      
      <h4>Mild (90–95°F / 32–35°C)</h4>
      <ul>
        <li>Shivering (violent and uncontrollable)</li>
        <li>Confusion and poor decision-making</li>
        <li>Slurred speech</li>
        <li>Rapid heartbeat</li>
        <li>Increased blood pressure</li>
      </ul>

      <h4>Moderate (82–90°F / 28–32°C)</h4>
      <ul>
        <li>Shivering stops (dangerous sign)</li>
        <li>Severe confusion, loss of coordination</li>
        <li>Skin turns blue or gray</li>
        <li>Lethargy and difficulty staying awake</li>
        <li>Rapid but weak pulse</li>
      </ul>

      <h4>Severe (Below 82°F / 28°C)</h4>
      <ul>
        <li>Unconsciousness or coma</li>
        <li>Barely detectable pulse and breathing</li>
        <li>Rigid muscles</li>
        <li>Skin extremely pale, may appear "dead"</li>
        <li>Risk of cardiac arrest is critical</li>
      </ul>

      <div class="fact-box">
        <strong>🆘 CRITICAL:</strong> A person is not dead until they are "warm and dead." Recovery after extreme hypothermia is possible. Always seek immediate emergency care.
      </div>

      <h2>First Aid Response</h2>

      <h3>For Frostbite:</h3>
      <ul>
        <li>Get to a warm place immediately</li>
        <li>Remove wet clothing</li>
        <li>Warm affected area slowly with body heat (hands or underarms)</li>
        <li>DO NOT use hot water or heat lamps (causes additional damage)</li>
        <li>DO NOT rub or massage the area</li>
        <li>Drink warm (not hot) liquids</li>
        <li>Seek medical attention</li>
      </ul>

      <h3>For Hypothermia:</h3>
      <ul>
        <li>Call 911 immediately</li>
        <li>Move person to warm area gently</li>
        <li>Remove wet clothing</li>
        <li>Gradually warm the person (avoid rapid rewarming)</li>
        <li>Cover with blankets</li>
        <li>If conscious: Give warm (not hot) drinks</li>
        <li>DO NOT give alcohol or caffeine</li>
        <li>Monitor breathing and pulse</li>
        <li>Perform CPR if needed (may work after long periods)</li>
      </ul>

      <h2>Prevention Strategies</h2>
      <ul>
        <li>Check weather forecasts before going outside</li>
        <li>Wear appropriate layered clothing for conditions</li>
        <li>Never ignore the first signs of cold stress</li>
        <li>Stay dry – wetness accelerates heat loss dramatically</li>
        <li>Eat high-calorie foods to fuel heat production</li>
        <li>Avoid alcohol (impairs decision-making and increases heat loss)</li>
        <li>Buddy system – never expose yourself alone to extreme cold</li>
        <li>Take breaks in warmth every 30 minutes</li>
      </ul>

      <div class="fact-box">
        <strong>💪 Key Takeaway:</strong> Prevention is always better than treatment. Respect the cold, dress properly, and know your limits.
      </div>
    `
  },
  {
    id: 3,
    title: "How Compound Interest Works",
    icon: "📈",
    category: "finance",
    excerpt: "Discover how compound interest turns small investments into wealth over time.",
    date: "January 2026",
    readTime: "7 min read",
    content: `
      <h2>The Power of Compound Interest</h2>
      <p>Compound interest is "interest on interest." It's one of the most powerful forces in building wealth. As your money grows, the growth itself generates more growth. This creates an accelerating effect that can turn modest contributions into substantial sums over time.</p>

      <div class="fact-box">
        <strong>💎 Einstein's Quote:</strong> "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it."
      </div>

      <h2>Simple Interest vs. Compound Interest</h2>

      <h3>Simple Interest</h3>
      <p>Interest is calculated only once on your principal. It doesn't grow.</p>
      <ul>
        <li>Formula: Interest = Principal × Rate × Time</li>
        <li>Example: $1,000 at 5% for 10 years = $500 interest</li>
        <li>Total: $1,500</li>
      </ul>

      <h3>Compound Interest</h3>
      <p>Interest is calculated on the principal AND previously earned interest. Your money grows exponentially.</p>
      <ul>
        <li>Formula: A = P(1 + r/n)^(nt)</li>
        <li>Example: $1,000 at 5% for 10 years = $1,628.89</li>
        <li>Interest earned: $628.89</li>
      </ul>

      <h3>The Difference:</h3>
      <p>In this example, compound interest earned $128.89 MORE than simple interest on the same investment. That gap widens significantly with larger amounts and longer time periods.</p>

      <h2>Key Variables</h2>

      <h3>1. Principal</h3>
      <p>Your initial investment. Even small amounts compound significantly over time.</p>

      <h3>2. Interest Rate</h3>
      <p>The percentage earned annually. Higher rates accelerate growth, but even modest rates (3–5%) produce impressive results over decades.</p>

      <h3>3. Time (The Most Critical Factor)</h3>
      <p>The longer your money compounds, the more dramatic the growth. A 20-year timeline is 4x more powerful than a 10-year timeline.</p>

      <h3>4. Compounding Frequency</h3>
      <p>How often interest is calculated and added:</p>
      <ul>
        <li><strong>Annually:</strong> Interest calculated 1× per year</li>
        <li><strong>Semi-annually:</strong> Interest calculated 2× per year</li>
        <li><strong>Quarterly:</strong> Interest calculated 4× per year</li>
        <li><strong>Monthly:</strong> Interest calculated 12× per year</li>
        <li><strong>Daily:</strong> Interest calculated 365× per year</li>
      </ul>
      <p>More frequent compounding = faster growth. Daily compounding is best.</p>

      <h2>The Time Value of Money</h2>
      <p>Money today is worth more than money tomorrow because today's money can compound.</p>

      <div class="fact-box">
        <strong>🎯 Rule of 72:</strong> Divide 72 by your interest rate to find approximately how many years it takes to double your money. At 6% interest: 72 ÷ 6 = 12 years to double.
      </div>

      <h2>Real-World Examples</h2>

      <h3>Example 1: Starting Young</h3>
      <ul>
        <li>Age 25: Invest $200/month at 7% annual return</li>
        <li>Age 65: Balance = $704,299</li>
        <li>Total contributed: $96,000</li>
        <li>Interest earned: $608,299 (86% of the total!)</li>
      </ul>

      <h3>Example 2: Starting Late</h3>
      <ul>
        <li>Age 45: Invest $500/month at 7% annual return</li>
        <li>Age 65: Balance = $250,543</li>
        <li>Total contributed: $120,000</li>
        <li>Interest earned: $130,543</li>
      </ul>

      <p>Starting 20 years earlier resulted in nearly 3× the final amount, even with smaller monthly contributions. Time is the secret weapon.</p>

      <h2>Types of Accounts That Use Compound Interest</h2>
      <ul>
        <li><strong>Savings accounts:</strong> 0.5–2% APY (varies by bank)</li>
        <li><strong>Money market accounts:</strong> 1–5% APY</li>
        <li><strong>High-yield Savings:</strong> 4–5.5% APY</li>
        <li><strong>CDs (Certificates of Deposit):</strong> 4–5.5% APY</li>
        <li><strong>Bonds:</strong> 3–6% yield</li>
        <li><strong>Stock market (historical average):</strong> 10% annual return</li>
      </ul>

      <h2>Maximizing Compound Interest</h2>
      <ul>
        <li><strong>Start early:</strong> The more years you have, the more dramatic the compounding</li>
        <li><strong>Contribute regularly:</strong> Consistent deposits add to the compounding base</li>
        <li><strong>Reinvest earnings:</strong> Don't withdraw interest; let it compound</li>
        <li><strong>Choose higher-yield accounts:</strong> Even 1% difference compounds to thousands over decades</li>
        <li><strong>Minimize fees:</strong> High fees eat into compound growth</li>
        <li><strong>Be patient:</strong> Compounding is slow at first, then accelerates</li>
      </ul>

      <div class="fact-box">
        <strong>⏰ The Bottom Line:</strong> A 25-year-old investing $50/month will likely have more at retirement than a 45-year-old investing $500/month. Time > Money in the compound interest equation.
      </div>
    `
  },
  {
    id: 4,
    title: "How BMI Works",
    icon: "⚖️",
    category: "health",
    excerpt: "Understanding Body Mass Index, its uses, limitations, and what the numbers really mean.",
    date: "January 2026",
    readTime: "8 min read",
    content: `
      <h2>What is BMI?</h2>
      <p>BMI (Body Mass Index) is a simple formula that estimates body composition using height and weight. It's calculated as: weight (kg) ÷ height² (m²). BMI is used by health professionals worldwide as a screening tool for weight categories.</p>

      <h2>The BMI Categories</h2>
      
      <h3>Underweight: BMI < 18.5</h3>
      <ul>
        <li>May indicate insufficient body weight</li>
        <li>Can suggest malnutrition, illness, or eating disorders</li>
        <li>Associated with bone density loss, weakened immunity</li>
      </ul>

      <h3>Normal Weight: BMI 18.5–24.9</h3>
      <ul>
        <li>Generally associated with the lowest health risks</li>
        <li>The "healthy range" for most adults</li>
        <li>Associated with better longevity in most studies</li>
      </ul>

      <h3>Overweight: BMI 25.0–29.9</h3>
      <ul>
        <li>Increased risk of weight-related health problems</li>
        <li>Higher risk of hypertension, type 2 diabetes</li>
        <li>Doesn't necessarily indicate poor health</li>
      </ul>

      <h3>Obese: BMI 30.0 and above</h3>
      <ul>
        <li>Significantly increased disease risk</li>
        <li>Higher rates of heart disease, cancer, diabetes</li>
        <li>Class I (30–34.9), Class II (35–39.9), Class III (40+)</li>
      </ul>

      <div class="fact-box">
        <strong>📊 Global Average:</strong> Average BMI varies by country. The U.S. average is ~29.7, while countries like Japan and Switzerland average 23–24.
      </div>

      <h2>Historical Context</h2>
      <p>BMI was developed in the 1840s by Adolphe Quetelet, a Belgian statistician. Originally called the "Quetelet Index," it was designed as a universal measure that didn't require a scale — you could calculate it from height and weight estimates.</p>

      <p>It became popular in the 1970s when the National Institutes of Health adopted it as the standard health measurement. Today, BMI is used by:</p>
      <ul>
        <li>WHO (World Health Organization)</li>
        <li>CDC (Centers for Disease Control)</li>
        <li>Most health insurance companies</li>
        <li>Major hospital systems worldwide</li>
      </ul>

      <h2>Why BMI is Used</h2>
      <ul>
        <li><strong>Simple:</strong> Easy to calculate with just height and weight</li>
        <li><strong>Inexpensive:</strong> No special equipment needed</li>
        <li><strong>Scalable:</strong> Works for large populations and statistics</li>
        <li><strong>Non-invasive:</strong> No blood tests or medical procedures</li>
        <li><strong>Universally comparable:</strong> Same formula worldwide</li>
      </ul>

      <h2>Limitations & Criticisms</h2>

      <h3>1. Doesn't Distinguish Muscle from Fat</h3>
      <p>A muscular athlete may have a "high" BMI despite having low body fat. The formula treats all weight equally. Professional athletes often register as "overweight" or "obese" on BMI scales.</p>

      <div class="fact-box">
        <strong>💪 Example:</strong> A bodybuilder at 6' tall, 220 lbs with 8% body fat would have a BMI of 30 (obese category), yet has excellent health markers.
      </div>

      <h3>2. Doesn't Account for Age or Sex</h3>
      <p>Body composition naturally changes with age. Women typically have higher body fat percentages than men at the same BMI. Older adults naturally have less muscle and more fat.</p>

      <h3>3. Ignores Distribution of Weight</h3>
      <p>Where you carry weight matters. Abdominal fat (visceral fat) is more dangerous than fat distributed elsewhere. BMI doesn't distinguish between healthy and unhealthy fat distribution.</p>

      <h3>4. Based on Outdated Data</h3>
      <p>The original data came from 19th-century European populations. It may not apply equally to all ethnicities today.</p>

      <h3>5. Mental Health Stigma</h3>
      <p>Labeling people as "obese" based on a number can cause psychological distress and disordered eating without addressing the root causes of weight gain.</p>

      <h2>Better Health Measures</h2>
      <p>Health professionals increasingly use multiple measures:</p>
      <ul>
        <li><strong>Body Fat Percentage:</strong> More accurate than BMI</li>
        <li><strong>Waist Circumference:</strong> Indicator of visceral fat</li>
        <li><strong>Waist-to-Hip Ratio:</strong> Measures fat distribution</li>
        <li><strong>Blood Pressure:</strong> Critical cardiovascular health marker</li>
        <li><strong>Cholesterol Levels:</strong> Heart disease risk</li>
        <li><strong>Fasting Glucose:</strong> Diabetes risk</li>
        <li><strong>VO₂ Max:</strong> Cardiovascular fitness</li>
        <li><strong>DEXA Scan:</strong> Precise bone and fat measurement</li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>BMI is a useful screening tool, but it's just one data point. It's best used alongside other health measures and clinical judgment. You can be "overweight" by BMI yet have better health than someone in the "normal" range. Conversely, you can be in the "normal" BMI range and have poor health markers.</p>

      <div class="fact-box">
        <strong>✅ Best Approach:</strong> Focus on improving fitness, strength, flexibility, and cardiovascular health rather than chasing a specific BMI number. Healthy bodies come in different shapes and sizes.
      </div>
    `
  },
  {
    id: 5,
    title: "Healthy Weight Guide",
    icon: "💪",
    category: "health",
    excerpt: "Science-backed strategies for achieving and maintaining a healthy weight sustainably.",
    date: "January 2026",
    readTime: "9 min read",
    content: `
      <h2>Health vs. Weight Loss Culture</h2>
      <p>The fitness industry often focuses on weight loss numbers. But health is about much more than a number on the scale. A sustainable healthy weight is one you can maintain while feeling energized, strong, and happy.</p>

      <h2>What is "Healthy Weight"?</h2>
      <p>Your healthy weight depends on YOUR body, not a chart or number. Factors include:</p>
      <ul>
        <li>Genetics and family history</li>
        <li>Muscle-to-fat ratio</li>
        <li>Overall fitness level</li>
        <li>Health markers (cholesterol, blood sugar, blood pressure)</li>
        <li>Age and metabolism</li>
        <li>Ethnicity and bone structure</li>
      </ul>

      <div class="fact-box">
        <strong>🎯 Key Insight:</strong> Two people at the same height and weight can have completely different body compositions and health profiles.
      </div>

      <h2>Calculating Your Daily Calorie Needs</h2>

      <h3>Step 1: Calculate BMR (Basal Metabolic Rate)</h3>
      <p>BMR is how many calories your body burns at rest. For a 70kg, 175cm, 30-year-old male:</p>
      <ul>
        <li>BMR = 10(70) + 6.25(175) − 5(30) + 5 = 1,655 calories/day</li>
      </ul>

      <h3>Step 2: Multiply by Activity Factor (TDEE)</h3>
      <ul>
        <li><strong>Sedentary (no exercise):</strong> BMR × 1.2</li>
        <li><strong>Light activity (1–3 days/week):</strong> BMR × 1.375</li>
        <li><strong>Moderate activity (3–5 days/week):</strong> BMR × 1.55</li>
        <li><strong>Very active (6–7 days/week):</strong> BMR × 1.725</li>
        <li><strong>Extremely active (2× per day training):</strong> BMR × 1.9</li>
      </ul>

      <p>For our 1,655 BMR person with moderate activity: 1,655 × 1.55 = 2,565 calories/day</p>

      <h2>Weight Management Strategies</h2>

      <h3>To Lose Weight: Create a Calorie Deficit</h3>
      <ul>
        <li><strong>Moderate deficit (500 cal/day):</strong> Lose ~1 lb/week</li>
        <li><strong>Aggressive deficit (1,000 cal/day):</strong> Lose ~2 lbs/week</li>
        <li><strong>Safe range for most:</strong> 1–2 lbs/week</li>
      </ul>
      <p>For our example: 2,565 − 500 = 2,065 calories/day for steady loss</p>

      <h3>To Gain Weight: Create a Calorie Surplus</h3>
      <ul>
        <li><strong>Moderate surplus (300–500 cal/day):</strong> Gain ~0.5–1 lb/week (mostly muscle with strength training)</li>
        <li><strong>Aggressive surplus (1,000 cal/day):</strong> Gain ~2 lbs/week (more fat)</li>
      </ul>

      <h3>To Maintain: Match Your TDEE</h3>
      <ul>
        <li>Eat at your daily calorie burn level</li>
        <li>Weight should remain relatively stable (±2–3 lbs monthly is normal)</li>
      </ul>

      <h2>The 5 Pillars of Sustainable Weight Health</h2>

      <h3>1. Nutrition Quality</h3>
      <ul>
        <li><strong>Eat whole foods:</strong> Vegetables, fruits, lean proteins, whole grains, healthy fats</li>
        <li><strong>Prioritize protein:</strong> Keeps you full, preserves muscle during weight loss</li>
        <li><strong>Limit processed foods:</strong> Often high in added sugars and empty calories</li>
        <li><strong>Hydrate:</strong> Water supports metabolism and reduces overeating</li>
        <li><strong>Fiber intake:</strong> 25–35g daily slows digestion, keeps you full</li>
      </ul>

      <h3>2. Regular Exercise</h3>
      <ul>
        <li><strong>Strength training:</strong> 2–3 days/week builds muscle, boosts metabolism</li>
        <li><strong>Cardiovascular exercise:</strong> 150 min/week (moderate) or 75 min/week (vigorous)</li>
        <li><strong>Daily movement:</strong> Walking, standing, general activity throughout the day</li>
        <li><strong>Consistency beats intensity:</strong> A sustainable routine beats sporadic extreme efforts</li>
      </ul>

      <h3>3. Sleep Quality</h3>
      <ul>
        <li><strong>7–9 hours nightly:</strong> Poor sleep disrupts hunger hormones</li>
        <li><strong>Consistent schedule:</strong> Go to bed and wake at the same time</li>
        <li><strong>Cool, dark room:</strong> Optimal for sleep quality</li>
      </ul>

      <h3>4. Stress Management</h3>
      <ul>
        <li>Chronic stress increases cortisol, promoting fat storage</li>
        <li>Meditation, yoga, deep breathing all help</li>
        <li>Stress-eating is real; address root causes</li>
      </ul>

      <h3>5. Behavioral Habits</h3>
      <ul>
        <li><strong>Eat slowly:</strong> Takes 20 minutes to feel full</li>
        <li><strong>Portion awareness:</strong> Use smaller plates, measure portions</li>
        <li><strong>Meal planning:</strong> Reduces impulsive unhealthy choices</li>
        <li><strong>Track intake:</strong> Apps like MyFitnessPal increase awareness</li>
        <li><strong>Avoid emotional eating:</strong> Address feelings without food</li>
      </ul>

      <h2>Avoiding Common Mistakes</h2>
      <ul>
        <li><strong>Crash diets:</strong> Unsustainable, often lead to rebound weight gain</li>
        <li><strong>Cutting calories too aggressively:</strong> Slows metabolism, causes muscle loss</li>
        <li><strong>Ignoring protein:</strong> Increases muscle loss during weight loss</li>
        <li><strong>All-or-nothing thinking:</strong> One bad meal doesn't ruin progress</li>
        <li><strong>Ignoring strength training:</strong> Cardio alone isn't optimal for healthy weight loss</li>
        <li><strong>Comparing to others:</strong> Everyone's body is different</li>
      </ul>

      <div class="fact-box">
        <strong>⏳ Timeline Reality:</strong> It took time to gain the weight; it will take time to lose it. Sustainable weight change takes 3–6 months to become visible, 6–12 months to become "new normal" for your body.
      </div>

      <h2>When to Seek Professional Help</h2>
      <p>Consider consulting professionals if:</p>
      <ul>
        <li>You have thyroid conditions or hormonal imbalances</li>
        <li>Medications affect your weight</li>
        <li>You have a history of eating disorders</li>
        <li>Weight loss/gain efforts aren't working despite your best efforts</li>
        <li>You want personalized guidance</li>
      </ul>

      <div class="fact-box">
        <strong>💚 The Real Goal:</strong> Health is not a destination but a daily practice. Focus on how you feel (energy, strength, mood) rather than just the number on the scale.
      </div>
    `
  },
  {
    id: 6,
    title: "How to Save for Retirement",
    icon: "🌴",
    category: "finance",
    excerpt: "Practical strategies to build a retirement fund that sustains you for decades.",
    date: "January 2026",
    readTime: "10 min read",
    content: `
      <h2>Why Start Retirement Planning Now?</h2>
      <p>Retirement might feel distant if you're young, but compound interest works its magic over decades. Starting at 25 vs. 35 vs. 45 makes a dramatic difference in your retirement quality of life.</p>

      <h2>Key Retirement Concepts</h2>

      <h3>1. Replacement Rate</h3>
      <p>How much of your pre-retirement income you'll need to maintain your lifestyle. Most experts recommend 70–80%.</p>
      <ul>
        <li>If you earn $100,000/year, plan for $70,000–$80,000/year in retirement</li>
        <li>Some expenses decrease (work commute, retirement savings contributions)</li>
        <li>Some expenses increase (healthcare, travel)</li>
      </ul>

      <h3>2. The 4% Rule</h3>
      <p>You can safely withdraw 4% of your retirement savings annually without running out of money over a 30+ year retirement.</p>
      <ul>
        <li>If you saved $1 million: $1,000,000 × 0.04 = $40,000/year</li>
        <li>If you saved $500,000: $500,000 × 0.04 = $20,000/year</li>
        <li>If you saved $1.5 million: $1,500,000 × 0.04 = $60,000/year</li>
      </ul>

      <h3>3. Retirement Length</h3>
      <p>Plan for 30–40 years of retirement. Life expectancy has increased significantly.</p>
      <ul>
        <li>If you retire at 65, plan for income until 95–105</li>
        <li>Longer retirements require larger nest eggs</li>
      </ul>

      <div class="fact-box">
        <strong>📊 Fact:</strong> A 65-year-old today has a 25% chance of living to 95+. Plan accordingly!
      </div>

      <h2>Calculating Your Retirement Number</h2>

      <h3>Step 1: Estimate Annual Expenses in Retirement</h3>
      <p>Track your current spending. Typical retirees spend $60,000–$100,000+ annually depending on location and lifestyle.</p>

      <h3>Step 2: Apply Replacement Rate</h3>
      <p>If you currently earn $80,000 and want 75% replacement: $80,000 × 0.75 = $60,000/year needed</p>

      <h3>Step 3: Calculate Nest Egg Using 4% Rule</h3>
      <p>Divide annual need by 0.04: $60,000 ÷ 0.04 = $1,500,000 nest egg needed</p>

      <h3>Step 4: Account for Social Security</h3>
      <p>Average Social Security benefit in 2026: ~$1,900/month = $22,800/year</p>
      <p>Shortfall to cover from savings: $60,000 − $22,800 = $37,200/year</p>
      <p>Adjusted nest egg: $37,200 ÷ 0.04 = $930,000</p>

      <h2>Retirement Account Types</h2>

      <h3>Tax-Advantaged Retirement Accounts</h3>

      <h4>401(k) / 403(b) (Employer-Sponsored)</h4>
      <ul>
        <li><strong>Contribution limit 2026:</strong> $23,500/year (employee)</li>
        <li><strong>Employer match:</strong> Often 3–6% free money</li>
        <li><strong>Tax advantage:</strong> Contributions reduce taxable income</li>
        <li><strong>Withdrawals:</strong> Taxable at retirement (Traditional), tax-free (Roth)</li>
        <li><strong>Access:</strong> Penalty-free after 59.5 years old</li>
      </ul>

      <h4>IRA (Individual Retirement Account)</h4>

      <h5>Traditional IRA</h5>
      <ul>
        <li><strong>Contribution limit 2026:</strong> $7,000/year</li>
        <li><strong>Tax deduction:</strong> Contributions may be deductible</li>
        <li><strong>Growth:</strong> Tax-deferred</li>
        <li><strong>Withdrawals:</strong> Taxable as income</li>
        <li><strong>Required distributions:</strong> Start at 73 years old</li>
      </ul>

      <h5>Roth IRA</h5>
      <ul>
        <li><strong>Contribution limit 2026:</strong> $7,000/year</li>
        <li><strong>Tax benefit:</strong> Contributions NOT deductible, but withdrawals are tax-free</li>
        <li><strong>Best for:</strong> Young people expecting higher future income</li>
        <li><strong>Income limits:</strong> Phase out at higher earner levels</li>
        <li><strong>Flexibility:</strong> Can withdraw contributions (not gains) anytime</li>
      </ul>

      <h3>Investment Options</h3>
      <ul>
        <li><strong>Stocks/Equity funds:</strong> 7–10% annual return (historical), higher risk</li>
        <li><strong>Bonds:</strong> 3–5% annual return, lower risk</li>
        <li><strong>Index funds:</strong> Diversified, low cost, 7–9% return</li>
        <li><strong>Target-date funds:</strong> Automatically adjust risk as retirement nears</li>
        <li><strong>Money market:</strong> Low return, very safe</li>
      </ul>

      <h2>Asset Allocation by Age</h2>
      <ul>
        <li><strong>Age 25–35:</strong> 80–90% stocks, 10–20% bonds (aggressive growth)</li>
        <li><strong>Age 35–45:</strong> 70–80% stocks, 20–30% bonds (balanced growth)</li>
        <li><strong>Age 45–55:</strong> 60–70% stocks, 30–40% bonds (conservative growth)</li>
        <li><strong>Age 55–65:</strong> 40–50% stocks, 50–60% bonds (preservation)</li>
        <li><strong>Age 65+:</strong> 30–40% stocks, 60–70% bonds (income focus)</li>
      </ul>

      <h2>Retirement Savings Timeline</h2>

      <h3>Early 20s: The Foundation</h3>
      <ul>
        <li>Contribute at least enough to get full employer 401(k) match</li>
        <li>Open a Roth IRA and max it out if possible ($7,000/year)</li>
        <li>Total possible savings: $30,500/year</li>
      </ul>

      <h3>30s–40s: The Acceleration</h3>
      <ul>
        <li>Max out 401(k): $23,500</li>
        <li>Max out Roth IRA: $7,000</li>
        <li>Consider backdoor Roth if income-limited</li>
        <li>Total possible savings: $30,500/year</li>
      </ul>

      <h3>50s: The Catch-Up</h3>
      <ul>
        <li>Catch-up contributions allowed (additional $7,500 to 401k)</li>
        <li>Catch-up contributions to IRA (additional $1,000)</li>
        <li>Total possible savings: $38,500/year</li>
      </ul>

      <h2>Real-World Retirement Scenarios</h2>

      <h3>Scenario 1: Early Starter (Age 25)</h3>
      <ul>
        <li>Annual contribution: $15,000</li>
        <li>Average return: 7% annually</li>
        <li>Time to retirement: 40 years</li>
        <li>Final balance at 65: $2,860,000</li>
      </ul>

      <h3>Scenario 2: Average Starter (Age 35)</h3>
      <ul>
        <li>Annual contribution: $20,000</li>
        <li>Average return: 7% annually</li>
        <li>Time to retirement: 30 years</li>
        <li>Final balance at 65: $1,866,000</li>
      </ul>

      <h3>Scenario 3: Late Starter (Age 45)</h3>
      <ul>
        <li>Annual contribution: $25,000</li>
        <li>Average return: 7% annually</li>
        <li>Time to retirement: 20 years</li>
        <li>Final balance at 65: $961,000</li>
      </ul>

      <h2>Strategies to Accelerate Retirement Savings</h2>
      <ul>
        <li><strong>Maximize employer match:</strong> It's free money</li>
        <li><strong>Automate contributions:</strong> Set and forget</li>
        <li><strong>Increase contribution with raises:</strong> Save the extra income</li>
        <li><strong>Reduce fees:</strong> High expense ratios eat returns</li>
        <li><strong>Tax-efficient investing:</strong> Use Roth accounts strategically</li>
        <li><strong>Side income:</strong> Additional earnings can fund catch-up contributions</li>
      </ul>

      <div class="fact-box">
        <strong>🎯 Bottom Line:</strong> The best time to start saving for retirement was 20 years ago. The second-best time is today. Even small contributions compound dramatically over decades.
      </div>
    `
  },
  {
    id: 7,
    title: "Tax & VAT Explained",
    icon: "🧾",
    category: "finance",
    excerpt: "Understanding how taxes and VAT work, calculating your obligations, and minimizing tax burden.",
    date: "January 2026",
    readTime: "9 min read",
    content: `
      <h2>What is Tax?</h2>
      <p>Tax is a mandatory financial charge imposed by the government on income, purchases, or property. Taxes fund public services: infrastructure, schools, healthcare, defense, etc.</p>

      <h2>Types of Taxes</h2>

      <h3>1. Income Tax</h3>
      <p>Tax on money you earn from work, investments, business, etc.</p>
      <ul>
        <li><strong>Progressive system:</strong> Higher earners pay higher rates</li>
        <li><strong>U.S. federal brackets (2026 example):</strong> 10% → 12% → 22% → 24% → 32% → 35% → 37% (top rate)</li>
        <li><strong>Deductions:</strong> Reduce taxable income (standard or itemized)</li>
        <li><strong>Credits:</strong> Direct reduction in taxes owed</li>
      </ul>

      <h3>2. Capital Gains Tax</h3>
      <p>Tax on profits from selling investments (stocks, real estate, crypto).</p>
      <ul>
        <li><strong>Short-term (held < 1 year):</strong> Taxed as ordinary income</li>
        <li><strong>Long-term (held > 1 year):</strong> 0%, 15%, or 20% (more favorable rates)</li>
      </ul>

      <h3>3. Self-Employment Tax</h3>
      <p>If you're self-employed, you pay Social Security and Medicare taxes yourself (15.3% combined).</p>

      <h3>4. Corporate Tax</h3>
      <p>Companies pay tax on profits. U.S. federal rate is 21% (as of 2024).</p>

      <h3>5. Property Tax</h3>
      <p>Annual tax on real estate ownership, typically 0.5–2% of home value, varies significantly by location.</p>

      <h3>6. Sales Tax</h3>
      <p>Tax added to purchases (excluding groceries in most states). Average U.S. rate: 7.5% (varies 0–10.27% by state).</p>

      <div class="fact-box">
        <strong>💰 Example:</strong> Buy a $100 item in a state with 8% sales tax: $100 + $8 = $108 total.
      </div>

      <h2>What is VAT (Value Added Tax)?</h2>
      <p>VAT is a consumption tax used in 170+ countries worldwide. It's collected at each stage of production/sales based on the value added at that step.</p>

      <h3>How VAT Works (Simple Example)</h3>
      <ul>
        <li>Farmer grows wheat, sells to miller for $100 (10% VAT applies)</li>
        <li>Farmer remits: $100 × 10% = $10 to government</li>
        <li>Miller processes wheat, sells to baker for $200 (10% VAT)</li>
        <li>Miller paid $10 in VAT, now collects $200 × 10% = $20 VAT</li>
        <li>Miller remits: $20 − $10 = $10 to government</li>
        <li>Baker sells bread to consumer for $300 (10% VAT)</li>
        <li>Baker paid $20 in VAT, now collects $300 × 10% = $30 VAT</li>
        <li>Baker remits: $30 − $20 = $10 to government</li>
        <li>Consumer pays $330 ($300 + $30 VAT)</li>
        <li>Total VAT collected: $10 + $10 + $10 = $30</li>
      </ul>

      <p>The beauty of VAT: Taxes collected at each stage account for only the added value, avoiding double taxation at the consumer level.</p>

      <h3>VAT Rates by Country</h3>
      <ul>
        <li><strong>UK:</strong> 20% (standard), 5% (reduced), 0% (zero-rated on essentials)</li>
        <li><strong>Germany:</strong> 19% (standard), 7% (reduced)</li>
        <li><strong>France:</strong> 20% (standard), 5.5% (reduced)</li>
        <li><strong>Canada:</strong> 5% GST (Goods & Services Tax)</li>
        <li><strong>India:</strong> 5%, 12%, 18%, 28% (varies by product type)</li>
      </ul>

      <h3>VAT in the U.S.?</h3>
      <p>The U.S. doesn't have a federal VAT. Instead, it uses state sales taxes. Some economists argue VAT would be more efficient; others worry about inflation impacts.</p>

      <h2>VAT vs. Income Tax: The Difference</h2>

      <h3>Income Tax</h3>
      <ul>
        <li>Tax on your earnings</li>
        <li>You pay once when you earn money</li>
        <li>Progressive (higher earners pay higher rates)</li>
        <li>Used in all developed nations</li>
      </ul>

      <h3>VAT</h3>
      <ul>
        <li>Tax on purchases/consumption</li>
        <li>Collected at each production stage</li>
        <li>Regressive (lower income earners pay higher % of income)</li>
        <li>More common outside the U.S.</li>
      </ul>

      <div class="fact-box">
        <strong>⚖️ Key Difference:</strong> Income tax taxes what you earn. VAT taxes what you spend. A millionaire might pay the same VAT as a middle-class worker on identical purchases.
      </div>

      <h2>Calculating Your Taxes</h2>

      <h3>U.S. Income Tax Calculation</h3>
      <p>For a single filer with $75,000 income in 2026:</p>
      <ul>
        <li>Standard deduction: $14,600 (2026 estimate)</li>
        <li>Taxable income: $75,000 − $14,600 = $60,400</li>
        <li>Tax calculation (2026 brackets — estimates shown):</li>
      </ul>
      <ul style="margin-left: 20px;">
        <li>10% on first $11,000 = $1,100</li>
        <li>12% on $11,000–$44,725 ($33,725) = $4,047</li>
        <li>22% on $44,725–$60,400 ($15,675) = $3,449</li>
        <li><strong>Total tax: $8,596</strong></li>
        <li>Effective tax rate: $8,596 ÷ $75,000 = 11.5%</li>
      </ul>

      <h3>VAT Calculation (Example: 20% VAT)</h3>
      <ul>
        <li>Product price: $100</li>
        <li>VAT: $100 × 0.20 = $20</li>
        <li>Total paid by consumer: $120</li>
      </ul>

      <h2>Tax-Saving Strategies</h2>

      <h3>Income Tax Reduction</h3>
      <ul>
        <li><strong>Maximize retirement contributions:</strong> Reduces taxable income (401k, IRA)</li>
        <li><strong>Use Health Savings Account (HSA):</strong> Triple tax advantage (pre-tax contribution, tax-free growth, tax-free medical expenses)</li>
        <li><strong>Claim all eligible deductions:</strong> Mortgage interest, charitable donations, education</li>
        <li><strong>Tax-loss harvesting:</strong> Sell losing investments to offset capital gains</li>
        <li><strong>Hold investments long-term:</strong> Better tax treatment for long-term capital gains</li>
        <li><strong>Consider tax-advantaged accounts:</strong> Roth IRA, 529 college savings plans</li>
      </ul>

      <h3>Reducing VAT/Sales Tax Burden</h3>
      <ul>
        <li><strong>Buy essentials online:</strong> Some states don't collect sales tax on online purchases (increasingly changing)</li>
        <li><strong>Bulk purchases:</strong> Sometimes offer better value despite VAT</li>
        <li><strong>Use VAT-free goods:</strong> In countries with VAT. Groceries, medications often have reduced rates</li>
      </ul>

      <h2>Tax Deadlines & Penalties</h2>

      <h3>U.S. Tax Year Timeline</h3>
      <ul>
        <li><strong>Jan 1 – Dec 31:</strong> Tax year</li>
        <li><strong>April 15:</strong> Federal income tax deadline (filing or extension)</li>
        <li><strong>Extension deadline (if filed late):</strong> October 15 (six months)</li>
        <li><strong>Penalties for late payment:</strong> 0.5% per month + interest</li>
      </ul>

      <h2>When to Hire Help</h2>
      <p>Consider a tax professional if:</p>
      <ul>
        <li>You're self-employed</li>
        <li>You have complex investments</li>
        <li>You own a business</li>
        <li>Your situation changed (marriage, home purchase, inheritance)</li>
        <li>You earned over $100,000</li>
      </ul>

      <div class="fact-box">
        <strong>📌 Takeaway:</strong> Understanding your taxes helps you make smarter financial decisions. The key is paying what's legally owed while maximizing available deductions and tax-advantaged accounts.
      </div>
    `
  },
  {
    id: 8,
    title: "Calories & Diet Guide",
    icon: "🍎",
    category: "health",
    excerpt: "Science-based nutrition knowledge to fuel your body and reach your health goals.",
    date: "January 2026",
    readTime: "9 min read",
    content: `
      <h2>What are Calories?</h2>
      <p>A calorie is a unit of energy. Specifically, one calorie is the amount of heat required to raise 1 gram of water by 1°C. In nutrition, we actually use "kilocalories" (kcal), but call them "calories" for short.</p>

      <h2>Macronutrients: The Big Three</h2>

      <h3>1. Carbohydrates (4 calories per gram)</h3>
      <p>Your body's primary fuel source for energy, especially brain and muscles.</p>

      <h4>Types:</h4>
      <ul>
        <li><strong>Simple carbs:</strong> Quick energy, rapidly spike blood sugar. Examples: sugar, white bread, fruit juice</li>
        <li><strong>Complex carbs:</strong> Slow digestion, steady energy. Examples: whole grains, oats, legumes</li>
        <li><strong>Fiber:</strong> Supports digestion, doesn't spike blood sugar. Not absorbed as energy</li>
      </ul>

      <h4>Daily Intake:</h4>
      <ul>
        <li><strong>Standard (active people):</strong> 2–3g per pound of bodyweight</li>
        <li>For 70kg (154 lbs) person: 308–462g carbs/day</li>
        <li><strong>Low-carb diets:</strong> 50–150g/day</li>
        <li><strong>Keto:</strong> <50g/day</li>
      </ul>

      <h3>2. Protein (4 calories per gram)</h3>
      <p>Builds and repairs muscle, produces enzymes and hormones, supports immune function.</p>

      <h4>Sources:</h4>
      <ul>
        <li><strong>Animal:</strong> Chicken, fish, beef, eggs, dairy (complete amino acids)</li>
        <li><strong>Plant-based:</strong> Beans, lentils, tofu, nuts, seeds (often incomplete)</li>
      </ul>

      <h4>Daily Intake:</h4>
      <ul>
        <li><strong>Sedentary person:</strong> 0.8g per kg bodyweight (0.36g per lb)</li>
        <li>For 70kg person: 56g protein/day</li>
        <li><strong>Active/athletic:</strong> 1.6–2.2g per kg (0.7–1g per lb)</li>
        <li>For 70kg active person: 112–154g protein/day</li>
      </ul>

      <div class="fact-box">
        <strong>💪 Protein Tip:</strong> Spread protein throughout the day (20–40g per meal) for optimal muscle protein synthesis.
      </div>

      <h3>3. Fat (9 calories per gram)</h3>
      <p>Most calorie-dense macronutrient. Essential for hormone production, brain health, nutrient absorption.</p>

      <h4>Types:</h4>
      <ul>
        <li><strong>Saturated fat:</strong> Steak, butter, coconut oil. Higher in calories, increases cholesterol</li>
        <li><strong>Unsaturated fat:</strong> Oils, nuts, avocado, fish. Heart-healthy</li>
        <li><strong>Trans fat:</strong> Avoid. Partially hydrogenated oils (most fast food)</li>
      </ul>

      <h4>Daily Intake:</h4>
      <ul>
        <li><strong>Standard:</strong> 25–35% of total calories</li>
        <li>For 2,000 calorie diet: 55–77g fat/day</li>
        <li><strong>Keep saturated fat <10% of calories:</strong> Limit to ~22g on 2,000 cal diet</li>
      </ul>

      <h2>Calculating Your Calorie Needs</h2>

      <h3>Step 1: Calculate BMR (Basal Metabolic Rate)</h3>
      <p>Using Mifflin-St Jeor equation (most accurate):</p>
      <ul>
        <li><strong>Men:</strong> (10 × weight_kg) + (6.25 × height_cm) − (5 × age_years) + 5</li>
        <li><strong>Women:</strong> (10 × weight_kg) + (6.25 × height_cm) − (5 × age_years) − 161</li>
      </ul>
      <p>Example: 30-year-old male, 70kg, 175cm</p>
      <p>BMR = (10 × 70) + (6.25 × 175) − (5 × 30) + 5 = 700 + 1,093.75 − 150 + 5 = 1,648.75 kcal/day</p>

      <h3>Step 2: Multiply by Activity Factor (TDEE)</h3>
      <ul>
        <li><strong>Sedentary:</strong> BMR × 1.2 (little to no exercise)</li>
        <li><strong>Light:</strong> BMR × 1.375 (1–3 days/week exercise)</li>
        <li><strong>Moderate:</strong> BMR × 1.55 (3–5 days/week exercise)</li>
        <li><strong>Active:</strong> BMR × 1.725 (6–7 days/week moderate exercise)</li>
        <li><strong>Very active:</strong> BMR × 1.9 (physical job or 2× daily training)</li>
      </ul>

      <p>For our example with moderate activity (1.55 multiplier):</p>
      <p>TDEE = 1,648.75 × 1.55 = 2,555 kcal/day</p>

      <h2>Common Diet Types</h2>

      <h3>Balanced Diet (40% carbs / 30% protein / 30% fat)</h3>
      <p>For 2,000 calorie diet:</p>
      <ul>
        <li>Carbs: 800 kcal ÷ 4 = 200g</li>
        <li>Protein: 600 kcal ÷ 4 = 150g</li>
        <li>Fat: 600 kcal ÷ 9 = 67g</li>
      </ul>
      <p>Best for: General health, maintenance, moderate fitness goals</p>

      <h3>High-Protein Diet (40% carbs / 35% protein / 25% fat)</h3>
      <p>For 2,000 calorie diet:</p>
      <ul>
        <li>Carbs: 800 kcal = 200g</li>
        <li>Protein: 700 kcal = 175g</li>
        <li>Fat: 500 kcal = 56g</li>
      </ul>
      <p>Best for: Muscle building, weight loss (high satiety), strength training</p>

      <h3>Keto (5% carbs / 25% protein / 70% fat)</h3>
      <p>For 2,000 calorie diet:</p>
      <ul>
        <li>Carbs: 100 kcal = 25g</li>
        <li>Protein: 500 kcal = 125g</li>
        <li>Fat: 1,400 kcal = 156g</li>
      </ul>
      <p>Best for: Rapid weight loss, appetite suppression, diabetes management</p>
      <p>Note: Requires adaptation period; not for everyone</p>

      <h3>Low-Carb (20% carbs / 40% protein / 40% fat)</h3>
      <p>For 2,000 calorie diet:</p>
      <ul>
        <li>Carbs: 400 kcal = 100g</li>
        <li>Protein: 800 kcal = 200g</li>
        <li>Fat: 800 kcal = 89g</li>
      </ul>
      <p>Best for: Steady weight loss, blood sugar control, moderate sustainability</p>

      <h2>Micronutrients: The Essential Details</h2>
      <p>While macronutrients provide energy, micronutrients keep your body functioning.</p>

      <h3>Key Vitamins & Minerals</h3>
      <ul>
        <li><strong>Iron:</strong> Oxygen transport. Sources: red meat, spinach, legumes</li>
        <li><strong>Calcium:</strong> Bone health. Sources: dairy, leafy greens, fortified foods</li>
        <li><strong>Vitamin D:</strong> Immune function, bone health. Sources: sun, fatty fish, fortified milk</li>
        <li><strong>B vitamins:</strong> Energy metabolism. Sources: grains, meat, legumes</li>
        <li><strong>Potassium:</strong> Heart health, muscle function. Sources: bananas, potatoes, beans</li>
        <li><strong>Sodium:</strong> Electrolyte balance. Sources: most processed foods (often excessive)</li>
      </ul>

      <h2>Hydration</h2>
      <ul>
        <li><strong>General guideline:</strong> 2–3 liters (8–10 cups) per day</li>
        <li><strong>More if:</strong> Active, hot climate, pregnant, breastfeeding</li>
        <li><strong>Thirst indicator:</strong> By time you're thirsty, you're mildly dehydrated</li>
        <li><strong>Urine color:</strong> Pale yellow = well hydrated; dark = dehydrated</li>
      </ul>

      <div class="fact-box">
        <strong>💧 Hydration Myth:</strong> You don't need exactly 8 glasses. Drink when thirsty, and more if exercising. Coffee and tea count toward hydration.
      </div>

      <h2>Nutrition Tips for Common Goals</h2>

      <h3>Weight Loss</h3>
      <ul>
        <li>Create 300–500 calorie deficit</li>
        <li>Prioritize protein (high satiety, muscle preservation)</li>
        <li>Eat whole foods, minimize processed</li>
        <li>Track intake (apps like MyFitnessPal)</li>
        <li>Strength train to preserve muscle</li>
      </ul>

      <h3>Muscle Gain</h3>
      <ul>
        <li>Create 300–500 calorie surplus</li>
        <li>Eat 1.6–2.2g protein per kg bodyweight</li>
        <li>Time carbs around workouts</li>
        <li>Prioritize compound strength training</li>
        <li>Sleep 7–9 hours for recovery</li>
      </ul>

      <h3>General Health</h3>
      <ul>
        <li>Fill half your plate with vegetables</li>
        <li>Choose whole grains over refined</li>
        <li>Include lean protein every meal</li>
        <li>Limit sugar, salt, processed foods</li>
        <li>Stay hydrated</li>
      </ul>

      <div class="fact-box">
        <strong>⚖️ Bottom Line:</strong> Calories matter for weight management, but nutrition quality matters for health. Focus on whole foods, adequate protein, and consistent habits rather than perfect macros.
      </div>
    `
  }
];

// ─── CSS for Articles Component ────────────────────────────────────────────────
const ARTICLES_CSS = `
.articles-container { max-width: 980px; margin: 0 auto; padding: 0 16px 60px; }

/* ── ARTICLES HEADER ── */
.articles-header { padding: 32px 0 20px; text-align: center; }
.articles-header h1 { font-family: 'Space Mono', monospace; font-size: 22px; color: var(--accent); }
.articles-header p { color: var(--muted); font-size: 13px; margin-top: 4px; }

/* ── ARTICLES GRID ── */
.articles-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-bottom: 40px; }

/* ── ARTICLE CARD ── */
.article-card { 
  background: var(--surface); 
  border: 1px solid var(--border); 
  border-radius: 8px; 
  padding: 18px; 
  cursor: pointer; 
  transition: all .15s; 
  display: flex; 
  flex-direction: column; 
  gap: 12px;
}
.article-card:hover { 
  border-color: var(--accent); 
  background: var(--surface2); 
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(88, 166, 255, 0.1);
}

.article-card-icon { font-size: 32px; }

.article-card-title { 
  font-size: 14px; 
  font-weight: 700; 
  color: var(--text); 
  line-height: 1.4;
}

.article-card-excerpt { 
  font-size: 12px; 
  color: var(--muted); 
  line-height: 1.5; 
  flex-grow: 1;
}

.article-card-meta { 
  display: flex; 
  justify-content: space-between; 
  font-size: 10px; 
  color: var(--muted); 
  font-family: 'Space Mono', monospace;
}

/* ── ARTICLE MODAL ── */
.article-modal { 
  position: fixed; 
  inset: 0; 
  background: rgba(0,0,0,.7); 
  z-index: 300; 
  overflow-y: auto; 
  padding: 24px 16px; 
  backdrop-filter: blur(6px); 
}

.article-inner { 
  max-width: 720px; 
  margin: 0 auto; 
  background: var(--surface); 
  border: 1px solid var(--border); 
  border-radius: 12px; 
  padding: 40px; 
  box-shadow: 0 20px 60px rgba(0,0,0,.5);
}

.article-modal-header { 
  display: flex; 
  align-items: flex-start; 
  justify-content: space-between; 
  margin-bottom: 24px;
}

.article-modal-title { 
  display: flex; 
  align-items: center; 
  gap: 12px;
}

.article-modal-title-icon { 
  font-size: 36px;
}

.article-modal-title-text h1 { 
  font-family: 'Space Mono', monospace; 
  font-size: 22px; 
  color: var(--accent); 
  margin: 0 0 4px;
}

.article-modal-meta { 
  font-size: 11px; 
  color: var(--muted); 
  font-family: 'Space Mono', monospace;
}

.article-modal-close { 
  background: none; 
  border: none; 
  color: var(--muted); 
  font-size: 24px; 
  cursor: pointer; 
  padding: 0; 
  line-height: 1;
  flex-shrink: 0;
}

.article-modal-close:hover { 
  color: var(--text); 
}

.article-content { 
  line-height: 1.8; 
  color: var(--text);
}

.article-content h2 { 
  font-size: 16px; 
  font-weight: 700; 
  color: var(--accent2); 
  margin: 24px 0 12px; 
  font-family: 'Space Mono', monospace;
  text-transform: uppercase;
  letter-spacing: .05em;
}

.article-content h3 { 
  font-size: 14px; 
  font-weight: 700; 
  color: var(--accent); 
  margin: 16px 0 8px; 
  font-family: 'Sora', sans-serif;
}

.article-content h4 { 
  font-size: 13px; 
  font-weight: 700; 
  color: var(--text); 
  margin: 12px 0 6px;
}

.article-content p { 
  font-size: 13px; 
  margin: 12px 0; 
  color: var(--muted);
}

.article-content ul, 
.article-content ol { 
  font-size: 13px; 
  padding-left: 20px; 
  margin: 12px 0;
  color: var(--muted);
}

.article-content li { 
  margin-bottom: 6px; 
  line-height: 1.6;
}

.article-content strong { 
  color: var(--accent);
  font-weight: 700;
}

.fact-box { 
  background: var(--surface2); 
  border-left: 4px solid var(--accent2); 
  padding: 16px; 
  border-radius: 6px; 
  margin: 20px 0; 
  font-size: 13px; 
  color: var(--text);
}

.fact-box strong { 
  color: var(--accent2);
  display: block;
  margin-bottom: 6px;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .articles-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
  .article-inner { padding: 24px; }
  .article-content h2 { font-size: 14px; }
  .article-content p, .article-content li { font-size: 12px; }
}
`;

// ─── Articles Component ────────────────────────────────────────────────────────
export default function Articles() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <>
      <style>{ARTICLES_CSS}</style>
      <div className="articles-container">
        <div className="articles-header">
          <h1>📚 Informational Articles</h1>
          <p>Learn the science behind money, health, and everyday decisions</p>
        </div>

        <div className="articles-grid">
          {ARTICLES.map((article) => (
            <div 
              key={article.id} 
              className="article-card" 
              onClick={() => setSelectedArticle(article)}
            >
              <div className="article-card-icon">{article.icon}</div>
              <div className="article-card-title">{article.title}</div>
              <div className="article-card-excerpt">{article.excerpt}</div>
              <div className="article-card-meta">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedArticle && (
        <div className="article-modal" onClick={(e) => {
          if (e.target.classList.contains("article-modal")) setSelectedArticle(null);
        }}>
          <div className="article-inner">
            <div className="article-modal-header">
              <div className="article-modal-title">
                <div className="article-modal-title-icon">{selectedArticle.icon}</div>
                <div className="article-modal-title-text">
                  <h1>{selectedArticle.title}</h1>
                  <div className="article-modal-meta">
                    {selectedArticle.date} · {selectedArticle.readTime}
                  </div>
                </div>
              </div>
              <button 
                className="article-modal-close" 
                onClick={() => setSelectedArticle(null)}
              >
                ×
              </button>
            </div>
            <div 
              className="article-content" 
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />
          </div>
        </div>
      )}
    </>
  );
}
