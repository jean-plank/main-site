const merge = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: '/'
  },
  devServer: {
    port: 8675,
    contentBase: common.output.path,
    inline: true, // iframe or inline script
    host: '0.0.0.0',
    overlay: {
      errors: true,
      warnings: true
    },
    historyApiFallback: true,
    // disableHostCheck: true,
    hot: true
  }
})
