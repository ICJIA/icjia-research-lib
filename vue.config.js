const path = require('path')

module.exports = {
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./demo/main.js')

    config.module
      .rule('vue')
      .use('global-vue-loader')
      .loader(path.resolve(__dirname, 'build-utils/global-vue-loader'))
      .before('vue-loader')
  },
  css: {
    extract: true
  }
}
