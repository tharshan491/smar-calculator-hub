'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function BMICalculatorGuidePage() {
  return (
    <article className="min-h-screen bg-bg">
      <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:opacity-80 pt-4 px-4 md:pt-6 md:px-6">
        <span>←</span> Back to Blog
      </Link>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <span className="inline-block bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded mb-4">Health & Fitness</span>
          <h1 className="text-4xl md:text-5xl font-space-mono font-bold text-text mb-4">
            BMI Calculator: What Is a Healthy Weight for You? Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>By Health Coach</span>
            <span>•</span>
            <span>April 2024</span>
            <span>•</span>
            <span>10 min read</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-text">
          
          <section>
            <p className="text-lg leading-relaxed font-medium">
              Your weight is just a number on a scale. Your health is much more than that. But understanding whether your weight is healthy for your height is crucial for preventing chronic diseases and living longer. This is where a BMI calculator comes in—it's a simple, quick tool that helps you understand if you're in a healthy weight range.
            </p>
            
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
              <p className="text-sm font-medium text-accent mb-2">📊 Check Your BMI Now:</p>
              <p className="text-sm"><Link href="/health/bmi" className="text-accent hover:underline">Try our free BMI calculator →</Link> to find your healthy weight range in seconds.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">What Is BMI and Why Does It Matter?</h2>
            <p className="text-base leading-relaxed mt-4">
              BMI stands for Body Mass Index. It's a simple formula that compares your weight to your height to estimate whether you're at a healthy weight. While BMI isn't perfect, it's the most widely used and recommended screening tool by health organizations worldwide, including the CDC and WHO.
            </p>
            <p className="text-base leading-relaxed mt-4">
              Your BMI helps identify health risks. People with BMI in certain ranges have higher risks of heart disease, diabetes, and other chronic conditions. Knowing your BMI is the first step toward making healthier choices.
            </p>

            <div className="bg-surface border-l-4 border-accent rounded-lg p-4 my-6 font-mono text-sm">
              <p className="mb-4">BMI = weight (kg) / height (m)²</p>
              <p className="text-xs mb-3">Or in pounds and inches:</p>
              <p className="text-xs">BMI = [weight (lbs) / height (inches)²] × 703</p>
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
              <p className="text-sm font-medium text-accent mb-2">💡 Quick Tip:</p>
              <p className="text-sm">Our BMI calculator does this math instantly so you don't have to. Just enter your height and weight.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">BMI Categories: What Do Your Numbers Mean?</h2>
            
            <div className="bg-surface border border-border rounded-lg p-6 my-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start pb-4 border-b border-border">
                  <div>
                    <p className="font-bold text-accent">Underweight</p>
                    <p className="text-xs text-muted mt-1">BMI Less Than 18.5</p>
                  </div>
                  <p className="text-sm text-muted text-right">May indicate malnutrition or health issues requiring medical attention</p>
                </div>
                <div className="flex justify-between items-start pb-4 border-b border-border">
                  <div>
                    <p className="font-bold text-green-400">Normal Weight</p>
                    <p className="text-xs text-muted mt-1">BMI 18.5 – 24.9</p>
                  </div>
                  <p className="text-sm text-muted text-right">Considered a healthy weight range with lowest health risks</p>
                </div>
                <div className="flex justify-between items-start pb-4 border-b border-border">
                  <div>
                    <p className="font-bold text-yellow-400">Overweight</p>
                    <p className="text-xs text-muted mt-1">BMI 25 – 29.9</p>
                  </div>
                  <p className="text-sm text-muted text-right">Increased health risks; lifestyle changes recommended</p>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-red-400">Obese</p>
                    <p className="text-xs text-muted mt-1">BMI 30 or Higher</p>
                  </div>
                  <p className="text-sm text-muted text-right">Significantly higher health risks; medical consultation recommended</p>
                </div>
              </div>
            </div>

            <p className="text-base leading-relaxed mt-4">
              These ranges apply to most adults aged 20 and older. Children, pregnant women, and athletes have different considerations, so consult a healthcare provider for personalized advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">How to Use a BMI Calculator</h2>
            
            <h3 className="text-xl font-bold text-text mt-6">Step 1: Gather Your Measurements</h3>
            <p className="text-base leading-relaxed">
              You need two pieces of information: your current weight and your height. For accuracy, weigh yourself on a reliable scale first thing in the morning.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Step 2: Enter Your Data</h3>
            <p className="text-base leading-relaxed">
              Input your height (in feet/inches or centimeters) and weight (in pounds or kilograms) into the calculator.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Step 3: Get Your Results</h3>
            <p className="text-base leading-relaxed">
              The calculator instantly shows your BMI number and which category you fall into (underweight, normal, overweight, or obese).
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Step 4: Interpret Your Results</h3>
            <p className="text-base leading-relaxed">
              Compare your BMI to the categories above. If your BMI is outside the normal range, consider consulting a healthcare provider about lifestyle changes or treatment options.
            </p>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
              <p className="text-sm font-medium text-accent mb-2">🎯 Calculate Now:</p>
              <p className="text-sm"><Link href="/health/bmi" className="text-accent hover:underline">Use our BMI calculator →</Link> get your personalized health insight.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">BMI Limitations: What It Doesn't Measure</h2>
            
            <p className="text-base leading-relaxed mt-4">
              While BMI is useful, it has important limitations:
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Muscle vs. Fat</h3>
            <p className="text-base leading-relaxed">
              BMI doesn't distinguish between muscle and fat. A muscular person might have a "high" BMI despite being very healthy.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Age and Bone Density</h3>
            <p className="text-base leading-relaxed">
              BMI doesn't account for age. Bone density and metabolism change with age, affecting what's "healthy."
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Ethnicity and Genetics</h3>
            <p className="text-base leading-relaxed">
              Different populations may have different health risks at the same BMI, and genetics influence where you naturally carry weight.
            </p>

            <div className="bg-surface border border-border rounded-lg p-4 my-6">
              <p className="text-sm"><strong>Pro Tip:</strong> Use BMI as a starting point, but combine it with other metrics like waist circumference, blood pressure, cholesterol levels, and how you feel physically.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Calculating Your Ideal Weight Range</h2>
            
            <p className="text-base leading-relaxed mt-4">
              Your ideal weight range is the range where your BMI falls between 18.5 and 24.9. Let's say you're 5'8" tall:
            </p>

            <div className="bg-surface border border-border rounded-lg p-4 my-6">
              <p className="text-sm"><strong>For someone 5'8" (173 cm):</strong></p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Minimum healthy weight: 118 lbs (53.5 kg)</li>
                <li>• Maximum healthy weight: 159 lbs (72.5 kg)</li>
                <li>• Ideal weight range: 118–159 lbs</li>
              </ul>
            </div>

            <p className="text-base leading-relaxed mt-4">
              Everyone's body is different. Within your healthy weight range, you might feel best at different points. Work with a healthcare provider to find your optimal weight.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Steps to Achieve a Healthy BMI</h2>
            
            <h3 className="text-xl font-bold text-text mt-6">Focus on Nutrition First</h3>
            <p className="text-base leading-relaxed">
              Most weight changes come from diet. Focus on whole foods, reduce processed foods, and create a reasonable calorie deficit if weight loss is needed.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Add Regular Exercise</h3>
            <p className="text-base leading-relaxed">
              Combine strength training (3x/week) with cardio (150 min/week). Exercise improves health regardless of weight changes.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Prioritize Sleep and Stress</h3>
            <p className="text-base leading-relaxed">
              Poor sleep disrupts hunger hormones. Chronic stress increases cortisol, promoting fat storage. Both are critical for weight management.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Be Patient with Progress</h3>
            <p className="text-base leading-relaxed">
              Healthy weight loss is 1–2 pounds per week. Sustainable changes take time but create lasting results.
            </p>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
              <p className="text-sm font-medium text-accent mb-2">📈 Monitor Progress:</p>
              <p className="text-sm"><Link href="/health/bmi" className="text-accent hover:underline">Check your BMI monthly →</Link> to track progress toward your healthy weight range.</p>
            </div>
          </section>

          {/* Section - Health Risks by BMI */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Health Risks Associated with Different BMI Levels</h2>
            
            <h3 className="text-xl font-bold text-text mt-6">Underweight (BMI &lt; 18.5)</h3>
            <p className="text-base leading-relaxed">
              Underweight individuals have elevated risks of bone loss, weakened immune function, and malnutrition. Women may experience irregular periods. Seniors face higher fall and fracture risks.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Normal Weight (BMI 18.5–24.9)</h3>
            <p className="text-base leading-relaxed">
              This range has the lowest risk of chronic disease. However, even within normal BMI, sedentary lifestyle and poor diet increase disease risk. Health requires more than maintaining a number.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Overweight (BMI 25–29.9)</h3>
            <p className="text-base leading-relaxed">
              Overweight individuals have increased risk of type 2 diabetes, heart disease, high blood pressure, and joint stress. However, the risks increase gradually and can be mitigated through lifestyle changes.
            </p>

            <div className="bg-surface border border-border rounded-lg p-4 my-6">
              <p className="text-sm"><strong>Specific Overweight Risks:</strong></p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• 50% higher risk of high blood pressure</li>
                <li>• 2x higher risk of type 2 diabetes</li>
                <li>• 1.5x higher risk of heart disease</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-text mt-6">Obese (BMI ≥ 30)</h3>
            <p className="text-base leading-relaxed">
              Obesity significantly increases risk of multiple chronic diseases. These include type 2 diabetes, heart disease, stroke, certain cancers, sleep apnea, and fatty liver disease. The good news? Even modest weight loss (5-10%) dramatically improves health markers.
            </p>

            <div className="bg-surface border border-border rounded-lg p-4 my-6">
              <p className="text-sm"><strong>Documented Obesity Health Risks:</strong></p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• 4x higher risk of type 2 diabetes</li>
                <li>• 2x higher risk of heart disease</li>
                <li>• 1.5x higher risk of stroke</li>
                <li>• Increased risk of 12+ types of cancer</li>
                <li>• Higher risk of gallstones and liver disease</li>
              </ul>
            </div>
          </section>

          {/* Section - When to See a Doctor */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">When Should You Consult a Healthcare Provider About Your BMI?</h2>
            
            <h3 className="text-xl font-bold text-text mt-6">You Should Definitely See a Doctor If:</h3>
            <ul className="list-disc list-inside space-y-2 mt-4 text-base">
              <li>Your BMI is under 18.5 (underweight) and you're not an athlete</li>
              <li>Your BMI is over 30 (obese)</li>
              <li>Your BMI has increased rapidly (10+ points in a year)</li>
              <li>You experience fatigue, unexplained weight changes, or health symptoms</li>
              <li>Your weight gain is negatively affecting your mental health</li>
              <li>You have a family history of obesity-related diseases</li>
              <li>You're struggling to manage weight despite diet and exercise efforts</li>
            </ul>

            <h3 className="text-xl font-bold text-text mt-6">During Your Doctor Visit, Ask About:</h3>
            <ul className="list-disc list-inside space-y-2 mt-4 text-base">
              <li>Your personalized healthy weight range (not just BMI categories)</li>
              <li>Underlying health conditions affecting weight (thyroid, PCOS, metabolic disorders)</li>
              <li>Medications that might influence weight</li>
              <li>Appropriate exercise recommendations for your fitness level</li>
              <li>Referrals to nutritionists or weight management programs</li>
              <li>Whether weight loss medication or other interventions are appropriate</li>
            </ul>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
              <p className="text-sm font-medium text-accent mb-2">💡 Remember:</p>
              <p className="text-sm">Your BMI calculator result is a starting point for conversation with healthcare providers, not a diagnosis. Professional guidance tailored to your health history is always more valuable than any number alone.</p>
            </div>
          </section>

          {/* Section - BMI and Different Populations */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">BMI Considerations for Different Groups</h2>
            
            <h3 className="text-xl font-bold text-text mt-6">Athletes and Muscular Individuals</h3>
            <p className="text-base leading-relaxed">
              Muscle weighs more than fat. Athletes often have "high" BMI despite low body fat. BMI alone is misleading for this population. Alternative measures like body composition analysis are more accurate.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Older Adults (65+)</h3>
            <p className="text-base leading-relaxed">
              Seniors lose muscle mass naturally. A BMI of 25-27 in seniors is often associated with better health outcomes than the standard 18.5-24.9 range. Age-adjusted considerations are important.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Pregnant Women</h3>
            <p className="text-base leading-relaxed">
              Pregnancy weight gain is normal and necessary. Doctors use different BMI interpretations during pregnancy. Never use standard BMI categories during pregnancy without medical guidance.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Children and Teenagers</h3>
            <p className="text-base leading-relaxed">
              Growing children need different BMI ranges because body composition changes with age and development. Pediatricians use age and gender-specific BMI percentiles, not adult categories.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Different Ethnic Groups</h3>
            <p className="text-base leading-relaxed">
              Some research suggests different ethnic groups may have different health risk associations with BMI. Consult healthcare providers familiar with your ethnic background's health profiles.
            </p>
          </section>

          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-space-mono font-bold text-text mb-6">FAQ: BMI Calculator Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-text mb-2">Is BMI accurate for everyone?</h3>
                <p className="text-base leading-relaxed text-muted">
                  BMI is a screening tool, not a diagnostic tool. It's accurate for most people but less reliable for athletes, elderly people, children, and those with certain medical conditions. Always consult a healthcare provider for personalized assessment.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text mb-2">Can I have a high BMI and still be healthy?</h3>
                <p className="text-base leading-relaxed text-muted">
                  Yes. Muscular athletes often have high BMIs. Conversely, thin people can have poor health. BMI is one indicator among many. Overall fitness, strength, and health markers matter more than the number alone.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text mb-2">How often should I calculate my BMI?</h3>
                <p className="text-base leading-relaxed text-muted">
                  Once monthly is ideal if you're working on weight management. For maintenance, once or twice per year is sufficient. Daily weighing is counterproductive because weight naturally fluctuates.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text mb-2">What if my BMI is underweight?</h3>
                <p className="text-base leading-relaxed text-muted">
                  Underweight can indicate malnutrition or underlying health issues. Consult a healthcare provider. Focus on nutrient-dense foods and strength training to build healthy muscle mass.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text mb-2">Should children use BMI calculators?</h3>
                <p className="text-base leading-relaxed text-muted">
                  Children have different BMI ranges because their body composition changes as they grow. Use age-adjusted BMI percentiles with a pediatrician, not adult categories.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text mb-2">Is it better to use BMI or body fat percentage?</h3>
                <p className="text-base leading-relaxed text-muted">
                  Both are useful. BMI is quick and free. Body fat percentage is more accurate but requires professional measurement (DEXA scan, hydrostatic weighing). Use both for complete health insight.
                </p>
              </div>
            </div>
          </section>

          {/* Section - Related Calculators */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Related Health & Fitness Calculators</h2>
            
            <p className="text-base leading-relaxed mt-4">
              BMI is just one piece of the health puzzle. These complementary calculators give you a complete picture of your fitness and wellness:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Link href="/health/calories" className="p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all">
                <p className="font-bold text-accent mb-2">💪 Calorie Calculator</p>
                <p className="text-xs text-muted">Calculate daily calorie needs based on age, activity level, and goals</p>
              </Link>
              
              <Link href="/health/macro" className="p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all">
                <p className="font-bold text-accent mb-2">🥗 Macro Calculator</p>
                <p className="text-xs text-muted">Determine protein, carbs, and fat ratios for your fitness goals</p>
              </Link>

              <Link href="/health/tdee" className="p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all">
                <p className="font-bold text-accent mb-2">⚡ TDEE Calculator</p>
                <p className="text-xs text-muted">Find your Total Daily Energy Expenditure for weight management</p>
              </Link>

              <Link href="/health/sleep" className="p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all">
                <p className="font-bold text-accent mb-2">😴 Sleep Calculator</p>
                <p className="text-xs text-muted">Determine optimal sleep duration based on your age</p>
              </Link>

              <Link href="/health/water-intake" className="p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all">
                <p className="font-bold text-accent mb-2">💧 Water Intake Calculator</p>
                <p className="text-xs text-muted">Calculate daily water needs for optimal hydration</p>
              </Link>

              <Link href="/health/rep-max" className="p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all">
                <p className="font-bold text-accent mb-2">🏋️ One Rep Max Calculator</p>
                <p className="text-xs text-muted">Estimate your maximum strength for weight training</p>
              </Link>
            </div>
          </section>

          {/* Section - Why You're Not Losing Weight */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Why You're Not Losing Weight (Despite Having a Healthy BMI Goal)</h2>
            
            <p className="text-base leading-relaxed mt-4">
              Many people calculate their healthy BMI weight but struggle to reach it. Here's why:
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Reason #1: Calorie Counting is Wrong</h3>
            <p className="text-base leading-relaxed">
              Not all calories are equal. 200 calories of chicken differs from 200 calories of sugar in how your body processes it. Focus on nutrient-dense whole foods rather than obsessing over calorie counts.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Reason #2: You're Not Eating Enough Protein</h3>
            <p className="text-base leading-relaxed">
              Protein preserves muscle during weight loss and keeps you full longer. Aim for 0.7-1g per pound of target body weight. Most people don't eat remotely close to this amount.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Reason #3: Sleep Deprivation Ruins Everything</h3>
            <p className="text-base leading-relaxed">
              Bad sleep increases cortisol (stress hormone), which promotes fat storage, especially belly fat. Seven to nine hours of quality sleep is non-negotiable for weight loss.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Reason #4: You're Not Strength Training</h3>
            <p className="text-base leading-relaxed">
              Cardio alone is inefficient. Muscle tissue burns calories at rest. Strength training builds muscle, increases metabolism, and creates body recomposition (lose fat, gain muscle).
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Reason #5: Chronic Stress</h3>
            <p className="text-base leading-relaxed">
              High stress → high cortisol → fat storage → difficulty losing weight. Meditation, yoga, walks, and proper sleep manage stress better than willpower alone.
            </p>

            <h3 className="text-xl font-bold text-text mt-6">Reason #6: Hidden Calories in Drinks</h3>
            <p className="text-base leading-relaxed">
              Sodas, juices, coffee drinks, and alcohol add hundreds of calories daily without satiety. Drink water, unsweetened tea, and coffee. Everything else is optional.
            </p>

            <div className="bg-surface border border-border rounded-lg p-4 my-6">
              <p className="text-sm"><strong>The Reality:</strong> Weight loss isn't mysterious. Eat protein, sleep 8 hours, strength train 3x/week, manage stress, and eat whole foods. Follow these principles and your BMI will improve naturally.</p>
            </div>
          </section>

          {/* Section - BMI Quick Reference Table */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">BMI Quick Reference Tables by Height</h2>
            
            <p className="text-base leading-relaxed mt-4">
              Need to know your healthy weight range for your height? Use these quick reference tables:
            </p>

            <div className="bg-surface border border-border rounded-lg overflow-x-auto my-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-accent/10">
                    <th className="px-4 py-3 text-left font-bold">Height</th>
                    <th className="px-4 py-3 text-left font-bold">Underweight</th>
                    <th className="px-4 py-3 text-left font-bold">Normal Weight</th>
                    <th className="px-4 py-3 text-left font-bold">Overweight</th>
                    <th className="px-4 py-3 text-left font-bold">Obese</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b border-border">
                    <td className="px-4 py-2 font-semibold">5'0" (152 cm)</td>
                    <td className="px-4 py-2">Below 95 lbs</td>
                    <td className="px-4 py-2 text-green-400">95-127 lbs</td>
                    <td className="px-4 py-2 text-yellow-400">127-153 lbs</td>
                    <td className="px-4 py-2 text-red-400">153+ lbs</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2 font-semibold">5'4" (163 cm)</td>
                    <td className="px-4 py-2">Below 110 lbs</td>
                    <td className="px-4 py-2 text-green-400">110-147 lbs</td>
                    <td className="px-4 py-2 text-yellow-400">147-177 lbs</td>
                    <td className="px-4 py-2 text-red-400">177+ lbs</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2 font-semibold">5'8" (173 cm)</td>
                    <td className="px-4 py-2">Below 118 lbs</td>
                    <td className="px-4 py-2 text-green-400">118-159 lbs</td>
                    <td className="px-4 py-2 text-yellow-400">159-191 lbs</td>
                    <td className="px-4 py-2 text-red-400">191+ lbs</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2 font-semibold">5'10" (178 cm)</td>
                    <td className="px-4 py-2">Below 132 lbs</td>
                    <td className="px-4 py-2 text-green-400">132-178 lbs</td>
                    <td className="px-4 py-2 text-yellow-400">178-214 lbs</td>
                    <td className="px-4 py-2 text-red-400">214+ lbs</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold">6'0" (183 cm)</td>
                    <td className="px-4 py-2">Below 136 lbs</td>
                    <td className="px-4 py-2 text-green-400">136-184 lbs</td>
                    <td className="px-4 py-2 text-yellow-400">184-221 lbs</td>
                    <td className="px-4 py-2 text-red-400">221+ lbs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted">
              Note: These are approximate ranges. Exact values depend on your specific height and body composition. Use our <Link href="/health/bmi" className="text-accent hover:underline">BMI calculator</Link> for personalized results.
            </p>
          </section>

          {/* Section - Nutrition & Fitness Tools */}
          <section>
            <h2 className="text-2xl font-space-mono font-bold text-text">Nutrition & Fitness Tools You Need</h2>
            
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 bg-surface/50 border border-border rounded-lg">
                <p className="font-bold text-accent mb-2">📊 Fitness Calculations</p>
                <ul className="text-xs text-muted space-y-1">
                  <li>• BMI by age and gender</li>
                  <li>• Body fat percentage</li>
                  <li>• Ideal weight ranges</li>
                  <li>• Calorie daily needs</li>
                  <li>• Macronutrient ratios</li>
                  <li>• Exercise recommendations</li>
                </ul>
              </div>

              <div className="p-4 bg-surface/50 border border-border rounded-lg">
                <p className="font-bold text-accent mb-2">💰 Money Saving Health Tips</p>
                <ul className="text-xs text-muted space-y-1">
                  <li>• Gym membership costs</li>
                  <li>• Meal prep budgets</li>
                  <li>• Home workout equipment</li>
                  <li>• Nutrition costs per serving</li>
                  <li>• Healthcare savings</li>
                  <li>• Weight loss ROI</li>
                </ul>
              </div>

              <div className="p-4 bg-surface/50 border border-border rounded-lg">
                <p className="font-bold text-accent mb-2">📈 Health Tracking</p>
                <ul className="text-xs text-muted space-y-1">
                  <li>• Weight progress tracking</li>
                  <li>• Body measurements</li>
                  <li>• Fitness milestones</li>
                  <li>• Nutrition logging</li>
                  <li>• Workout performance</li>
                  <li>• Health metrics dashboard</li>
                </ul>
              </div>

              <div className="p-4 bg-surface/50 border border-border rounded-lg">
                <p className="font-bold text-accent mb-2">🎯 Goal Setting & Planning</p>
                <ul className="text-xs text-muted space-y-1">
                  <li>• SMART goals framework</li>
                  <li>• Timeline planning</li>
                  <li>• Milestone tracking</li>
                  <li>• Habit formation</li>
                  <li>• Motivation strategies</li>
                  <li>• Progress accountability</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-space-mono font-bold text-text mb-4">Your BMI Is Just the Beginning</h2>
            <p className="text-base leading-relaxed">
              BMI is one health metric—a useful starting point for understanding if you're in a healthy weight range. But health is multifaceted. A healthy BMI combined with regular exercise, good nutrition, quality sleep, and stress management creates true wellness.
            </p>
            <p className="text-base leading-relaxed mt-4 font-medium">
              Calculate your BMI today to understand where you stand. Then, use that information to make healthier choices. Every journey toward better health starts with understanding where you are now.
            </p>

            <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/50 rounded-lg p-6 my-8 text-center">
              <p className="font-bold text-text mb-3">Calculate Your BMI Today</p>
              <Link href="/health/bmi" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90">
                Get Your BMI Result <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-xs text-muted mt-3">Instant results. No signup required.</p>
            </div>
          </section>

          <section className="mt-12 py-8 border-t border-border bg-surface/50 rounded-lg p-6 hidden" style={{display: 'none'}}>
            <h3 className="font-bold text-text mb-4">📋 SEO Information</h3>
            <div className="space-y-4 text-sm font-mono">
              <div>
                <p className="text-accent font-bold">Meta Title (60 chars):</p>
                <p className="text-muted">BMI Calculator: What's a Healthy Weight for Your Height?</p>
              </div>
              <div>
                <p className="text-accent font-bold">Meta Description (160 chars):</p>
                <p className="text-muted">Complete BMI guide: understand your healthy weight range, BMI categories, and how to achieve optimal health with our free calculator and expert advice.</p>
              </div>
              <div>
                <p className="text-accent font-bold">Keywords:</p>
                <p className="text-muted">BMI calculator, healthy weight, body mass index, BMI categories, ideal weight range, weight loss, health metrics</p>
              </div>
            </div>
          </section>

          <section className="mt-12 py-8 border-t border-border">
            <div className="text-center">
              <p className="text-muted mb-4">Explore other health and fitness calculators</p>
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
