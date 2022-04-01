<template>
    <div class="home">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 列表 -->
        <template>
   <el-table
   :data="tableData"
    style="width: 100%;margin-top:70px"
    :row-class-name="tableRowClassName">
    <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" type="index" class="indexFrom"></el-table-column>
    <el-table-column
      prop="_id"
      label="账户ID"
      width="330">
    </el-table-column>
    <el-table-column
      prop="firstname"
      label="账户名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="shopsid"
      label="商品ID"
      width="330">
    </el-table-column>
    <el-table-column
      prop="shopnums"
      label="购买数量"
      width="250">
    </el-table-column>
    <el-table-column
      prop="controls"
      label="操作" v-slot="{row}" width="230">
      <el-button type="primary" style="width:80px;font-size:18px" @click="goto(row.shopsid,row.firstname,row.shopnums)">编辑</el-button>
      <!-- 删除 -->
   <el-button type="danger" @click="delsingle(row._id)" style="width:80px;font-size:18px">删除</el-button>
    </el-table-column>
  </el-table>
  <!-- 点击编辑弹出内容 -->
  <el-dialog title="订单详情" :visible.sync="dialogFormVisible" style="marginTop:'30px'">
  <el-form :model="form">
    <el-form-item label="账户名称" :label-width="formLabelWidth">
      <el-input v-model="form.firstname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="图片地址" :label-width="formLabelWidth">
      <el-input v-model="form.shopimgs" type="textarea" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="商品信息" :label-width="formLabelWidth">
      <el-input v-model="form.shoptitle" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="商品数量" :label-width="formLabelWidth">
      <el-input v-model="form.shopnums" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消 编 辑</el-button>
    <el-button type="primary" @click="sureToEdit(form)">确 定 编 辑</el-button>
  </div>
</el-dialog>
  <!-- 分页器 -->
   <el-pagination
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="page*1"
      :page-sizes="[5, 10, 15, 30, 50]"
      :page-size="size"
      layout="total, prev, pager, next, sizes"
      :total="tableData.length" style="margin-top:30px;float:left">
    </el-pagination>
  </template>
    </div>
</template>

<script>
export default {
    name:"OrderLists",
      data() {
           const {page=1,size=5} = this.$route.query;
      return {
        tableData: [],
        dialogFormVisible:false,
        total:0,
        page,
        size,
        form: {
         firstname:"",
         shoptitle:"",
         shopnums:"",
         shopimgs:""
        },
        formLabelWidth: '120px',
      }
    },
    created(){
      this.getdata();
    },
    methods: {
      tableRowClassName({rowIndex}) {
        if (rowIndex%2 === 1) {
          return 'warning-row';
        } else{
          return 'success-row';
        }
      },
      changeSize(size){
        this.size = size;
        // this.getUserInfos();
        // this.$route.query.size = size;
        this.$router.replace({
            // path:'/manage/goods/list',
            query:{...this.$route.query,size}
        })
    },
    changePage(page){
        this.page = page
        this.getUserInfos();
        this.$router.replace({
            // path:'/manage/goods/list',
            query:{...this.$route.query,page}
        })
    },
    async getdata(){
      let {data} = await this.$request.get("/orders/lists",{
        params: {
          page: this.page,
          size: this.size
        }
      })
     this.tableData = data.userinfos
    //  console.log("joo",this.tableData);
    },
    goto(id,firstname,shopnums){
      // 编辑区显隐
      this.dialogFormVisible = !this.dialogFormVisible;
      this.form.firstname = firstname;
      this.form.shopnums = shopnums;
        this.$request.get("/goods/"+id).then(({data})=>{
          // console.log("当前商品",data);
          this.form.shoptitle = data.msg[0].title;
          this.form.shopimgs = data.msg[0].img;
        }).catch((err)=>{console.log(err);})
    },
    deleteData(){
      this.$request.delete("/prders/")
    },
    delsingle(id){
      // console.log("要删除的id值",id);
      this.$confirm('确认删除此订单？')
          .then(()=>{
            this.$request.delete("/orders/"+id).then((data)=>{
              console.log("删除结果",data);
              if(data.code===200){
                 this.$message({
            type: 'success',
            message: '删除成功!'
          });     
          this.getdata()
              }else{
                 this.$message({
            type: 'error',
            message: '失败!'
          });     
              }
            })
          })
          .catch((err)=>{console.log(err);});
      
    },
    // 确认编辑
    // sureToEdit(value){
    //   this.dialogFormVisible = !this.dialogFormVisible;
    //   // console.log("当前需要编辑后的内容·",value.firstname);
    //   const {data} = this.$request.put("/orders/"+id,{})
    // }
    },
}
</script>

<style scoped>
.home{
    width: 100%;
}
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>