<template>
	<view></view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onLoad() {
			let token = getApp().globalData.token;
			console.log("打印token",token)
			if (token !== undefined && token !== null && token.startsWith('Bearer')) {
				uni.switchTab({
					url: '/pages/report/reportHome'
				});
			} else {
				uni.redirectTo({
					url: '/pages/login/login'
				});
			}
		},
		methods: {}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>
