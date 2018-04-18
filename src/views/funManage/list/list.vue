<template>
  <div>
    <div class="funManage-list-wrapper">
      <div class="fun-list-header">
        <Form ref="funInline" :model="funInline" :rules="ruleInline" inline>
          <FormItem prop="funNumSearch">
            <Input type="text" v-model="funInline.funNumSearch" placeholder="功能编号" style="width: 300px">
            </Input>
          </FormItem>
          <FormItem prop="funNumName">
            <Input type="text" v-model="funInline.funNumName" placeholder="功能名称" style="width: 300px">
            </Input>
          </FormItem>
          <FormItem prop="funTypeSearch">
            <Select v-model="funTypeSearch" style="width:200px">
              <Option v-for="item in Page" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="submitSearch('funInline')">查询</Button>
          </FormItem>
        </Form>
      </div>
      <div class="fun-list-main">
        <Table border :columns="columns1" :data="funListPage"></Table>
      </div>
      <div class="fun-list-bottom">
        <Page :total="total" :page-size="10" show-elevator @on-change="pageChange"></Page>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const validateFunNum = (rule, value, callback) => {
      if(this.funInline.funNumSearch == '' && this.funInline.funNumName == '' && this.funTypeSearch == '') {
        callback(new Error('Please enter your password again'));
      } else {
        callback();
      }
    }
    return {
      // 分页
      total: 1,
      funInline: {
        funNumSearch: "",
        funNumName: ""
      },
      ruleInline: {
        funNumSearch: [
          { validator: validateFunNum, message: "功能编号不能为空", trigger: "blur" }
        ]
      },
      Page: [
        {
          value: 1,
          label: "注册"
        },
        {
          value: 2,
          label: "开户"
        },
        {
          value: 3,
          label: "充值"
        },
        {
          value: 4,
          label: "投资"
        },
        {
          value: 5,
          label: "回款"
        },
        {
          value: 6,
          label: "分享"
        },
        {
          value: 10,
          label: "预约"
        },
        {
          value: 9,
          label: "站岗"
        },
        {
          value: 11,
          label: "资格领取"
        }
      ],
      columns1: [
        {
          title: "功能编号",
          key: "funNum"
        },
        {
          title: "功能名称",
          key: "funName"
        },
        {
          title: "使用该功能活动",
          key: "usedConut"
        },
        {
          title: "功能类型",
          key: "funTypeName"
        },
        {
          title: "功能点",
          key: "funPointName"
        },
        {
          title: "功能明细",
          key: "funDetail"
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title: "操作",
          key: "edit",
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    let funNum = this.funListPage[params.index].funNum
                    this.funEdit(funNum);
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    let funNum = this.funListPage[params.index].funNum
                    this.funCopy(funNum);
                  }
                }
              }, '复制'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    let funNum = this.funListPage[params.index].funNum
                    this.funDel(funNum);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      funListPage: [],
      funTypeSearch: "",
      listFuncParams: {}
    };
  },
  methods: {
    // 复制
    funCopy(funNum) {
      this.$router.push({path: '/funAdd', query: {
        status: 'copy',
        funNum: funNum
      }});
    },
    funEdit(funNum) {
      this.$router.push({path: '/funAdd', query: {
        status: 'edit',
        funNum: funNum
      }});
    },
    funDel(funNum) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>此操作将永久删除该文件, 是否继续?</p>',
        onOk: () => {
          this.delFunc(funNum);
        }
      });
    },
    async delFunc(funNum) {
      this.listFuncParams.funNum = funNum
      let result = await this.$api.delFunc(this.listFuncParams);
      console.log(result, '---');
      if(result.code === 0) {
        this.$Message.success("删除成功!");
        this.listFunc();
      } else {
        this.$Message.error(result.msg);
      }
    },
    submitSearch(name) {
      this.$refs[name].validate( async valid => {
        if (valid) {
          let result = await this.searchFun();
          console.log(result, '00987');
          if(result.code === 0) {
            this.funListPage = result.data;
            this.$Message.success("查询成功!");
          } else {
            this.$Message.error(result.msg);
          }
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    // 查询
    async searchFun() {
      // 赋值
      this.listFuncParams.funNumSearch = this.funInline.funNumSearch;
      this.listFuncParams.funTypeSearch = this.funTypeSearch;
      let result =  await this.listFunc();
      return result;
    },
    async pageChange(pages) {
      this.listFuncParams["pageNum"] = pages;
      this.listFuncParams["pageSize"] = 10;
      await this.listFunc();
    },
    async listFunc() {
      let result = await this.$api.listFunc(this.listFuncParams);
      this.funListPage = result.data;
      this.total = result.page.total;
      return result;
    }
  },
  created() {
    this.listFunc();
  },
  mounted() {}
};
</script>
<style lang="scss" src="./list.scss" scoped>

</style>
