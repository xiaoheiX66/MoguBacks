<template>
    <div class="homelogin">
        <h1>蘑菇街后台管理系统</h1>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" style="display:flex;flex-direction:column;justify-content:center;flex:1">
            <el-form-item label="用户名" prop="username" style="height:60px">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密..码" prop="password">
                <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
             <el-form-item>
                <el-button type="primary" @click.prevent="onSubmit" native-type="submit" class="subutton">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name:"LoginWord",
    data(){
        return{
             form:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    methods:{
        onSubmit(){
            this.$refs.form.validate( async (valid)=>{
                if(valid){
                   const data = await this.$store.dispatch('login',this.form)
                //    console.log("this.form",this.form);
                //    console.log("result",data);
                   if(data.code===200){
                       console.log("登陆成功");
                    //    this.$store.commit('addRoute');
                       this.$router.push('/manager/home')
                   }else{
                       console.log("登陆失败");
                   }    
                }
            })
        },

    }
}
</script>
<style lang="scss">

.homelogin{
     position:absolute;left:50%;top:50%;border-radius: 10px;opacity: 0.8;transform:translate(-50%,-50%);width:700px;height:440px;border:5px solid #ddd;padding:15px 30px;
     display: flex;flex-direction:column;background-color:white;font-family: "宋体";
    h1{font-weight: normal;text-align:center;font-size:48px;}
    .subutton{
        width: 440px;
        height: 45px;
        line-height: 25px;
        margin-top: 30px;
        margin-left: -63px;
        font-size: 20px;
    }
}
</style>