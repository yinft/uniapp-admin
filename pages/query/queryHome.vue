<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="false" :hasNotify="true">
			<block slot="content">统计系统移动应用</block>
			<block slot="right">
				<view class="action">
					<image style="width: 30px;height: 30px;" src="../../static/home-active.png"></image>
					<view class="cu-tag badge"></view>
				</view>
			</block>
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

			<view class="genaral-area">

				<view class="flex-box tc thead">

					<view class="item-2">表号</view>

					<view class="item-2">报表名称</view>


				</view>
				<view v-for="(item,index) in reportHomeList" :key="index">
					<view class="flex-box table tc">
						<view class="item-2" style="text-decoration: underline;color: #007AFF;" @click="toReportData(item.pkid)">
							{{item.num}}
						</view>
						<view class="item-2" style="text-decoration: underline;color: #007AFF;" @click="toReportData(item.pkid)">
						{{item.name}}
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
				reportHomeList: [{
					pkid:111,
					num: "国邮定2.1表",
					name: "快递服务企业业务量及收入表",
				}, ],
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
			tabSelect(e) {
				console.log(e, "eeeeeeeeee")
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			toReportData(pkid){
				uni.navigateTo({
					url:`/pages/query/reportData?pkid=${pkid}`
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
		
		padding-top: 50rpx;

		// background-color: #fbf9fe;

	}



	.flex-box {

		display: flex;

		flex-wrap: wrap;

	}

	.flex-box>.item-2 {

		flex: 0 0 50%;

	}


	.title {

		margin: 20upx 0;

		color: red;

	}



	//普通表格

	.genaral-area {

		.item-2 {

			font-size: 26upx;

			border: 1upx solid $color;

			border-width: 0 0 0 0;

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



			.item-2 {

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

	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
