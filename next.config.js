/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.aboutwebsite.in',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'api.aboutwebsite.in',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.aboutwebsite.in',
        pathname: '/uploads/**',
      },
    ],
  },
  // External packages for server components
  serverExternalPackages: ['mongoose'],
  // Handle subdomain routing - removed as we're using middleware now
  async rewrites() {
    return [
      // Fallback for published websites
      {
        source: '/published/:id',
        destination: '/published/:id',
      },
    ];
  },
  // Other Next.js configurations...
}

module.exports = nextConfig
