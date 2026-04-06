/**
 * SEO Prompt Management System
 * Organizes and tracks all 200 calculator prompts
 * Provides filtering, search, and bulk operations
 */

class PromptManager {
  constructor(promptsDb) {
    this.db = promptsDb;
    this.stats = this.calculateStats();
  }

  calculateStats() {
    const stats = {
      totalPrompts: 0,
      byCategory: {},
      byPriority: { high: 0, medium: 0, low: 0 },
      percentComplete: 0,
      readyForContent: [],
      pendingReview: [],
      generated: 0
    };

    for (const category in this.db) {
      if (category === 'metadata') continue;

      const catData = this.db[category];
      stats.byCategory[category] = {
        name: catData.category,
        total: catData.count,
        high: 0,
        medium: 0,
        low: 0
      };

      catData.prompts.forEach(prompt => {
        stats.totalPrompts++;
        stats.byPriority[prompt.priority]++;
        stats.byCategory[category][prompt.priority]++;
      });
    }

    return stats;
  }

  searchPrompts(query) {
    const results = [];
    query = query.toLowerCase();

    for (const category in this.db) {
      if (category === 'metadata') continue;

      this.db[category].prompts.forEach(prompt => {
        if (
          prompt.title.toLowerCase().includes(query) ||
          prompt.prompt.toLowerCase().includes(query) ||
          prompt.id.toLowerCase().includes(query) ||
          prompt.keywords.some(k => k.toLowerCase().includes(query))
        ) {
          results.push({
            ...prompt,
            category: this.db[category].category
          });
        }
      });
    }

    return results;
  }

  getPromptsByCategory(category) {
    const categoryKey = Object.keys(this.db).find(
      k => k.toLowerCase() === category.toLowerCase()
    );

    if (!categoryKey || categoryKey === 'metadata') {
      return [];
    }

    return this.db[categoryKey].prompts.map(p => ({
      ...p,
      category: this.db[categoryKey].category
    }));
  }

  getPromptsByPriority(priority) {
    const results = [];

    for (const category in this.db) {
      if (category === 'metadata') continue;

      this.db[category].prompts.forEach(prompt => {
        if (prompt.priority === priority) {
          results.push({
            ...prompt,
            category: this.db[category].category
          });
        }
      });
    }

    return results;
  }

  getHighPriorityPrompts() {
    return this.getPromptsByPriority('high');
  }

  getMediumPriorityPrompts() {
    return this.getPromptsByPriority('medium');
  }

  getLowPriorityPrompts() {
    return this.getPromptsByPriority('low');
  }

  getPromptById(id) {
    for (const category in this.db) {
      if (category === 'metadata') continue;

      const prompt = this.db[category].prompts.find(p => p.id === id);
      if (prompt) {
        return {
          ...prompt,
          category: this.db[category].category,
          categoryKey: category
        };
      }
    }

    return null;
  }

  getRecommendedOrder() {
    // Sort by priority, then by historical search volume/demand
    const allPrompts = [];

    for (const category in this.db) {
      if (category === 'metadata') continue;

      this.db[category].prompts.forEach(prompt => {
        allPrompts.push({
          ...prompt,
          category: this.db[category].category
        });
      });
    }

    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return allPrompts.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  exportAsCSV() {
    const headers = ['ID', 'Title', 'Category', 'Priority', 'Keywords'];
    const rows = [];

    for (const category in this.db) {
      if (category === 'metadata') continue;

      this.db[category].prompts.forEach(prompt => {
        rows.push([
          prompt.id,
          prompt.title,
          this.db[category].category,
          prompt.priority,
          prompt.keywords.join('; ')
        ]);
      });
    }

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    return csv;
  }

  exportAsJSON() {
    return JSON.stringify(this.db, null, 2);
  }

  generateContentPlan() {
    const plan = {
      phase1: {
        name: 'MVP Launch',
        duration: '4 weeks',
        priority: 'high',
        prompts: this.getHighPriorityPrompts().slice(0, 15),
        description: 'Generate SEO content for top 15 high-priority calculators'
      },
      phase2: {
        name: 'Core Content',
        duration: '8 weeks',
        priority: 'medium',
        prompts: this.getHighPriorityPrompts().slice(15),
        description: 'Complete all high-priority prompts'
      },
      phase3: {
        name: 'Comprehensive',
        duration: '12 weeks',
        priority: 'medium',
        prompts: this.getMediumPriorityPrompts(),
        description: 'Generate all medium-priority content'
      },
      phase4: {
        name: 'Complete Coverage',
        duration: 'Ongoing',
        priority: 'low',
        prompts: this.getLowPriorityPrompts(),
        description: 'Fill gaps with low-priority content'
      }
    };

    return plan;
  }

  getStatistics() {
    return {
      ...this.stats,
      highPriorityCount: this.stats.byPriority.high,
      mediumPriorityCount: this.stats.byPriority.medium,
      lowPriorityCount: this.stats.byPriority.low,
      averageKeywordsPerPrompt: this.calculateAverageKeywords(),
      totalCategories: Object.keys(this.stats.byCategory).length
    };
  }

  calculateAverageKeywords() {
    let totalKeywords = 0;
    let totalPrompts = 0;

    for (const category in this.db) {
      if (category === 'metadata') continue;

      this.db[category].prompts.forEach(prompt => {
        totalKeywords += prompt.keywords.length;
        totalPrompts++;
      });
    }

    return (totalKeywords / totalPrompts).toFixed(2);
  }

  getCategoryBreakdown() {
    return this.stats.byCategory;
  }

  getTopKeywords() {
    const keywordFreq = {};

    for (const category in this.db) {
      if (category === 'metadata') continue;

      this.db[category].prompts.forEach(prompt => {
        prompt.keywords.forEach(keyword => {
          keywordFreq[keyword] = (keywordFreq[keyword] || 0) + 1;
        });
      });
    }

    return Object.entries(keywordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([keyword, count]) => ({ keyword, count }));
  }

  generateSummaryReport() {
    return {
      generatedAt: new Date().toISOString(),
      totalPrompts: this.stats.totalPrompts,
      categories: this.getCategoryBreakdown(),
      priorityDistribution: this.stats.byPriority,
      topKeywords: this.getTopKeywords(),
      contentPlan: this.generateContentPlan(),
      statistics: this.getStatistics()
    };
  }
}

// Export for Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PromptManager;
}
