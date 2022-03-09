import Users from '@/views/manager/Users.vue'
import AddUser from '@/views/manager/user/AddUser.vue'
import EditUser from '@/views/manager/user/EditUser.vue'
import ListUser from '@/views/manager/user/ListUser.vue'

export default {
    path:"user",
    component:Users,
    children:[
        {
            path:'',
            redirect:"listUser"
        },
        {
            path:'listUser',
            component:ListUser
        },
        {
            path:'addUser',
            component:AddUser
        },
        {
            path:'editUser',
            component:EditUser
        }
    ]
}