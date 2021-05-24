import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//1.重置样式
import "./assets/css/reset.css"
// 2.公共组件
import "./components"

// 3.过滤器
import "./filters"

//颜色
Vue.prototype.$primary2 = 'rgb(36,45,78)';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
