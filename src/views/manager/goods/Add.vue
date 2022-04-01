<template>
    <div class="homes">
      <div class="extraTag">
       <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
</el-breadcrumb>
      </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="商品名称" prop="title">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="商品分类" prop="category" style="display:flex">
    <el-select v-model="form.category" placeholder="请选择分类">
      <el-option v-for="item in categories" :key="item._id" :label="item.text" :value="item.text"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="商品图片" >
<el-input v-model="form.img" type="textarea" placeholder="商品图片地址"></el-input>
    </el-form-item>
     <el-form-item label="原价">
    <el-col :span="4">
      <el-input v-model.number="form.formalPrice" placeholder="原价"></el-input>
    </el-col>
    <el-col class="line" :span="2" style="text-align:right;padding-right:5px;">现价</el-col>
    <el-col :span="4">
      <el-input v-model="form.price" placeholder="现价"></el-input>
    </el-col>
     <el-col class="line" :span="2" style="text-align:right;padding-right:5px;">销量</el-col>
    <el-col :span="4">
      <el-input v-model.number="form.cfav" placeholder="销量"></el-input>
    </el-col>
     <el-col class="line" :span="2" style="text-align:right;padding-right:5px;">已售</el-col>
    <el-col :span="4">
      <el-input v-model.number="form.sale" placeholder="已售"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="商品描述" prop="title">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item label="上架" prop="hasSimilarity" style="display:flex">
    <el-switch v-model="form.hasSimilarity"></el-switch>
  </el-form-item>
  <el-form-item style="display:flex">
    <el-button type="primary" @click="onSubmit(form)" size="medium" style="width:1650px;font-size:17px">添加</el-button>
  </el-form-item>
</el-form>
<!-- <el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog> -->
    </div>
</template>
<script>
export default {
  name: "GoodsAdd",
  data() {
    return {
        goodsid:'',
      form: {
        title: "",
        img:"",
        category: "鞋子",
        desc:"备货中...",
        hasSimilarity: false,
        cfav:"",
        price:'',
        sale:"",
        formalPrice:'999'
      },
      categories:[{_id:"1",text:"上衣"},{_id:"2",text:"裙子"},{_id:"3",text:"裤子"},{_id:"4",text:"内衣"},{_id:"5",text:"鞋子"}
        ,{_id:"6",text:"包包"},{_id:"7",text:"男友"},{_id:"8",text:"母婴"},{_id:"9",text:"家居"}],
      rules: {
        goods_name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        category: [{ required: true, message: "请选择分类", trigger: "blur" }]
      },
      uploadData: {},
      uploadHeader: {},
    };
  },
  inject:['reload'],
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  created(){
     
  },
  methods: {
    onSubmit(values) {
      console.log("当前添加的内容",values);
      // 添加商品 -> 拿到商品id -> 上传图片
      this.$refs.form.validate(async valid => {
        if (valid) {
          const {data} = await this.$request.post('/goods/insert',this.form) 
          console.log('data',data)
          this.goodsid = data.msg[data.msg.length-1]._id

          // 上传图片
          // this.$refs.uploadForm.submit();
          if(data.code===200){
             this.$message({
                message: '添加成功',
                 type: 'success'
                });
                this.reload();
          }else{
            this.$message.error('添加失败');
          }
        }
      });
    },
    async uploadFile(fileInfo){
        const fData = new FormData();
        fData.set('goods',fileInfo.file)
        fData.set('userid',this.userInfo._id)
        fData.set('goodsid',this.goodsid)
        const {data} = await this.$request.post('/upload/goods',fData)
        console.log("上传后data",data);
    },
  }
};
</script>

<style lang="scss" scoped>
.homes{
  font-family: "宋体";
  .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label{
    display: flex;
  }
  .extraTag{
  height: 50px;
  display: flex;
  padding: 0px 10px;
  }
}
</style>
