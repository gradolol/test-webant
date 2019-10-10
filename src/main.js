import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

Vue.use(ElementUI)

Vue.component('default-layout', DefaultLayout)
Vue.component('auth-layout', AuthLayout)

/* helpers */
import interceptorsSetup from './utils/request';

interceptorsSetup();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')