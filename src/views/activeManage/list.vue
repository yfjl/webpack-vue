<template>
<div>

  <div class="itop"> 
  <Row class="irow">
        <Col span="6"><Input v-model="LIST.activityNo" placeholder="活动名称/编号" style="width: 300px"></Input></Col>
        <Col span="6"><Input v-model="LIST.belongChannel" placeholder="活动对象" style="width: 300px"></Input></Col>
        <Col span="6"><Input v-model="LIST.groupNo" placeholder="组合名称/编号" style="width: 300px"></Input></Col>
        <Col span="6"><Input v-model="LIST.activityLeader" placeholder="负责人" style="width: 300px"></Input></Col>
    </Row>
    <Row class="irow">
        <Col span="6">
            <DatePicker type="datetime" @on-change="startTime" placeholder="开始时间" style="width: 300px"></DatePicker>

        </Col>
        <Col span="6"><DatePicker type="datetime" @on-change="endTime" placeholder="结束时间" style="width: 300px"></DatePicker></Input></Col>
        <Col span="6"><Input v-model="LIST.state" placeholder="状态" style="width: 300px"></Input></Col>
        <Col span="6">    <Button type="primary" shape="circle" style="width: 300px" @click="activityList" > 查询</Button></Col>
    </Row>
    </div>
  <el-table
    :data="tbList"
    style="width: 100%">
    
    <el-table-column
      fixed
      prop="activityNo"
      label="活动编号"
      width="250">
    </el-table-column>
    <el-table-column
      prop="activityName"
      label="活动名称"
      width="150">
    </el-table-column>
    
    <el-table-column
      label="活动说明"
      width="220">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.activityDetail }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">查看详情</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>


  <el-table-column
      prop="targetName"
      label="活动对象"
      width="150">
    </el-table-column>
    <el-table-column
      prop="groupName"
      label="规则组合名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="startTime"
      label="开始时间"
      width="160">
    </el-table-column>
    <el-table-column
      prop="endTime"
      label="结束时间"
      width="160">
    </el-table-column>
     <el-table-column
      prop="activityLeader"
      label="活动负责人"
      width="150">
    </el-table-column>


    <el-table-column

    width="150"
     label="活动链接">
     
      <template slot-scope="scope">
        <a :href="scope.row.activityUrl">{{scope.row.activityUrl}}</a>
      </template>
    </el-table-column>
    <el-table-column
      prop="remarks"
      label="备注"
      width="150">
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="150">
    </el-table-column>
    

    <el-table-column
    fixed="right"
    width="220"
     label="操作">
      <template slot-scope="scope">
        <!-- <router-link :to="{name:'/activeAdd',query:{activityNo:scope.row.activityNo}}">
          <el-button size="mini">编辑</el-button>
        </router-link>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tbList)">删除</el-button> -->
           <el-button size="mini" type="primary" @click="open(scope.$index, tbList)">启用</el-button>
              <el-button size="mini" type="danger" @click="stop(scope.$index, tbList)">禁用</el-button>
        <router-link :to="{name:'/activeAdd',query:{activityNo:scope.row.activityNo,copy:true}}">
          <el-button size="mini" type="success">
            复制
          </el-button>
        </router-link>
      </template>
    </el-table-column>
  </el-table>
  <Page :total="tbPage" :page-size="LIST.pageSize" @on-change="iNextPage" style="margin-top:20px;"></Page>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tbList: [],
        LIST:{
          current:1,
          pageSize:10,
          activityNo:'',
          belongChannel:'',
          groupNo:'',
          activityLeader:'',
          startTime:'',
          endTime:'',
          state:''
      },
      tbPage:0,
    
      }
      
    },
    mounted(){
      
       this.activityList()
    },
    methods: {
      startTime(t){
        this.LIST.startTime = t;
      },
      endTime(t){
        this.LIST.endTime = t;
      },
      iNextPage(i){
        this.LIST.current = i
        this.activityList()
      },
      async activityList(){
         let {data,page} =  await this.$api.activityList(this.LIST)
         this.tbList = data
         this.tbPage = page.total
      },


      handleEdit(index, rows) {
        // console.log(rows.activityNo)
        // return false;
          this.$router.push({
            name:'activeAdd',
            query:{
              activityNo:rows.activityNo
            }
          })
          // await this.$api.deleteActivity({activityNo:row.activityNo})
          // rows.splice(index, 1);
      },
      handleDelete(index, rows) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$api.deleteActivity({activityNo:rows[index].activityNo})
           rows.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
      },
         open(index, rows) {
        this.$confirm('此操作将启用该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$api.openActivity({activityNos:rows[index].activityNo,isUse:'0'}).then(()=>{
                this.activityList()
                this.$message({
                  type: 'success',
                  message: '启用成功!'
                });
           })        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          });          
        });
       
      },
      stop(index, rows) {
        this.$confirm('此操作将禁用该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$api.openActivity({activityNos:rows[index].activityNo,isUse:'1'}).then(()=>{
                this.activityList()
                this.$message({
                  type: 'success',
                  message: '禁用成功!'
                });
           })        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });          
        });
       
      },
  

    }
  }
</script>

<style lang="scss" scoped>
.itop{
 margin-bottom: 50px;
  .irow{
    margin-bottom: 20px;
  }
}
</style>







