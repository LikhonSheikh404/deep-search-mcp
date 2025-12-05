/**
 * MCP Type Definitions
 */

export interface ToolResponse {
  content: Array<{
    type: 'text' | 'image' | 'resource';
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
  isError?: boolean;
}

export interface AuthInfo {
  token: string;
  scopes: string[];
  clientId: string;
  extra?: Record<string, unknown>;
}

export interface McpServerConfig {
  name: string;
  version: string;
  description: string;
}

export interface SearchToolInput {
  query: string;
  maxResults?: number;
}

export interface ExtractToolInput {
  url: string;
}

export interface ResearchToolInput {
  query: string;
  depth?: number;
}
