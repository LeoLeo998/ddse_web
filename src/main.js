// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'amfe-flexible/index.js'
import '@/assets/css/public.less'
import '@/assets/css/common.less'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './components/Toast/toast.less'
import Toast from './components/Toast/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCountryIntl from 'vue-country-intl'
import 'vue-country-intl/lib/vue-country-intl.css'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { vueConciseSlider } from 'vue-concise-slider'
import './mixins'
Vue.component(VueCountryIntl.name, VueCountryIntl)
Vue.use(Toast)
Vue.use(ElementUI)
Vue.config.productionTip = false

// Vue.use(ElementPlusIconsVue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
