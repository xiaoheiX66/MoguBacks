<template>
    <div class="home">
       <section v-if="isHaveData">
            <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>更新用户</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加界面 -->
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="margin-top:30px">
  <el-form-item label="当前账号" prop="username" style="margin-top:30px">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="当前密码" prop="password"  style="margin-top:40px">
    <el-input v-model="form.password" type="text"></el-input>
  </el-form-item>
  
  <el-form-item style="display:flex;margin-top:30px">
    <el-button type="primary" @click="onSubmit" size="medium" style="width:1650px;font-size:17px">修改</el-button>
  </el-form-item>
</el-form>
       </section>
       <section class="velsedata" v-else>
          <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>更新用户</el-breadcrumb-item>
        </el-breadcrumb>
          <el-empty description="暂无信息"></el-empty>
       </section>
    </div>
</template>

<script>
export default {
    name:"EditGoods",
     data() {
      return {
        form: {
          username:'',
          password:''
        },
         rules: {
        username: [{ required: true, message: "请输入账号名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      isHaveData:true
      }
    },
    created(){
         this.getFromData();
          let id = this.$route.query.id
          // 判断当前是否有id值，若有则显示false，否则为true
          if(typeof(id)==='undefined'){
              this.isHaveData = false
          }else{
              this.isHaveData = true
          }
    },
    methods: {
      onSubmit() {
         this.$refs.form.validate(async valid => {
        if (valid) {
         let id = this.$route.query.id
         const {data} = await this.$request.put("/user/"+id,this.form)
         console.log("更新后的data",data);
         if(data.code===200){
             this.$message({message:"更新成功",type:"success"})
             setTimeout(()=>{this.form.username="";this.form.password=""},100)
         }else{
             this.$message.error({message:"更新失败"});
         }
        }
        })
      },
     async getFromData(){
          let id = this.$route.query.id
         const {data} = await this.$request.get("/user/"+id)
        console.log("出书啊",data.info[0]);
        this.form.username = data.info[0].username;
        this.form.password = data.info[0].password;
      },
      }
}
</script>

<style lang="scss" scoped>
  .velsedata{
    display: flex;
    flex-direction: column;
  }
</style> 