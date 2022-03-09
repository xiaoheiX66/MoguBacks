<template>
    <div class="home">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加用户</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加界面 -->
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="margin-top:30px">
  <el-form-item label="账号名称" prop="username" style="margin-top:30px">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="输入密码" prop="password"  style="margin-top:40px">
    <el-input v-model="form.password" type="password"></el-input>
  </el-form-item>
  
  <el-form-item style="display:flex;margin-top:30px">
    <el-button type="primary" @click="onSubmit" size="medium" style="width:1650px;font-size:17px">添加</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
export default {
    name:"AddGoods",
    data() {
      return {
        form: {
          username: '',
          password:''
        },
         rules: {
        username: [{ required: true, message: "请输入账号名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      }
    },
    inject:['reload'],
    methods: {
      onSubmit() {
         this.$refs.form.validate(async valid => {
        if (valid) {
          const {data} = await this.$request.post('/user/addUser',this.form) 
            if(data.code===200){
                 this.$message({
                message: '添加成功',
                 type: 'success'
                });
            // this.reload();
            setTimeout(()=>{
              this.form.username=""
              this.form.password=""
            },100)
            }else{
               this.$message.error('添加失败');
            }
        }
        })
      }
    }
}
</script>

<style lang="scss" scoped>
.home{
    display: flex;
    flex-direction: column;
}
</style>