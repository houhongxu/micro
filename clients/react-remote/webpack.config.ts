import { name as packageName } from './package.json'
import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import BlurhashWebpackPlugin from 'blurhash-webpack-plugin'
import { config } from 'dotenv'
import { readdirSync } from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ModuleFederationTailwindPlugin from 'module-federation-tailwind-webpack-plugin'
import path from 'path'
import { sharedConfig } from 'shared-config'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { DefinePlugin } from 'webpack'
import { WebpackConfiguration } from 'webpack-dev-server'

const isDevelopment = process.env.NODE_ENV !== 'production'

const REMOTE_FILE_NAME = 'remoteEntry.js'
const REAMOE_NAME = 'remoteApp'

const exposes = readdirSync('./src/pages').reduce(
  (acc, cur) => {
    acc[`./${cur.split('.')[0]}`] = `./src/pages/${cur}`
    return acc
  },
  {} as Record<string, string>,
)

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
      cacheGroups: {
        // 将 tailwind.css 虚拟模块的 CSS 合并到一个公共 chunk
        // 避免每个 expose 组件都生成独立的 CSS chunk
        tailwind: {
          name: 'tailwind',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          test: (module: any) => {
            // 检查是否是 tailwind.css 虚拟模块
            return (
              module.resource &&
              typeof module.resource === 'string' &&
              module.resource.includes(
                'module-federation-tailwind-webpack-plugin.css',
              )
            )
          },
          chunks: 'all',
          enforce: true,
          priority: 20,
        },
      },
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
        include: path.join(__dirname, 'src'),
        use: [
          // 需要在 babel-loader 之前执行，以便在源码被处理前注入 import
          {
            loader: ModuleFederationTailwindPlugin.loader,
            options: {
              exposes,
            },
          },
          'babel-loader',
          'thread-loader',
        ],
      },
      {
        type: 'asset/inline',
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        parser: {
          dataUrlCondition: {
            maxSize: 10240,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ModuleFederationTailwindPlugin(),
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
      exposes,
      shared: sharedConfig.moduleFederationShared,
      library: { type: 'umd', name: REAMOE_NAME }, // qiankun使用umd规范 https://github.com/umijs/qiankun/issues/1394#issuecomment-848495620
      // 通过在远程组件中`import '@/styles/global.css'`将tailwindcss引入到remoteApp/components中，否则在hostApp使用时因为模块依赖没有import css而丢失样式，传统css是每个component都import css的 https://github.com/module-federation/module-federation-examples/discussions/714
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
