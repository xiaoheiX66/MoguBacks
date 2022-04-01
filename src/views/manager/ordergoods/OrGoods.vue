<template>
    <div class="home">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加订单</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加界面 ，设想：输入人员，离开焦点进行人员检测，匹配到且相同的就是更新，不同的就是添加-->
        <!-- 设想：若所选人员为当下账号相关人员，则需要进行人员匹配和信息更新 -->
        <!-- 设想：若所选不为当下的相关人员，则需要为人员注册和现有内容添加 -->
        <!--  -->
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="margin-top:30px">
    <el-form-item label="购买人员" prop="firstname" style="margin-top:30px">
        <el-input v-model="form.firstname"></el-input>
    </el-form-item>
     <el-form-item label="登录密码" prop="password"  style="margin-top:40px">
        <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>
     <el-form-item label="输商品ID" prop="shopsid" style="margin-top:40px">
        <el-input v-model="form.shopsid"></el-input>
    </el-form-item>
    <el-form-item label="购买数量" prop="shopnums"  style="margin-top:40px">
        <el-input v-model="form.shopnums"></el-input>
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
          firstname: '',
          shopnums:'',
          shopsid:'',
          password:''
        },
         rules: {
        firstname: [{ required: true, message: "请输入购买者名称", trigger: "blur" }],
        nameTest: [{ required: true, message: "请输入购买者名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        shopnums: [{ required: true, message: "请输入购买数量", trigger: "blur" }],
        shopsid:[{required:true,msg:"请输入商品id",trigger:"blur"}]
      },
      }
     },
     methods:{
         addRegs(){
             console.log("我是用户不同注册者");
         },
         addSimply(){
             console.log("我是相同更新者");
         }
     }
}
</script>