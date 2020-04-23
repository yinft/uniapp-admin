import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		notify: false
	},
	mutations: {
		SET_NOTIFY (state, notify) {
			state.notify = notify
		}
	},
	actions: {
	}
})

export default store
