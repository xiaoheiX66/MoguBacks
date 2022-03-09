import OrderGoods from '@/views/manager/OrderGoods.vue'
import OrGoods from '@/views/manager/ordergoods/OrGoods.vue'
import OrderLists from '@/views/manager/ordergoods/OrderLists.vue'

export default {
    path:'order',
    component:OrderGoods,
    children:[
        {
            path:'',
            redirect:'orderlists'
        },
        {
            path:'orderlists',
            component:OrderLists
        },
        {
            path:'orgoods',
            component:OrGoods
        },
    ]
}