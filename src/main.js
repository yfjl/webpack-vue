

import Vue from 'vue'

import { Table,TableColumn,Popover,tag,Button,MessageBox,Message,Form,Row,Col,Input,Select,Option,Pagination,FormItem,Dialog,Checkbox,CheckboxGroup,Radio,RadioGroup} from 'element-ui';
import store from './store'

import App from './App'
import router from './router/routes'


console.log()

import config from './config/index'
Vue.use(config)


import iView from 'iview'
import 'icss/iview.css'

Vue.use(iView)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(tag)
Vue.use(Button)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)



Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  el: '#appIndex',
  render: h => h(App)
})
