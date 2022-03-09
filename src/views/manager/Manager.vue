<template>
          <el-container class="parentboss">
        <el-header class="headerss" style="height:100px">
            <el-row>
              <!-- el-icon-position -->
  <el-col :span="12" style="display:flex;align-items:center" class="leftConts">
      <i class="el-icon-loading" style="font-size:33px;color:orange;margin-right:50px;margin-left:33px"></i>
      <h1 style="font-size:26px;font-family:'宋体'">蘑菇街后台管理系统</h1>
  </el-col>
  <el-col :span="12" style="display:flex;justify-content:flex-end">
      <h1 style="font-family:'宋体'">{{userInfo.username}}</h1>&nbsp;<el-button type="text" @click="logout" style="margin-right:100px;font-size:20px">退出</el-button>
      </el-col>
</el-row>
        </el-header>
        <!-- 下左 -->
        <el-container>
            <el-aside width="240px" class="asiderleft">
                <el-menu
            :default-active="active"
            class="el-menu-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b" style="height:100%;font-size:35px"
            router
            :default-openeds="opens"
            >
            <template v-for="item in menu">
                 <el-submenu :index="baseUrl + item.path" v-if="item.children" :key="item.path">
                        <template v-slot:title>
                            <i :class="item.icon" style="font-size:20px"></i>
                            {{item.text}}
                        </template>
                        <el-menu-item :index="baseUrl + item.path + it.path" v-for="it in item.children" :key="it.path">
                           <i :class="it.icon" style="font-size:20px"></i>
                          {{it.text}}</el-menu-item>
                        
                    </el-submenu>
                    <el-menu-item :index="baseUrl + item.path" v-else :key="item.path">
                        <i :class="item.icon" style="font-size:20px"></i>
                        {{item.text}}
                    </el-menu-item>
            </template>
            </el-menu>
            </el-aside>
            <!-- 下右边 -->
            <el-main class="asiderright">
                <router-view></router-view>
            </el-main>
        </el-container>
</el-container>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:"Manager",
     data() {
      return {
        active:'/manager/home',
      opens:['/manager/goods'],
        baseUrl:'/manager',
      menu: [
        {
          text: "管理首页",
          path: "/home",
          icon: "el-icon-s-home"
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user",
          children: [
            {
              text: "添加用户",
              path: "/addUser",
              icon:"el-icon-plus"
            },
            {
              text: "用户列表",
              path: "/listUser",
              icon:"el-icon-c-scale-to-original"
            },
            {
              text: "更新信息",
              path: "/editUser",
              icon:"el-icon-refresh"
            }
          ]
        },
        {
          text: "商品管理",
          path: "/goods",
          icon: "el-icon-shopping-bag-1",
          children: [
            {
              text: "添加商品",
              path: "/add",
              icon:"el-icon-plus"
            },
            {
              text: "商品列表",
              path: "/list",
              icon:"el-icon-c-scale-to-original"
            },
             {
              text: "更新商品",
              path: "/edit",
              icon:"el-icon-refresh"
            }
          ]
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-s-order",
          children:[
              {
                  text:"添加订单",
                  path:"/orgoods",
                  icon:"el-icon-plus"
              },
              {
                  text:"订单列表",
                  path:"/orderlists",
                  icon:"el-icon-c-scale-to-original"
              }
          ]
        },
        {
          text: "广告管理",
          path: "/advertice",
          icon: "el-icon-data-board",
          children: [
            {
              text: "添加广告",
              path: "/adds",
              icon:"el-icon-plus"
            },
            {
              text: "广告列表",
              path: "/list",
              icon:"el-icon-c-scale-to-original"
            }
          ]
        },
        {
          text: "角色权限",
          path: "/access",
          icon: "el-icon-key",
          children: [
            {
              text: "添加角色",
              path: "/add"
            },
            {
              text: "角色列表",
              path: "/list"
            },
            {
              text: "权限指派",
              path: "/set"
            }
          ]
        }
      ],
      currentIndex: 0
      };
    },
    computed:{
        ...mapState(['userInfo'])
    },
    methods: {
      logout(){
          this.$store.commit('logout')
          this.$router.push('/logins')
      }
    }
}
</script>

<style lang="scss">
html,body{
    height: 100%;
    background: white;
}
.parentboss{
    height:100vh;
    background-color:white;
    font-size: 25px;
    .headerss{
            line-height: 60px;
            color: #fff;
            background-color: rgb(67, 74, 80);
        }
    li,div,i{
        font-size: 22px;
    }
    .el-menu-item,.el-submenu{
        // margin-left: -25px;
    }
}
    

</style>