import Vue from 'vue'
import Vuex from 'vuex'
import request from '../utils/request'
import router from '@/router'
import AuthRouter from '@/router/AuthRouter'
Vue.use(Vuex)

let userInfo = localStorage.getItem("userInfo");
try {
    userInfo = JSON.parse(userInfo) || {};
} catch (err) {
    userInfo = {};
}


 const store = new Vuex.Store({
  state: {
    userInfo
  },
  getters: {
    isLogin(state){
      return !!state.userInfo._id
  }
  },
  mutations: {
    login(state,payload){
      state.userInfo = payload;
      localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
  },
  logout(state){
      state.userInfo = {}
      localStorage.removeItem('userInfo')
  },
  addRoute(){
      router.addRoute(AuthRouter);
  }
  },
  actions: {
    async login(ctx,payload){
      // console.log("前台传过的数据",payload);
      const { data } = await request.post("/user/login",payload);
      // console.log("请求结果",data);
      if(data.code === 200){
          ctx.commit('login',data.info[0])
          ctx.commit('addRoute')
      }
      return data;
  }
  }
})
// 刷新时动态添加权限路由
if(store.getters.isLogin){
  store.commit('addRoute')
}

export default store;