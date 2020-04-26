import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './lib/font-awesome'
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
