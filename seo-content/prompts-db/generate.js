#!/usr/bin/env node

/**
 * SEO Content Generation Script
 * Generates markdown and HTML content for calculator pages
 */

const fs = require('fs');
const path = require('path');
const ContentGenerator = require('./content-generator');

const gen = new ContentGenerator();

// Define high-priority calculators to generate first
const priorityCalcs = [
  'FIN-001', // Loan Calculator
  'FIN-002', // Mortgage Calculator
  'FIN-003', // Compound Interest
  'FIN-024', // Budget Calculator
  'FIN-029', // ROI Calculator
  'FIN-032', // Currency Converter
  'MATH-001', // Percentage Calculator
  'HEALTH-001', // BMI Calculator
  'HEALTH-002', // Calorie Calculator
  'UTIL-001', // Age Calculator
];

const contentDir = path.join(__dirname, '../generated-content');

// Create directory if it doesn't exist
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

console.log('🚀 Starting SEO Content Generation...\n');

// Helper function to generate content
function generateCalculatorContent(id) {
  const content = gen.getContentById(id);
  
  if (!content) {
    console.warn(`⚠️ Prompt ${id} not found`);
    return null;
  }
  
  const markdown = gen.exportContentToMarkdown({ id }, content);
  const filename = `${content.slug}.md`;
  const filepath = path.join(contentDir, filename);
  
  fs.writeFileSync(filepath, markdown);
  console.log(`✅ Generated: ${filename}`);
  
  return { id, filename, filepath };
}

// Generate content for all high-priority calculators
console.log('📝 Generating High-Priority Content:\n');
const generated = [];
priorityCalcs.forEach(id => {
  const result = generateCalculatorContent(id);
  if (result) generated.push(result);
});

// Generate summary JSON
console.log('\n📊 Generating Summary Report:\n');
const report = gen.generateSummaryReport();

const reportPath = path.join(contentDir, 'generation-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  generatedAt: new Date().toISOString(),
  totalPrompts: report.totalPrompts,
  priorityBreakdown: report.priorityBreakdown,
  categories: Object.keys(report.categories),
  filesGenerated: generated.length,
  generatedFiles: generated
}, null, 2));

console.log(`✅ Report saved to: ${path.basename(reportPath)}`);

// Generate priority breakdown
console.log('\n📈 Priority Breakdown:');
console.log(`  High Priority: ${report.priorityBreakdown.high} calculators`);
console.log(`  Medium Priority: ${report.priorityBreakdown.medium} calculators`);
console.log(`  Low Priority: ${report.priorityBreakdown.low} calculators`);

console.log('\n✨ Content generation complete!');
console.log(`📁 All files saved to: ${contentDir}`);
