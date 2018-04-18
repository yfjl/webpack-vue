// 引用模板
import Vue from 'vue'
import Router from 'vue-router'
// import index from ''
Vue.use(Router)

const homePage = () => import('../views/home.vue')
// const index = () => import('../views/index.vue')

const record = () => import('../views/record/list.vue')

const activeAdd = () => import('../views/activeManage/add.vue')
const activeList = () => import('../views/activeManage/list.vue')
const ruleAdd = () => import('../views/ruleManage/add.vue')
const ruleList = () => import('../views/ruleManage/list.vue')

const funAdd = () => import('../views/funManage/add/add.vue')
const funList = () => import('../views/funManage/list/list.vue')
const awardAdd = () => import('../views/awardManage/add.vue')
const awardList = () => import('../views/awardManage/list.vue')



const router = new Router({
  routes: [
    {
      path: '/',
      component: homePage,
      redirect: '/activeList',
      children: [
        {
          path: '/record',
          name: '/record',
          meta: {
            pname: '奖励发放',
            cname: '奖励发放列表'
          },
          component: record
        },
        {
          path: '/activeAdd',
          name: '/activeAdd',
          meta: {
            pname: '活动管理',
            cname: '活动管理添加'
          },
          component: activeAdd
        },
        {
          path: '/activeList',
          name: '/activeList',
          meta: {
            pname: '活动管理',
            cname: '活动管理列表'
          },
          component: activeList
        },

        {
          path: '/ruleAdd',
          name: '/ruleAdd',
          meta: {
            pname: '规则组合管理',
            cname: '规则组合添加'
          },
          component: ruleAdd
        },
        {
          path: '/ruleList',
          name: '/ruleList',
          meta: {
            pname: '规则组合管理',
            cname: '规则组合列表'
          },
          component: ruleList
        },
        {
          path: '/funAdd',
          name: '/funAdd',
          meta: {
            pname: '触发功能管理',
            cname: '触发功能添加'
          },
          component: funAdd
        },
        {
          path: '/funList',
          name: '/funList',
          meta: {
            pname: '触发功能管理',
            cname: '新增触发列表'
          },
          component: funList
        },
        {
          path: '/awardAdd',
          name: '/awardAdd',
          meta: {
            pname: '奖励明细管理',
            cname: '奖励明细添加'
          },
          component: awardAdd
        },
        {
          path: '/awardList',
          name: '/awardList',
          meta: {
            pname: '奖励明细管理',
            cname: '奖励明细列表'
          },
          component: awardList
        }
      ]
    }
  ]
})

export default router
