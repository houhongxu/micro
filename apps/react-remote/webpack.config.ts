import { name as packageName } from './package.json'
import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import BlurhashWebpackPlugin from 'blurhash-webpack-plugin'
import { config } from 'dotenv'
import { readdirSync } from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { sharedConfig } from 'shared-config'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { DefinePlugin } from 'webpack'
import { WebpackConfiguration } from 'webpack-dev-server'

const isDevelopment = process.env.NODE_ENV !== 'production'
const REMOTE_FILE_NAME = 'remoteEntry.js'
const REAMOE_NAME = 'remoteApp'

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
    publicPath: 'auto',
    path: path.join(__dirname, './dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[id].[contenthash:8].js',
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
  optimization: {
    // 最小化 __webpack_require__.u 内容改变的影响，分离webpack runtime文件
    runtimeChunk: false, // TODO https://github.com/webpack/webpack/issues/18810

    // 分包
    splitChunks: {
      chunks: 'all', // 使用v2支持
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
      filename: 'static/css/[name].[contenthash:8].css',
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new BlurhashWebpackPlugin({
      filename: 'static/images/[name].[contenthash:8][ext]',
    }),
    new ModuleFederationPlugin({
      name: REAMOE_NAME,
      filename: REMOTE_FILE_NAME,
      exposes: readdirSync('./src/pages').reduce(
        (acc, cur) => {
          acc[`./${cur.split('.')[0]}`] = `./src/pages/${cur}`
          return acc
        },
        {} as Record<string, string>,
      ),
      shared: sharedConfig.moduleFederationShared,
      library: { type: 'umd', name: REAMOE_NAME }, // qiankun使用umd规范 https://github.com/umijs/qiankun/issues/1394#issuecomment-848495620
      // 通过在远程组件中`import '@/styles/global.css'`将tailwindcss引入到remoteApp中，否则在hostApp使用时因为检测不到类而丢失样式 https://stackoverflow.com/questions/76967231/tailwind-not-working-when-components-are-shared-through-webpack-module-federation
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
