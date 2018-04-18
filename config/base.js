module.exports={
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
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        },
        {
          test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
          loader: 'url-loader?limit=1024'
        }
      ]
}