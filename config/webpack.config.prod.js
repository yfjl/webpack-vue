const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CompressionPlugin = require('compression-webpack-plugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const _path = require('path')
const config = require('./config.js')
let path = require('./path')
let {deleteall} = require('./untils')
deleteall(path.DIST)


module.exports = merge(config, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      template: path.TEMPLATE_prod,
      inject: false,
      chunksSortMode: 'dependency',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.uglify-cache',
  
      uglifyJS: {
        output: {
          beautify: false,
          comments: false,

        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
          
        },
 
      },
    }),
    new ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
  ],
  stats:"errors-only",
  devtool: false
})
