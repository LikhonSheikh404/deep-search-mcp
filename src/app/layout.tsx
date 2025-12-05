import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Deep Search MCP - AI-Powered Search Server',
  description: 'A production-ready Model Context Protocol server for comprehensive web search, content extraction, and AI-powered research capabilities.',
  keywords: ['MCP', 'Model Context Protocol', 'AI', 'Search', 'Research', 'Web Scraping'],
  authors: [{ name: 'Matrix Agent' }],
  openGraph: {
    title: 'Deep Search MCP',
    description: 'Production-ready MCP server for deep search capabilities',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
