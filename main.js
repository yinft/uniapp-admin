import Vue from 'vue'
import App from './App'
import helper from './common/helper.js';
import './mixin'

import store from './store/index.js'
Vue.prototype.$store = store


Vue.config.productionTip = false;
Vue.prototype.$baseUrl = helper.baseUrl;

import Request from './components/request/index'
Vue.prototype.$http = Request();

import utils from './common/utils.js'
Vue.prototype.$utils = utils;

import voicePlay from './common/voice-play.js'
Vue.prototype.$voicePlay = voicePlay;

import cuCustom from './components/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)


App.mpType = 'app';
const app = new Vue({
	...App
});
app.$mount();
