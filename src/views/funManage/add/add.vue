<template>
  <div>
    <div class="funManage-add-wrapper">
       <Form :model="addFunParams" ref="addFunParams" :rules="ruleValidate" label-position="left" :label-width="100">
        <FormItem label="功能编号" prop="funNum">
            <Input v-model="addFunParams.funNum" style="width: 600px; margin-left: 80px" :readonly="$route.query.status == 'edit'"></Input>
        </FormItem>
        <FormItem label="功能名称" prop="funName">
            <Input v-model="addFunParams.funName" style="width: 600px; margin-left: 80px"></Input>
        </FormItem>
        <FormItem label="功能类型" prop="funType">
            <Select v-model="addFunParams.funType" @on-change="loadFunPoint" style="width: 600px; margin-left: 80px">
              <Option v-for="item in funTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="功能点" prop="funPoint">
            <Select v-model="addFunParams.funPoint" style="width: 600px; margin-left: 80px">
              <Option v-for="item in funPointOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <div v-if="addFunParams.funType == 6">
        <FormItem label="分享至" prop="shareChannel">
            <Select v-model="addFunParams.shareChannel" multiple style="width: 600px; margin-left: 80px">
              <Option v-for="item in shareChannelOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>　
        </FormItem>
        <FormItem label="分享次数" prop="shareCount">
            <Input v-model="addFunParams.shareCount" style="width: 600px; margin-left: 80px"></Input>
        </FormItem>
        <FormItem label="分享链接">
            <Input style="width: 520px; margin-left: 80px" v-model="shareLink.value" v-for="(shareLink, index) in addFunParams.shareLinks" :key="index"></Input>
            <Button type="success" icon="plus-round" @click="addShareLink"></Button>
            <Button type="error" icon="minus-round" @click="removeShareLink"></Button>
        </FormItem>
        </div>
        <FormItem label="是否特权" prop="isTx">
            <Select v-model="addFunParams.isTx" style="width: 600px; margin-left: 80px">
              <Option v-for="item in isTxOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="特权编号" prop="txList" v-if="Number(addFunParams.isTx)">
            <Input v-model="addFunParams.txList" readonly style="width: 540px; margin-left: 80px"></Input>
            <Button type="primary" @click="showTxListModal">请选择</Button>
            <Modal
            v-model="awardsModal"
            title="特权列表"
            @on-ok="sureSelectAwards"
            @on-cancel="awardsCancel">
            <Table border highlight-row :columns="awardsColumns" :data="awardsData" @on-current-change="awardSelectRadio"  @on-selection-change="awardsSelectMultiselect"></Table>
            <Page :total="awardsTotal" @on-change="awardsPageSelect" style="margin: 20px auto; width: 100%; display: flex; justify-content: center;"></Page>
            </Modal>
        </FormItem>
        <FormItem label="标的类型" v-if="showTarget" prop="targetType">
            <Select v-model="addFunParams.targetType" multiple style="width: 600px; margin-left: 80px">
              <Option v-for="item in targetTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="标的期限" v-if="showTarget" prop="targetIndate">
            <Select v-model="addFunParams.targetIndate" multiple style="width: 600px; margin-left: 80px">
              <Option v-for="item in targetIndateOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="单笔/多笔" v-if="showMultiRechargeFlag" prop="multiRechargeFlag">
            <Select v-model="addFunParams.multiRechargeFlag" style="width: 400px; margin-left: 80px">
              <Option v-for="item in multiRechargeFlagOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="addFunParams.fixedValueFlag" style="width: 200px;">
              <Option v-for="item in fixedValueFlagOption" :value="item.value" :key="item.value" style="width: 200px">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="是否固定值" v-if="showFixedValueFlag && !showMultiRechargeFlag" prop="fixedValueFlag">
            <Select v-model="addFunParams.fixedValueFlag" style="width: 600px; margin-left: 80px">
              <Option v-for="item in fixedValueFlagOption" :value="item.value" :key="item.value" style="width: 600px">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <div v-if="invest || recharge">
        <FormItem label="排名区间" v-if="addFunParams.multiRechargeFlag == 2">
            <div class="nofixedValue">
              <Input v-model="addFunParams.minRank" style="width: 300px; margin-left: 80px" placeholder="起始值"></Input>
              <Input v-model="addFunParams.maxRank" style="width: 300px; margin-left: 0px" placeholder="结束值"></Input>
            </div>
        </FormItem>
        <FormItem label="充值位置" v-if="addFunParams.multiRechargeFlag == 3" prop="fixedRank">
            <div class="nofixedValue">
              <Input v-model="addFunParams.fixedRank" style="width: 600px; margin-left: 80px" placeholder="起始值"></Input>
            </div>
        </FormItem>
        <FormItem label="累计方式" prop="addUpMethod">
            <Select v-model="addFunParams.addUpMethod" style="width: 400px; margin-left: 80px">
              <Option v-for="item in addUpMethodOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        </div>
        <FormItem label="输入金额" v-if="Number(showFixedValueFlag)">
            <div class="fixed-value" v-if="!Number(addFunParams.fixedValueFlag)">
              <Input v-model="addFunParams.fixedValue" style="width: 600px; margin-left: 80px" placeholder="请输入金额"></Input>
            </div>
            <div class="nofixedValue" v-if="Number(addFunParams.fixedValueFlag)">
              <Input v-model="addFunParams.minValue" style="width: 300px; margin-left: 80px" placeholder="请输入最小金额"></Input>
              <Input v-model="addFunParams.maxValue" style="width: 300px; margin-left: 0px" placeholder="请输入最大金额"></Input>
            </div>
        </FormItem>
        <div v-if="showDynamicTimeFlag">
        <FormItem label="时间区间选择" prop="dynamicTimeFlag" v-if="showDynamicRegTime">
            <Select v-model="addFunParams.dynamicTimeFlag" style="width: 600px; margin-left: 80px">
              <Option v-for="item in dynamicTimeFlagOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="注册动态时间" v-if="Number(addFunParams.dynamicTimeFlag) || showDynamicRegTime" prop="dynamicRegTime">
            <Input v-model="addFunParams.dynamicRegTime" style="width: 600px; margin-left: 80px"></Input>
        </FormItem>
        <FormItem label="开始/结束时间" v-else>
         <DatePicker type="datetime" v-model="addFunParams.startTime" @on-change="startTimeChange" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="margin-left: 80px; width: 300px"></DatePicker>
         <DatePicker type="datetime" v-model="addFunParams.endTime" @on-change="endTimeChange" format="yyyy-MM-dd HH:mm" placeholder="结束时间" style="width: 300px"></DatePicker>
        </FormItem>
        </div>
        <FormItem label="备注" prop="remark">
            <Input v-model="addFunParams.remark" style="width: 600px; margin-left: 80px"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" size="large" @click="handleSubmit('addFunParams')">保存</Button>
            <Button type="ghost" size="large" @click="handleReset('addFunParams')" style="margin-left: 80px">重置</Button>
        </FormItem>
    </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 加载所有字典请求data
      loadfunPointParams: {},
      // 获取功能对应的功能点
      loadSelectParams: {},
      // 查询奖励列表请求data
      selectAwardsParams: {},
      // 保存功能请求data
      addFunParams: {
        funNum: "",
        funName: "",
        funType: "",
        funPoint: "",
        isTx: "",
        // 时间选择区间
        dynamicTimeFlag: "",
        // 动态时间
        dynamicRegTime: "",
        // 固定金额
        fixedValue: "",
        // 区间金额
        minValue: "",
        maxValue: "",
        // 金额固定区间值选项
        fixedValueFlag: "",
        // 排名区间
        minRank: "",
        maxRank: "",
        // 指定排名
        fixedRank: "",
        // 标的期限
        targetIndate: [],
        // 标的类型
        targetType: [],
        // 累计方式
        addUpMethod: "",
        // 分享类型
        shareChannel: [],
        // 分享次数
        shareCount: "",
        // 分享链接
        shareLinks: [{value: ''}],
        // 开始时间
        startTime: "",
        // 结束时间
        endTime: ""
      },
      // 是否特权下拉框
      isTxOption: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      //  功能类型下拉框
      funTypeOption: [
        {
          value: "1",
          label: "注册"
        },
        {
          value: "2",
          label: "开户"
        },
        {
          value: "3",
          label: "充值"
        },
        {
          value: "4",
          label: "投资"
        },
        {
          value: "5",
          label: "回款"
        },
        {
          value: "6",
          label: "分享"
        },
        {
          value: "10",
          label: "预约"
        },
        {
          value: "9",
          label: "站岗"
        },
        {
          value: "11",
          label: "资格领取"
        }
      ],
      // 表单验证
      ruleValidate: {
        funNum: [
          {
            required: true,
            message: "功能编号不能为空",
            trigger: "blur"
          }
        ],
        funName: [
          {
            required: true,
            message: "功能名称不能为空",
            trigger: "blur"
          }
        ],
        funType: [
          {
            required: true,
            message: "功能类型不能为空",
            trigger: "blur"
          }
        ],
        funPoint: [
          {
            required: true,
            message: "功能点不能为空",
            trigger: "blur"
          }
        ],
        shareCount: [
          {
            required: true,
            message: "分享次数不能为空",
            trigger: "blur"
          }
        ],
        isTx: [
          {
            required: true,
            message: "是否特权不能为空",
            trigger: "blur"
          }
        ],
        txList: [
          {
            required: true,
            message: "特权编号不能为空",
            trigger: "blur"
          }
        ],
        targetType: [
          {
            required: true,
            message: "标的类型不能为空",
            trigger: "blur"
          }
        ],
        targetIndate: [
          {
            required: true,
            message: "标的期限不能为空",
            trigger: "blur"
          }
        ],
        multiRechargeFlag: [
          {
            required: true,
            message: "单笔多笔不能为空",
            trigger: "blur"
          }
        ],
        fixedValueFlag: [
          {
            required: true,
            message: "是否固定值不能为空",
            trigger: "blur"
          }
        ],
        fixedRank: [
          {
            required: true,
            message: "充值位置不能为空",
            trigger: "blur"
          }
        ],
        addUpMethod: [
          {
            required: true,
            message: "累计方式不能为空",
            trigger: "blur"
          }
        ],
        dynamicTimeFlag: [
          {
            required: true,
            message: "时间区间选择不能为空",
            trigger: "blur"
          }
        ],
        dynamicRegTime: [
          {
            required: true,
            message: "注册动态时间不能为空",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "备注不能为空",
            trigger: "blur"
          }
        ]
      },
      // 功能点下拉列表
      funPointOption: [],
      // 标的类型下拉列表
      targetTypeOption: [],
      // 标的期限下拉列表
      targetIndateOption: [],
      dynamicTimeFlagOption: [
        {
          value: "1",
          label: "注册动态时间"
        },
        {
          value: "0",
          label: "区间值"
        }
      ],
      // 单笔多笔下拉框
      multiRechargeFlagOption: [
        {
          value: "0",
          label: "单笔充值"
        },
        {
          value: "1",
          label: "多笔充值"
        },
        {
          value: "2",
          label: "充值总金额排名"
        },
        {
          value: "3",
          label: "充值位置"
        }
      ],
      fixedValueFlagOption: [
        {
          value: "0",
          label: "固定值"
        },
        {
          value: "1",
          label: "区间值"
        }
      ],
      // 累计方式下拉框
      addUpMethodOption: [
        {
          value: "0",
          label: "单天累计"
        },
        {
          value: "1",
          label: "期间累计"
        }
      ],
      // 分享至下拉框
      shareChannelOption: [
        {
          value: "61",
          label: "微信好友"
        },
        {
          value: "62",
          label: "微信朋友圈"
        },
        {
          value: "63",
          label: "新浪微博"
        },
        {
          value: "64",
          label: "QQ好友"
        },
        {
          value: "65",
          label: "APP好友"
        },
        {
          value: "66",
          label: "APP群聊"
        }
      ],
      awardsModal: false,
      awardsData: [],
      awardsTotal: 0
    };
  },
  computed: {
    register() {
      return this.addFunParams.funType == 1;
    },
    invest() {
      return this.addFunParams.funType == 4;
    },
    recharge() {
      return this.addFunParams.funType == 3;
    },
    kH() {
      return this.addFunParams.funType == 2;
    },
    // 是否固定值 显示是否输入金额
    showFixedValueFlag() {
      if (
        this.addFunParams.funType == 4 ||
        this.addFunParams.funType == 3 ||
        this.addFunParams.funType == 5 ||
        this.addFunParams.funType == 9
      ) {
        return true;
      }
      return false;
    },
    // 显示单笔多笔
    showMultiRechargeFlag() {
      if (
        this.addFunParams.funPoint == 42 ||
        this.addFunParams.funPoint == 32
      ) {
        return true;
      }
      return false;
    },
    // 显示时间选择区间
    showDynamicTimeFlag() {
      if (
        this.addFunParams.funType == 2 ||
        this.addFunParams.addUpMethod == 0
      ) {
        return false;
      }
      return true;
    },
    showDynamicRegTime() {
      if (this.addFunParams.addUpMethod == 1) {
        return false;
      }
      return true;
    },
    // 显示累计方式
    showAddMethod() {
      if (
        this.addFunParams.multiRechargeFlag == 2 ||
        this.addFunParams.multiRechargeFlag == 3
      ) {
        return true;
      }
      return false;
    },
    // 显示标的期限 标的类型
    showTarget() {
      if (this.addFunParams.funType == 4 || this.addFunParams.funType == 5) {
        return true;
      }
      return false;
    },
    // 特权单选多选
    awardsColumns() {
      if(this.addFunParams.funType == '11') {
      return [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          key: "awardNum"
        },
        {
          title: "名称",
          key: "awardName"
        },
        {
          title: "详情",
          key: "awardDetail"
        }
      ]
      } else {
        return  [
        {
          title: "编号",
          key: "awardNum"
        },
        {
          title: "名称",
          key: "awardName"
        },
        {
          title: "详情",
          key: "awardDetail"
        }
      ]
      }
    }
  },
  methods: {
    async loadFunPoint(funType) {
      if (funType == 4 || funType == 5) {
        await this.getTargetType("target_type");
        await this.getTargetIndate("target_indate");
      }
      this.loadfunPointParams.funType = funType;
      let result = await this.$api.loadFunPoint(this.loadfunPointParams);
      if (result.code === 0) {
        this.funPointOption = this.getSelectMap(result.data);
      } else {
        this.$Message.error(result.msg);
      }
    },
    async loadSelect(loadSelectParams) {
      let result = await this.$api.loadSelect(loadSelectParams);
      return result;
    },
    // 获取标的类型
    async getTargetType(targetType) {
      this.loadSelectParams.code = targetType;
      let result = await this.loadSelect(this.loadSelectParams);
      if (result.code === 0) {
        this.targetTypeOption = this.getSelectMap(result.data);
      } else {
        this.$Message.error(result.msg);
      }
    },
    // 获取标的期限
    async getTargetIndate(targetIndate) {
      this.loadSelectParams.code = targetIndate;
      let result = await this.loadSelect(this.loadSelectParams);
      if (result.code === 0) {
        this.targetIndateOption = this.getSelectMap(result.data);
      } else {
        this.$Message.error(result.msg);
      }
    },
    // 将接口返回的下拉列表data格式化成iview可渲染的格式
    getSelectMap(data) {
      let selectArr = [];
      data.forEach((mydata, index) => {
        selectArr.push({ value: mydata.key, label: mydata.value });
      });
      return selectArr;
    },
    // 分享链接增加减少
    addShareLink() {
      this.addFunParams.shareLinks.push("");
    },
    removeShareLink() {
      if (this.isLastShareLink()) {
        this.$Message.error("不能删除!");
      } else {
        this.addFunParams.shareLinks.pop();
      }
    },
    // 分享链接最少一个
    isLastShareLink() {
      if (this.addFunParams.shareLinks.length <= 1) {
        return true;
      }
      return false;
    },
    async saveFunc() {
      let result = await this.$api.saveFunc(this.addFunParams);
    },
    async updateFunc() {
      let result = await this.$api.updateFunc(this.addFunParams);
    },
    // 保存
    handleSubmit(name) {
      try {
        this.addFunParams.targetIndate = this.addFunParams.targetIndate.join("," );
        this.addFunParams.targetType = this.addFunParams.targetType.join(",");
        this.addFunParams.shareChannel = this.addFunParams.shareChannel.join(",");
      } catch (e) {
        this.$Message.warning(e.message);
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          if(this.$route.query.status == 'edit') {
            this.updateFunc();
          } else {
            this.saveFunc();
          }
          this.$Message.success("保存成功!");
          this.$router.push({ path: "/funList" });
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // 显示特权选择状态框
    async showTxListModal() {
      this.awardsModal = true;
      this.selectAwardsParams = {
        pageNum: 1,
        pageSize: 6
      };
      let result = await this.selectAwards();
    },
    async selectAwards() {
      let result = await this.$api.selectAwards(this.selectAwardsParams);
      if (result.code === 0) {
        this.awardsData = result.data;
        this.awardsTotal = result.page.total;
      } else {
        this.$Message.error(result.msg);
      }
      return result;
    },
    // 特权单选
    awardSelectRadio(currentRow) {
      this.addFunParams.txList = currentRow.awardNum;
    },
    // 特权多选
    awardsSelectMultiselect(selection, row) {
      let awardArr = []
      selection.forEach((awardOption) => {
        awardArr.push(awardOption.awardNum);
      })
      this.addFunParams.txList = awardArr.join(',');
    },
    async awardsPageSelect(index) {
      this.selectAwardsParams.pageNum = index;
      let result = await this.selectAwards();
    },
    sureSelectAwards() {},
    awardsCancel() {
      this.addFunParams.txList = '';
    },
    startTimeChange(startTime) {
      this.addFunParams.startTime = startTime;
    },
    endTimeChange(endTime) {
      this.addFunParams.endTime = endTime;
    },
    // 功能回显
    async getFunc(status) {
      let result = await this.$api.getFunc({
        funNum: this.$route.query.funNum
      });
      if (result.code === 0) {
        this.addFunParams = result.data;
        this.addFunParams.targetIndate = this.addFunParams.targetIndate ? this.addFunParams.targetIndate.split(",") : this.addFunParams.targetIndate;
        this.addFunParams.targetType = this.addFunParams.targetType ? this.addFunParams.targetType.split(",") : this.addFunParams.targetType;
        this.addFunParams.shareChannel =  this.addFunParams.shareChannel ? this.addFunParams.shareChannel.split(",") :  this.addFunParams.shareChannel;
        this.addFunParams.isTx = String(this.addFunParams.isTx);
        if(status == 'copy') {
          this.addFunParams.funNum = '';
        }
      } else {
        this.$Message.error(result.msg);
      }
    },
    initEnterRouter() {
      let status = this.$route.query.status;
    if (status) {
      this.getFunc(status);
    } else {
      this.addFunParams = {};
    }
    }
  },
  created() {
  },
  mounted() {
    // setTimeout(() => {
    // }, 5000);
    this.initEnterRouter();
  }
};
</script>
<style lang="scss" src="./add.scss" >

</style>
