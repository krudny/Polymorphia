import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

type WebpackContext = Parameters<NonNullable<NextConfig['webpack']>>[1];

const nextConfig: NextConfig = {
  webpack: (
      config: Configuration,
      context: WebpackContext
  ): Configuration => {
    const { isServer } = context;

    if (!isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    return config;
  },
};

module.exports = nextConfig;