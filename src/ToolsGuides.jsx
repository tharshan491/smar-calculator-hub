import { useState } from "react";

// ─── Tools & Guides Data ──────────────────────────────────────────────────────
const TOOLS_GUIDES = [
  {
    id: 1,
    title: "Financial Planning Toolkit",
    icon: "📊",
    category: "Finance",
    description: "Complete set of calculators for budgeting, investing, and retirement planning.",
    tools: [
      "Compound Interest Calculator – See wealth compound over decades",
      "401k Saver – Plan retirement contributions and growth",
      "Retirement Calculator – Determine your retirement number",
      "Loan Payment Calculator – Compare payment options",
      "Budget Planner – Implement the 50/30/20 rule",
      "Breakeven Calculator – Find your profitability point"
    ]
  },
  {
    id: 2,
    title: "Health & Fitness Tracker",
    icon: "❤️",
    category: "Health",
    description: "Monitor your BMI, calories, macros, and fitness metrics.",
    tools: [
      "BMI Calculator – Track your weight category",
      "Calorie Counter (TDEE) – Calculate daily calorie needs",
      "Macro Split Calculator – Balance carbs, protein, and fat",
      "One Rep Max Estimator – Track strength progress",
      "Sleep Calculator – Optimize sleep cycles",
      "Days Until Date – Track important milestones"
    ]
  },
  {
    id: 3,
    title: "Mathematical Tools",
    icon: "🔢",
    category: "Math",
    description: "Solve equations, calculate geometry, and explore prime numbers.",
    tools: [
      "Quadratic Equation Solver – Find roots of equations",
      "Percentage Calculator – Convert percentages instantly",
      "Prime Number Finder – Identify and list prime numbers",
      "Square Root & Cube Root – Calculate roots precisely",
      "Logarithm Calculator – Solve log equations",
      "Standard Deviation – Analyze data variability"
    ]
  },
  {
    id: 4,
    title: "Everyday Conversion Tools",
    icon: "🔧",
    category: "Tools",
    description: "Quick converters for units, currencies, and measurements.",
    tools: [
      "Unit Converter – Distance, weight, temperature, volume",
      "Currency Converter – Real exchange rates",
      "Temperature Converter – Celsius to Fahrenheit and vice versa",
      "Tip Calculator – Split bills and calculate tips",
      "Discount Calculator – Find final prices after discounts",
      "Shopping Total – Add items and calculate totals"
    ]
  },
  {
    id: 5,
    title: "Lifestyle & Personal Tools",
    icon: "✨",
    category: "Lifestyle",
    description: "Plan trips, calculate fuel costs, and organize your life.",
    tools: [
      "Fuel Cost Calculator – Estimate trip expenses",
      "Rent Split Calculator – Divide bills with roommates",
      "Car Loan Calculator – Monthly payment estimator",
      "Packing List Generator – Never forget anything",
      "Gift Ideas Suggester – Budget-based recommendations",
      "Weather & Wind Chill – Check conditions and safety"
    ]
  },
  {
    id: 6,
    title: "Tax & VAT Resources",
    icon: "🧾",
    category: "Finance",
    description: "Calculate taxes, VAT, and deductions.",
    tools: [
      "VAT/Sales Tax Calculator – Add or extract taxes",
      "Profit Margin Analyzer – Calculate business profitability",
      "Salary Converter – Annual to hourly and everything between",
      "Cash Flow Analyzer – Track monthly surplus/deficit",
      "Salary Calculator – Convert between pay periods"
    ]
  }
];

// ─── Tools CSS ─────────────────────────────────────────────────────────────────
const TOOLS_CSS = `
.tools-container { max-width: 980px; margin: 0 auto; padding: 0 16px 60px; }

.tools-header { padding: 32px 0 20px; text-align: center; }
.tools-header h1 { font-family: 'Space Mono', monospace; font-size: 22px; color: var(--accent); }
.tools-header p { color: var(--muted); font-size: 13px; margin-top: 4px; }

.tools-intro { 
  background: var(--surface); 
  border: 1px solid var(--border); 
  border-radius: 8px; 
  padding: 20px; 
  margin-bottom: 32px; 
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
}

.tools-intro strong { color: var(--accent); }

.tools-filter { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
.tools-filter-btn { 
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
.tools-filter-btn.active { 
  background: var(--accent); 
  color: #ffffff; 
  border-color: var(--accent);
}

.tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }

.tool-section { 
  background: var(--surface); 
  border: 1px solid var(--border); 
  border-radius: 8px; 
  padding: 0; 
  overflow: hidden; 
  transition: all .15s;
}

.tool-section:hover { 
  border-color: var(--accent); 
  box-shadow: 0 8px 24px rgba(88, 166, 255, 0.1);
}

.tool-header { 
  padding: 20px; 
  display: flex; 
  align-items: center; 
  gap: 16px; 
  background: var(--surface2);
  border-bottom: 1px solid var(--border);
}

.tool-icon { font-size: 28px; }

.tool-title { 
  flex-grow: 1;
}

.tool-title-name { 
  font-size: 15px; 
  font-weight: 700; 
  color: var(--accent); 
  font-family: 'Space Mono', monospace;
}

.tool-description { 
  font-size: 11px; 
  color: var(--muted); 
  margin-top: 4px;
}

.tool-category { 
  font-size: 10px; 
  background: rgba(88, 166, 255, 0.1); 
  color: var(--accent); 
  padding: 2px 6px; 
  border-radius: 3px; 
  font-family: 'Space Mono', monospace;
}

.tool-list { 
  padding: 20px; 
  list-style: none;
}

.tool-list li { 
  font-size: 13px; 
  color: var(--muted); 
  padding: 8px 0; 
  display: flex; 
  align-items: flex-start; 
  gap: 10px;
  border-bottom: 1px solid var(--border);
}

.tool-list li:last-child { border-bottom: none; }

.tool-list li::before { 
  content: "✓"; 
  color: var(--accent2); 
  font-weight: 700; 
  flex-shrink: 0;
}

.tools-cta { 
  text-align: center; 
  margin-top: 40px; 
  padding: 32px; 
  background: var(--surface); 
  border: 1px solid var(--border); 
  border-radius: 8px;
}

.tools-cta h2 { 
  font-size: 18px; 
  color: var(--accent); 
  margin-bottom: 12px;
  font-family: 'Space Mono', monospace;
}

.tools-cta p { 
  color: var(--muted); 
  font-size: 13px; 
  margin-bottom: 16px;
}

.tools-cta-btn { 
  background: var(--accent); 
  color: #ffffff; 
  border: none; 
  padding: 12px 32px; 
  border-radius: 6px; 
  font-weight: 700; 
  cursor: pointer; 
  font-size: 14px;
  font-family: 'Sora', sans-serif;
  transition: opacity .15s;
}

.tools-cta-btn:hover { opacity: 0.85; }

@media (max-width: 768px) {
  .tools-grid { grid-template-columns: 1fr; }
  .tool-header { flex-direction: column; align-items: flex-start; }
}
`;

// ─── Tools Component ────────────────────────────────────────────────────────────
export default function ToolsGuides() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(TOOLS_GUIDES.map(t => t.category))];
  const filtered = filter === "All" ? TOOLS_GUIDES : TOOLS_GUIDES.filter(t => t.category === filter);

  return (
    <>
      <style>{TOOLS_CSS}</style>
      <div className="tools-container">
        <div className="tools-header">
          <h1>🛠️ Tools & Guides Library</h1>
          <p>Complete reference of all calculators, organized by category</p>
        </div>

        <div className="tools-intro">
          Our calculator hub contains <strong>25+ free online calculators</strong> designed for financial planning, fitness tracking, mathematical calculations, and everyday conversions. All tools run instantly in your browser—no downloads, no ads, no sign-ups required.
        </div>

        <div className="tools-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`tools-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="tools-grid">
          {filtered.map((section) => (
            <div key={section.id} className="tool-section">
              <div className="tool-header">
                <div className="tool-icon">{section.icon}</div>
                <div className="tool-title">
                  <div className="tool-title-name">{section.title}</div>
                  <div className="tool-description">{section.description}</div>
                </div>
                <div className="tool-category">{section.category}</div>
              </div>
              <ul className="tool-list">
                {section.tools.map((tool, idx) => (
                  <li key={idx}>{tool}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="tools-cta">
          <h2>Ready to Calculate?</h2>
          <p>Browse our tools above or start from the homepage. Every calculator is free, fast, and completely private.</p>
          <button className="tools-cta-btn">← Back to Calculators</button>
        </div>
      </div>
    </>
  );
}
