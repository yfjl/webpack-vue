<template>
    <div class="imain">

        <Form ref="allData" :model="allData" :rules="ruleValidate" :label-width="80">
            <!-- <FormItem label="活动编号" prop="activityNo" >
                <Input v-model="allData.activityNo" placeholder="请输入字母，不区分大小写"></Input>
            </FormItem> -->
                <!-- /编辑 -->
              <div v-if="activityNo && !copy">
                 <FormItem label="活动编号" >
                <Input v-model="allData.activityNos" disabled  placeholder="请输入字母，不区分大小写"></Input>
            </FormItem>
            </div>
            <div v-else>
                <FormItem label="活动编号" prop="activityNo">
                <Input v-model="allData.activityNo" placeholder="请输入字母，不区分大小写"></Input>
            </FormItem>
            </div>


            <FormItem label="活动名称" prop="activityName">
                <Input v-model="allData.activityName" placeholder="活动名称"></Input>
            </FormItem>
            <FormItem label="活动说明" prop="activityDetail">
                <Input v-model="allData.activityDetail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="活动说明"></Input>
            </FormItem>
            <FormItem label="活动对象" prop="targetName">
                <Input v-model="allData.targetName" disabled style="width:80%" placeholder="活动对象">
                </Input>
                <Button type="primary" style="float:right;" @click="userGroup_list('hddx')">请选择</Button>
            </FormItem>
            <FormItem label="规则组合" prop="groupName">
                <Input v-model="allData.groupName" disabled style="width:80%;" placeholder="规则组合">
                </Input>
                <Button type="primary" style="float:right;" @click="userGroup_list('gzzh')">请选择</Button>
            </FormItem>
            <FormItem label="时间区间">
                <DatePicker type="datetimerange" v-model="time" @on-change= "getTime" placeholder="时间区间" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="白名单">
                <Input v-model="allData.whiteName" placeholder="白名单"></Input>
            </FormItem>
            <FormItem label="黑名单">
                <Input v-model="allData.blackName" placeholder="黑名单"></Input>
            </FormItem>
            <FormItem label="活动负责人" prop="activityLeader">
                <Input v-model="allData.activityLeader" placeholder="活动负责人"></Input>
            </FormItem>
            <FormItem label="链接地址" prop="activityUrl">
                <Input v-model="allData.activityUrl" placeholder="链接地址"></Input>
            </FormItem>
            <FormItem label="备注" >
                <Input v-model="allData.remarks" placeholder="备注"></Input>
            </FormItem>
            <FormItem v-if="copy">
                <Button  @click="addActivity('allData')" type="primary">提交</Button>
            </FormItem>
            <FormItem v-else>
                <Button v-if="activityNo" @click="updateDB('allData')"  type="primary">提交</Button>
                <Button v-else  @click="addActivity('allData')" type="primary">提交</Button>
            </FormItem>
            <!-- <FormItem>
                <Button @click="updateDB" type="primary">提交</Button>
            </FormItem> -->
        </Form>

        <Modal v-model="show1" :title="title" @on-ok="isSure">
            <Input v-model="aObject.name" placeholder="请输入名称或编号查询" style="width: 300px"></Input>
            <Button type="primary" icon="ios-search" @click="userGroup_list">搜索</Button>

            <Table style="margin-top:20px;" @on-row-click="slRow" :highlight-row="true" :columns="columns1" :data="data1"></Table>
            <Page :total="total" @on-change="ipage" :page-size="aObject.pageSize" style="margin-top:30px;"></Page>
        </Modal>

    </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      columns1: [],
      time:[],
      data1: [],
      show1: false,
   
      updateData: {
        activityNo: ""
      },
      allData: {
      
      },
      ruleValidate: {
                    activityNo: [
                        { required: true, message: '活动编号不能为空', trigger: 'blur' }
                    ],
                    activityName: [
                        { required: true, message: '活动名称不能为空', trigger: 'blur' }
                    ],
                    activityDetail: [
                        { required: true, message: '活动说明不能为空', trigger: 'blur' }
                    ],
                    targetName: [
                        { required: true, message: '活动对象不能为空', trigger: 'blur' }
                    ],
                    groupName: [
                        { required: true, message: '规则组合不能为空', trigger: 'blur' }
                    ],
                
                    activityLeader: [
                        { required: true, message: '活动负责人不能为空', trigger: 'blur' }
                    ],
                    activityUrl: [
                        { required: true, message: '链接地址不能为空', trigger: 'blur' }
                    ],

                 
                    

      },
      aObject: {
        pageNum: 1,
        current: 1,
        pageSize: 10,
        name: ""
      },
      total: 0,
      iRows: {},
      yips: ""
    };
  },
  computed: {
    activityNo() {
      return this.$route.query.activityNo;
    },
    copy(){
        return this.$route.query.copy;
    }
  },
  watch: {
    activityNo(num) {
      if (!num) {
        this.allData = {};
      }
    }
  },
  created() {
    
  },
  mounted() {
    this.updateData.activityNo = this.$route.query.activityNo;
    if (this.updateData.activityNo) {
      this.init();
    }
  },
  methods: {
     getTime(t){
         this.allData['startTime'] = t[0]
         this.allData['endTime'] = t[1]
     },
      addActivity(name){
        this.$refs[name].validate((valid) => {
                    if (valid) {
                         this.$api.addActivity(this.allData).then(()=>{
                           if(this.copy){
                                this.$Message.success("复制成功！")
                            }else{
                                this.$Message.success("新增成功！")
                            }
                         });
                        
                    } else {
                        this.$Message.error('提交失败!');
                    }
                })


         
        


     },
     updateDB(name) {
      this.$refs[name].validate((valid) => {
                    if (valid) {
                         this.$api.editActivity(this.allData).then(()=>{
                           this.$Message.success("编辑成功！")
                         });
      
                    } else {
                        this.$Message.error('提交失败!');
                    }
                })
      

    },
    isSure() {
      if (this.yips === "hddx") {
        let id = this.iRows.id;
        let name = this.iRows.name;
        if (id) {
          this.allData.targetName = name;
          this.allData["activityTarget"] = id;
        } else {
          this.$Message.warning("未选择");
        }
      } else if (this.yips === "gzzh") {
        let id = this.iRows.groupNo;
        let name = this.iRows.groupName;
        if (id) {
          this.allData.groupName = name;
          this.allData["groupNo"] = id;
        } else {
          this.$Message.warning("未选择");
        }
      }
    },
    slRow(i) {
      //    console.log(i)
      this.iRows = i;
    },
    //活动对象
    async userGroup_list(bs) {
      if (bs) {
        this.yips = bs;
      }
      if (this.yips === "hddx") {
        this.title = "活动对象";
        this.columns1 = [
          {
            title: "ID",
            key: "id"
          },
          {
            title: "编号",
            key: "code"
          },
          {
            title: "名称",
            key: "name"
          }
        ];
        var { data, page } = await this.$api.userGroup_list(this.aObject);
      } else if (this.yips === "gzzh") {
        this.title = "规则组合";
        this.columns1 = [
          {
            title: "组合编号",
            key: "groupNo"
          },
          {
            title: "组合名称",
            key: "groupName"
          }
        ];
        var { data, page } = await this.$api.rule_list(this.aObject);
      }
      this.data1 = data;
      (this.aObject.pageSize = page.pageSize), (this.total = page.total);
      this.show1 = true;
    },
    //分页
    ipage(i) {
      if (this.yips === "hddx") {
        this.aObject.pageNum = i;
      } else if (this.yips === "gzzh") {
        this.aObject.current = i;
      }

      this.userGroup_list();
    },
    aa() {
      alert(1111);
    },
    async init() {
      let { data } = await this.$api.findActivity({
        activityNo: this.updateData.activityNo
      });
      this.allData = data;
      this.time = [data.startTime,data.endTime]

      //    console.log(this.allData)
    }
  }
};
</script>

<style lang="scss" scoped>
.imain {
  width: 500px;
  margin-left: 100px;
}
</style>


