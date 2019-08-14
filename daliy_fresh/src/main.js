import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
//引用主页tabBar组件
import tabBar from './components/tabBar.vue'
import myHeader from './components/myHeader.vue'
import filter from "./filter"
//MinrUI
import MintUI from 'mint-ui'
import'mint-ui/lib/style.css'

Vue.use(MintUI)
//配置axios
axios.defaults.withCredentials=true
axios.defaults.baseURL="http://127.0.0.1:3000/"
Vue.prototype.axios=axios;


Vue.config.productionTip = false

//注册为全局组件
Vue.component("tabBar",tabBar)
Vue.component("myHeader",myHeader)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
