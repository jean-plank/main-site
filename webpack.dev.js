const merge = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    contentBase: common.output.path,
    inline: true, // iframe or inline script
    host: '0.0.0.0',
    overlay: {
      errors: true,
      warnings: true
    },
    hot: true
  }
})
