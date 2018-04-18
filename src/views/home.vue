
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu @on-select="change" theme="dark" width="auto" :open-names="['1']">
                <div v-for="(item,index) of menu" :key="index">
                    <div v-if="item.children.length>0">
                        <Submenu :name="index">
                            <template slot="title">
                                <Icon :type="item.icon"></Icon>
                                {{item.name}}
                            </template>
                            <MenuItem v-for="list of item.children" :name="list.path">{{list.name}}</MenuItem>
                        </Submenu>
                    </div>
                    <div v-else>
                        <MenuItem :name="item.path">
                        <Icon :type="item.icon"></Icon>
                        <span>{{item.name}}</span>
                        </MenuItem>
                    </div>
                </div>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff',fontSize:'30px',textAlign:'center', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">活动管理系统</Header>
            <Content :style="{padding: '0 16px 16px'}">
                <div class="brand">
                    <Breadcrumb>
                        <BreadcrumbItem>{{pname}}</BreadcrumbItem>
                        <BreadcrumbItem>{{cname}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <Card>
                    <div >

                        <router-view class="main"></router-view>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
import menu from '../router/menu'

export default {
  data() {
    return {
      name: '',
      menu: menu,
      pname: '活动管理',
      cname: '活动管理列表'
    }
  },
  watch: {
    $route(to, from) {
      this.pname = to.meta.pname
      this.cname = to.meta.cname
    }
  },
  methods: {
    change(name) {
      this.$router.push({ name: name })
    }
  }
}
</script>



<style lang="scss"   scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.brand {
  padding: 10px 0;
}
.main {
  min-height: 464px;
}
</style>


