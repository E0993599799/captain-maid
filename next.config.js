const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.arigeo.com'

function getCmsImageRemotePattern(cmsUrl) {
  try {
    const url = new URL(cmsUrl)
    if (!['http:', 'https:'].includes(url.protocol) || !url.hostname || url.username || url.password) {
      return undefined
    }

    return {
      protocol: url.protocol.slice(0, -1),
      hostname: url.hostname,
      port: url.port,
      pathname: '/**',
    }
  } catch {
    return undefined
  }
}

const cmsImageRemotePattern = getCmsImageRemotePattern(CMS_URL)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    remotePatterns: cmsImageRemotePattern ? [cmsImageRemotePattern] : [],
  },

  // Headers for performance & security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  },

  // Redirects
  async redirects() {
    return []
  }
}

module.exports = nextConfig
