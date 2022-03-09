import Vue from 'vue'
import VueRouter from 'vue-router'
import Logins from '../views/Logins.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/logins',
    component: Logins
  },
  {
    path: '/',
    redirect:"/logins"
  },

]

const router = new VueRouter({
  routes
})

export default router
