<template>
	<view>
		<view class="status-bar">
			<view class="navigation-bar">
				<view class="left">
					<view v-if="!isShowBack" class="image-view"></view>
					<view v-if="isShowBack" class="image-view" @click="navigateBack()">
						<image class="image-view-img" src="/static/mine/back.png"></image>
					</view>
				</view>
				<view class="title">
					<slot name="title"></slot>
				</view>
				<view v-if="!isShowMore" class="right" style="padding-right: 10px;">
					<slot name="menu"></slot>
				</view>
				<view v-if="isShowMore" class="right">
					<slot name="menu"></slot>
				</view>
			</view>
		</view>
		<view class="status-bar-cover"></view>
		<view class="navigation-bar-cover"></view>
	</view>
</template>

<script>
	export default {
		name: 'custom-navigation-bar',
		props: {
			isShowBack: {
				type: Boolean,
				default: true
			},
			isShowMore: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			navigateBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped>
	.status-bar {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1024;
		width: 100%;
		padding-top: var(--status-bar-height);
		background-image: linear-gradient(to right, #198cff, #2f67eb);
	}

	.navigation-bar {
		width: 100%;
		height: 44px;
		color: #ffffff;
	}

	.status-bar-cover {
		width: 100%;
		height: var(--status-bar-height);
	}

	.navigation-bar-cover {
		width: 100%;
		height: 44px;
	}

	.navigation-bar>.left {
		display: inline-block;
		vertical-align: middle;
		text-align: left;
		width: 25%;
		height: 44px;
		line-height: 44px;
		font-size: 14px;
	}

	.navigation-bar>.left>.image-view {
		display: inline-block;
		height: 44px;
		padding: 0 17px;
	}

	.navigation-bar>.left>.image-view>.image-view-img {
		width: 10px;
		height: 18px;
		display: block;
		margin-top: 13px;
	}

	.navigation-bar>.title {
		display: inline-block;
		vertical-align: middle;
		text-align: center;
		width: 50%;
		height: 44px;
		line-height: 44px;
		font-size: 16px;
	}

	.navigation-bar>.right {
		display: inline-block;
		vertical-align: middle;
		text-align: right;
		width: 25%;
		height: 44px;
		line-height: 44px;
		font-size: 14px;
	}
</style>
