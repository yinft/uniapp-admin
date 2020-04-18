<script>
	import Vue from 'vue'
	export default {
		globalData: {
			token: uni.getStorageSync('token'),
		},
		onLaunch() {
			console.log('APP启动');
			uni.getSystemInfo({
			        success: function(e) {
			            // #ifndef MP
			            Vue.prototype.StatusBar = e.statusBarHeight;
			            if (e.platform == 'android') {
			                Vue.prototype.CustomBar = e.statusBarHeight + 50;
			            } else {
			                Vue.prototype.CustomBar = e.statusBarHeight + 45;
			            };
			            // #endif
			            // #ifdef MP-WEIXIN
			            Vue.prototype.StatusBar = e.statusBarHeight;
			            let custom = wx.getMenuButtonBoundingClientRect();
			            Vue.prototype.Custom = custom;
			            Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			            // #endif       
			            // #ifdef MP-ALIPAY
			            Vue.prototype.StatusBar = e.statusBarHeight;
			            Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
			            // #endif
			        }
			    })
			//#ifdef APP-PLUS
			setTimeout(() => {
				plus.navigator.closeSplashscreen();
			}, 6000);
			//#endif
		},
		onShow() {
			console.log('APP显示');
		},
		onHide() {
			console.log('APP隐藏');
		}
	}
</script>

<style>
	@import "components/colorui/main.css";
	@import "components/colorui/icon.css";
	@import "common/main.css";
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}
	/* #endif */


</style>
