const demoBase = require('./vue.demo.js');
const webpackMerge= require('webpack-merge');

module.exports = webpackMerge(demoBase, {
  css: {
    sourceMap: false
  },
  productionSourceMap: false,
})