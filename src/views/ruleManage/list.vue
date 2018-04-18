<template>
  <div class="rule-list"> 
    <el-form ref="ruleForm" v-model="ruleForm">
        <el-row :gutter="15">
          <el-col :span="8">
            <el-input v-model="ruleForm.ruleNo" size="small" placeholder="规格编号" @keyup.native="handlerSpace"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="ruleForm.ruleName" size="small" placeholder="规格名称" @keyup.native="handlerSpace"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button size="small" type="primary" @click="handleQueryRule">查询</el-button>
          </el-col>
        </el-row>
        <!-- el-row -->
    </el-form>
    <!-- form表单 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column fixed prop="groupNo" label="组合编号">
      </el-table-column>
      <el-table-column prop="groupName" label="组合名称">
      </el-table-column>
      <el-table-column label="使用该组合活动">
        <template scope="scope">
          {{ scope.row.activeNames.toString() }}
        </template>
      </el-table-column>
      <el-table-column label="功能点">
        <template scope="scope">
          {{ scope.row.ruleGroupList.length === 0 || scope.row.ruleGroupList[0].funName === null ? '' : scope.row.ruleGroupList[0].funName}}
        </template>
      </el-table-column>
      <el-table-column  label="一级奖励">
        <template scope="scope">
          {{scope.row.ruleGroupList.length === 0 || scope.row.ruleGroupList[0].rewardnoOneNames === null ? '' : scope.row.ruleGroupList[0].rewardnoOneNames.toString() }}
        </template>
      </el-table-column>
      <el-table-column label="二级奖励">
        <template scope="scope">
          {{scope.row.ruleGroupList.length === 0 || scope.row.ruleGroupList[0].rewardnoTwoNames === null ? '' : scope.row.ruleGroupList[0].rewardnoTwoNames.toString()}}
        </template>
      </el-table-column>
      <el-table-column label="三级奖励">
        <template scope="scope">
          {{scope.row.ruleGroupList.length === 0 || scope.row.ruleGroupList[0].rewardnoThreeNames === null ? '' : scope.row.ruleGroupList[0].rewardnoThreeNames.toString()}}
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <!-- <p v-popover:popover1>{{ scope.row.remark }}</p>
          <el-popover
            ref="popover1"
            placement="top"
            trigger="hover"
            :content="scope.row.remark">
          </el-popover> -->
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.remark }}</p>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.remark }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column fixed="right"  prop="date" label="操作" width="200">
        <template scope="scope">
          <router-link :to="{name:'/ruleAdd',query:{groupNo:scope.row.groupNo}}">
            <el-button type="default" size="mini" >编辑</el-button>
          </router-link>
          <el-button type="danger" size="mini" @click="handlerDelete(scope.$index,tableData)">删除</el-button>
          <router-link :to="{name:'/ruleAdd',query:{groupNo:scope.row.groupNo, rulecopy:true}}">
            <el-button type="success" size="mini" >复制</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- table信息报表 -->
    <Page :total="tbPage" :page-size="LIST.pageSize" @on-change="iNextPage" style="margin-top:20px;"></Page>
    <!-- 报表分页 -->
  </div>
</template>

<script>

export default {
  data () {
    return {
      ruleForm: {
        ruleNo: '',
        ruleName: ''
      },
      tableData: [],
      LIST:{
        pageNum:1,
        pageSize:10,
        groupName: '',
        groupNo: '',
        groupNoName: ''
      },
      tbPage:0,
    }
  },
  created () {
    this.ruleList()
  },
  methods: {
    // 对输入空格的处理
    handlerSpace(ev) {
      (ev.target.value = ev.target.value.replace(/\s+/g,'')) || (ev.srcElement.value = ev.srcElement.value.replace(/\s+/g,''))
    },
    // 删除组合
    handlerDelete (index, rows) {
      
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(action => {
        this.$api.del_rule({groupNo: rows[index].groupNo}).then(res => {
          if (res.code === 400) this.$message({message: res.msg,type: 'error'})
          if (res.code === 0) {this.$message({message: '删除成功！',type: 'success'}),this.ruleList()}
         })
      })
    },
    // 处理查询
    handleQueryRule () {
      this.LIST.groupNo = this.ruleForm.ruleNo
      this.LIST.groupName = this.ruleForm.ruleName
      this.ruleList()
    },
    iNextPage(i){
      this.LIST.pageNum = i
      this.ruleList()
    },
    async ruleList () {
      this.tableData = []
      let {data, page} =await this.$api.rule_list(this.LIST)
      this.tableData = data
      this.tbPage = page.total
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-list{
  .el-form{
    margin: 0 0 50px 0;
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      .el-button--small{
        padding: 9px 55px;
      }
    }
  }

  .el-table__row{
    .name-wrapper{
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
    .el-button{
      margin-bottom: 15px;
    }
    .el-button--danger{
      margin-bottom: 0;
    }
  }
  .el-pagination{
    margin-top: 20px;
  }
}

</style>