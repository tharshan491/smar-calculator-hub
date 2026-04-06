#!/usr/bin/env node

/**
 * Content Automation System
 * Handles automatic generation, processing, and publishing of SEO content
 * Run via: npm run auto-generate
 */

const fs = require('fs');
const path = require('path');
const ContentGenerator = require('./content-generator');
const PromptManager = require('./prompt-manager');

class ContentAutomation {
  constructor() {
    this.promptsDb = require('./all-prompts.json');
    this.manager = new PromptManager(this.promptsDb);
    this.generator = new ContentGenerator();
    this.config = this.loadConfig();
    this.log = this.setupLogger();
  }

  loadConfig() {
    return {
      batchSize: 10,
      outputFormat: ['markdown', 'json'],
      autoPublish: true,
      rateLimit: 1000, // ms between generations
      destinationDirs: {
        markdown: '../generated-content',
        json: '../api/content',
        nextjs: '../../app/calculators/content'
      },
      slack: {
        enabled: false,
        webhook: process.env.SLACK_WEBHOOK_URL
      },
      database: {
        enabled: false,
        url: process.env.DATABASE_URL
      }
    };
  }

  setupLogger() {
    return {
      info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
      error: (msg) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`),
      success: (msg) => console.log(`[✅] ${new Date().toISOString()} - ${msg}`),
      warn: (msg) => console.warn(`[⚠️] ${new Date().toISOString()} - ${msg}`)
    };
  }

  /**
   * Generate content batch based on priority
   */
  async generateBatch(priority = 'high', count = 10) {
    this.log.info(`Starting batch generation: ${priority} priority (${count} articles)`);

    try {
      const prompts = this.manager.getPromptsByPriority(priority).slice(0, count);
      const results = {
        success: [],
        failed: [],
        startTime: new Date(),
        totalGenerated: 0
      };

      for (let i = 0; i < prompts.length; i++) {
        try {
          const prompt = prompts[i];
          this.log.info(`[${i + 1}/${prompts.length}] Generating: ${prompt.title}`);

          const content = this.generator.generateContent(prompt);
          await this.sleep(this.config.rateLimit);

          results.success.push({
            id: prompt.id,
            title: prompt.title,
            slug: content.slug,
            wordCount: 0
          });

          results.totalGenerated++;

          // Publish immediately if enabled
          if (this.config.autoPublish) {
            await this.publishContent(content, prompt);
          }
        } catch (error) {
          this.log.error(`Failed to generate ${prompts[i].title}: ${error.message}`);
          results.failed.push({
            id: prompts[i].id,
            title: prompts[i].title,
            error: error.message
          });
        }
      }

      results.endTime = new Date();
      results.duration = results.endTime - results.startTime;

      await this.logResults(results);
      await this.notifySlack(results);

      return results;
    } catch (error) {
      this.log.error(`Batch generation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Publish content to multiple destinations
   */
  async publishContent(content, prompt) {
    try {
      // 1. Save as Markdown
      if (this.config.outputFormat.includes('markdown')) {
        const markdown = this.generator.exportContentToMarkdown(prompt, content);
        await this.saveFile(
          path.join(__dirname, this.config.destinationDirs.markdown, `${content.slug}.md`),
          markdown
        );
        this.log.success(`Published markdown: ${content.slug}.md`);
      }

      // 2. Save as JSON
      if (this.config.outputFormat.includes('json')) {
        const json = JSON.stringify(content, null, 2);
        await this.saveFile(
          path.join(__dirname, this.config.destinationDirs.json, `${content.id}.json`),
          json
        );
        this.log.success(`Published JSON: ${content.id}.json`);
      }

      // 3. Update Next.js content index
      await this.updateContentIndex(content);

      // 4. Update database if enabled
      if (this.config.database.enabled) {
        await this.updateDatabase(content);
      }

      return true;
    } catch (error) {
      this.log.error(`Publishing failed for ${content.slug}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Update Next.js content index for quick lookup
   */
  async updateContentIndex(content) {
    try {
      const indexPath = path.join(__dirname, this.config.destinationDirs.nextjs, 'index.json');
      let index = { calculators: [] };

      if (fs.existsSync(indexPath)) {
        index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
      }

      const existing = index.calculators.findIndex(c => c.id === content.id);
      const entry = {
        id: content.id,
        title: content.title,
        slug: content.slug,
        category: content.category,
        priority: content.priority,
        keywords: content.keywords,
        publishedAt: new Date().toISOString(),
        url: `/calculators/${content.slug}`
      };

      if (existing >= 0) {
        index.calculators[existing] = entry;
      } else {
        index.calculators.push(entry);
      }

      index.lastUpdated = new Date().toISOString();
      index.totalItems = index.calculators.length;

      await this.saveFile(indexPath, JSON.stringify(index, null, 2));
      this.log.success(`Updated content index: ${index.totalItems} items`);
    } catch (error) {
      this.log.warn(`Could not update index: ${error.message}`);
    }
  }

  /**
   * Save file with directory creation
   */
  async saveFile(filePath, content) {
    return new Promise((resolve, reject) => {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFile(filePath, content, 'utf-8', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  /**
   * Log generation results
   */
  async logResults(results) {
    const logPath = path.join(__dirname, '../logs', `generation-${Date.now()}.json`);
    const logContent = JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: {
        total: results.success.length + results.failed.length,
        successful: results.success.length,
        failed: results.failed.length,
        durationMs: results.duration,
        averageTimePerArticle: Math.round(results.duration / results.totalGenerated)
      },
      results
    }, null, 2);

    await this.saveFile(logPath, logContent);
    this.log.success(`Results logged to ${path.basename(logPath)}`);
  }

  /**
   * Notify Slack of completion
   */
  async notifySlack(results) {
    if (!this.config.slack.enabled || !this.config.slack.webhook) {
      return;
    }

    try {
      const message = {
        text: `🚀 Content Generation Complete`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `✅ *${results.success.length}* articles generated\n❌ *${results.failed.length}* failed\n⏱️ *${Math.round(results.duration / 1000)}s* total`
            }
          }
        ]
      };

      // Would send to Slack webhook here
      this.log.info('Slack notification (configured but not sent)');
    } catch (error) {
      this.log.warn(`Slack notification failed: ${error.message}`);
    }
  }

  /**
   * Update database with content metadata
   */
  async updateDatabase(content) {
    try {
      // This would connect to your database
      // Example: INSERT INTO calculator_content (id, title, slug, keywords) VALUES (...)
      this.log.info(`Database update queued for ${content.id}`);
    } catch (error) {
      this.log.error(`Database update failed: ${error.message}`);
    }
  }

  /**
   * Schedule regular generation
   */
  scheduleGeneration(interval = 'weekly') {
    const intervals = {
      hourly: 60 * 60 * 1000,
      daily: 24 * 60 * 60 * 1000,
      weekly: 7 * 24 * 60 * 60 * 1000,
      monthly: 30 * 24 * 60 * 60 * 1000
    };

    const time = intervals[interval];
    if (!time) {
      throw new Error(`Unknown interval: ${interval}`);
    }

    this.log.info(`Scheduling generation every ${interval} (${time}ms)`);

    setInterval(async () => {
      try {
        await this.generateBatch('high', 5);
        await this.generateBatch('medium', 3);
      } catch (error) {
        this.log.error(`Scheduled generation failed: ${error.message}`);
      }
    }, time);

    // Return interval ID for potential cleanup
    return setInterval;
  }

  /**
   * Get generation status
   */
  async getStatus() {
    const status = {
      timestamp: new Date().toISOString(),
      database: this.promptsDb.metadata,
      stats: this.manager.getStatistics(),
      recent: await this.getRecentGenerations(5)
    };
    return status;
  }

  /**
   * Get recent generation logs
   */
  async getRecentGenerations(count = 5) {
    try {
      const logsDir = path.join(__dirname, '../logs');
      if (!fs.existsSync(logsDir)) return [];

      const files = fs.readdirSync(logsDir)
        .filter(f => f.endsWith('.json'))
        .sort()
        .reverse()
        .slice(0, count);

      return files.map(f => path.basename(f));
    } catch (error) {
      return [];
    }
  }

  /**
   * Sleep utility
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Run full automation pipeline
   */
  async runFullPipeline() {
    this.log.info('='.repeat(60));
    this.log.info('📊 SEO Content Automation Pipeline Starting');
    this.log.info('='.repeat(60));

    try {
      // Phase 1: Generate high-priority
      this.log.info('\n🔴 PHASE 1: High-Priority Articles');
      const phase1 = await this.generateBatch('high', 10);

      // Phase 2: Generate medium-priority (smaller batch)
      this.log.info('\n🟡 PHASE 2: Medium-Priority Articles (Sample)');
      const phase2 = await this.generateBatch('medium', 5);

      // Summary
      const total = phase1.success.length + phase2.success.length;
      this.log.success(`\n✨ Pipeline Complete: ${total} articles generated`);

      const status = await this.getStatus();
      console.log('\n📈 Final Status:', JSON.stringify(status, null, 2));

    } catch (error) {
      this.log.error(`Pipeline failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// CLI Interface
async function main() {
  const automation = new ContentAutomation();
  const command = process.argv[2] || 'help';
  const arg = process.argv[3];

  switch (command) {
    case 'generate':
      await automation.generateBatch('high', 10);
      break;

    case 'batch':
      const [priority, count] = arg?.split(':') || ['high', '10'];
      await automation.generateBatch(priority, parseInt(count));
      break;

    case 'schedule':
      automation.scheduleGeneration(arg || 'daily');
      console.log('Scheduler running... Press Ctrl+C to stop');
      break;

    case 'status':
      const status = await automation.getStatus();
      console.log(JSON.stringify(status, null, 2));
      break;

    case 'pipeline':
      await automation.runFullPipeline();
      break;

    case 'help':
    default:
      console.log(`
📊 SEO Content Automation System

Usage: node auto-publish.js <command> [options]

Commands:
  generate                  Generate batch of high-priority content
  batch <priority>:<count>  Generate specific priority batch (e.g., high:15)
  schedule <interval>       Schedule recurring generation (hourly/daily/weekly)
  status                    Get current generation status
  pipeline                  Run full automation pipeline
  help                      Show this help message

Examples:
  node auto-publish.js generate
  node auto-publish.js batch high:20
  node auto-publish.js batch medium:10
  node auto-publish.js schedule weekly
  node auto-publish.js status
  node auto-publish.js pipeline
      `);
  }
}

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentAutomation;
}

// Run if called directly
if (require.main === module) {
  main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
