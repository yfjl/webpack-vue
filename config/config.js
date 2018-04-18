
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');


const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack')


const env = process.env.NODE_ENV
const isProduction = env === 'production'

const _path = require('path')
let path = require('./path')

console.log(env)

let {resolve,performance} = require('./resolve')

module.exports  = {
  context: __dirname,
  entry: {
    // 'main':path.SRC+'/main.js'
    main:['babel-polyfill',path.SRC+'/main.js']
    
  },
  output: {
    path: path.DIST,
    publicPath:isProduction ? '/ws-activity/' : '/',
    filename: '[name].js'
  },
  resolve,
  module:{
    rules: [
      
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
        }
      },
      {
        test: /iview\/.*?js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        include:path.SRC

      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['happypack/loader?id=css']
        })
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
        exclude:path.node_modules
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024'
      }
    ],
    noParse: /node_modules\/(jquey|chart\.js)/
  },
  performance,
  cache: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`
    }),
    new ExtractTextPlugin('main.css'),
    new BundleAnalyzerPlugin({
      openAnalyzer:false
    }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  new HappyPack({
    id: 'babel',
    loaders: ['babel-loader?cacheDirectory'],
    threadPool: happyThreadPool,
  }),
  new HappyPack({
    id: 'css',
    loaders: ['css-loader?minimize'],
    threadPool: happyThreadPool,
  }),
  new ProgressBarPlugin({
    format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
  }),
  // 开启 Scope Hoisting
  new ModuleConcatenationPlugin(),
//   new webpack.DefinePlugin({
//     'process.env.NODE_ENV': '"development"'
// }),
  
  // new PurifyCSSPlugin({
  //   paths: glob.sync(_path.join(__dirname, '../src/views/*/*.vue'))
  // })

  ]
}

