import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import main from './main.js'

let store = new Vuex.Store({
  modules: {
    main
  }
})

export default store