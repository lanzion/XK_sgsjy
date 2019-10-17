var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'Asset': resolve('src/assets'),
      'Axios': 'xk-kxsz-common/src/assets/js/http.js',
      // 'Axios': resolve('src/js/http.js'),
      'Common': resolve('src/components/common'),
      'View': resolve('src/views'),
      'components': resolve('src/components'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      // {
      //   test: /\.(vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/xk-kxsz-common')]
        // include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.css$/,
        include: [
          '/src/',
          '/node_modules/element-ui/lib/',
          '/node_modules/wangEditor/dist/css/wangEditor/',
          '/static/css/'
        ],
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'resolve-url-loader', 'postcss-loader')
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: process.env.NODE_ENV === 'production' ? {
          limit: true,
          name: utils.assetsPath('./fonts/[name].[ext]'),
          outputPath: utils.assetsPath('./css/')
        } : {
          limit: true,
          name: utils.assetsPath('./fonts/[name].[ext]')
        }
      },
      {
        test: /\.(ico|cur)$/,
        loader: 'url-loader',
        options: {
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: 'static/css/[name].css', allChunks: true})
  ]
}
