/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'import.meta.dirname': '__dirname',
      }),
    );
    return config;
  },
};

export default nextConfig;
