/** @type {import('next').NextConfig} */
const nextConfig = {
    // Image optimization for better performance

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
     // Enable image optimization
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

  },

   
  // Enable compression
  compress: true,
  
  // Enable experimental features for better performance
  experimental: {
    // Temporarily disabled optimizeCss due to critters module issues
    // optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
  },
  
  // External packages for server components
  serverExternalPackages: ['mongoose'],

   // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=43200',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=43200',
          },
        ],
      },
    ];
  },

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
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/auth',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
