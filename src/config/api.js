import fetch from './fetch.js'


/**
 * list->活动管理
 * @param {*} params 
 */
const activityList =  params=>{
  return fetch({
    url:'/active/activity/activityList',
    method:'post',
    params
  })
}

/**
 * del->活动管理
 * @param {*} params 
 */
const deleteActivity =  params=>{
  return fetch({
    url:'/active/activity/deleteActivity',
    method:'post',
    params
  })
}

/**
 * edit->活动管理
 * @param {*} params 
 */
const findActivity =  params=>{
  return fetch({
    url:'/active/activity/findActivity',
    method:'post',
    params
  })
}

/**
 * 奖励发放记录
 * @param {*} params 
 */
const listRecord =  params=>{
  return fetch({
    url:'/listRecord',
    method:'post',
    params
  })
}



//活动对象列表
const userGroup_list =  params=>{
  return fetch({
    url:'/active/userGroup/list',
    method:'post',
    params
  })
}


/**
 * 编辑活动管理
 * @param {*} params 
 */
const editActivity =  params=>{
  return fetch({
    url:'/active/activity/updateActivity',
    method:'post',
    params
  })
}

//规则组合列表
const rule_list =  params=>{
  return fetch({
    url:'/active/rule/list',
    method:'post',
    params
  })
}


/**
 * 删除记录
 * @param {*} params 
 */

const del_rule = params=>{
  return fetch({
    url:'/active/rule/delete',
    method:'post',
    params
  })
}

/**
 * 查找记录
 * @param {*} params 
 */

const findGroup = params=>{
  return fetch({
    url:'/active/rule/query',
    method:'post',
    params
  })
}

/**
 * 名称列表
 * @param {*} params 
 */

const Group_list = params=>{
  return fetch({
    url:'/listFunc',
    method:'post',
    params
  })
}

/**
 * 复制规则组合
 * @param {*} params 
 */

const rule_save = data => {
  return fetch({
    url:'/active/rule/save',
    method:'post',
    data
  })
}

/**
 * 复制规则组合
 * @param {*} params 
 */

const update_save = data => {
  return fetch({
    url:'/active/rule/update',
    method:'post',
    data
  })
}

/**
 * 添加活动
 * @param {*} params 
 */
const addActivity =  params=>{
  return fetch({
    url:'/active/activity/addActivity',
    method:'post',
    params
  })
}

const selectAwards =  params=>{
  return fetch({
    url:'/active/award/selectAwards',
    method:'post',
    params
  })
}

const delAward =  params=>{
  return fetch({
    url:'/active/award/delAward',
    method:'post',
    params
  })
}

const loadSelect =  params=>{
  return fetch({
    url:'/active/dict/loadSelect',
    method:'post',
    params
  })
}


const addAward = data=>{
  return fetch({
    url:'/active/award/addAward',
    method:'post',
    data
  })
}
const editAward = data=>{
  return fetch({
    url:'/active/award/editAward',
    method:'post',
    data
  })
}


const award_reshow = params =>{
  return fetch({
    url:'/active/award/reshow',
    method:'post',
    params
  })
}
const award_delAward = params =>{
  return fetch({
    url:'/active/award/delAward',
    method:'post',
    params
  })
}

/**
 * 查询功能列表
 * @param {*} params 
 */
const listFunc =  params=>{
  return fetch({
    url:'/listFunc',
    method:'post',
    params
  })
}

/**
 * 删除一条列表
 */
const delFunc = params => {
  return fetch({
    url: '/delFunc',
    method: 'get',
    params
  })
}

/**
 * 获取功能对应的功能点
 */

// const loadSelect = params => {
//   return fetch({
//     url: '/active/dict/loadSelect',
//     method: 'post',
//     params
//   })
// }
 
/**
 * 加载所有类型字典
 */
const loadFunPoint = params => {
  return fetch({
    url: '/active/dict/loadFunPoint',
    method: 'get',
    params
  })
}

/**
 * 保存功能信息
 */
const saveFunc = params => {
  return fetch({
    url: '/saveFunc',
    method: 'post',
    params
  })
}

/**
 * 功能添加回显
 */
const getFunc = params => {
  return fetch({
    url: '/getFunc',
    method: 'get',
    params
  })
}

/**
 * 更新功能信息
 */
const updateFunc = params => {
  return fetch({
    url: '/updateFunc',
    method: 'post',
    params
  })
}

const openActivity = params => {
  return fetch({
    url: '/active/activity/openActivity',
    method: 'post',
    params
  })
}



 
const apiList = {
  activityList,
  findActivity,
  deleteActivity,
  listRecord,
  userGroup_list,
  rule_list,
  del_rule,
  rule_save,
  update_save,
  findGroup,
  Group_list,
  addActivity,
  editActivity,
  selectAwards,
  delAward,
  addAward,
  award_reshow,
  award_delAward,
  editAward,
  listFunc,
  delFunc,
  loadFunPoint,
  loadSelect,
  saveFunc,
  updateFunc,
  getFunc,
  openActivity
}

export default apiList
