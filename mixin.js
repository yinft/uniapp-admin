import Vue from 'vue'
import store from 'store'
import Request from './components/request/index'
Vue.mixin({
  onShow () {
		Request().request({
			url: 'https://tlgcapi.zzes1314.cn/api/v1/weapp/iron',
			method: 'get'
		}).then(res => {
			if (res.data.code === 200) {
				store.commit('SET_NOTIFY', !store.state.notify)
			}
		})
	}
})