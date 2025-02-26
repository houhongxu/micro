import { name as packageName } from './package.json'
import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import BlurhashWebpackPlugin from 'blurhash-webpack-plugin'
import { config } from 'dotenv'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { sharedConfig } from 'shared-config'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { DefinePlugin } from 'webpack'
import { WebpackConfiguration } from 'webpack-dev-server'

const isDevelopment = process.env.NODE_ENV !== 'production'
const remoteFileName = 'remoteEntry.js'

const env = config({
  path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
})

if (env.error) {
  console.error('环境变量读取失败')
  process.exit(1)
}

// 用WebpackConfiguration是因为配置中配置了devServer
const webpackConfig: WebpackConfiguration = {
  mode: isDevelopment ? 'development' : 'production',
  entry: path.join(__dirname, './src/index.tsx'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[id].[contenthash:8].js',
    clean: true,
    hashFunction: 'xxhash64',

    // qiankun
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    globalObject: 'window',
  },
  resolve: {
    extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  externals: sharedConfig['dev']['externals'],
  optimization: {
    // 最小化 __webpack_require__.u 内容改变的影响，分离webpack runtime文件
    runtimeChunk: false, // module federation 导致无法使用，尝试了两种方法尚未解决
    // runtimeChunk: 'single', // 使用ModuleFederationRuntimePlugin支持
    // runtimeChunk: 'single', // 使用v2支持

    // 分包
    splitChunks: {
      chunks: 'async', // module federation 需要仅分包异步js
      // chunks: 'all', // 使用ModuleFederationRuntimePlugin支持
      // chunks: 'all', // 使用v2支持
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jsx?|mjs|cjs|tsx?)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: ['babel-loader', 'thread-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new DefinePlugin({ 'process.env': JSON.stringify(env.parsed) }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/templates/index.html'),
      chunksSortMode: (a, b) => {
        // qiankun需要保证main在最下面，在remoteEntry下面 https://qiankun.umijs.org/zh/faq#application-died-in-status-loading_source_code-you-need-to-export-the-functional-lifecycles-in-xxx-entry
        if (a.includes('main')) return 1 // 确保 main 在最后
        if (b.includes('main')) return -1 // 确保 main 在最后
        return 0 // 其他 chunks 保持原有顺序
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new BlurhashWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: remoteFileName,
      exposes: {
        './Button': './src/components/Button',
      },
      library: { type: 'umd', name: 'remoteApp' }, // qiankun使用umd规范 https://github.com/umijs/qiankun/issues/1394#issuecomment-848495620
    }),
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.join(__dirname, './public'), //托管静态资源public文件夹
    },
    port: 9002,
    compress: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
}

export default webpackConfig
