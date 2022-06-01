const libBase = require('./vue.lib.js');
const webpackMerge = require('webpack-merge');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const pkg = require('../package.json');

module.exports = webpackMerge(libBase, {
  chainWebpack: config => {
    config.externals({
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
      },
    });
  },
  configureWebpack: {
    output: {
      filename: '[name].js',
      umdNamedDefine: true,
      library: 'atom',
      libraryTarget: 'umd',
      libraryExport: 'default',
      globalObject: 'this',
    },
    plugins: [
      new FileManagerPlugin({
        onStart: {
          delete: ['./zipTemp/', './zip/'],
          mkdir: ['./zip/'],
        },
        onEnd: {
          copy: [
            {
              source: './umd/',
              destination: `./zipTemp/front/atom/${pkg.version}/`,
            },
          ],
          archive: [
            {
              source: './zipTemp/',
              destination: './zip/atom.zip',
            },
          ],
          delete: ['./zipTemp/'],
        },
      }),
    ],
  },
  outputDir: 'umd',
});
