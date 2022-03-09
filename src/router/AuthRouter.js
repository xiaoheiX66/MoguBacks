import Manager from '@/views/manager/Manager.vue'
import goodsRoute from '@/router/GoodsRoute.js'
import Home from '@/views/manager/Home.vue'
import userRouter from '@/router/UserRouter.js'
import OrderGoods from '@/router/OrderGoods.js'
import AdverticeParent from "@/router/AdverticeParent.js"
// 动态配置权限路由
export default {
    path:'/manager',
    component:Manager,
    meta:{
        requiresAuth:true
    },
    children:[
        {
            path:'home',
            component:Home,
        },
        goodsRoute,
        userRouter,
        OrderGoods,
        AdverticeParent
    ]
}