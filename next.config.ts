import type { NextConfig } from "next";

const WORKER_URL = process.env.WORKER_URL || 'http://127.0.0.1:8788';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${WORKER_URL}/api/:path*`,
      },
      {
        source: '/images/:path*',
        destination: `${WORKER_URL}/images/:path*`,
      },
    ];
  },
};

export default nextConfig;
