<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
</style>
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu   @on-select="change" theme="dark"  width="auto" :open-names="['1']">
                 <MenuItem name="/index">
                        <Icon type="ios-navigate"></Icon>
                        <span>首页</span>
                </MenuItem>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        基础标签
                    </template>
                    <MenuItem name="/basePage">基础标签列表</MenuItem>
                    <MenuItem name="/addBasePage">新增基础标签</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        组合标签
                    </template>
                    <MenuItem name="/comPage">组合标签列表</MenuItem>
                    <MenuItem name="/addComPage">新增组合标签</MenuItem>
                </Submenu>
                 <Submenu name="4">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        测试
                    </template>
                    <MenuItem name="/test">测试</MenuItem>
                    <MenuItem name="/test">测试</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff',fontSize:'30px',textAlign:'center', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">用户标签管理系统</Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        
                        <router-view></router-view>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
// import slideBar from 
    export default {
        data(){
            return{
                name:'11111'
            }
        },
        computed:{
            paths(){
                return this.$router.name
            }
        },
        watch:{
            paths: function (val){
                console.log(1111)
                console.log(val)
                console.log(22222)
            }
        },
        methods:{
            change(name) {
                console.log(name)
                this.$router.push({ name: name });
            },
        }
    }
</script>






