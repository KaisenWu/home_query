/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username:  'Kaisen',
    mongodb_password: 'Kaisen',
    mongodb_clustername: 'homequerycluster',
    mongodb_database: 'home_query',
    NEXTAUTH_URL: 'http://localhost:3000/'
  }
}

module.exports = nextConfig
