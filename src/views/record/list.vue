<template>
  <div>

    <div class="itop">
      <Row class="irow">
        <Col span="6">
        <Input v-model="LIST.fcfuid" placeholder="触发人ID" style="width: 300px"></Input>
        </Col>
        <Col span="6">
        <Input v-model="LIST.fuid" placeholder="奖励人ID" style="width: 300px"></Input>
        </Col>
        <Col span="6">
        <Input v-model="LIST.fcfuid" placeholder="奖励ID" style="width: 300px"></Input>
        </Col>
        <Col span="6">
        <Input v-model="LIST.fuid" placeholder="功能ID" style="width: 300px"></Input>
        </Col>

      </Row>
      <Row class="irow">
        <Col span="6">
        <Input v-model="LIST.fuid" placeholder="活动ID" style="width: 300px"></Input>
        </Col>
        <Col span="6">
         <DatePicker type="datetime" placeholder="开始时间" @on-change="ks" style="width: 300px"></DatePicker>
        </Col>
        <Col span="6">
        <DatePicker type="datetime" placeholder="开始时间" @on-change="js" style="width: 300px"></DatePicker>
        </Col>

        <Col span="6">
        <Select  placeholder="事件类型" style="width:300px;" v-model="LIST.eventDataId">
                    <Option v-for="(item,index) of code.funType" :key="index" :value="item.key">{{item.value}}</Option>
                </Select>
        </Col>
      </Row>
      <Row class="irow">

        <Col span="6">
        <Select v-model="LIST.delFlag" style="width:300px">
          <Option value="1">异常</Option>
             <Option value="0">正常</Option>
        </Select>
        </Col>
        <Col span="6">
        <Select  placeholder="奖励类型" style="width:300px;" v-model="LIST.awardType">
                    <Option v-for="(item,index) of code.awardType" :key="index" :value="item.key">{{item.value}}</Option>
                </Select>
        </Col>
        <Col span="6">
        <Button type="primary" shape="circle" style="width: 300px" @click="activityList"> 查询</Button>
        </Col>
      </Row>
    </div>
    <el-table :data="tbList" style="width: 100%">

      <el-table-column fixed prop="fcfuid" label="触发人ID" width="150">
      </el-table-column>
      <el-table-column prop="fuid" label="级别关系" width="150">
      </el-table-column>

      <el-table-column prop="fuid" label="奖励人ID" width="150">
      </el-table-column>
      <el-table-column prop="feventdataName" label="事件类型" width="150">
      </el-table-column>
      <el-table-column prop="chdid" label="活动ID" width="180">
      </el-table-column>
      <el-table-column prop="chdName" label="活动名称" width="160">
      </el-table-column>
      <el-table-column prop="cgnid" label="功能ID" width="200">
      </el-table-column>
      <el-table-column prop="cgnName" label="功能名称" width="150">
      </el-table-column>
      <el-table-column prop="cjlid" label="奖励ID" width="200">
      </el-table-column>
      <el-table-column prop="cjlName" label="奖励名称" width="150">
      </el-table-column>
      <el-table-column prop="tdate" label="时间" width="180">
      </el-table-column>
      <el-table-column prop="fjllxName" label="奖励类型" width="150">
      </el-table-column>
      <el-table-column  fixed="right" prop="fzt" :formatter="fltStatus" label="状态" width="100">
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
      LIST: {
        current: 1,
        pageSize: 10,
        userId: "",
        fcfuid: "",
        activityId: "",
        funcId: "",
        awardId: "",
        startTime: "",
        endTime: "",
        awardType:'',
        delFlag:'',
        eventDataId:''
      },
      code:{
        awardType:[],
        funType:[]
      },
      tbPage: 0
    };
  },
  mounted() {
    this.activityList();
    this.init()
  },

  methods: {
    ks(t){
      this.LIST.startTime = t
    },
    js(t){
      this.LIST.endTime = t;
    },
    init(){
        this.$api.loadSelect({ code: "award_type" }).then(({ data }) => {
          this.code.awardType = data;
        });
           this.$api.loadSelect({ code: "fun_type" }).then(({ data }) => {
          this.code.funType = data;
        });
     },
    fltStatus(row,column,status){
      status = Number(status)
      switch (status) {
        case 0:
          return '正常'
        case 1:
          return '异常'
      
      }
    },
    iNextPage(i) {
      this.LIST.current = i;
      this.activityList();
    },
    async activityList() {
      let { data, page } = await this.$api.listRecord(this.LIST);
      this.tbList = data;
      this.tbPage = page.total;
    }
  }
};
</script>

<style lang="scss" scoped>
.itop {
  margin-bottom: 50px;
  .irow {
    margin-bottom: 20px;
  }
}
</style>







