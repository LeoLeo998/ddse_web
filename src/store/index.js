
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getter'
import mutations from './mutation'
import actions from './action'
Vue.use(Vuex)
const store = new Vuex.Store({
    state,
	actions,
	getters,
	mutations,
	
})
export default store;