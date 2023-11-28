/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'sun2-22.userapi.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
