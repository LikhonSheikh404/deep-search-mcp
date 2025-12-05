/**
 * Deep Search MCP Server - Landing Page
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Deep Search MCP
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A production-ready Model Context Protocol server for comprehensive web search,
            content extraction, and AI-powered research capabilities.
          </p>
        </div>

        {/* Connection Info */}
        <div className="bg-gray-800/50 rounded-2xl p-8 mb-12 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Start
          </h2>
          <p className="text-gray-400 mb-4">
            Connect to this MCP server using your preferred AI assistant:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-green-400">
{`{
  "mcpServers": {
    "deep-search": {
      "url": "https://deep-search-mcp.vercel.app/api/mcp"
    }
  }
}`}
            </pre>
          </div>
        </div>

        {/* Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Available Tools
          </h2>

          <div className="grid gap-4">
            {[
              {
                name: 'web_search',
                description: 'Search the web for information on any topic',
                params: 'query, maxResults',
              },
              {
                name: 'extract_content',
                description: 'Extract main content and metadata from any URL',
                params: 'url',
              },
              {
                name: 'deep_research',
                description: 'Comprehensive multi-source research with summaries',
                params: 'query, depth',
              },
              {
                name: 'news_search',
                description: 'Search for recent news articles and updates',
                params: 'query, maxResults',
              },
              {
                name: 'academic_search',
                description: 'Find academic papers and research content',
                params: 'query, maxResults',
              },
            ].map((tool) => (
              <div
                key={tool.name}
                className="bg-gray-800/30 rounded-xl p-5 border border-gray-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-mono text-lg text-blue-400 mb-1">{tool.name}</h3>
                    <p className="text-gray-400">{tool.description}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded">
                    {tool.params}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: 'Fast & Efficient',
              description: 'Optimized for serverless with Streamable HTTP transport',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'Production Ready',
              description: 'Built with TypeScript, error handling, and best practices',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Global Edge',
              description: "Deployed on Vercel's global edge network",
            },
          ].map((feature) => (
            <div key={feature.title} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <div className="text-blue-500 mb-3">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          <p>
            Built with Next.js, MCP SDK, and deployed on Vercel.
          </p>
          <p className="mt-2">
            <a
              href="https://github.com/LikhonSheikh404/deep-search-mcp"
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
            {' | '}
            <a
              href="/api/mcp"
              className="text-blue-400 hover:underline"
            >
              MCP Endpoint
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
