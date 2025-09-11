const nextConfig = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: 'raw-loader',
    });

    return config;
  },
};

module.exports = nextConfig;
