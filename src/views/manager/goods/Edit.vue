<template>
    <div class="homes">
       <section v-if="isHaveData">
          <div class="extraTag">
       <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>更新商品</el-breadcrumb-item>
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
    <el-form-item label="商品图片" style="display:flex">
        <el-upload
            ref="uploadForm"
            name="goods"
            :action="$host+'/api/upload/goods'"
            list-type="picture-card"
            :auto-upload="false"
            :http-request="uploadFile"
            >
            <!--  v-slot:file="{file}" -->
                <i class="el-icon-plus"></i>
                <template>
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="form.img" alt=""
                        style="position:absolute;left:180px;top:0px"
                    >
                </template>
            </el-upload>

    </el-form-item>
     <el-form-item label="原价">
    <el-col :span="4">
      <el-input v-model.number="form.formalPrice" placeholder="原价"></el-input>
    </el-col>
    <el-col class="line" :span="2" style="text-align:right;padding-right:5px;">现价</el-col>
    <el-col :span="4">
      <el-input v-model.number="form.price" placeholder="现价"></el-input>
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
  <el-form-item label="商品描述" prop="desc">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item label="上架" prop="hasSimilarity" style="display:flex">
    <el-switch v-model="form.hasSimilarity"></el-switch>
  </el-form-item>
  <el-form-item style="display:flex">
    <el-button type="primary" @click="onSubmit" size="medium" style="width:1650px;font-size:17px">添加</el-button>
  </el-form-item>
</el-form>
       </section>
       <section class="velsedata" v-else>
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>更新商品</el-breadcrumb-item>
      </el-breadcrumb>
         <el-empty description="暂无信息" style="width:70%"></el-empty>
       </section>
    </div>
</template>

<script>
export default {
    name:"EditGoods",
     data() {
    return {
        goodsid:'',
        getFromIdsData:[],
      form: {
        title:"",
        img:"",
        category: "鞋子",
        desc: "",
        hasSimilarity:false,
        cfav:"",
        price:"",
        sale:"",
        formalPrice:'999'
      },
      categories:[{_id:"1",text:"上衣"},{_id:"2",text:"裙子"},{_id:"3",text:"裤子"},{_id:"4",text:"内衣"},{_id:"5",text:"鞋子"}
        ,{_id:"6",text:"包包"},{_id:"7",text:"男友"},{_id:"8",text:"母婴"},{_id:"9",text:"家居"}],
      rules: {
        tile: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }]
      },
      uploadData: {},
      uploadHeader: {},
      isHaveData:true,
    };
  },
  inject:['reload'],
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  created(){
      this.getData();
      let id = this.$route.query.id;
       if(typeof(id)==='undefined'){
              this.isHaveData = false
          }else{
              this.isHaveData = true
          }
  },
  methods:{
       async getData() {
    let id = this.$route.query.id
    const { data } = await this.$request.get("/goods/"+id);
    this.getFromIdsData = data.msg[0]
    console.log("idxxxxdata",data.msg[0]);
    this.form.title = data.msg[0].title
    this.form.desc = data.msg[0].tradeItemId
    this.form.hasSimilarity = data.msg[0].hasSimilarity
    this.form.cfav = data.msg[0].cfav
    this.form.price = data.msg[0].price
    this.form.sale = data.msg[0].sale
    this.form.img = data.msg[0].img
    },
    async onSubmit(){
        let id = this.$route.query.id;
        const {data} = await this.$request.put("/goods/"+id,this.form)
        console.log("更新后的结果",data);
        if(data.code===200){
             this.$message({message:"更新成功",type:"success"})
         }else{
             this.$message.error({message:"更新失败"});
         }
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
}
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
  img{
      width: 145px;
      height: 145px;
  }
  .velsedata{
    display: flex;
    flex-direction: column;
  }
}
</style>