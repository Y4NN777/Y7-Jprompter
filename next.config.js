/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Use static export per Next.js 14+ requirements
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig