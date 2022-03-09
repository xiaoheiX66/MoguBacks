import AdverticeParent from "@/views/manager/AdverticeParent.vue"
import Adds from "@/views/manager/advertice/Adds.vue"
import Lists from "@/views/manager/advertice/Lists.vue"

export default {
    path:"advertice",
    component:AdverticeParent,
    children:[
       {
           path:"",
           redirect:""
       },
       {
        path:"adds",
        component:Adds
    },
    {
        path:"list",
        component:Lists
    }
    ]
}