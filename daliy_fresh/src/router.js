import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import tabBar from './components/tabBar.vue'
import classify from "./views/classify.vue"
import shoppingCart from "./views/shoppingCart.vue"
import user from "./views/user.vue"
import login from "./views/login.vue"
import reg from "./views/reg.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/tabBar',
      component:tabBar,
      props:true
    },
    {
      path:'/classify',
      component:classify,
      props:true
    },
    {
      path:'/shoppingCart',
      component:shoppingCart,
      props:true
    },
    {
      path:'/user',
      component:user,
      props:true
    },
    {
      path:'/login',
      component:login,
      props:true
    },
    {
      path:'/reg',
      component:reg,
      props:true
    }
    
  ]
})
