<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name:"App",
 data(){
   return {
     isRouterAiver:true,
     showAllData:[]
   }
 },
 created(){
   this.getAllData();
 },
  methods:{
    async getAllData(){
      const data = await this.$request.get("/goods/list",{params:{page:1,size:150}})
      this.showAllData = data.data.msg;
      localStorage.setItem('datalistall',JSON.stringify(this.showAllData))
    // console.log("大手印",data.data.msg);
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
   background: url(https://pic2.zhimg.com/c48fdcda074ad682772ea82c04750bc0_r.jpg) no-repeat;
    background-size: cover;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
