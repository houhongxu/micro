import path from 'path'
import { Configuration, DefinePlugin } from 'webpack'

export const webpackConfig: Configuration = {
  mode: 'none',
  output: {
    filename: 'index.js',
    chunkFilename: '[id].[contenthash:8].js',
    clean: true,
    hashFunction: 'xxhash64',

    // umd
    library: 'remote-module',
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
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                file: path.join(__dirname, 'postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: /\.(jsx?|mjs|cjs|tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.join(__dirname, 'babel.config.js'),
            },
          },
          'thread-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV: 'production' }),
    }),
  ],
}
