// seo-content/automation.config.js
// Automation configuration for content generation and publishing

module.exports = {
  // Content Generation Settings
  generation: {
    // Batch sizes for different priorities
    batchSizes: {
      high: 10,
      medium: 5,
      low: 2
    },

    // Rate limiting (milliseconds between articles)
    rateLimit: 1000,

    // Content quality settings
    quality: {
      minWords: 2500,
      maxWords: 3500,
      targetKeywords: 12,
      sections: 8
    },

    // Output formats to generate
    outputFormats: ['markdown', 'json'],

    // Destination directories
    destinations: {
      markdown: './generated-content',
      json: './api/content',
      nextjs: '../app/calculators/content'
    }
  },

  // Publishing Settings
  publishing: {
    // Auto-publish after generation
    autoPublish: true,

    // Repository settings (for commits)
    repository: {
      autoCommit: false,
      commitMessage: '🤖 Auto-publish: Generated SEO content [skip ci]',
      branch: 'auto-publish-content'
    },

    // Database configuration (if enabled)
    database: {
      enabled: false,
      type: 'postgresql', // postgresql, mongodb, etc.
      url: process.env.DATABASE_URL,
      table: 'calculator_content'
    },

    // Slack notifications
    slack: {
      enabled: process.env.SLACK_WEBHOOK_URL ? true : false,
      webhook: process.env.SLACK_WEBHOOK_URL,
      channels: {
        success: '#content-automation',
        error: '#alerts'
      }
    },

    // Email notifications
    email: {
      enabled: false,
      recipients: ['team@example.com'],
      onSuccess: true,
      onError: true
    }
  },

  // Scheduling Configuration
  scheduling: {
    // Enable scheduled generation
    enabled: false,

    // Cron patterns (use node-cron format)
    jobs: {
      dailyBatch: {
        enabled: false,
        pattern: '0 6 * * *', // Daily at 6 AM UTC
        priority: 'high',
        count: 5
      },
      weeklyBatch: {
        enabled: false,
        pattern: '0 2 * * 1', // Monday at 2 AM UTC
        priority: 'high',
        count: 15
      },
      monthlyComprehensive: {
        enabled: false,
        pattern: '0 0 1 * *', // 1st of month at midnight
        priority: 'all',
        count: 50
      }
    }
  },

  // SEO Configuration
  seo: {
    // Target keywords per article
    targetKeywords: 12,

    // Keyword placement strategy
    keywordPlacement: {
      inTitle: true,
      inDescription: true,
      inH1: true,
      inFirstParagraph: true,
      inSections: true,
      inRelatedLinks: true
    },

    // Meta tag generation
    metaTags: {
      generateTitle: true,
      generateDescription: true,
      generateKeywords: true,
      generateCanonical: true,
      generateOG: true,
      generateTwitter: true
    },

    // Content optimization
    optimization: {
      addSchemaMarkup: true,
      addInternalLinks: true,
      addRelatedCalculators: true,
      optimizeHeadings: true,
      addFAQ: true
    }
  },

  // Quality Assurance
  qa: {
    // Enable QA checks
    enabled: true,

    // Checks to perform
    checks: {
      wordCount: true,
      keywordDensity: true,
      linkCount: true,
      headingStructure: true,
      readability: true
    },

    // Minimum thresholds
    thresholds: {
      minWordCount: 2500,
      maxWordCount: 3500,
      minKeywordDensity: 1,
      maxKeywordDensity: 3,
      minReadabilityScore: 60,
      requiredHeadings: 7
    }
  },

  // Performance Settings
  performance: {
    // Number of parallel operations
    concurrency: 3,

    // Timeout for single operation (ms)
    timeout: 30000,

    // Retry settings
    retry: {
      enabled: true,
      attempts: 3,
      delayMs: 1000
    }
  },

  // Logging Configuration
  logging: {
    // Log level: 'debug', 'info', 'warn', 'error'
    level: process.env.LOG_LEVEL || 'info',

    // Save logs to file
    file: {
      enabled: true,
      directory: './logs',
      maxSize: '10m',
      maxFiles: 10
    },

    // Console output
    console: {
      enabled: true,
      verbosity: 'normal' // 'minimal', 'normal', 'verbose'
    }
  },

  // Feature Flags
  features: {
    // Generate content
    generateContent: true,

    // Publish to database
    publishToDatabase: false,

    // Create git commits
    gitCommit: false,

    // Send notifications
    sendNotifications: true,

    // Update analytics
    updateAnalytics: false,

    // Auto-deploy to Vercel
    deployToVercel: false
  }
};
