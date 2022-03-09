<template>
    <div class="home">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加订单</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加界面 -->
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="margin-top:30px">
    <el-form-item label="购买人员" prop="username" style="margin-top:30px">
        <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="登录密码" prop="password"  style="margin-top:40px">
        <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>
     <el-form-item label="输入SpId" prop="shopsid"  style="margin-top:40px">
        <el-input v-model="form.shopsid"></el-input>
    </el-form-item>
    
    <el-form-item style="display:flex;margin-top:30px">
        <el-button type="primary" size="medium" style="width:1650px;font-size:17px">添加</el-button>
    </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
    name:"OrGoods",
     data() {
      return {
        form: {
          username: '',
          password:'',
          shopsid:''
        },
         rules: {
        username: [{ required: true, message: "请输入购买者名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        shopsid:[{required:true,msg:"请输入商品id",trigger:"blur"}]
      },
      }
     }
}
</script>