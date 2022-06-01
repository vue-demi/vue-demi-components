const path = require('path');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  // lintOnSave: false,
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, {
        limit: 200 * 1024,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      }));

    config.module
      .rule('js')
      .rule('vue')
      .include
      .add('/packages')
      .add('/examples')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => options);

    config.resolve.alias
      .set('@', resolve('packages'));

    config.resolve.extensions
      .add('ts')
      .add('js')
      .add('vue')
      .add('json');
  },
};
