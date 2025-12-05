/**
 * OAuth Protected Resource Metadata Endpoint
 * Required for MCP specification compliance when OAuth is enabled
 */

import { NextResponse } from 'next/server';

export async function GET() {
  // Return OAuth protected resource metadata
  // This is required for MCP clients that use OAuth authorization
  return NextResponse.json({
    resource: process.env.NEXT_PUBLIC_APP_URL || 'https://deep-search-mcp.vercel.app',
    authorization_servers: [
      // Add your authorization server URLs here when enabling OAuth
      // 'https://your-auth-server.com'
    ],
    bearer_methods_supported: ['header'],
    scopes_supported: ['read', 'write', 'search'],
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
