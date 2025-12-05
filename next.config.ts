import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable experimental features for MCP
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Headers for CORS support
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-Requested-With' },
        ],
      },
    ];
  },

  // Optimize for serverless deployment
  output: 'standalone',
};

export default nextConfig;
