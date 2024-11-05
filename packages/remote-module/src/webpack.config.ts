import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { DefinePlugin, Configuration } from 'webpack'

// 用WebpackConfiguration是因为配置中配置了devServer
const webpackConfig: Configuration = {
  mode: 'production',
  entry: path.resolve('./src/remote/index.tsx'),
  output: {
    path: path.resolve('./dist/remote'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[id].[contenthash:8].js',
    clean: true,
    hashFunction: 'xxhash64',

    // umd
    library: 'remote',
    libraryTarget: 'umd',
    globalObject: 'window',
  },
  resolve: {
    extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jsx?|mjs|cjs|tsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'thread-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
  ].filter(Boolean),
}

export default webpackConfig
