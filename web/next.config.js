/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['srrjorqpfxsdzlxwvxig.supabase.co'],
  },
  experimental: {
    serverActions: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig