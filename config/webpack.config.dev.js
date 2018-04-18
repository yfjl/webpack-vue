require('shelljs/global')
env.NODE_ENV = 'development'



const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
// const NpmInstallPlugin = require('npm-install-webpack-plugin')
const _path = require('path')
const config = require('./config.js')
const path = require('./path')

module.exports = merge(config, {
  plugins: [
    new DllReferencePlugin({
      context: _path.join(__dirname, "../config"),
      manifest: require('./vue.manifest.json'),
    }),
    new DllReferencePlugin({
      context: _path.join(__dirname, "../config"),
      manifest: require('./polyfill.manifest.json'),
    }),
    new HtmlWebpackPlugin({
      template: path.TEMPLATE,
      inject: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new NamedModulesPlugin()
    // new NpmInstallPlugin({
    //   dev: false,
    //   peerDependencies: false,
    //   quiet: false,
    // }),

  ],

  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000,

  },

  devtool: 'cheap-module-eval-source-map'
})



console.log("dev:"+process.env.NODE_ENV)