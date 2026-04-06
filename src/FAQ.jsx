import { useState } from "react";

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    id: 1,
    category: "General",
    question: "Are all calculations accurate?",
    answer: "Our calculators use industry-standard formulas and are designed for informational purposes. However, results should not be relied upon as the sole basis for financial, medical, or professional decisions. Always consult a qualified professional for important decisions."
  },
  {
    id: 2,
    category: "General",
    question: "Do I need to create an account?",
    answer: "No! All calculators are completely free and require no sign-up. Your calculation history is stored locally in your browser for your convenience."
  },
  {
    id: 3,
    category: "General",
    question: "Is my data private?",
    answer: "Yes. Your calculation inputs and results are processed entirely in your browser. We don't store any of your personal data on our servers. For details, see our Privacy Policy."
  },
  {
    id: 4,
    category: "Finance",
    question: "How does compound interest actually work?",
    answer: "Compound interest is interest earned on your principal plus the interest you've already earned. This creates exponential growth over time. For example, $1,000 at 7% annual return becomes $2,759 after 15 years due to compounding."
  },
  {
    id: 5,
    category: "Finance",
    question: "What's the difference between 401(k) and IRA?",
    answer: "401(k) is employer-sponsored with higher contribution limits ($23,500/year). IRA is individual with lower limits ($7,000/year). 401(k) often includes employer matching (free money). IRAs offer more investment options. Both are tax-advantaged."
  },
  {
    id: 6,
    category: "Finance",
    question: "Should I pay off debt or invest?",
    answer: "Generally: if debt has high interest (credit cards), pay it off first. If interest is low (mortgages, student loans), you might invest instead. Ideally, do both: pay minimums on low-interest debt while building investments."
  },
  {
    id: 7,
    category: "Health",
    question: "What's the best diet for weight loss?",
    answer: "The best diet is the one you'll stick to. Any diet creating a calorie deficit works. High-protein diets increase satiety. Find an approach (low-carb, balanced, intermittent fasting) that fits your lifestyle and is sustainable."
  },
  {
    id: 8,
    category: "Health",
    question: "How often should I exercise?",
    answer: "WHO recommends 150 minutes/week moderate cardio + strength training 2–3x/week. Consistency matters more than intensity. Start with what you can sustain—even 30 minutes daily is excellent."
  },
  {
    id: 9,
    category: "Health",
    question: "Is BMI accurate for athletes?",
    answer: "No. BMI doesn't distinguish muscle from fat. Athletes often register as 'overweight' or 'obese.' Use BMI as a screening tool, not a diagnosis. Body composition tests are more accurate."
  },
  {
    id: 10,
    category: "Math",
    question: "Why is compound interest called the 8th wonder?",
    answer: "Because of its exponential power. Small early investments grow to enormous sums due to decades of compounding. Time is more valuable than money in the compound interest equation."
  },
  {
    id: 11,
    category: "Calculators",
    question: "Can I embed these calculators on my website?",
    answer: "Currently, calculators are available on this site only. Contact us at hello@smartcalculatorhub.com for embedding options or API access."
  },
  {
    id: 12,
    category: "Calculators",
    question: "Are there mobile apps?",
    answer: "Our website is fully mobile-responsive and works like an app on phones. For native iOS/Android apps, check back soon!"
  }
];

// ─── FAQ CSS ──────────────────────────────────────────────────────────────────
const FAQ_CSS = `
.faq-container { max-width: 720px; margin: 0 auto; padding: 0 16px 60px; }

.faq-header { padding: 32px 0 20px; text-align: center; }
.faq-header h1 { font-family: 'Space Mono', monospace; font-size: 22px; color: var(--accent); }
.faq-header p { color: var(--muted); font-size: 13px; margin-top: 4px; }

.faq-filter { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; justify-content: center; }
.faq-filter-btn { 
  padding: 6px 12px; 
  background: var(--surface); 
  border: 1px solid var(--border); 
  color: var(--muted); 
  cursor: pointer; 
  border-radius: 6px; 
  font-size: 12px; 
  font-family: 'Space Mono', monospace;
  transition: all .15s;
}
.faq-filter-btn.active { 
  background: var(--accent); 
  color: #ffffff; 
  border-color: var(--accent);
}

.faq-item { 
  background: var(--surface); 
  border: 1px solid var(--border); 
  border-radius: 8px; 
  margin-bottom: 12px; 
  overflow: hidden; 
}

.faq-question { 
  padding: 16px; 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  transition: background .15s;
}

.faq-question:hover { background: var(--surface2); }

.faq-q-text { 
  font-size: 14px; 
  font-weight: 600; 
  color: var(--text); 
  flex-grow: 1;
}

.faq-toggle { 
  font-size: 18px; 
  color: var(--accent); 
  transition: transform .15s;
  flex-shrink: 0;
  margin-left: 12px;
}

.faq-item.open .faq-toggle { transform: rotate(180deg); }

.faq-answer { 
  padding: 0 16px 16px; 
  font-size: 13px; 
  color: var(--muted); 
  line-height: 1.6; 
  border-top: 1px solid var(--border);
}

.faq-category { 
  font-size: 10px; 
  color: var(--accent); 
  font-family: 'Space Mono', monospace;
  text-transform: uppercase;
  margin-bottom: 4px;
}
`;

// ─── FAQ Component ─────────────────────────────────────────────────────────────
export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set());
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(FAQS.map(f => f.category))];
  const filtered = filter === "All" ? FAQS : FAQS.filter(f => f.category === filter);

  const toggleItem = (id) => {
    const next = new Set(openItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpenItems(next);
  };

  return (
    <>
      <style>{FAQ_CSS}</style>
      <div className="faq-container">
        <div className="faq-header">
          <h1>❓ Frequently Asked Questions</h1>
          <p>Quick answers to common questions about calculators, finance, and health</p>
        </div>

        <div className="faq-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`faq-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div>
          {filtered.map(item => (
            <div 
              key={item.id} 
              className={`faq-item ${openItems.has(item.id) ? 'open' : ''}`}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleItem(item.id)}
              >
                <div>
                  <div className="faq-category">{item.category}</div>
                  <div className="faq-q-text">{item.question}</div>
                </div>
                <div className="faq-toggle">▼</div>
              </div>
              {openItems.has(item.id) && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
