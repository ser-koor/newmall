import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import toast from '@/components/common/toast'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
//在原型上实例化一个vue对象 $bus总线事件
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
// 图片懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png'),
})

//解决移动端300ms点击和穿透问题
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
