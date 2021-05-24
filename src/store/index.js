import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {state,mutations,getters} from "./mutations"
import {actions} from "./actions"
import home from "./modules/home"


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    home
  }
})
