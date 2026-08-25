/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Scope file tracing to this project (a stray lockfile exists in the home dir).
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
