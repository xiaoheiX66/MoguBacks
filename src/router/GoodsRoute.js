import Goods from '@/views/manager/Goods.vue'
import Add from '@/views/manager/goods/Add.vue'
import Edit from '@/views/manager/goods/Edit.vue'
import List from '@/views/manager/goods/List.vue'

export default {
    path:"goods",
    component:Goods,
    children:[
        {
            path:'',
            redirect:'list'
        },
        {
            path:'list',
            component:List
        },
        {
            path:'add',
            component:Add
        },
        {
            path:'edit',
            component:Edit
        },
    ]
}