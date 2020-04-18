<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :hasNotify="true">
			<block slot="backText">返回</block>
			<block slot="content">统计系统移动应用</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in reportList" :key="index"
				 @click="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="content">
			<view class="flex-sub text-center">
				<view class="solid-bottom text-lg" style="padding-bottom: 30rpx;padding-top:15rpx ;">
					<text class="text-black">国邮定2.1快递服务企业业务量及收入表</text>
				</view>
				<view style="padding-bottom: 30rpx;font-size: 13px;">公司名称：民航快递有限公司天津分公司</view>
				<view style="padding-bottom: 30rpx;font-size: 13px;">日期：2019年9月</view>
			</view>
			<view class="genaral-area">

				<view class="flex-box tc thead">

					<view class="item-4">指标名称</view>

					<view class="item-4">单位</view>

					<view class="item-4">指标代码</view>

					<view class="item-4">
						<view class="flex">
							<view v-show="left" class="flex-sub" style="color: #007AFF;" @click="last">
								< </view> 
							<view class="flex-eight">{{tableData[index]}}</view>
							<view v-show="right" class="flex-sub" style="color: #007AFF;" @click="next"> > </view>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in reportHomeList" :key="index">
					<view class="flex-box table tc">
						<view class="item-4">
							{{item.name}}
						</view>
						<view class="item-4">
							{{item.unit}}
						</view>
						<view class="item-4">
							{{item.code}}
						</view>
						<view class="item-4">
							<view>
								{{item.data}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {

	} from '../../api/login.js'
	export default {
		data() {
			return {
				index: 0,
				right: true,
				left: false,
				tableData: ["本期数据","上期数据","同比增长","本年累计"],
				reportHomeList: [{
						name: "国内同城快递业务量",
						unit: "件",
						code: "01",
						data: 100
					},
					{
						name: "国内异地快递业务量",
						unit: "件",
						code: "02",
						data: 200
					},
				],
				reportList: ['月报', '季报', '半年报', '年报'],
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				TabCur: 0,
				scrollLeft: 0
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {

			},
			last() {
				this.index--;
				if(this.index===0){
					this.right = true;
					this.left = false;
				}else{
					this.right = true;
					this.left = true;
				}
				console.log(this.index,"last")
			},
			next() {
				this.index++;
				if (this.index === 3) {
					this.right = false;
					this.left = true;
				}else{
					this.right = true;
					this.left = true;
				}
				console.log(this.index,"index")
			},
			tabSelect(e) {
				console.log(e, "eeeeeeeeee")
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			toNoReport(pkid) {
				uni.navigateTo({
					url: `/pages/report/noReportList?pkid=${pkid}`
				})

			}
		}
	}
</script>


<style lang="scss">
	$color:#e0e0e0;

	.content {

		display: flex;

		flex: 1;

		flex-direction: column;

		// padding-top: 50rpx;
		margin: 20rpx;

		// background-color: #fbf9fe;

	}



	.flex-box {

		display: flex;

		flex-wrap: wrap;

	}


	.flex-sub {
		flex: 1;
	}

	.flex-eight {
		flex: 8;
	}


	.flex-box>.item-4 {

		flex: 0 0 25%;

	}



	.title {

		margin: 20upx 0;

		color: red;

	}

	.data {
		font-size: 15px;
		background-color: #ffffff;
		border-style: solid;
		border-width: 1rpx;
	}


	//普通表格

	.genaral-area {

		.item-4 {

			font-size: 26upx;
			padding: 16upx 0;
			box-sizing: border-box;
			text-align: center;



			&:first-child {

				border-left-width: 1upx;

			}



			&:last-child {

				border-right-width: 1upx;

			}

		}



		.thead {

			.item-2 {

				font-weight: bold;



				box-sizing: border-box;

			}

		}



		.table {

			&:last-child {

				border-bottom: 1upx solid $color;

			}



			.item-4 {

				display: flex;

				justify-content: center;

				align-items: center;

				box-sizing: border-box;

			}

		}

	}





	// 多行合并表格

	.advance-area {

		.item-3 {

			font-size: 26upx;

			border: 1upx solid $color;

			border-width: 1upx 1upx 0 0;

			box-sizing: border-box;

			text-align: center;



			&:first-child {

				border-left-width: 1upx;

			}



			&:last-child {

				border-right-width: 1upx;

			}

		}



		.thead {

			.item-3 {

				font-weight: bold;

				padding: 16upx 0;

				box-sizing: border-box;

			}

		}



		.table {

			&:last-child {

				border-bottom: 1upx solid $color;

			}



			.item-3 {

				display: flex;

				justify-content: center;

				align-items: center;

				box-sizing: border-box;

			}

		}



		.table-flex {

			flex: 1;



			.item {
				border-bottom: 1upx solid $color;
				padding: 10upx 0;
				box-sizing: border-box;

				&:last-child {

					border-width: 0;
				}
			}
		}
	}
</style>
