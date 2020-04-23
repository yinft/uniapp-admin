<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" :class="isBack ? '' : 'hidden'" @tap="BackPage">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<view class="notify" :class="hasNotify ? 'active' : ''" @click="toUrgeList">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hasNotify: false
			};
		},
		name: 'cu-custom',
		computed: {
			...mapState(['notify']),
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			}
		},
		methods: {
			toUrgeList(){
			uni.navigateTo({
				url:"/pages/my/urgeList"
			})	
			},
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		watch: {
			notify () {
				this.hasNotify = this.notify
			}
		}
	}
</script>

<style lang="scss">
.hidden {
	visibility: hidden;
	pointer-events: none;
}
.notify {
	position: relative;
	margin-right: 15px;
	width: 48rpx;
	height: 48rpx;
	background: url(../../../static/notice2.png) center / contain no-repeat;
	&.active::after {
		content: '';
		display: block;
		width: 20rpx;
		height: 20rpx;
		position: absolute;
		top: -4rpx;
		right: -4rpx;
		background: #ff0000;
		border-radius: 50%;
	}
}
</style>
