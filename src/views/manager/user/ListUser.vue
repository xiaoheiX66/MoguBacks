<template>
    <div class="home">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
    <el-row :gutter="20" style="margin-top:30px">
  <el-col :span="12" style="text-align:left;">
      <el-button type="primary" style="font-size:18px;width:150px" @click="$router.push('/manager/user/addUser')">添加</el-button>
      </el-col>
  <el-col :span="12" style="text-align:right">
       <el-button type="danger" style="font-size:18px;width:150px">批量删除</el-button>
     </el-col>
</el-row>
<!-- 列表 -->
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
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="180">******
    </el-table-column>
    <el-table-column
      prop="controls"
      label="操作" v-slot="{row}">
      <el-button type="primary" style="width:80px;font-size:18px" @click="goto(row._id)">编辑</el-button>
      <el-button type="danger" @click="delsingle(row._id)" style="width:80px;font-size:18px">删除</el-button>
    </el-table-column>
  </el-table>
   <!-- 点击弹出内容 -->
    <el-dialog title="账户详情" :visible.sync="dialogFormVisible" style="marginTop:'20px'">
  <el-form :model="form">
    <el-form-item label="账户ID" :label-width="formLabelWidth">
      <el-input v-model="form._id" autocomplete="off" placeholder="账户ID" disabled></el-input>
    </el-form-item>
     <el-form-item label="账户名称" :label-width="formLabelWidth">
      <el-input v-model="form.username" autocomplete="off" placeholder="账户名称"></el-input>
    </el-form-item>
    <el-form-item label="账户密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off" placeholder="账户密码"></el-input>
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
      :total="total" style="margin-top:30px;float:left">
    </el-pagination>
    </div>
</template>

<script>
export default {
    name:"ListGoods",
     data() {
        const {page=1,size=5} = this.$route.query;
      return {
        tableData: [],
        total:0,
        page,
        size,
        dialogFormVisible:false,
        form:{
          _id:"",
          username:"",
          password:""
        }
      }
    },
     created(){
        this.getUserInfos();
    },
     methods: {
      tableRowClassName({ rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      async getUserInfos(){
          const {data} = await this.$request.get("/user/moreList",{params:{page:this.page,size:this.size}})
            console.log("data",data);
            const {total,msg}= data
            this.tableData = msg;
            this.total =total;
            // console.log("this.tabledata",this.tableData);
      },
     delsingle(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = this.$request.delete("/user/"+id)
          console.log("data删除结果",data);
          if(data.code===200){
            console.log("删除成功");
          }
           setTimeout(()=>{this.getUserInfos()},100)  
            this.$message({
            type: 'success',
            message: '删除成功!'
          });      
        }).catch(()=>{
          this.$message.error({message:"删除失败"})
        })
        
      },
      goto(_id){
        console.log("id",_id);
          // this.$router.push("/manager/user/editUser?id="+id)
          this.dialogFormVisible = !this.dialogFormVisible
          this.$request.get("/user/"+_id).then(({data})=>{
            console.log("单个人信息",data);
            this.form._id = data.info[0]._id
            this.form.username = data.info[0].username
            this.form.password = data.info[0].password
          }).catch((err)=>{console.log(err);})
        // console.log("id",id);
      },
      changeSize(size){
        this.size = size;
        this.getUserInfos();
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
    sureToEdit(values){
      const id = values._id
      const username = values.username
      const password = values.password
      console.log("提交的数据",values);
      this.$request.put("/user/"+id,{username,password}).then(({data})=>{
        console.log("更新结果",data);
        if(data.code===200){
          this.$message.success("更新成功")
        }else{
          this.$message.error("更新失败")
        }
      }).catch((err)=>{console.log(err);})
      this.dialogFormVisible = false
      setTimeout(()=>{this.getUserInfos()},500)
    }
    },
}
</script>

<style lang="scss">
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>