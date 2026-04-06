// app/api/content/route.ts
// API endpoint for SEO content endpoints

import { NextRequest, NextResponse } from 'next/server';
import { contentService } from '@/lib/content-service';

/**
 * GET /api/content
 * Returns list of all calculator content
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');
    const featured = searchParams.get('featured');

    let content: any[] = [];

    try {
      if (featured === 'true') {
        content = await contentService.getFeaturedContent(10);
      } else if (query) {
        content = await contentService.searchContent(query);
      } else if (category) {
        content = await contentService.getContentByCategory(category);
      } else if (priority) {
        content = await contentService.getContentByPriority(priority);
      } else {
        content = await contentService.getAllContent();
      }
    } catch (err) {
      console.error('Error fetching content:', err);
      content = [];
    }

    let stats = { total: 0, byCategory: {}, byPriority: {}, lastUpdated: new Date().toISOString() };
    try {
      stats = await contentService.getStats();
    } catch (statsErr) {
      console.error('Error getting stats:', statsErr);
    }

    return NextResponse.json({
      success: true,
      data: content,
      stats,
      count: content.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}
