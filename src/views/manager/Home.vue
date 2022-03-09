<template>
    <div class="homepage">
        <section>
            <template>
    <el-carousel indicator-position="outside" height="670px">
        <el-carousel-item v-for="item in swiperShows" :key="item">
        <h3><img :src="item.url" alt="加载中..." width="100%" height="100%"></h3>
        </el-carousel-item>
    </el-carousel>
    </template>
        </section>
        <section class="projectTitle">@{{userinfoss.username}}#蘑菇街后台管理系统</section>
        <section></section>
    </div>
</template>

<script>
export default {
    name:"Home",
    data(){
        return{
            swiperShows:[{url:"https://s10.mogucdn.com/mlcdn/c45406/200518_482bj515c0a2lb0abg0b60hl2h5l8_1134x440.jpg"}
            ,{url:"https://s10.mogucdn.com/mlcdn/c45406/200518_482bj515c0a2lb0abg0b60hl2h5l8_1134x440.jpg"},
            {url:"https://s10.mogucdn.com/mlcdn/c45406/200518_482bj515c0a2lb0abg0b60hl2h5l8_1134x440.jpg"},
            {url:"https://s10.mogucdn.com/mlcdn/c45406/200518_482bj515c0a2lb0abg0b60hl2h5l8_1134x440.jpg"},
            {url:"https://s10.mogucdn.com/mlcdn/c45406/200518_482bj515c0a2lb0abg0b60hl2h5l8_1134x440.jpg"},
            {url:"https://s10.mogucdn.com/mlcdn/c45406/200518_482bj515c0a2lb0abg0b60hl2h5l8_1134x440.jpg"}],
            userinfoss:[]
        }
    },
    created(){
        this.getUsers();
    },
    methods:{
        getUsers(){
            this.userinfoss = JSON.parse(localStorage.getItem("userInfo"))
        }
    }
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .projectTitle{
      font-family: "宋体";
      height: 140px;
      line-height: 140px;
      font-size: 68px;
      color: white;
      font-weight: bold;
      background-color: rgb(84, 92, 100);
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
//   section:nth-of-type(1){
//       height: 500px;
//   }
</style>