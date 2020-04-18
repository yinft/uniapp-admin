<template>	
<view>
	<view class="cu-bar bg-blue">
		<view class="content">
			登录
		</view>
	</view>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row ">
			<button type="primary" class="primary" style="background-color: #007AFF;" @click="login">登录</button>
		</view>
	</view>
</view>
</template>

<script>
	import mInput from '../../components/m-input.vue'
	import {
		login
	}
	from '../../api/login.js'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
			}
		},
		onLoad() {
			let token = getApp().globalData.token;
			if (token !== undefined && token !== null && token.startsWith('Bearer')) {
				console.log("test")
				uni.redirectTo({
					url: '/pages/report/reportHome'
				});
			} else {
				//#ifdef APP-PLUS
				setTimeout(() => {
					plus.navigator.closeSplashscreen();
				}, 500);
				//#endif
			}
		},
		methods: {
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 // * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			login() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account === "") {
					uni.showToast({
						icon: 'none',
						title: '请填写账号'
					});
					return;
				}
				if (this.password === "") {
					uni.showToast({
						icon: 'none',
						title: '请填写密码'
					});
					return;
				}
				uni.showLoading({
					title: '正在登录...',
					mask: true
				});
				this.loginByPassword();
			},
			loginByPassword() {
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					userFlag: "1",
					loginname: this.account,
					password: this.$utils.Encrypt(this.password)
				};
				console.log(data.password, "密码")
				login(data).then(res => {
					uni.hideLoading();
					if (res.data.success === 1) {
						this.$utils.login(res.data.token)
					} else {
						if (res.data.errorMsg !== undefined && res.data.errorMsg !== null && res.data.errorMsg !== '') {
							uni.showToast({
								title: res.data.errorMsg,
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: '登录失败，请稍后重试',
								icon: 'none'
							})
						}

					}

				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: '请求错误',
						icon: 'none'
					})

				})

			}
		},
		onReady() {
			this.initPosition();
		}
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	/*每个页面公共css */
	/* page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
	} */

	/* #ifdef MP-BAIDU */
	/* page {
		width: 100%;
		height: 100%;
		display: block;
	} */

	/* swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	} */

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding-left: 10px;
		padding-right: 10px;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}

	.input-row .title {
		width: 72px;
		padding-left: 15px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 25px;
		padding: 10px;
	}

	button.primary {
		background-color: #0faeff;
	}
</style>
