import Vue from 'vue';
import App from './App.vue';
// import AtomTabBar from '../packages/index';
// import '../lib/style/index.css';
// import AtomTabBar from '../lib/index.js';

Vue.config.productionTip = false;
// Vue.use(AtomTabBar);
new Vue({
  render: h => h(App),
}).$mount('#app');
