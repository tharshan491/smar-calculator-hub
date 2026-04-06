import { useState } from "react";

// ─── Expanded Articles Data ────────────────────────────────────────────────────
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

      <h2>Protection & Prevention</h2>
      <ul>
        <li><strong>Dress in layers</strong> – Trap air for insulation</li>
        <li><strong>Wear wind-resistant outer layer</strong> – Breaks wind speed</li>
        <li><strong>Cover extremities</strong> – Gloves, socks, hat mandatory</li>
        <li><strong>Stay dry</strong> – Moisture accelerates heat loss</li>
        <li><strong>Take breaks indoors</strong> – Warm up regularly</li>
        <li><strong>Avoid alcohol & caffeine</strong> – Reduces vasoconstriction</li>
      </ul>
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

      <h2>First Aid Response</h2>
      <h3>For Frostbite:</h3>
      <ul>
        <li>Get to a warm place immediately</li>
        <li>Remove wet clothing</li>
        <li>Warm affected area slowly with body heat (hands or underarms)</li>
        <li>DO NOT use hot water or heat lamps (causes additional damage)</li>
        <li>DO NOT rub or massage the area</li>
      </ul>

      <h3>For Hypothermia:</h3>
      <ul>
        <li>Call 911 immediately</li>
        <li>Move person to warm area gently</li>
        <li>Remove wet clothing</li>
        <li>Gradually warm the person (avoid rapid rewarming)</li>
        <li>Monitor breathing and pulse</li>
      </ul>
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
      <p>Compound interest is "interest on interest." It's one of the most powerful forces in building wealth. As your money grows, the growth itself generates more growth.</p>

      <div class="fact-box">
        <strong>💎 Einstein's Quote:</strong> "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it."
      </div>

      <h2>Rule of 72</h2>
      <p>Divide 72 by your interest rate to find approximately how many years it takes to double your money. At 6% interest: 72 ÷ 6 = 12 years to double.</p>

      <h2>Impact of Time</h2>
      <ul>
        <li><strong>Age 25:</strong> Invest $200/month at 7% = $704,299 by age 65</li>
        <li><strong>Age 35:</strong> Invest $500/month at 7% = $541,308 by age 65</li>
        <li><strong>Age 45:</strong> Invest $1,000/month at 7% = $532,149 by age 65</li>
      </ul>
      <p>Starting 20 years earlier beats starting later with much higher contributions!</p>
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
      <p>BMI (Body Mass Index) is a simple formula that estimates body composition using height and weight. It's calculated as: weight (kg) ÷ height² (m²).</p>

      <h2>The BMI Categories</h2>
      <ul>
        <li><strong>Underweight:</strong> BMI < 18.5</li>
        <li><strong>Normal Weight:</strong> BMI 18.5–24.9 (Associated with lowest health risks)</li>
        <li><strong>Overweight:</strong> BMI 25.0–29.9</li>
        <li><strong>Obese:</strong> BMI 30.0+</li>
      </ul>

      <h2>Limitations of BMI</h2>
      <ul>
        <li>Doesn't distinguish muscle from fat</li>
        <li>Athletes often register as "overweight" or "obese"</li>
        <li>Doesn't account for age or sex differences</li>
        <li>Ignores distribution of weight (abdominal fat is more dangerous)</li>
      </ul>
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

      <h2>The 5 Pillars of Sustainable Weight Health</h2>
      <ul>
        <li><strong>Nutrition Quality:</strong> Whole foods, adequate protein</li>
        <li><strong>Regular Exercise:</strong> Strength training + cardio</li>
        <li><strong>Sleep Quality:</strong> 7–9 hours nightly</li>
        <li><strong>Stress Management:</strong> Reduces cortisol and fat storage</li>
        <li><strong>Behavioral Habits:</strong> Portion awareness, meal planning</li>
      </ul>

      <h2>Weight Management Strategy</h2>
      <ul>
        <li><strong>To Lose Weight:</strong> Create 300–500 calorie deficit = ~1 lb/week</li>
        <li><strong>To Gain Weight:</strong> Create 300–500 calorie surplus = ~0.5–1 lb/week</li>
        <li><strong>To Maintain:</strong> Eat at your daily calorie burn level</li>
      </ul>
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
      <h2>The 4% Rule</h2>
      <p>You can safely withdraw 4% of your retirement savings annually without running out of money over a 30+ year retirement.</p>
      <ul>
        <li>If you saved $1 million: $40,000/year</li>
        <li>If you saved $500,000: $20,000/year</li>
      </ul>

      <h2>Retirement Accounts</h2>
      <ul>
        <li><strong>401(k) / 403(b):</strong> Up to $23,500/year, employer match = free money</li>
        <li><strong>Traditional IRA:</strong> Up to $7,000/year, pre-tax contributions</li>
        <li><strong>Roth IRA:</strong> Up to $7,000/year, tax-free withdrawals</li>
      </ul>

      <h2>Asset Allocation by Age</h2>
      <ul>
        <li><strong>Age 25–35:</strong> 80–90% stocks (aggressive growth)</li>
        <li><strong>Age 35–45:</strong> 70–80% stocks (balanced growth)</li>
        <li><strong>Age 45–55:</strong> 60–70% stocks (conservative growth)</li>
        <li><strong>Age 55+:</strong> 40–50% stocks (preservation)</li>
      </ul>
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
      <h2>Types of Taxes</h2>
      <ul>
        <li><strong>Income Tax:</strong> Tax on money you earn</li>
        <li><strong>Capital Gains Tax:</strong> Tax on profits from selling investments</li>
        <li><strong>Self-Employment Tax:</strong> 15.3% if self-employed</li>
        <li><strong>Property Tax:</strong> Annual tax on real estate</li>
        <li><strong>Sales Tax:</strong> Tax added to purchases (varies by state)</li>
      </ul>

      <h2>What is VAT?</h2>
      <p>VAT (Value Added Tax) is a consumption tax used in 170+ countries. It's collected at each stage of production based on the value added at that step.</p>

      <h2>VAT Rates by Country</h2>
      <ul>
        <li><strong>UK:</strong> 20% standard</li>
        <li><strong>Germany:</strong> 19% standard</li>
        <li><strong>France:</strong> 20% standard</li>
        <li><strong>Canada:</strong> 5% GST</li>
      </ul>
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
      <h2>Macronutrients: The Big Three</h2>

      <h3>Carbohydrates (4 cal/g)</h3>
      <ul>
        <li>Your body's primary fuel source</li>
        <li>Simple carbs: Quick energy, spike blood sugar</li>
        <li>Complex carbs: Steady energy, whole grains</li>
      </ul>

      <h3>Protein (4 cal/g)</h3>
      <ul>
        <li>Builds and repairs muscle</li>
        <li>Sedentary: 0.8g per kg bodyweight</li>
        <li>Active: 1.6–2.2g per kg bodyweight</li>
      </ul>

      <h3>Fat (9 cal/g)</h3>
      <ul>
        <li>Most calorie-dense macronutrient</li>
        <li>Essential for hormone and brain health</li>
        <li>25–35% of total calories recommended</li>
      </ul>

      <h2>Common Diet Types</h2>
      <ul>
        <li><strong>Balanced (40/30/30):</strong> General health</li>
        <li><strong>High-Protein (30/40/30):</strong> Muscle building</li>
        <li><strong>Keto (5/25/70):</strong> Rapid weight loss</li>
        <li><strong>Low-Carb (20/35/45):</strong> Steady weight loss</li>
      </ul>
    `
  },
  {
    id: 9,
    title: "Cryptocurrency Basics",
    icon: "₿",
    category: "finance",
    excerpt: "Understanding blockchain, Bitcoin, Ethereum, and how cryptocurrency works.",
    date: "January 2026",
    readTime: "8 min read",
    content: `
      <h2>What is Cryptocurrency?</h2>
      <p>Cryptocurrency is digital money that uses cryptography to secure transactions. It operates on a decentralized network without banks or governments.</p>

      <h2>Key Cryptocurrencies</h2>
      <ul>
        <li><strong>Bitcoin (₿):</strong> First cryptocurrency, store of value, limited to 21 million coins</li>
        <li><strong>Ethereum (Ξ):</strong> Programmable blockchain, smart contracts</li>
        <li><strong>Stablecoins:</strong> Backed by real assets (USD, EUR), less volatile</li>
      </ul>

      <h2>Blockchain Technology</h2>
      <p>Blockchain is a distributed ledger where transactions are recorded in blocks. Each block is cryptographically linked to the previous one, creating an immutable chain.</p>

      <h2>Investing in Crypto</h2>
      <ul>
        <li>Highly volatile (can lose 50%+ in days)</li>
        <li>Only invest what you can afford to lose</li>
        <li>Use reputable exchanges (Coinbase, Kraken)</li>
        <li>Store in secure wallets, not on exchanges</li>
      </ul>

      <div class="fact-box">
        <strong>⚠️ Risk Warning:</strong> Cryptocurrency is speculative. Many projects fail. Never invest borrowed money or your emergency fund.
      </div>
    `
  },
  {
    id: 10,
    title: "How to Build an Emergency Fund",
    icon: "🆘",
    category: "finance",
    excerpt: "Why you need an emergency fund, how much to save, and the best places to keep it.",
    date: "January 2026",
    readTime: "7 min read",
    content: `
      <h2>Why an Emergency Fund Matters</h2>
      <p>An emergency fund protects you from unexpected expenses: job loss, medical bills, car repairs, home damage. Without it, you'd need to go into debt or borrow at high interest rates.</p>

      <h2>How Much Should You Save?</h2>
      <ul>
        <li><strong>Starter goal:</strong> $1,000 (covers most emergencies)</li>
        <li><strong>Intermediate goal:</strong> 3 months of expenses</li>
        <li><strong>Recommended goal:</strong> 6 months of expenses</li>
        <li><strong>Formula:</strong> Monthly expenses × 6 = target fund size</li>
      </ul>

      <h2>Where to Keep Your Emergency Fund</h2>
      <ul>
        <li><strong>High-Yield Savings Account:</strong> 4–5.5% APY, liquid, FDIC insured</li>
        <li><strong>Money Market Account:</strong> Similar to savings, sometimes higher rates</li>
        <li><strong>Keep it separate:</strong> Don't mix with regular checking account</li>
        <li><strong>Avoid:</strong> Stocks, investments (too volatile for emergencies)</li>
      </ul>

      <h2>Building Your Fund</h2>
      <ul>
        <li>Automate transfers: $50–200 per paycheck</li>
        <li>Put tax refunds directly into the fund</li>
        <li>Use windfalls (bonuses, gifts) to accelerate</li>
        <li>Once established, only use it for real emergencies</li>
      </ul>
    `
  },
  {
    id: 11,
    title: "Personal Budgeting 101",
    icon: "💰",
    category: "finance",
    excerpt: "Step-by-step guide to creating and maintaining a budget that works for you.",
    date: "January 2026",
    readTime: "8 min read",
    content: `
      <h2>Why Budget?</h2>
      <p>A budget is a spending plan. It shows where your money goes and helps you make intentional financial decisions rather than spending reactively.</p>

      <h2>The 50/30/20 Rule</h2>
      <ul>
        <li><strong>50% Needs:</strong> Housing, food, utilities, transportation (essentials)</li>
        <li><strong>30% Wants:</strong> Entertainment, dining out, hobbies (non-essentials)</li>
        <li><strong>20% Savings:</strong> Emergency fund, retirement, investments</li>
      </ul>

      <h2>Steps to Create a Budget</h2>
      <ol>
        <li>Track your spending for 1 month (see where money actually goes)</li>
        <li>List all income sources (salary, side hustle, etc.)</li>
        <li>List all expenses (fixed and variable)</li>
        <li>Categorize into needs, wants, savings</li>
        <li>Adjust to fit your goals and priorities</li>
      </ol>

      <h2>Budgeting Tools</h2>
      <ul>
        <li><strong>YNAB (You Need A Budget):</strong> Popular app, $15/month</li>
        <li><strong>Mint:</strong> Free tracking app</li>
        <li><strong>Excel/Spreadsheet:</strong> DIY, completely free</li>
        <li><strong>Bank app:</strong> Many banks offer built-in categorization</li>
      </ul>
    `
  },
  {
    id: 12,
    title: "Fitness & Exercise Science",
    icon: "🏋️",
    category: "health",
    excerpt: "Understanding cardio vs strength training, progressive overload, and optimal recovery.",
    date: "January 2026",
    readTime: "9 min read",
    content: `
      <h2>Types of Exercise</h2>

      <h3>Strength Training</h3>
      <ul>
        <li>Builds muscle, increases metabolic rate</li>
        <li>2–3 sessions per week</li>
        <li>Focus on compound movements: squats, deadlifts, bench press</li>
        <li>Progressive overload: gradually increase weight or reps</li>
      </ul>

      <h3>Cardiovascular Exercise</h3>
      <ul>
        <li>Strengthens heart, improves endurance</li>
        <li>150 min/week (moderate) or 75 min/week (vigorous)</li>
        <li>Running, cycling, swimming, rowing</li>
        <li>HIIT (High-Intensity Interval Training) is more efficient</li>
      </ul>

      <h3>Flexibility and Mobility</h3>
      <ul>
        <li>Stretching, yoga, foam rolling</li>
        <li>Improves range of motion, reduces injury risk</li>
        <li>10–15 minutes daily or 2–3 sessions weekly</li>
      </ul>

      <h2>Recovery and Rest</h2>
      <ul>
        <li><strong>Sleep:</strong> 7–9 hours for muscle recovery</li>
        <li><strong>Rest days:</strong> At least 1–2 per week</li>
        <li><strong>Nutrition:</strong> Protein and carbs within 2 hours post-workout</li>
        <li><strong>Active recovery:</strong> Light walking, stretching on rest days</li>
      </ul>
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

/* ── ARTICLES FILTER ── */
.articles-filter { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; justify-content: center; }
.filter-btn { 
  padding: 6px 12px; 
  background: var(--surface); 
  border: 1px solid var(--border); 
  color: var(--muted); 
  cursor: pointer; 
  border-radius: 6px; 
  font-size: 12px; 
  transition: all .15s;
  font-family: 'Space Mono', monospace;
}
.filter-btn.active { 
  background: var(--accent); 
  color: #ffffff; 
  border-color: var(--accent);
}
.filter-btn:hover { border-color: var(--accent); }

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
  box-shadow: 0 8px 24px rgba(9, 105, 218, 0.1);
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
  background: rgba(0,0,0,.5); 
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
  box-shadow: 0 10px 40px rgba(0,0,0,.12);
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
  .articles-filter { justify-content: flex-start; }
}
`;

// ─── Articles Component ────────────────────────────────────────────────────────
export default function ArticlesExpanded() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...new Set(ARTICLES.map(a => a.category))];
  const filteredArticles = filter === "all" 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === filter);

  return (
    <>
      <style>{ARTICLES_CSS}</style>
      <div className="articles-container">
        <div className="articles-header">
          <h1>📚 Informational Articles</h1>
          <p>Learn the science behind money, health, and everyday decisions</p>
        </div>

        <div className="articles-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === "all" ? "All Articles" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="articles-grid">
          {filteredArticles.map((article) => (
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
