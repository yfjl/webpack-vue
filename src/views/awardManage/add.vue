<template>
    <div class="imain">

        <Form ref="allData" :model="allData" :rules="ruleValidate" :label-width="80">

            <div v-if="awardNum && !copy">
                <FormItem label="奖励编号">
                    <Input v-model="allData.awardNum" disabled placeholder="请输入字母，不区分大小写"></Input>
                </FormItem>
            </div>
            <div v-else>
                <FormItem label="奖励编号" prop="awardNumPrefix">
                    <Input v-model="allData.awardNumPrefix" placeholder="请输入字母，不区分大小写"></Input>
                </FormItem>
            </div>

            <!-- <FormItem label="面值" prop="faceValue">
                    <Input v-model="allData.faceValue" placeholder="面值"></Input>
                </FormItem> -->

            <FormItem label="奖励名称" prop="awardName">
                <Input v-model="allData.awardName" placeholder="奖励名称"></Input>
            </FormItem>

            <FormItem label="获取方式" prop="moreGainFlag">
                <Select v-model="allData.moreGainFlag">
                    <Option v-for="(item,index) of code.more_gain_flag" :key="index" :value="item.key">{{item.value}}</Option>
                </Select>
            </FormItem>

            <FormItem label="发放方式" prop="issueMode">
                <Select v-model="allData.issueMode">
                    <Option v-for="(item,index) of code.issueMode" :key="index" :value="item.key">{{item.value}}</Option>
                </Select>
            </FormItem>
            <FormItem label="发放时间" v-if="allData.issueMode==='2'">
                <DatePicker type="datetime" @on-change="sigleTime" placeholder="选择时间" style="width:100%;"></DatePicker>
            </FormItem>

            <FormItem label="奖励类别" prop="awardType">
                <Select v-model="allData.awardType">
                    <Option v-for="(item,index) of code.awardType" :key="index" :value="item.key">{{item.value}}</Option>
                </Select>
            </FormItem>

            <div v-if="allData.moreGainFlag==='0' || allData.moreGainFlag==='2'">
                <div v-if="allData.awardType==='1'">
                    <FormItem label="数量" prop="amount">
                        <Input v-model="allData.amount" placeholder="数量"></Input>
                    </FormItem>
                    <FormItem label="面值(元)" prop="faceValue">
                        <Input v-model="allData.faceValue" placeholder="面值(元)"></Input>
                    </FormItem>

                    <FormItem label="投资金额" prop="requiredAmount">
                        <Input v-model="allData.requiredAmount" placeholder="投资金额"></Input>
                    </FormItem>

                    <FormItem label="投资期限" prop="targetIndate">
                        <Select v-model="allData.targetIndate">
                            <Option v-for="(item,index) of code.targetIndate" :key="index" :value="item.key">{{item.value}}</Option>
                        </Select>

                    </FormItem>
                    <FormItem label="有效期" prop="intervalFlag">
                        <Select v-model="allData.intervalFlag">
                            <Option v-for="(item,index) of code.intervalFlag" :key="index" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="固定区间" v-if="allData.intervalFlag==='1'">
                        <DatePicker type="datetimerange" @on-change="getTime" placeholder="选择时间" style="width: 100%"></DatePicker>
                    </FormItem>
                    <FormItem label="偏移天数" prop="offsetDays" v-if="allData.intervalFlag==='2'">
                        <Input v-model="allData.offsetDays" placeholder="偏移天数"></Input>
                    </FormItem>

                </div>
                <div v-if="allData.awardType==='2'">
                    <FormItem label="数量" prop="amount">
                        <Input v-model="allData.amount" placeholder="数量"></Input>
                    </FormItem>
                    <FormItem label="面值(%)" prop="faceValue">
                        <Input v-model="allData.faceValue" placeholder="面值(%)"></Input>
                    </FormItem>
                    <FormItem label="投资金额" prop="requiredAmount">
                        <Input v-model="allData.requiredAmount" placeholder="投资金额"></Input>
                    </FormItem>
                    <FormItem label="加息方式" prop="addInterestMode">
                        <Select v-model="allData.addInterestMode">
                            <Option v-for="(item,index) of code.addInterestMode" :key="index" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="加息天数" prop="addInterestDate" v-if="allData.addInterestMode==='2'">
                        <Input v-model="allData.addInterestDate" placeholder="加息天数"></Input>
                    </FormItem>

                    <FormItem label="投资期限" prop="targetIndate">
                        <Select v-model="allData.targetIndate">
                            <Option v-for="(item,index) of code.targetIndate" :key="index" :value="item.key">{{item.value}}</Option>
                        </Select>

                    </FormItem>
                    <FormItem label="有效期" prop="intervalFlag">
                        <Select v-model="allData.intervalFlag">
                            <Option v-for="(item,index) of code.intervalFlag" :key="index" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="固定区间" v-if="allData.intervalFlag==='1'">
                        <DatePicker type="datetimerange" @on-change="getTime" placeholder="选择时间" style="width: 100%"></DatePicker>
                    </FormItem>
                    <FormItem label="偏移天数" prop="offsetDays" v-if="allData.intervalFlag==='2'">
                        <Input v-model="allData.offsetDays" placeholder="偏移天数"></Input>
                    </FormItem>

                </div>
                <div v-if="allData.awardType==='3'">
                    <FormItem label="面值(个)" prop="faceValue">
                        <Input v-model="allData.faceValue" placeholder="面值(个)"></Input>
                    </FormItem>
                </div>
                <div v-if="allData.awardType==='4'">
                    <FormItem label="面值(元)" prop="faceValue">
                        <Input v-model="allData.faceValue" placeholder="面值(元)"></Input>
                    </FormItem>
                    <FormItem label="有效期" prop="intervalFlag">
                        <Select v-model="allData.intervalFlag">
                            <Option v-for="(item,index) of code.intervalFlag" :key="index" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="固定区间" v-if="allData.intervalFlag==='1'">
                        <DatePicker type="datetimerange" @on-change="getTime" placeholder="选择时间" style="width: 100%"></DatePicker>
                    </FormItem>
                    <FormItem label="偏移天数" prop="offsetDays" v-if="allData.intervalFlag==='2'">
                        <Input v-model="allData.offsetDays" placeholder="偏移天数"></Input>
                    </FormItem>
                </div>
                <div v-if="allData.awardType==='5'">
                    <FormItem label="面值" prop="faceValue">
                        <Input v-model="allData.faceValue" placeholder="面值"></Input>
                    </FormItem>

                    <FormItem label="计算方式" prop="recashType">
                        <Select v-model="allData.recashType">
                            <Option v-for="(item,index) of code.recashType" :key="index" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                </div>
                <div v-if="allData.awardType==='8' || allData.awardType==='9' || allData.awardType==='10'">
                    <FormItem label="面值(元)" prop="faceValue">
                        <Input v-model="allData.faceValue" placeholder="面值(元)"></Input>
                    </FormItem>
                </div>
            </div>
            <div v-if="allData.moreGainFlag==='1'">
                <!-- <Table stripe :columns="it" :data="it1">

                </Table> -->
                <table class="itables">
                    <tr>
                        <th>获取次数</th>
                        <th>面值</th>
                        <th>投资金额</th>
                        <th>投资期限</th>
                    </tr>
                    <tr v-for="(item,index) of awardCountList" :key="index">
                        <td>{{item.gainCount}}</td>
                        <td>
                            <Input style="width:100px" v-model="item.money" placeholder="金额"></Input>
                        </td>
                        <td>
                            <Input style="width:100px" v-model="item.requiredAmount" placeholder="投资金额"></Input>
                        </td>
                        <td>
                            <Select v-model="item.targetTimeLimit">
                                <Option v-for="(item,index) of code.targetIndate" :key="index" :value="item.key">{{item.value}}</Option>
                            </Select>
                        </td>
                    </tr>
                </table>
                <div style="text-align:right;padding:10px;">
                    <Button type="info" @click="adddb">添加</Button>
                    <Button type="error" @click="deldb">删除</Button>
                </div>
                <div v-if="allData.awardType==='1'">
                    <FormItem label="有效期" prop="intervalFlag">
                        <Select v-model="allData.intervalFlag">
                            <Option v-for="(item,index) of code.intervalFlag" :key="index" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="固定区间" v-if="allData.intervalFlag==='1'">
                        <DatePicker type="datetimerange" @on-change="getTime" placeholder="选择时间" style="width: 100%"></DatePicker>
                    </FormItem>
                    <FormItem label="偏移天数" prop="offsetDays" v-if="allData.intervalFlag==='2'">
                        <Input v-model="allData.offsetDays" placeholder="偏移天数"></Input>
                    </FormItem>

                </div>
                <div v-if="allData.awardType==='2'">
                    <FormItem label="数量" prop="amount">
                        <Input v-model="allData.amount" placeholder="数量"></Input>
                    </FormItem>
                    <FormItem label="加息方式" prop="addInterestMode">
                        <Select v-model="allData.addInterestMode">
                            <Option v-for="(item,index) of code.addInterestMode" :key="index" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="加息天数" prop="addInterestDate" v-if="allData.addInterestMode==='2'">
                        <Input v-model="allData.addInterestDate" placeholder="加息天数"></Input>
                    </FormItem>

                    <FormItem label="投资期限" prop="targetIndate">
                        <Select v-model="allData.targetIndate">
                            <Option v-for="(item,index) of code.targetIndate" :key="index" :value="item.key">{{item.value}}</Option>
                        </Select>

                    </FormItem>
                    <FormItem label="固定区间" v-if="allData.intervalFlag==='1'">
                        <DatePicker type="datetimerange" placeholder="选择时间" @on-change="getTime" style="width: 100%"></DatePicker>
                    </FormItem>
                    <FormItem label="偏移天数" prop="offsetDays" v-if="allData.intervalFlag==='2'">
                        <Input v-model="allData.offsetDays" placeholder="偏移天数"></Input>
                    </FormItem>

                </div>

                <div v-if="allData.awardType==='4'">
                    <FormItem label="有效期" prop="intervalFlag">
                        <Select v-model="allData.intervalFlag">
                            <Option v-for="(item,index) of code.intervalFlag" :key="index" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="固定区间" v-if="allData.intervalFlag==='1'">
                        <DatePicker type="datetimerange" @on-change="getTime" placeholder="选择时间" style="width: 100%"></DatePicker>
                    </FormItem>
                    <FormItem label="偏移天数" prop="offsetDays" v-if="allData.intervalFlag==='2'">
                        <Input v-model="allData.offsetDays" placeholder="偏移天数"></Input>
                    </FormItem>

                </div>
                <div v-if="allData.awardType==='5'">

                    <FormItem label="计算方式" prop="recashType">
                        <Select v-model="allData.recashType">
                            <Option v-for="(item,index) of code.recashType" :key="index" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                </div>

            </div>

            <FormItem label="奖励主次" prop="mainFlag">
                <Select v-model="allData.mainFlag">
                    <Option v-for="(item,index) of code.awardMainFlag" :key="index" :value="+item.key">{{item.value}}</Option>
                </Select>
            </FormItem>

            <FormItem v-if="allData.mainFlag=='0'" label="主奖励编号" prop="mainAwardName">
                <Input v-model="allData.mainAwardName" disabled style="width:80%" placeholder="主奖励编号"></Input>
                <Button type="primary" style="float:right;" @click="hasmodels">请选择</Button>
            </FormItem>

            <FormItem label="库存数量" prop="stock">
                <Input v-model="allData.stock" placeholder="库存数量"></Input>
            </FormItem>
            <FormItem label="库存信息" >
                <Input v-model="allData.stockInfo" placeholder="库存信息"></Input>
            </FormItem>
            <FormItem label="备注">
                <Input v-model="allData.remark" placeholder="备注"></Input>
            </FormItem>

            <FormItem v-if="copy">
                <Button @click="saveData('allData')" type="primary">提交</Button>
            </FormItem>
            <FormItem v-else>
                <Button v-if="awardNum" @click="updateDB('allData')" type="primary">提交</Button>
                <Button v-else @click="saveData('allData')" type="primary">提交</Button>
            </FormItem>

        </Form>

        <Modal v-model="hasmodel" title="选择奖励" @on-ok="ok" @on-cancel="cancel">
            <Input v-model="award.awardNumLike" placeholder="请输入奖励编号查询" style="width: 300px"></Input>
            <Button type="primary" icon="ios-search" @click="hasmodels">搜索</Button>
            <Table style="margin-top:20px;" @on-row-click="slRow" :highlight-row="true" :columns="columns1" :data="data1"></Table>
            <Page :total="total" @on-change="ipage" :page-size="award.pageSize" style="margin-top:30px;"></Page>
        </Modal>
    </div>

</template>
<script>
export default {
  data() {
    return {
      model1: "",
      ruleValidate: {
        faceValue: [
          {
            required: true,
            message: "面值不能为空",
            trigger: "blur"
          }
        ],

        moreGainFlag: [
          { required: true, message: "获取方式不能为空", trigger: "blur" }
        ],
        mainFlag: [
          {
            required: true,
            message: "奖励主次不能为空",
            trigger: "blur"
          }
        ],
        mainAwardName: [
          { required: true, message: "主奖励编号不能为空", trigger: "blur" }
        ],
        stock: [
          {
            required: true,
            message: "库存数量不能为空",
            trigger: "blur"
          }
        ],
     
        awardNumPrefix: [
          { required: true, message: "奖励编号不能为空", trigger: "blur" }
        ],

        awardName: [
          { required: true, message: "奖励名称不能为空", trigger: "blur" }
        ],

        issueMode: [
          { required: true, message: "发放方式不能为空", trigger: "blur" }
        ],
        awardType: [
          { required: true, message: "奖励类别不能为空", trigger: "blur" }
        ],
        amount: [
          {
            required: true,
            message: "数量不能为空",
            trigger: "blur"
          }
        ],

        requiredAmount: [
          {
            required: true,
            message: "金额不能为空",
            trigger: "blur"
          }
        ],
        targetIndate: [
          { required: true, message: "投资期限不能为空", trigger: "blur" }
        ],
        intervalFlag: [
          { required: true, message: "有效期不能为空", trigger: "blur" }
        ],
        offsetDays: [
          {
            required: true,
            message: "偏移天数不能为空",
            trigger: "blur"
          }
        ],
        addInterestMode: [
          { required: true, message: "加息方式不能为空", trigger: "blur" }
        ],
        addInterestDate: [
          {
            required: true,
            message: "加息天数不能为空",
            trigger: "blur"
          }
        ],
        recashType: [
          { required: true, message: "计算方式不能为空", trigger: "blur" }
        ]
      },
      hasmodel: false,
      columns1: [
        {
          title: "奖励编号",
          key: "awardNum"
        },
        {
          title: "奖励名称",
          key: "awardName"
        },
        {
          title: "奖励类型",
          key: "awardTypeName"
        }
      ],
      data1: [],
      award: {
        pageNum: 1,
        pageSize: 10,
        awardNumLike: ""
      },
      iRows: {},
      total: 0,
      code: {
        more_gain_flag: [],
        issueMode: [],
        awardType: [],
        targetIndate: [],
        intervalFlag: [],
        awardMainFlag: [],
        addInterestMode: [],
        recashType: []
      },
      awardCountList: [],
      allData: {}
    };
  },
  computed: {
    awardNum() {
      return this.$route.query.awardNum;
    },
    copy() {
      return this.$route.query.copy;
    }
  },
  watch: {
    awardNum(num) {
      if (!num) {
        this.allData = {};
      }
    }
  },
  mounted() {
    this.allData.awardNum = this.$route.query.awardNum;
    if (this.allData.awardNum) {
      this.detailInfo();
    }

    this.init();
  },
  methods: {
    init() {
      this.loadSelect();
    },
    adddb() {
      let len = this.awardCountList.length;
      this.awardCountList.push({
        gainCount: len + 1
      });
    },
    deldb() {
      let len = this.awardCountList.length;
      this.awardCountList.splice(len - 1, 1);
    },
    async detailInfo() {
      let { data } = await this.$api.award_reshow({
        awardNum: this.allData.awardNum
      });
      this.allData = data.waAward;
      let {
        stock,
        mainFlag,
        amount,
        addInterestDate,
        offsetDays,
        requiredAmount,
        faceValue
      } = data.waAward;
      this.allData.stock = stock + "";
      this.allData.mainFlag = mainFlag + "";
      this.allData.amount = amount + "";
      this.allData.addInterestDate = addInterestDate + "";
      this.allData.offsetDays = offsetDays + "";
      this.allData.requiredAmount = requiredAmount + "";
      this.allData.faceValue = faceValue + "";

      this.awardCountList = data.awardCountList;
    },
    sigleTime(t) {
      this.allData["issueDate"] = t;
    },
    getTime(t) {
      this.allData["startTime"] = t[0];
      this.allData["endTime"] = t[1];
    },
    loadSelect() {
      this.$api.loadSelect({ code: "more_gain_flag" }).then(({ data }) => {
        this.code.more_gain_flag = data;
      });
      this.$api.loadSelect({ code: "issue_mode" }).then(({ data }) => {
        this.code.issueMode = data;
      });
      this.$api.loadSelect({ code: "award_type" }).then(({ data }) => {
        this.code.awardType = data;
      });
      this.$api.loadSelect({ code: "target_indate" }).then(({ data }) => {
        this.code.targetIndate = data;
      });
      this.$api.loadSelect({ code: "interval_flag" }).then(({ data }) => {
        this.code.intervalFlag = data;
      });
      this.$api.loadSelect({ code: "award_main_flag" }).then(({ data }) => {
        this.code.awardMainFlag = data;
      });
      this.$api.loadSelect({ code: "add_interest_mode" }).then(({ data }) => {
        this.code.addInterestMode = data;
      });
      this.$api.loadSelect({ code: "recash_type" }).then(({ data }) => {
        this.code.recashType = data;
      });
    },
    slRow(i) {
      this.iRows = i;
    },
    ipage(i) {
      this.award.pageNum = i;
      this.hasmodels();
    },
    hasmodels() {
      this.$api.selectAwards(this.award).then(({ data, page }) => {
        this.hasmodel = true;
        this.data1 = data;
        this.total = page.total;
      });
    },
    ok() {
      let id = this.iRows.awardNum;
      let name = this.iRows.awardName;
      if (id) {
        this.allData["mainAwardNum"] = id;
        this.allData.mainAwardName = name;
      } else {
        this.$Message.warning("未选择");
      }
    },
    updateDB(name) {
      this.allData["awardCountList"] = this.awardCountList;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$api.editAward(this.allData).then(() => {
            this.$Message.success("编辑成功！");
          });
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    saveData(name) {
      let all = (this.allData["awardCountList"] = this.awardCountList);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$api.addAward(this.allData).then(() => {
            if (this.copy) {
              this.$Message.success("复制成功！");
            } else {
              this.$Message.success("新增成功！");
            }
          });
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    cancel() {
      this.$Message.info("取消选择");
    }
  }
};
</script>

<style lang="scss" scoped>
.imain {
  width: 500px;
  margin-left: 100px;
}
.itables {
  position: relative;
  left: 100px;
  border-collapse: collapse;
}
.itables td,
.itables th {
  border: 1px solid #999;
  text-align: center;
}
</style>


