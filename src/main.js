import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios';

Vue.config.productionTip = false
/* 挂载axios到vue原型上，由于继承性，所有的组件都可以使用this.$http */
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
