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
      prop="date"
      label="创建日期"
      width="180">
      2021/1/22
    </el-table-column>
    <el-table-column
      prop="name"
      :label="firstname"
      width="180">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="180">******
    </el-table-column>
    <el-table-column
      prop="shoptitle"
      label="商品信息"
      width="320">
    </el-table-column>
    <el-table-column
      prop="address"
      label="商品"
      width="350">
    </el-table-column>
    <el-table-column
      prop="controls"
      label="操作" v-slot="{row}" width="230">
      <el-button type="primary" style="width:80px;font-size:18px" @click="goto(row._id)">编辑</el-button>
      <el-button type="danger" @click="delsingle(row._id)" style="width:80px;font-size:18px">删除</el-button>
    </el-table-column>
  </el-table>
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
        tableData: [
         {
          date: '2016-05-04',
          name: '王小虎',
           password:"wonendie",
          address: '上海市普陀区金沙江路 1518 弄',
          shoptitle:"小黄人"
        },
        ],
        total:0,
        page,
        size
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
     console.log("joo",this.tableData);
    }
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