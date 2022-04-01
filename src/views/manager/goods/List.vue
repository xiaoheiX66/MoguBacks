<template>
    <div class="home" style="padding:10px 30px 0px 10px">
      <div class="extraTabs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="searchBox">
      <el-row :gutter="20">
    <el-col :span="9">
      <div class="grid-content bg-purple" style="margin-top: 10px;">
  <el-input placeholder="请输入内容" v-model="input2" @change="searchAction($event)">
    <template slot="append">搜索</template>
  </el-input>
      </div></el-col>
    <el-col :span="12" style="margin-top: 10px;float:right">
     <el-button class="changeButton" type="primary" plain round>导入</el-button>
     <el-button class="changeButton" type="primary" plain round>导出</el-button>
     <el-button class="changeButton" type="primary" round>批量上架</el-button>
     <el-button class="changeButton" type="primary" round>批量下架</el-button>
     <el-button class="changeButton" type="danger" round>批量删除</el-button>
      <div class="grid-content bg-purple">
      
      </div></el-col>
  </el-row>
    </div>
      </div>
         <el-table
      :data="tableData"
      style="width: 100%;">
     <template>
        <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" type="index" class="indexFrom"></el-table-column>
      <el-table-column
        width="120"
        prop="img"
        label="图片"
        v-slot="{row}"
    >
        <el-image
        style="width: 60px; height: 60px"
        :src="row.img"></el-image>
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品信息"
        v-slot="{row}"
        >
        <h5>{{row.title}}</h5>
        <p class="price"><del>￥999</del><span class="price11">￥{{row.price}}</span></p>
      </el-table-column>
      <el-table-column 
      label="____是否上架"
      v-slot="{row}"
      class="isShangjia"
      width="420"
      >
        <p style="margin-left:60px">{{row.hasSimilarity?"售卖中":"已下架"}}</p>
        <el-button type="primary" size="50px" style="margin-left:60px" @click="changeStateBu(row._id)">{{isUnderCarrige?"上架":"下架"}}</el-button>
      </el-table-column>
       <el-table-column 
       label="已售"
       v-slot="{row}"
       >
       <p>{{row.sale}}</p>
       </el-table-column>
      <el-table-column
        label="操作"
        width="280" style="display:flex;" v-slot="{row}">
          <el-row class="controlSs"  >
            <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="goto(row._id)">编辑</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="isdelete(row._id)">删除</el-button></el-row>
      </el-table-column>
     </template>
    </el-table>
    <!-- 点击弹出内容 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" style="marginTop:'20px'">
  <el-form :model="form">
    <el-form-item label="商品名称" :label-width="formLabelWidth">
      <el-input v-model="form.title" autocomplete="off" placeholder="商品名称"></el-input>
    </el-form-item>
     <el-form-item label="商品分类" :label-width="formLabelWidth">
      <el-input v-model="form.category" autocomplete="off" placeholder="商品分类"></el-input>
    </el-form-item>
    <el-form-item label="图片地址" :label-width="formLabelWidth">
      <el-input v-model="form.img" type="textarea" autocomplete="off" placeholder="图片地址"></el-input>
    </el-form-item>
     <el-form-item label="现价/原价/销量/已售" :label-width="formLabelWidth">
      <el-input v-model="form.formalPrice" autocomplete="off" placeholder="原价"></el-input>
      <el-input v-model="form.price" autocomplete="off" placeholder="现价"></el-input>
      <el-input v-model="form.cfav" autocomplete="off" placeholder="销量"></el-input>
      <el-input v-model="form.sale" autocomplete="off" placeholder="已售"></el-input>
    </el-form-item>
     <el-form-item label="商品描述" :label-width="formLabelWidth">
      <el-input v-model="form.desc" autocomplete="off" placeholder="商品描述"></el-input>
    </el-form-item>
     <el-form-item label="是否上架" :label-width="formLabelWidth">
      <el-input v-model="form.hasSimilarity" autocomplete="off" placeholder="是否上架"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消 编 辑</el-button>
    <el-button type="primary" @click="sureToEdit(form)">确 定 编 辑</el-button>
  </div>
</el-dialog>
    <el-pagination
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="page*1"
      :page-sizes="[5, 10, 15, 30, 50]"
      :page-size="size"
      layout="total, prev, pager, next, sizes"
      :total="total">
    </el-pagination>
    </div>
</template>

<script>
export default {
    name:"ListGoods",
    data(){
         const {page=1,size=10} = this.$route.query;
        return{
            tableData:[],
            isUnderCarrige:true,
            dialogFormVisible:false,
            searchResult:[],
            newInfosAll:[],
            page,
            size,
            total:0,
            input2:'',
             form: {
               tradeItemId:7,
         title:"",
        img:"",
        category: "时尚clthes",
        itemtype: "",
        hasSimilarity:false,
        cfav:"",
        price:"",
        sale:"",
        formalPrice:'￥999'
        },
        }
    },
    created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data } = await this.$request.get("/goods/list", {
        params: {
          page: this.page,
          size: this.size
        }
      });
// console.log("data",data);
      const { msg, total } = data;

      this.tableData = msg;
      this.total = total;
      // console.log("tabaledata",this.tableData);
    },
    changeSize(size){
        this.size = size;
        this.getData();
        // this.$route.query.size = size;
        this.$router.replace({
            // path:'/manage/goods/list',
            query:{...this.$route.query,size}
        })
    },
   showindex(index){
     console.log("index",index);
   },
    changePage(page){
        this.page = page
        this.getData();
        this.$router.replace({
            // path:'/manage/goods/list',
            query:{...this.$route.query,page}
        })
    },
     isdelete(id) {
        this.$confirm('不要宝宝了吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除
          console.log("id",id);
        const data = this.$request.delete("/goods/"+id)
        // console.log("点击想要删除的isdata",data);
        if(data.code===200){
           console.log("删除成功");
        }
        setTimeout(()=>{ this.getData();},100)
         this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(()=>{
           this.$message.error({message:"删除失败!"})
        })
      },
      goto(id){
        console.log("id",id);
        localStorage.setItem("singleupdateId",JSON.stringify(id))
        // this.$router.push("/manager/goods/edit?id="+id)
        this.dialogFormVisible = !this.dialogFormVisible
        this.$request.get("/goods/"+id).then(({data})=>{
          console.log("详情id",data);
          this.form.title = data.msg[0].title
    this.form.desc = data.msg[0].tradeItemId
    this.form.hasSimilarity = data.msg[0].hasSimilarity
    this.form.cfav =data.msg[0].cfav
    this.form.price =data.msg[0].price
    this.form.sale =data.msg[0].sale
    this.form.img = data.msg[0].img
        }).catch((err)=>{console.log(err);})
      },
      // 上下架
      async changeStateBu(id){
        this.isUnderCarrige = !this.isUnderCarrige
        const data = await this.$request.patch("/goods/patchs/"+id,{hasSimilarity:this.isUnderCarrige})
        setTimeout(()=>{this.getData()},100)
        console.log("当前id值",id);
        console.log("上下架",data);
      },
      // 搜索
      searchAction(){
        const inputValue = this.input2;
        this.newInfosAll = JSON.parse(localStorage.getItem('datalistall'))
        this.searchResult = this.newInfosAll.filter((item)=>{
          // console.log("子元素",typeof(item.title));
          if(item.title.includes(inputValue)){
            return item;
          }
        })
        this.tableData = this.searchResult;
        this.input2=""
        console.log("搜索后的结果",this.searchResult);
      },
      sureToEdit(values){
        console.log("表单数据",values);
        const id = JSON.parse(localStorage.getItem("singleupdateId"))
        this.$request.put("/goods/"+id,this.form).then(({data})=>{
          console.log("更新结果",data);
          if(data.code===200){
            this.$message.success("更新成功")
          }else{
            this.$message.error("更新失败")
          }
        }).catch((err)=>{console.log(err);})
        setTimeout(()=>{this.getData()},500)
          this.dialogFormVisible = false;
      }
  }
}
</script>

<style lang="scss" scoped>
.home{
    width: 93%;
    font-family: "宋体";
    .controlSs{
        display: flex;
        margin-right: 24px;
    }
    .price11{
        color: red;
        font-family: "宋体";
        font-weight: bold;
    }
    .extraTabs{
      height: 86px;
      display: flex;
      flex-direction: column;
      .searchBox{
        flex: 1;
        margin-top: 10px;
      }
    }
    .changeButton{
      width: 127px;
    }
}
</style>