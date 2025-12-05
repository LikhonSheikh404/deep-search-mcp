/**
 * Deep Search MCP Server
 * Production-ready MCP server providing deep search capabilities
 *
 * Tools available:
 * - web_search: Search the web for information
 * - extract_content: Extract content from a URL
 * - deep_research: Perform comprehensive research on a topic
 * - news_search: Search for recent news articles
 * - academic_search: Search for academic/research content
 */

import { z } from 'zod';
import { createMcpHandler } from 'mcp-handler';
import {
  webSearch,
  extractContent,
  deepResearch,
  newsSearch,
  academicSearch,
} from '@/lib/search-engine';

const handler = createMcpHandler(
  (server) => {
    /**
     * Web Search Tool
     * Search the web for information on any topic
     */
    server.tool(
      'web_search',
      'Search the web for information. Returns a list of relevant search results with titles, URLs, and snippets.',
      {
        query: z.string().min(1).max(500).describe('The search query to find information about'),
        maxResults: z.number().int().min(1).max(20).optional().default(10).describe('Maximum number of results to return (1-20)'),
      },
      async ({ query, maxResults }) => {
        try {
          const results = await webSearch(query, maxResults);

          if (results.length === 0) {
            return {
              content: [{
                type: 'text' as const,
                text: `No results found for: "${query}"`,
              }],
            };
          }

          const formattedResults = results.map((result, index) => (
            `${index + 1}. **${result.title}**\n   URL: ${result.url}\n   ${result.snippet}`
          )).join('\n\n');

          return {
            content: [{
              type: 'text' as const,
              text: `# Search Results for: "${query}"\n\nFound ${results.length} results:\n\n${formattedResults}`,
            }],
          };
        } catch (error) {
          return {
            content: [{
              type: 'text' as const,
              text: `Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            }],
            isError: true,
          };
        }
      }
    );

    /**
     * Content Extraction Tool
     * Extract main content from a webpage
     */
    server.tool(
      'extract_content',
      'Extract the main content from a URL. Returns the title, cleaned text content, and metadata.',
      {
        url: z.string().url().describe('The URL to extract content from'),
      },
      async ({ url }) => {
        try {
          const content = await extractContent(url);

          const output = `# ${content.title}

**URL:** ${content.url}
**Word Count:** ${content.metadata.wordCount}
${content.metadata.author ? `**Author:** ${content.metadata.author}` : ''}
${content.metadata.publishedDate ? `**Published:** ${content.metadata.publishedDate}` : ''}
${content.metadata.description ? `**Description:** ${content.metadata.description}` : ''}

---

## Content

${content.content}`;

          return {
            content: [{
              type: 'text' as const,
              text: output,
            }],
          };
        } catch (error) {
          return {
            content: [{
              type: 'text' as const,
              text: `Content extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            }],
            isError: true,
          };
        }
      }
    );

    /**
     * Deep Research Tool
     * Perform comprehensive research on a topic
     */
    server.tool(
      'deep_research',
      'Perform comprehensive deep research on a topic. Searches multiple sources, extracts content, and provides a summary with key findings.',
      {
        query: z.string().min(1).max(500).describe('The research topic or question'),
        depth: z.number().int().min(1).max(5).optional().default(3).describe('Research depth (1-5). Higher values analyze more sources but take longer.'),
      },
      async ({ query, depth }) => {
        try {
          const research = await deepResearch(query, depth);

          const sourcesFormatted = research.sources.slice(0, 10).map((source, index) => (
            `${index + 1}. [${source.title}](${source.url})\n   ${source.snippet}`
          )).join('\n\n');

          const findingsFormatted = research.keyFindings.length > 0
            ? research.keyFindings.map((finding, index) => `${index + 1}. ${finding}`).join('\n')
            : 'No specific key findings extracted.';

          const output = `# Deep Research Report

**Query:** ${research.query}
**Timestamp:** ${research.timestamp}

---

## Summary

${research.summary}

---

## Key Findings

${findingsFormatted}

---

## Sources (${research.sources.length} found)

${sourcesFormatted}`;

          return {
            content: [{
              type: 'text' as const,
              text: output,
            }],
          };
        } catch (error) {
          return {
            content: [{
              type: 'text' as const,
              text: `Deep research failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            }],
            isError: true,
          };
        }
      }
    );

    /**
     * News Search Tool
     * Search for recent news articles
     */
    server.tool(
      'news_search',
      'Search for recent news articles on a topic. Returns news-focused search results.',
      {
        query: z.string().min(1).max(500).describe('The news topic to search for'),
        maxResults: z.number().int().min(1).max(20).optional().default(10).describe('Maximum number of results to return (1-20)'),
      },
      async ({ query, maxResults }) => {
        try {
          const results = await newsSearch(query, maxResults);

          if (results.length === 0) {
            return {
              content: [{
                type: 'text' as const,
                text: `No news results found for: "${query}"`,
              }],
            };
          }

          const formattedResults = results.map((result, index) => (
            `${index + 1}. **${result.title}**\n   URL: ${result.url}\n   ${result.snippet}`
          )).join('\n\n');

          return {
            content: [{
              type: 'text' as const,
              text: `# News Search Results for: "${query}"\n\nFound ${results.length} news articles:\n\n${formattedResults}`,
            }],
          };
        } catch (error) {
          return {
            content: [{
              type: 'text' as const,
              text: `News search failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            }],
            isError: true,
          };
        }
      }
    );

    /**
     * Academic Search Tool
     * Search for academic and research content
     */
    server.tool(
      'academic_search',
      'Search for academic papers, research studies, and scholarly content.',
      {
        query: z.string().min(1).max(500).describe('The academic topic or research question'),
        maxResults: z.number().int().min(1).max(20).optional().default(10).describe('Maximum number of results to return (1-20)'),
      },
      async ({ query, maxResults }) => {
        try {
          const results = await academicSearch(query, maxResults);

          if (results.length === 0) {
            return {
              content: [{
                type: 'text' as const,
                text: `No academic results found for: "${query}"`,
              }],
            };
          }

          const formattedResults = results.map((result, index) => (
            `${index + 1}. **${result.title}**\n   URL: ${result.url}\n   ${result.snippet}`
          )).join('\n\n');

          return {
            content: [{
              type: 'text' as const,
              text: `# Academic Search Results for: "${query}"\n\nFound ${results.length} academic sources:\n\n${formattedResults}`,
            }],
          };
        } catch (error) {
          return {
            content: [{
              type: 'text' as const,
              text: `Academic search failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            }],
            isError: true,
          };
        }
      }
    );
  },
  {
    // Server options
    capabilities: {
      tools: {},
    },
  },
  {
    basePath: '/api',
    maxDuration: 30,
    verboseLogs: false,
  }
);

// Export handlers for all HTTP methods
export { handler as GET, handler as POST, handler as DELETE };
