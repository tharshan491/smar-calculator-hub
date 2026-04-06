/**
 * SEO Content Generator for Calculator Pages
 * Generates high-quality SEO content based on prompts database
 */

const fs = require('fs');
const path = require('path');

class ContentGenerator {
  constructor() {
    this.promptsDb = require('./all-prompts.json');
    this.templates = this.loadTemplates();
  }

  loadTemplates() {
    return {
      financial: {
        intro: "Discover how to {tool} with our comprehensive {title}. Learn how to calculate {feature} accurately and make informed financial decisions.",
        sections: [
          "What is {title}?",
          "How to Use the {title}",
          "Understanding the Results",
          "Common Questions",
          "Tips for Better Financial Planning"
        ]
      },
      math: {
        intro: "Master {title} with our easy-to-use calculator. Understand {concept} and solve {problem} step-by-step.",
        sections: [
          "Introduction to {concept}",
          "How the {title} Works",
          "Step-by-Step Guide",
          "Real-World Examples",
          "Practice Problems"
        ]
      },
      health: {
        intro: "Calculate your {metric} with our {title}. Get personalized insights about your {aspect} and track your health journey.",
        sections: [
          "Understanding {metric}",
          "How to Use the {title}",
          "What Your Results Mean",
          "Health Tips and Recommendations",
          "Frequently Asked Questions"
        ]
      },
      utility: {
        intro: "Simplify your {task} with our {title}. Get quick, accurate {results} in seconds.",
        sections: [
          "What is {title}?",
          "How to Use This Tool",
          "Features and Benefits",
          "Common Use Cases",
          "Pro Tips"
        ]
      }
    };
  }

  getCategory(promptId) {
    const prefix = promptId.split('-')[0];
    const categoryMap = {
      'FIN': 'financial',
      'MATH': 'math',
      'HEALTH': 'health',
      'UTIL': 'utility'
    };
    return categoryMap[prefix] || 'utility';
  }

  generateMetaTags(prompt, category) {
    const title = prompt.title;
    const keywords = prompt.keywords.join(', ');
    
    return {
      title: `${title} - Free Online Tool | Calculator Hub`,
      description: `${prompt.prompt} Use our free ${title.toLowerCase()} to ${prompt.keywords[0].toLowerCase()}. Fast, accurate, and easy to use.`,
      keywords: keywords,
      ogTitle: title,
      ogDescription: `Try our ${title.toLowerCase()} now. ${prompt.keywords[0]} made simple.`,
      canonical: `https://calculatorhub.com/${title.toLowerCase().replace(/\s+/g, '-')}`
    };
  }

  generateContent(prompt) {
    const category = this.getCategory(prompt.id);
    const template = this.templates[category];
    
    return {
      id: prompt.id,
      title: prompt.title,
      slug: prompt.title.toLowerCase().replace(/\s+/g, '-'),
      category: category,
      priority: prompt.priority,
      metaTags: this.generateMetaTags(prompt, category),
      outline: {
        h1: prompt.title,
        sections: template.sections
      },
      keywords: prompt.keywords,
      contentType: 'calculator-guide',
      generatedAt: new Date().toISOString()
    };
  }

  generateBatchContent(category = null, priority = null) {
    const results = [];
    
    for (const catKey in this.promptsDb) {
      if (catKey === 'metadata') continue;
      
      const categoryData = this.promptsDb[catKey];
      
      if (category && catKey !== category) continue;
      
      for (const prompt of categoryData.prompts) {
        if (priority && prompt.priority !== priority) continue;
        
        results.push(this.generateContent(prompt));
      }
    }
    
    return results;
  }

  exportContentToJSON(filePath, content) {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`Content exported to ${filePath}`);
  }

  exportContentToMarkdown(prompt, content) {
    const md = `# ${content.title}

## Meta Tags
- **Title**: ${content.metaTags.title}
- **Description**: ${content.metaTags.description}
- **Keywords**: ${content.metaTags.keywords}

## Content Outline

### ${content.outline.h1}

${content.outline.sections.map((section, i) => `
## ${i + 2}. ${section}
*Content for this section to be generated*
`).join('\n')}

## Keywords
${content.keywords.map(k => `- ${k}`).join('\n')}

---
Generated: ${content.generatedAt}
`;
    
    return md;
  }

  generateSummaryReport() {
    const report = {
      totalPrompts: this.promptsDb.metadata.totalPrompts,
      categories: {},
      priorityBreakdown: { high: 0, medium: 0, low: 0 }
    };
    
    for (const catKey in this.promptsDb) {
      if (catKey === 'metadata') continue;
      
      const categoryData = this.promptsDb[catKey];
      report.categories[catKey] = {
        name: categoryData.category,
        count: categoryData.count,
        prompts: categoryData.prompts.map(p => ({
          id: p.id,
          title: p.title,
          priority: p.priority
        }))
      };
      
      categoryData.prompts.forEach(p => {
        report.priorityBreakdown[p.priority]++;
      });
    }
    
    return report;
  }

  // Get all high-priority prompts
  getHighPriorityPrompts() {
    return this.generateBatchContent(null, 'high');
  }

  // Get prompts by category
  getPromptsByCategory(category) {
    return this.generateBatchContent(category);
  }

  // Generate content for a specific prompt ID
  getContentById(promptId) {
    for (const catKey in this.promptsDb) {
      if (catKey === 'metadata') continue;
      
      const categoryData = this.promptsDb[catKey];
      const prompt = categoryData.prompts.find(p => p.id === promptId);
      
      if (prompt) {
        return this.generateContent(prompt);
      }
    }
    
    return null;
  }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentGenerator;
}
