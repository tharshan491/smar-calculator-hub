import { useState } from "react";

// ─── Blog Posts Data ──────────────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    id: 1,
    title: "5 Personal Finance Mistakes to Avoid in 2026",
    author: "Financial Advisor Team",
    date: "March 28, 2026",
    category: "Finance",
    readTime: "6 min read",
    excerpt: "Discover the most common financial mistakes and how to avoid them. From not tracking spending to ignoring retirement planning.",
    content: `
      <h2>Mistake #1: Not Having an Emergency Fund</h2>
      <p>Life happens. Without an emergency fund (3–6 months of expenses), unexpected costs force you into debt. Start with $1,000, then build to 6 months.</p>

      <h2>Mistake #2: Carrying High-Interest Debt</h2>
      <p>Credit card debt (18–25% APR) is wealth-destroying. Pay it off aggressively before investing. The guaranteed return of avoiding that interest beats any investment return.</p>

      <h2>Mistake #3: Not Maximizing Employer 401(k) Match</h2>
      <p>Employer match is free money. Not claiming it is leaving thousands on the table. At minimum, contribute enough to get the full match.</p>

      <h2>Mistake #4: Ignoring Compound Interest</h2>
      <p>Starting at 25 with $200/month beats starting at 35 with $500/month. Time is your most valuable asset. Start investing now.</p>

      <h2>Mistake #5: Not Reviewing Your Budget</h2>
      <p>Budgets aren't set-and-forget. Review quarterly. As income changes, adjust allocations. Your budget should evolve with your life.</p>
    `
  },
  {
    id: 2,
    title: "The Science of Weight Loss: What Actually Works",
    author: "Health & Fitness Team",
    date: "March 25, 2026",
    category: "Health",
    readTime: "8 min read",
    excerpt: "Debunking fad diets and explaining the science behind sustainable weight loss. Calories matter, but so does consistency.",
    content: `
      <h2>The Fundamental Truth: Calories In vs. Calories Out</h2>
      <p>Weight loss ultimately comes down to consuming fewer calories than you burn. Every diet that works creates a calorie deficit. The method varies (low-carb, intermittent fasting, etc.) but the principle is the same.</p>

      <h2>Why Protein Matters</h2>
      <p>Protein increases satiety (you feel fuller), requires more energy to digest, and preserves muscle during weight loss. Aim for 25–35% of total calories from protein.</p>

      <h2>The Role of Sleep and Stress</h2>
      <p>Poor sleep disrupts hunger hormones, increasing appetite. Chronic stress raises cortisol, promoting fat storage. Both undermine weight loss efforts.</p>

      <h2>Building Habits, Not Just Losing Weight</h2>
      <p>Rapid weight loss often leads to rapid weight gain. Focus on building sustainable habits: consistent exercise, whole foods, adequate sleep. The scale will follow.</p>
    `
  },
  {
    id: 3,
    title: "Retirement Planning: When to Start (Spoiler: Now)",
    author: "Financial Advisor Team",
    date: "March 20, 2026",
    category: "Finance",
    readTime: "7 min read",
    excerpt: "Time is your most powerful retirement tool. We show why starting early matters and what you need to do today.",
    content: `
      <h2>The Math of Starting Early</h2>
      <p>Someone investing $200/month from age 25 will have ~$700k by 65 at 7% annual returns. Someone starting at 35 with $500/month has ~$540k. Time beats higher contributions.</p>

      <h2>Account Types: Which One is Right?</h2>
      <p><strong>401(k):</strong> Employer-sponsored, higher limits, employer match. <strong>Roth IRA:</strong> Tax-free withdrawals, better for young people. <strong>Traditional IRA:</strong> Tax-deductible now, pay taxes later.</p>

      <h2>The 4% Rule</h2>
      <p>You can safely withdraw 4% of your nest egg annually. If you've saved $1 million, withdraw $40k/year (adjusted for inflation). This fund should last 30+ years.</p>

      <h2>Your Action Plan</h2>
      <ol>
        <li>Enroll in your 401(k) and claim full employer match</li>
        <li>Open a Roth IRA and contribute $200–500/month</li>
        <li>Automate contributions (set and forget)</li>
        <li>Review annually and increase with raises</li>
      </ol>
    `
  },
  {
    id: 4,
    title: "Cryptocurrency for Beginners: Understanding Blockchain",
    author: "Technology Team",
    date: "March 15, 2026",
    category: "Finance",
    readTime: "9 min read",
    excerpt: "Demystifying cryptocurrency, blockchain technology, and whether crypto belongs in your portfolio.",
    content: `
      <h2>What is Blockchain?</h2>
      <p>Blockchain is a distributed ledger. Transactions are grouped into blocks, cryptographically linked, creating an immutable chain. No single authority controls it.</p>

      <h2>Bitcoin vs Ethereum</h2>
      <p><strong>Bitcoin:</strong> Limited to 21 million coins, serves as digital gold. <strong>Ethereum:</strong> Programmable blockchain enabling smart contracts and decentralized applications.</p>

      <h2>Risks Before You Invest</h2>
      <ul>
        <li>Extreme volatility (50% swings in days are common)</li>
        <li>Regulatory uncertainty</li>
        <li>Security risks (exchange hacks, lost private keys)</li>
        <li>Most crypto projects ultimately fail</li>
      </ul>

      <h2>If You Invest</h2>
      <p>Only invest money you can afford to lose. Use reputable exchanges. Store coins in secure wallets, not on exchanges. Dollar-cost average (invest small amounts regularly) rather than timing the market.</p>
    `
  },
  {
    id: 5,
    title: "The Complete Guide to Tax Optimization",
    author: "Tax Expert",
    date: "March 10, 2026",
    category: "Finance",
    readTime: "10 min read",
    excerpt: "Legal strategies to minimize your tax burden. From deductions to tax-advantaged accounts, maximize what you keep.",
    content: `
      <h2>Tax Deductions You Might Be Missing</h2>
      <ul>
        <li><strong>Mortgage interest:</strong> If you itemize, save thousands</li>
        <li><strong>Charitable donations:</strong> Keep receipts and track valuations</li>
        <li><strong>Self-employed expenses:</strong> Home office, equipment, travel</li>
        <li><strong>Education:</strong> Tuition, books, student loan interest</li>
        <li><strong>Medical expenses:</strong> Must exceed 7.5% of AGI</li>
      </ul>

      <h2>Tax-Advantaged Accounts</h2>
      <p><strong>401(k):</strong> Reduce taxable income by $23,500/year. <strong>Roth IRA:</strong> Pay taxes now, withdraw tax-free later. <strong>HSA:</strong> Triple advantage: pre-tax contribution, tax-free growth, tax-free medical withdrawals.</p>

      <h2>Tax-Loss Harvesting</h2>
      <p>Sell losing investments to offset capital gains. Use losses to reduce income tax liability. Can carry unused losses forward to future years.</p>
    `
  },
  {
    id: 6,
    title: "Building Muscle: Strength Training Science",
    author: "Fitness Coach",
    date: "March 5, 2026",
    category: "Health",
    readTime: "8 min read",
    excerpt: "The science of progressive overload, recovery, and nutrition for building muscle effectively and sustainably.",
    content: `
      <h2>Progressive Overload Principle</h2>
      <p>Muscles grow when they're forced to adapt. Gradually increase weight, reps, or sets over time. Even 2–5 lb increases lift strength and muscle gain.</p>

      <h2>Optimal Training Frequency</h2>
      <p>Research shows 2–3 strength sessions per week per muscle group. Full-body workouts 3x/week or upper/lower splits 4x/week are most effective.</p>

      <h2>Compound Movements Matter</h2>
      <p>Focus on squats, deadlifts, bench press, rows. These build the most muscle and engage multiple muscle groups. Isolation exercises complement but don't replace compounds.</p>

      <h2>Nutrition & Recovery</h2>
      <ul>
        <li><strong>Protein:</strong> 1.6–2.2g per kg bodyweight daily</li>
        <li><strong>Post-workout:</strong> Eat carbs + protein within 2 hours</li>
        <li><strong>Sleep:</strong> 7–9 hours for muscle recovery</li>
        <li><strong>Consistency:</strong> 12 weeks minimum to see notable gains</li>
      </ul>
    `
  }
];

// ─── Blog CSS ─────────────────────────────────────────────────────────────────
const BLOG_CSS = `
.blog-container { max-width: 980px; margin: 0 auto; padding: 0 16px 60px; }

.blog-header { padding: 32px 0 20px; text-align: center; }
.blog-header h1 { font-family: 'Space Mono', monospace; font-size: 22px; color: var(--accent); }
.blog-header p { color: var(--muted); font-size: 13px; margin-top: 4px; }

.blog-filter { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; justify-content: center; }
.blog-filter-btn { 
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
.blog-filter-btn.active { 
  background: var(--accent); 
  color: #ffffff; 
  border-color: var(--accent);
}

.blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px; }

.blog-card { 
  background: var(--surface); 
  border: 1px solid var(--border); 
  border-radius: 8px; 
  padding: 20px; 
  cursor: pointer; 
  transition: all .15s; 
  display: flex; 
  flex-direction: column; 
  gap: 12px;
}

.blog-card:hover { 
  border-color: var(--accent); 
  background: var(--surface2); 
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(88, 166, 255, 0.1);
}

.blog-category { 
  font-size: 10px; 
  color: var(--accent2); 
  text-transform: uppercase; 
  font-family: 'Space Mono', monospace;
  font-weight: 700;
}

.blog-card-title { 
  font-size: 16px; 
  font-weight: 700; 
  color: var(--text); 
  line-height: 1.4;
}

.blog-card-excerpt { 
  font-size: 13px; 
  color: var(--muted); 
  line-height: 1.6; 
  flex-grow: 1;
}

.blog-card-meta { 
  display: flex; 
  justify-content: space-between; 
  font-size: 11px; 
  color: var(--muted); 
  font-family: 'Space Mono', monospace;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

/* ── BLOG MODAL ── */
.blog-modal { 
  position: fixed; 
  inset: 0; 
  background: rgba(0,0,0,.5); 
  z-index: 300; 
  overflow-y: auto; 
  padding: 24px 16px; 
  backdrop-filter: blur(6px); 
}

.blog-inner { 
  max-width: 720px; 
  margin: 0 auto; 
  background: var(--surface); 
  border: 1px solid var(--border); 
  border-radius: 12px; 
  padding: 40px; 
  box-shadow: 0 10px 40px rgba(0,0,0,.12);
}

.blog-modal-header { 
  display: flex; 
  align-items: flex-start; 
  justify-content: space-between; 
  margin-bottom: 24px;
}

.blog-modal-meta { 
  font-size: 12px; 
  color: var(--muted); 
  font-family: 'Space Mono', monospace;
  margin-bottom: 12px;
}

.blog-modal-title { 
  font-family: 'Space Mono', monospace; 
  font-size: 20px; 
  color: var(--accent); 
  margin: 0 0 4px;
}

.blog-modal-close { 
  background: none; 
  border: none; 
  color: var(--muted); 
  font-size: 24px; 
  cursor: pointer; 
  padding: 0; 
  line-height: 1;
  flex-shrink: 0;
}

.blog-modal-close:hover { 
  color: var(--text); 
}

.blog-content { 
  line-height: 1.8; 
  color: var(--text);
}

.blog-content h2 { 
  font-size: 16px; 
  font-weight: 700; 
  color: var(--accent2); 
  margin: 24px 0 12px; 
  font-family: 'Space Mono', monospace;
  text-transform: uppercase;
  letter-spacing: .05em;
}

.blog-content p { 
  font-size: 13px; 
  margin: 12px 0; 
  color: var(--muted);
}

.blog-content ul, 
.blog-content ol { 
  font-size: 13px; 
  padding-left: 20px; 
  margin: 12px 0;
}

.blog-content li { 
  margin-bottom: 8px; 
  color: var(--muted);
  line-height: 1.6;
}

.blog-content strong { 
  color: var(--accent);
  font-weight: 700;
}

@media (max-width: 768px) {
  .blog-grid { grid-template-columns: 1fr; }
  .blog-inner { padding: 24px; }
  .blog-modal-title { font-size: 18px; }
}
`;

// ─── Blog Component ────────────────────────────────────────────────────────────
export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(BLOG_POSTS.map(p => p.category))];
  const filtered = filter === "All" ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === filter);

  return (
    <>
      <style>{BLOG_CSS}</style>
      <div className="blog-container">
        <div className="blog-header">
          <h1>📖 Blog & Guides</h1>
          <p>In-depth articles on finance, health, and personal development</p>
        </div>

        <div className="blog-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`blog-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {filtered.map((post) => (
            <div 
              key={post.id} 
              className="blog-card" 
              onClick={() => setSelectedPost(post)}
            >
              <div className="blog-category">{post.category}</div>
              <div className="blog-card-title">{post.title}</div>
              <div className="blog-card-excerpt">{post.excerpt}</div>
              <div className="blog-card-meta">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPost && (
        <div className="blog-modal" onClick={(e) => {
          if (e.target.classList.contains("blog-modal")) setSelectedPost(null);
        }}>
          <div className="blog-inner">
            <div className="blog-modal-header">
              <div>
                <div className="blog-modal-meta">
                  By {selectedPost.author} · {selectedPost.date} · {selectedPost.readTime}
                </div>
                <h1 className="blog-modal-title">{selectedPost.title}</h1>
              </div>
              <button 
                className="blog-modal-close" 
                onClick={() => setSelectedPost(null)}
              >
                ×
              </button>
            </div>
            <div 
              className="blog-content" 
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
          </div>
        </div>
      )}
    </>
  );
}
