const webpack = require('webpack')


var config = require("./webpack.config.dev.js");
const WebpackDevServer = require('webpack-dev-server') 
const helper = require('./help.js')

const port = 3002
const host = helper.getHost()
const address = `http://${host}:${port}`


const entryMixins = [
    'webpack-dev-server/client?' + address,
    'webpack/hot/dev-server'
  ]
  config.entry['main'] = entryMixins.concat(config.entry['main'])


const devServer = new WebpackDevServer(webpack(config), {
        noInfo: true,
        stats:"errors-only",
        clientLogLevel: "none",
        hot: true,
        stats:"errors-only",
        disableHostCheck: true
})


devServer.listen(port, undefined, function() {
    console.log('\n ==> '+ address +' \n')
  })
