const demoDevConfig = require('./build/vue.demo.dev.js');
const demoProdConfig = require('./build/vue.demo.prod.js');
const cjsConfig = require('./build/vue.lib.cjs.js');
const umdConfig = require('./build/vue.lib.umd.js');

const buildTarget = process.env.VUE_APP_TARGET;

const configMap = {
  lib_cjs: cjsConfig,
  lib_umd: umdConfig,
  demo: demoProdConfig,
};

const vueConfig = configMap[buildTarget] || demoDevConfig;

module.exports = vueConfig;
