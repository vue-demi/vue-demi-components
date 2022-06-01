const demoBase = require('./vue.demo.js');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(demoBase, {
  css: {
    sourceMap: true,
  },
  productionSourceMap: true,
  devServer: {
    host: 'dev.10jqka.com.cn',
    port: 8080,
    hot: true,
    hotOnly: true,
    open: false,
    https: false,
  },
});
