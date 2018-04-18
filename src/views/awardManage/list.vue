<template>
<div>

  <div class="itop"> 

    <Row class="irow">
        <Col span="6"><Input v-model="LIST.awardNumLike" placeholder="奖励编号" style="width: 300px"></Input></Col>
        <Col span="6"><Input v-model="LIST.awardNameLike" placeholder="奖励名称" style="width: 300px"></Input></Col>
        <Col span="6">
          <Select  placeholder="奖励类型" style="width:300px;" v-model="LIST.awardType">
                    <Option v-for="(item,index) of code.awardType" :key="index" :value="item.key">{{item.value}}</Option>
                </Select>
        </Col>
        <Col span="6">    <Button type="primary" shape="circle" style="width: 300px" @click="activityList" > 查询</Button></Col>
    </Row>
    </div>
  <el-table
    :data="tbList"
    style="width: 100%">
    
    <el-table-column
      fixed
      prop="awardNum"
      label="奖励编号"
      width="250">
    </el-table-column>
    <el-table-column
      prop="awardName"
      label="奖励名称"
      width="150">
    </el-table-column>
    
  


  <el-table-column
      prop="awardTypeName"
      label="奖励类型"
      width="150">
    </el-table-column>
    <el-table-column
     
      label="奖励明细"
      width="150">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.awardDetail }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">查看详情</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="issueDate"
      label="投资期限"
      width="160">
    </el-table-column>
    <el-table-column
      prop="issueModeName"
      label="发放方式"
      width="160">
    </el-table-column>
       <el-table-column
      prop="stockInfo"
      label="库存信息"
      width="160">
    </el-table-column>
    
      <el-table-column
      label="备注"
      width="220">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.remark }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">查看详情</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
    fixed="right"
    width="120"
     label="操作">
      <template slot-scope="scope">
        <!-- <router-link :to="{name:'/awardAdd',query:{awardNum:scope.row.awardNum}}">
        <el-button
          size="mini"
          >编辑</el-button>
          </router-link>
        <el-button
        
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, tbList)">删除</el-button> -->
        </el-button>
         <router-link :to="{name:'/awardAdd',query:{awardNum:scope.row.awardNum,copy:true}}">
        <el-button
          size="mini"
          type="success">
          复制</el-button>
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
          pageNum:1,
          pageSize:10,
          awardNumLike:'',
          awardNameLike:'',
          awardType:''
          
      },
      tbPage:0,
    
       code:{
        awardType:[]
      }
      }
     
      
    },
    mounted(){
       this.activityList()
       this.init()
    },
    methods: {
      init(){
           this.$api.loadSelect({ code: "award_type" }).then(({ data }) => {
          this.code.awardType = data;
        });
      },
      iNextPage(i){
        this.LIST.pageNum = i
        this.activityList()
      },
      async activityList(){
         let {data,page} =  await this.$api.selectAwards(this.LIST)
         this.tbList = data
         this.tbPage = page.total

      },
      handleEdit(index, rows) {
        // console.log(rows.activityNo)
        // return false;
          this.$router.push({
            name:'activeAdd',
            query:{
              awardNum:rows.awardNum
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
           this.$api.award_delAward({awardNum:rows[index].awardNum}).then(({code,msg})=>{
             if(code===700){
               this.$message({
                type: 'error',
                message: msg
              });
             }else if(code===0){
                  rows.splice(index, 1);
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
             }
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
      }
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







