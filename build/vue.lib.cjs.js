const libBase = require('./vue.lib.js');
const webpackMerge= require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

module.exports = webpackMerge(libBase, {
  configureWebpack: {
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs2',
      libraryExport: 'default',
      globalObject: 'this',
    },
  },
  chainWebpack: config => {
    config.externals(nodeExternals())
  },
  outputDir: 'lib',
})