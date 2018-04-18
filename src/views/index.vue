<template>
  <div>
    <ul class="head">
      
      <li>
        基础标签数量 <br> {{JCBQS}}
      </li>
      <li>
        组合标签数量 <br> {{ZHBQS}}
      </li>
      <li>
        标签覆盖人数  <br> {{USERS}}
      </li>

    </ul>
    <div class="selected">
      投资：
      <Select v-model="timeModel"  @on-change="init" style="width:200px">
        <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="charts">
      <ve-histogram :data="chartData_zx" :settings="chartSettings_zx"></ve-histogram>
    </div>
    <Row>
      <Col span="12" class="y">
      <ve-ring :data="chartData_yx" :settings="chartSettings_yx" ref=""></ve-ring>
      <span> 投资金额</span>
      </Col>
      <Col span="12" class="y">
      <ve-ring :data="chartData_yx2" :settings="chartSettings_yx"></ve-ring>
      <span> 投资人数</span>
      </Col>
    </Row>

    <Row>
     <Col span="12" v-if="selectIndex && selectIndex.index3" v-for="(item,index) of selectIndex.index3" :key="index">
        <div class="user">
          <div class="user_label">
            <span v-for="(list,index) of item.labels " :key="index">{{list.NAME}}</span>

          </div>
          <p class="iname">{{item.YHXFLXNAME}}</p>
        </div>
      </Col>
    
    </Row>
    
  </div>
</template>
<script>
import { indexHeadApi, label, timeList } from '../mock/api'
export default {
  data() {
    return {
      timeList,
      indexHeadApi,
      label,
      timeModel: '1',
      chartData_zx: {
        columns: [],
        rows: []
      },
      chartSettings_zx: {
        label: {
          normal: { show: true, position: 'top' }
        }
      },
      chartData_yx: {
        columns: [],
        rows: [],
        
      },
      chartData_yx2: {
        columns: [],
        rows: []
      },

      chartSettings_yx: {
        dataType: 'KMB',
        
        // data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
      selectIndex: {},
      JCBQS: 0,
      ZHBQS: 0,
      USERS: 0
    }
  },
  mounted: function() {
    this.init()
  },
  methods: {
    init() {
      let params = {
        type: this.timeModel
      }
      this.$api.index(params).then(({ data }) => {
        this.selectIndex = data
        this.chartData_zx.columns = data.index2.columns
        this.chartData_zx.rows = data.index2.rows
        this.chartData_yx.columns = data.index4.columns
        this.chartData_yx.rows = data.index4.rows
        this.chartData_yx2.columns = data.index5.columns
        this.chartData_yx2.rows = data.index5.rows

        this.JCBQS = data.index1.JCBQS
        this.ZHBQS = data.index1.ZHBQS
        this.USERS = data.index1.USERS
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.selected {
  height: 60px;
  line-height: 60px;
  background-color: rgb(243, 241, 241);
}
.head {
  text-align: center;
  overflow: hidden;
  margin-bottom: 30px;
  li {
    width: 25%;
    margin-left: 6%;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px 0;
    float: left;
  }
}
.charts {
  clear: both;
  padding: 20px 0;
}
.y {
  text-align: center;
  span {
    position: relative;
    top: -50px;
  }
}
.user {
  margin-bottom: 50px;
  .iname {
    text-align: center;
  }
  .user_label {
    background: #f9f7f7;
    border-radius: 8px;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 10px;

    span {
      display: inline-block;
      padding: 6px 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin: 10px;
    }
  }
}
</style>

