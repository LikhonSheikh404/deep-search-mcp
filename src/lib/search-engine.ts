/**
 * Deep Search Engine - Core search functionality
 * Provides web search, content extraction, and research capabilities
 */

import * as cheerio from 'cheerio';

// Types
export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source?: string;
}

export interface ExtractedContent {
  title: string;
  content: string;
  url: string;
  metadata: {
    description?: string;
    author?: string;
    publishedDate?: string;
    wordCount: number;
  };
}

export interface ResearchResult {
  query: string;
  summary: string;
  sources: SearchResult[];
  keyFindings: string[];
  timestamp: string;
}

// Configuration
const SEARCH_API_TIMEOUT = 10000;
const MAX_CONTENT_LENGTH = 50000;

/**
 * Perform a web search using DuckDuckGo HTML search
 */
export async function webSearch(
  query: string,
  maxResults: number = 10
): Promise<SearchResult[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://html.duckduckgo.com/html/?q=${encodedQuery}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(SEARCH_API_TIMEOUT),
    });

    if (!response.ok) {
      throw new Error(`Search request failed: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: SearchResult[] = [];

    $('.result').each((index, element) => {
      if (index >= maxResults) return false;

      const $result = $(element);
      const titleEl = $result.find('.result__title a');
      const snippetEl = $result.find('.result__snippet');
      const urlEl = $result.find('.result__url');

      const title = titleEl.text().trim();
      const href = titleEl.attr('href') || '';
      const snippet = snippetEl.text().trim();
      const source = urlEl.text().trim();

      // Extract actual URL from DuckDuckGo redirect
      let actualUrl = href;
      if (href.includes('uddg=')) {
        const match = href.match(/uddg=([^&]+)/);
        if (match) {
          actualUrl = decodeURIComponent(match[1]);
        }
      }

      if (title && actualUrl) {
        results.push({
          title,
          url: actualUrl,
          snippet,
          source,
        });
      }
    });

    return results;
  } catch (error) {
    console.error('Web search error:', error);
    throw new Error(`Web search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Extract content from a URL
 */
export async function extractContent(url: string): Promise<ExtractedContent> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(SEARCH_API_TIMEOUT),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('script, style, nav, header, footer, aside, iframe, noscript').remove();

    // Extract metadata
    const title = $('title').text().trim() ||
                  $('meta[property="og:title"]').attr('content') ||
                  $('h1').first().text().trim() ||
                  'Untitled';

    const description = $('meta[name="description"]').attr('content') ||
                       $('meta[property="og:description"]').attr('content') ||
                       '';

    const author = $('meta[name="author"]').attr('content') ||
                  $('meta[property="article:author"]').attr('content') ||
                  '';

    const publishedDate = $('meta[property="article:published_time"]').attr('content') ||
                         $('time[datetime]').attr('datetime') ||
                         '';

    // Extract main content
    let content = '';

    // Try to find main content area
    const mainSelectors = ['article', 'main', '.content', '.post-content', '.entry-content', '#content'];
    for (const selector of mainSelectors) {
      const mainContent = $(selector).first();
      if (mainContent.length) {
        content = mainContent.text().trim();
        break;
      }
    }

    // Fallback to body content
    if (!content) {
      content = $('body').text().trim();
    }

    // Clean up whitespace
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim()
      .substring(0, MAX_CONTENT_LENGTH);

    const wordCount = content.split(/\s+/).length;

    return {
      title,
      content,
      url,
      metadata: {
        description,
        author,
        publishedDate,
        wordCount,
      },
    };
  } catch (error) {
    console.error('Content extraction error:', error);
    throw new Error(`Content extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Perform deep research on a topic
 */
export async function deepResearch(
  query: string,
  depth: number = 3
): Promise<ResearchResult> {
  try {
    // Limit depth to reasonable range
    const searchDepth = Math.min(Math.max(depth, 1), 5);

    // Perform initial search
    const searchResults = await webSearch(query, searchDepth * 3);

    // Extract content from top results
    const contentPromises = searchResults.slice(0, searchDepth).map(async (result) => {
      try {
        return await extractContent(result.url);
      } catch {
        return null;
      }
    });

    const extractedContents = await Promise.all(contentPromises);
    const validContents = extractedContents.filter((c): c is ExtractedContent => c !== null);

    // Generate summary and key findings
    const keyFindings: string[] = [];

    validContents.forEach((content) => {
      // Extract first meaningful sentence as a key finding
      const sentences = content.content.split(/[.!?]+/);
      const meaningfulSentence = sentences.find(s => s.trim().length > 50);
      if (meaningfulSentence) {
        keyFindings.push(meaningfulSentence.trim().substring(0, 200));
      }
    });

    // Create summary
    const summary = validContents.length > 0
      ? `Research completed for "${query}". Analyzed ${validContents.length} sources with a total of ${validContents.reduce((acc, c) => acc + c.metadata.wordCount, 0)} words. Key topics covered include information from ${searchResults.slice(0, searchDepth).map(r => r.source || new URL(r.url).hostname).join(', ')}.`
      : `Research for "${query}" found ${searchResults.length} results but could not extract detailed content.`;

    return {
      query,
      summary,
      sources: searchResults,
      keyFindings: keyFindings.slice(0, 5),
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Deep research error:', error);
    throw new Error(`Deep research failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Search for news articles
 */
export async function newsSearch(
  query: string,
  maxResults: number = 10
): Promise<SearchResult[]> {
  // Use news-specific search
  const newsQuery = `${query} news latest`;
  return webSearch(newsQuery, maxResults);
}

/**
 * Search for academic/research content
 */
export async function academicSearch(
  query: string,
  maxResults: number = 10
): Promise<SearchResult[]> {
  // Use academic-specific search
  const academicQuery = `${query} research paper study`;
  return webSearch(academicQuery, maxResults);
}
