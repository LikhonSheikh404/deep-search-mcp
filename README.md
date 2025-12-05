# Deep Search MCP Server

A production-ready **Model Context Protocol (MCP)** server providing comprehensive deep search capabilities including web search, content extraction, and AI-powered research.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LikhonSheikh404/deep-search-mcp)

## Features

- **Web Search** - Search the web for any topic with comprehensive results
- **Content Extraction** - Extract clean, readable content from any URL
- **Deep Research** - Multi-source research with summaries and key findings
- **News Search** - Find recent news articles on any topic
- **Academic Search** - Discover academic papers and research content

## Quick Start

### Connect to Your AI Assistant

Add this configuration to your MCP client (e.g., Cursor, Claude Desktop):

```json
{
  "mcpServers": {
    "deep-search": {
      "url": "https://deep-search-mcp.vercel.app/api/mcp"
    }
  }
}
```

### For Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "deep-search": {
      "url": "https://deep-search-mcp.vercel.app/api/mcp"
    }
  }
}
```

## Available Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `web_search` | Search the web for information | `query` (required), `maxResults` (optional, 1-20) |
| `extract_content` | Extract content from a URL | `url` (required) |
| `deep_research` | Comprehensive multi-source research | `query` (required), `depth` (optional, 1-5) |
| `news_search` | Search for news articles | `query` (required), `maxResults` (optional, 1-20) |
| `academic_search` | Search academic/research content | `query` (required), `maxResults` (optional, 1-20) |

## Self-Hosting

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/LikhonSheikh404/deep-search-mcp.git
cd deep-search-mcp

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

### Deploy to Vercel

1. Fork this repository
2. Import to Vercel
3. Deploy!

Or use the CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Testing with MCP Inspector

```bash
npx @modelcontextprotocol/inspector@latest http://localhost:3000
```

Then open http://127.0.0.1:6274 to test your tools.

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET/POST /api/mcp` | MCP server endpoint |
| `GET /.well-known/oauth-protected-resource` | OAuth metadata (for authenticated setups) |

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **MCP SDK**: mcp-handler
- **Deployment**: Vercel (Serverless + Fluid Compute)
- **Transport**: Streamable HTTP (efficient, no persistent connections)

## Architecture

```
src/
├── app/
│   ├── api/
│   │   └── [transport]/
│   │       └── route.ts      # MCP server endpoint
│   ├── .well-known/
│   │   └── oauth-protected-resource/
│   │       └── route.ts      # OAuth metadata
│   ├── page.tsx              # Landing page
│   └── layout.tsx            # Root layout
├── lib/
│   └── search-engine.ts      # Search functionality
└── types/
    └── mcp.ts                # Type definitions
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_APP_URL` | Public URL of your deployment | No |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this in your own projects.

## Author

Built by Matrix Agent

---

**Resources:**
- [MCP Documentation](https://modelcontextprotocol.io)
- [Vercel MCP Guide](https://vercel.com/docs/mcp)
- [Next.js Documentation](https://nextjs.org/docs)
