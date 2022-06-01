const fs = require('fs');
const path = require('path');

function resolve(dir) {
  return path.resolve(__dirname, dir)
}
const join = path.join

function getEntries(path) {
  let files = fs.readdirSync(resolve(path));
  const entries = files.reduce((ret, item) => {
    if (/__template__/.test(item)) {
      return ret;
    }
    const itemPath = resolve(join(path, item))
    const isDir = fs.statSync(itemPath).isDirectory();
    if (isDir) {
      const entryPath = resolve(join(itemPath, 'index.ts'))
      const cssPath = resolve(join(itemPath, 'index.less'))
      if (fs.existsSync(entryPath)) {
        ret[item] = ret[item] || []
        ret[item].push(entryPath)
      }
      if (fs.existsSync(cssPath)) {
        ret[item] = ret[item] || []
        ret[item].unshift(cssPath)
      }
    } else {
      const [name, suffix] = item.split('.')
      if (suffix === 'ts' || suffix === 'js') {
        const entryPath = resolve(`${itemPath}`)
        ret[name] = ret[name] || [];
        ret[name].push(entryPath)
      } else if (suffix === 'less') {
        const entryPath = resolve(`${itemPath}`)
        ret[name] = ret[name] || [];
        ret[name].unshift(entryPath)
      }
    }
    return ret
  }, {})
  return entries
}


module.exports = {
  css: {
    sourceMap: false,
    extract: {
      filename: 'style/[name].css'
    }
  },
  configureWebpack: {
    entry: {
      ...getEntries('../packages'),
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('packages'))

    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
    config.plugins.delete('pwa')
    config.plugins.delete('html')
    config.plugins.delete('workbox')
    config.entryPoints.delete('app')
  },
  productionSourceMap: false,
}
