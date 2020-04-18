<template>
	<view >
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">统计系统移动应用</block>
		</cu-custom>
		<view class="cu-list menu-avatar">
			<view class="cu-item" @click="toReportPage">
				<view class="cu-avatar round lg" style="background-image:url(../../static/notice.png);"></view>
				<view class="content">
					<view class="text-grey">北京市邮政管理局</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">							
							请按规定及时填报，国邮定2.1表（201909）
						</view> </view>
				</view>
				<view class="action">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(../../static/notice.png);">
				</view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">南京市邮政管理局</view>
						
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。
						</view>
					</view>
				</view>
				<view class="action">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
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
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				login().then(res => {
					console.log(JSON.stringify(res) + "测试")
				}).catch(err => {
					console.log(err)
				});
			},
			toReportPage(pkid){
				uni.navigateTo({
					url:`/pages/report/reportPage`
				})
				
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
