/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['tsx', 'ts'],
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.userapi.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
