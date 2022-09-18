// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "@/assets/css/public.less"
import Vue from 'vue'
import App from './App'
import store from "./store"
import router from './router'
import './components/Toast/toast.less';
import Toast from './components/Toast/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { vueConciseSlider } from "vue-concise-slider"
Vue.use(Toast);
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
