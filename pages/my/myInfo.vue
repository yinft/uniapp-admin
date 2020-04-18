<template>
	<view class="action">
		
		<cu-custom bgColor="bg-blue" :isBack="false"><block slot="content">统计系统移动应用</block>
		</cu-custom>
		<view class="bg-white padding-lr">
		<view class="solids-bottom padding-xs flex align-center">
			<view class="flex-sub text-center">
				<view class="solid-bottom text-xl padding">
					<text class="text-black text-bold">用户个人信息</text>
				</view>
			</view>
		</view>
		
		<form>
			<view class="cu-form-group margin-top" >
				<view class="title">姓名:</view>
				<input  name="input" disabled="false">{{userInfo.name}}</input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话:</view>
				<input name="input" disabled="false">{{userInfo.phone}}</input>
			</view>
			<view class="cu-form-group">
				<view class="title">职务:</view>
				<input name="input" disabled="false">{{userInfo.position}}</input>
			</view>
			</form>
		
		</view>
	</view>
</template>

<script>
	import {
		login
	} from '../../api/login.js'
	export default {
		data() {
			return {
				userInfo:{
					name:'张三',
					phone:'110119120',
					position:'会计'
				},
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
