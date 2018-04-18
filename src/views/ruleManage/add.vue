<template>
  <div class="ruleAdd">
      <!-- 规则组合添加 -->
      <el-form :model="ruleAddForm">
        <el-form-item v-if="isCopy" class="form-type" label="组合编号：" label-width="120px">
          <el-input v-model="ruleAddForm.groupNumber" type="text" placeholder="请输入字母，不区分大小写"></el-input>
        </el-form-item>
        <el-form-item v-else class="form-type" label="组合编号：" label-width="120px">
          <el-input v-model="ruleAddForm.groupNo" :disabled="groupNo" type="text" placeholder="请输入字母，不区分大小写"></el-input>
        </el-form-item>
        <!-- 组合编号 -->
        <el-form-item class="form-type" label="组合名称" label-width="120px">
          <el-input v-model="ruleAddForm.groupName" type="text" placeholder="组合名称"></el-input>
        </el-form-item>
        <!-- 组合名称 -->
        <el-form-item class="form-type" label="备注" label-width="120px">
         <el-input v-model="ruleAddForm.remark" type="textarea" placeholder="备注"></el-input>
        </el-form-item>
        <!-- 组合名称 -->
        <el-form-item>
          <el-table :data="tableData">
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column label="功能名称">
              <template slot-scope="scope">
                <el-input placeholder="功能名称" type="text" @focus="RuleGroupList('gnmc',$event,scope.$index)" name="functionNo" :value="scope.row.funName === '' ? '' : scope.row.funName" ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="一级奖励名称">
              <template slot-scope="scope">
                <el-input placeholder="一级奖励名称" type="text" @focus="RuleGroupList('jlmc',$event,scope.$index)" name="rewardnoOne"  :value="handlerValue(scope.row.rewardnoOneNames)"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="二级奖励名称">
              <template slot-scope="scope">
                <el-input placeholder="二级奖励名称" type="text" @focus="RuleGroupList('jlmc',$event,scope.$index)" name="rewardnoTwo" :value="handlerValue(scope.row.rewardnoTwoNames)"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="三级奖励名称">
              <template slot-scope="scope">
                <el-input placeholder="三级奖励名称" type="text" @focus="RuleGroupList('jlmc',$event,scope.$index)" name="rewardnoThree" :value="handlerValue(scope.row.rewardnoThreeNames)"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  class="colorDanger"
                  type="text"
                  size="small"
                  @click="handlerDeleteGroup(scope.$index,scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 规则报表 -->
        </el-form-item>
      </el-form>
      <!-- 规则表单 -->
      <div class="rule_Form_Info_Operate">
        <el-button size="small" type="primary" @click="handlerAdd">新增组合</el-button>
        <el-button size="small" type="warning">重&nbsp;&nbsp;置</el-button>
        <el-button size="small" type="success" @click="handlerSave">保&nbsp;&nbsp;存</el-button>
      </div>
      <!-- 表单数据操作 -->

      <el-dialog :title="title" :visible.sync="DialogVisible">
        <el-form>
          <el-input v-show="yips.types === 'gnmc'" type="text" size="small" v-model="gObject.funNameOrNo" placeholder="请输入功能名称或编号进行查询">
            <el-button type="default" slot="append" icon="el-icon-search" @click="getRuleList"></el-button>
          </el-input>
          <el-input v-show="yips.types === 'jlmc'" type="text" size="small" v-model="gObject.awardNameOrNum" placeholder="请输入奖励名称或编号进行查询">
            <el-button type="default" slot="append" icon="el-icon-search" @click="getRuleList"></el-button>
          </el-input>
        </el-form>
        <!-- 报表 -->
        <el-table :data="groupTableData"  max-height="500">
          <template v-for="(columns, index) in tableColumn">
              <el-table-column v-if="columns.prop === 'ID'"
                :key="index"
                :label="columns.label"
                :type="columns.type"
                :formatter="columns.formatter"
                >
                <template slot-scope="scope">
                  <p v-if="yips.types === 'gnmc'"><el-radio v-model="radioCheck" :label="scope.row.funNum"></el-radio></p>
                  <p v-else><el-checkbox v-model="checkboxList" :label="scope.row.awardNum"></el-checkbox></p>
                </template>
              </el-table-column>

              <el-table-column v-else
                :key="index"
                :prop="columns.prop"
                :label="columns.label"
                :type="columns.type"
                :formatter="columns.formatter"
                >
              </el-table-column>
          </template>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page=gObject.pageNum
          @current-change="handleCurrentChange"
          :total="total">
        </el-pagination>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="setGroupName">确定</el-button>
          <el-button size="small" @click="DialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <!-- 对话框 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      DialogVisible: false,
      title: '功能选择',
      ruleAddForm: {
        groupNumber:'',
        groupNo: '',
        groupName: '',
        remark: ''
      },
      tableData: [],
      // 弹窗参数
      groupTableData: [],
      tableColumn: [],
      radioCheck: '',
      checkboxList: [],
      gObject: {
        pageNum: 1,
        pageSize: 10,
        current: 1,
        funNameOrNo: '',
        awardNameOrNum: ''
      },
      total: 0,
      yips: {
        target: '',
        types: '',
        _index: ''
      }
    }
  },
  computed: {
    groupNo() {
      const num = this.$route.query.groupNo
      if (!num) {
        this.ruleAddForm = { groupNumber:'',  groupNo: '', groupName: '', remark: '' },
        this.tableData = [] 
        return false 
      } else {
        return true
      }
    },
    isCopy() {
      return this.$route.query.rulecopy
    }
  },
  watch: {
  },
  mounted () {
    // 复制、编辑路由带的参数
    this.ruleAddForm.groupNo = this.$route.query.groupNo
    if (this.ruleAddForm.groupNo) {
      this.ruleInit()
    }
  },
  methods: {
    handlerValue (values) {
      if (values === null || values.length === 0) {
        return ''
      } else {
        return values.toString()
      }
    },
    // 新增规则组合
    handlerAdd () {
      this.tableData.push({
        funName: '',
        functionNo: '',
        rewardnoOne: null,
        rewardnoOneNames: [],
        rewardnoTwo: null,
        rewardnoTwoNames: [],
        rewardnoThree: null,
        rewardnoThreeNames: []
      })
    },
    // 移除所在的规则组合
    handlerDeleteGroup (index, rowGroup) {
      this.$confirm('是否删除选中行','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        this.$message({message: '删除成功 ！', type: 'success'})
        this.tableData.splice(index, 1)
      }).catch(res => {
        this.$message({message: '取消删除！', type: 'info'})
      })
    },
    // 保存
    async handlerSave () {

      const reg = /^[a-zA-Z]{1,8}$/ // 验证组合编号正则
      let rule_tableData = []
      let checkTable = {  gnmc:true, jlmc: true }

      if (!reg.test(this.ruleAddForm.groupNumber) && this.isCopy) { this.$message({message: '组合编号有1-8位英文字符组成', type: 'error'}); return false}

      if ((this.ruleAddForm.groupName).trim() === '') { this.$message({message: '组合名称有误！', type: 'error'}); return false}

      // 数据验证
      if (this.tableData.length <= 0) {
        this.$message({message: '请添加规则名称和奖励！', type: 'error'}); return false
      } else {
        this.tableData.forEach(element => {
          if (element.functionNo === '') {
            this.$message({message: '请添加功能名称！', type: 'error'})
            checkTable.gnmc = false
          } else if (element.rewardnoOne === null && element.rewardnoTwo === null && element.rewardnoThree === null) {
            this.$message({message: '请添加奖励！', type: 'error'}); 
            checkTable.jlmc = false
          } else {
            rule_tableData.push({
              functionNo: element.functionNo,  rewardnoOne: element.rewardnoOne, rewardnoTwo: element.rewardnoTwo, rewardnoThree: element.rewardnoThree
            })
          }
        });
      }

      // 保存数据
      if (checkTable.gnmc && checkTable.jlmc) {
        if (this.isCopy || !this.groupNo) { // 复制、新增
          let groupNo = ''
          let message = ''

          if (this.isCopy) { groupNo = this.ruleAddForm.groupNumber, message = '复制成功！' }
          if (!this.groupNo) { groupNo = this.ruleAddForm.groupNo, message = '新增成功！' }

          let jsonstr= { groupNo, groupName: this.ruleAddForm.groupName, remark: this.ruleAddForm.remark, ruleGroupList: rule_tableData }
          const {code} = await this.$api.rule_save(jsonstr)
          code === 0 ?  (this.$message({message, type: 'success'}), this.$router.push({path: '/ruleList'})) : this.$message({message, type: 'error'})
        } else { // 编辑更新
            let jsonstr= { groupNo: this.ruleAddForm.groupNo, groupName: this.ruleAddForm.groupName,  remark: this.ruleAddForm.remark, ruleGroupList: rule_tableData }
            // console.log(jsonstr)
            const {code} = await this.$api.update_save(jsonstr)
            code === 0 ?  (this.$message({message: '更新成功！', type: 'success'}), this.$router.push({path: '/ruleList'})) : this.$message({message: '更新失败！', type: 'error'})
        }
      }

    },
    // 初始化SPA
    async ruleInit () {
      let {data} = await this.$api.findGroup({groupNo: this.ruleAddForm.groupNo})
      this.ruleAddForm =  data
      this.tableData = data.ruleGroupList
    },
    // 分页
    handleCurrentChange (i) {
      this.gObject.pageNum = i
      this.getRuleList()
    },
    // 获取列表
    async getRuleList() {
      this.groupTableData = []
      let Obj = {}
      if (this.yips.types === 'gnmc') {
        this.radioCheck = this.tableData[this.yips._index].functionNo
        this.tableColumn = [
          {
            prop: 'ID',
            label: '选择',
            type: ''
          },
          {
            prop: 'funName',
            label: '名称',
            type: ''
          },
          {
            prop: 'funDetail',
            label: '功能明细',
            type: '',
            formatter: (row, column, cellValue) => {
              return cellValue.replace(/<br\s*\/?>/gi,'');
            }
          },
          {
            prop: 'funNum',
            label: '编号',
            type: ''
          }
        ]
        Obj = await this.$api.Group_list(this.gObject)
      } else {
        const checkList = this.tableData[this.yips._index][this.yips.target.name] === null ? '' : this.tableData[this.yips._index][this.yips.target.name]
        this.checkboxList = checkList.split(',')
        this.tableColumn = [
          {
            prop: 'ID',
            label: '选择',
            type: ''
          },
          {
            prop: 'awardDetail',
            label: '奖励明细',
            type: ''
          },
          {
            prop: 'awardName',
            label: '奖励名称',
            type: ''
          },
          {
            prop: 'issueModeName',
            label: '发放方式',
            type: ''
          },
          {
            prop: 'awardNum',
            label: '奖励编号',
            type: ''
          }
        ]
        Obj = await this.$api.selectAwards(this.gObject)
      }
      this.groupTableData = Obj.data
      this.total = Obj.page.total
    },
    // 功能选择
    RuleGroupList (types,ev,_index) {
      this.DialogVisible = true
      this.yips = {
        target: ev.target||ev.srcElement,
        types,
        _index
      }
      this.handleCurrentChange (1)
    },
    // dialog 确认值
    setGroupName () {
      let attrs = this.yips.target.name
      if (this.yips.types === 'gnmc') {
        if (this.radioCheck !== '') {
          this.groupTableData.map( el => {
            el.funNum === this.radioCheck ? (this.DialogVisible = false,this.tableData[this.yips._index].funName = el.funName, this.tableData[this.yips._index][attrs] =  el.funNum ) : ''
          })
        } else {
          this.$message({message: '请选择功能名称', type: "error"})
        }
      } else {
        if (this.checkboxList.length > 0) {
          let tempAry = []
          let rewardAry = []

          for (let i in this.groupTableData) {
            for (let j in this.checkboxList) {
              this.checkboxList[j] === this.groupTableData[i].awardNum ? (tempAry.push(this.groupTableData[i].awardName),rewardAry.push(this.groupTableData[i].awardNum)) : ''
            }
          }

          this.DialogVisible = false
          this.yips.target.value = tempAry.toString()
          this.tableData[this.yips._index][attrs] = rewardAry.toString()
          if (attrs === 'rewardnoOne') { this.tableData[this.yips._index]['rewardnoOneNames'] = tempAry.toString() }
          if (attrs === 'rewardnoTwo') { this.tableData[this.yips._index]['rewardnoTwoNames'] = tempAry.toString() }
          if (attrs === 'rewardnoOne') { this.tableData[this.yips._index]['rewardnoThreeNames'] = tempAry.toString() }

        } else {
          this.$message({message: '至少选择一项奖励', type: "error"})
        }
      }
    }
  }
}
</script>

<style>
  .el-radio__label, .el-checkbox__label {
    opacity: 0;
  }
</style>

<style lang="scss" scoped>
.ruleAdd{
  .el-form{
    .form-type{
      width: 60%;
    }
    .el-table{
      margin-top: 50px;
      width: 100%;
    }
  }
  .rule_Form_Info_Operate{
    text-align: right
  }
  .el-dialog{
    .el-form{
      margin-bottom: 30px;
    }
    .el-pagination{
      margin-top: 20px;
    }
  }
}
</style>
