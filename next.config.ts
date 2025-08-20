import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pokemon/list/1',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
