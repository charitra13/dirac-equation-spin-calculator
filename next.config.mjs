/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // We're not modifying the existing tsconfig.json, so we need to tell Next.js where our source files are
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  experimental: {
    // Since we're keeping the src directory structure
    externalDir: true,
  },
};

export default nextConfig;
