<template>
	<view class="custom-picker">
		<view class="custom-picker-mask"></view>
		<view class="custom-picker-content">
			<view class="custom-picker-bar-view">
				<text style="float: left;" @click="cancel()">取消</text>
				<text style="float: right;color: #2780ff;" @click="confirm()">确定</text>
			</view>
			<picker-view v-if="mode==='region'" :value="region.currentIndex" @change="regionChange" class="custom-picker-view">
				<picker-view-column>
					<view class="custom-picker-item" v-for="(item,index) in region.provinceData" :key="index">
						<text class="custom-picker-item-text">{{item.label}}</text>
					</view>
				</picker-view-column>
				<picker-view-column>
					<view class="custom-picker-item" v-for="(item,index) in region.cityData" :key="index">
						<text class="custom-picker-item-text">{{item.label}}</text>
					</view>
				</picker-view-column>
				<picker-view-column>
					<view class="custom-picker-item" v-for="(item,index) in region.areaData" :key="index">
						<text class="custom-picker-item-text">{{item.label}}</text>
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	import provinces from './region-data/province.js';
	import citys from './region-data/city.js';
	import areas from './region-data/area.js';
	export default {
		props: {
			mode: {
				type: String,
				default: "region"
			},
			value: {
				type: Array,
				default () {
					return ['北京市', '市辖区', '东城区'];
				}
			},
		},
		data() {
			return {
				region: {
					provinceData: [],
					cityData: [],
					areaData: [],
					currentIndex: [0, 0, 0]
				}
			}
		},
		mounted() {
			if (this.mode === "region") {
				this.initRegionData();
			}
		},
		methods: {
			cancel() {
				this.$emit("cancel");
			},
			confirm() {
				if (this.mode === "region") {
					this.$emit(
						"confirm",
						this.region.provinceData[this.region.currentIndex[0]].label,
						this.region.cityData[this.region.currentIndex[1]].label,
						this.region.areaData[this.region.currentIndex[2]].label
					);
				}
			},
			initRegionData() {
				let province = this.value[0];
				let city = this.value[1];
				let area = this.value[2];
				this.region.provinceData = provinces;
				for (let i = 0; i < this.region.provinceData.length; i++) {
					if (this.region.provinceData[i].label === province) {
						this.region.currentIndex[0] = i;
						break;
					}
				}
				this.region.cityData = citys[this.region.currentIndex[0]];
				for (let j = 0; j < this.region.cityData.length; j++) {
					if (this.region.cityData[j].label === city) {
						this.region.currentIndex[1] = j;
						break;
					}
				}
				this.region.areaData = areas[this.region.currentIndex[0]][this.region.currentIndex[1]];
				for (let k = 0; k < this.region.areaData.length; k++) {
					if (this.region.areaData[k].label === area) {
						this.region.currentIndex[2] = k;
						break;
					}
				}
			},
			regionChange(event) {
				let currentIndex = event.detail.value;
				if (currentIndex[0] !== this.region.currentIndex[0]) {
					this.region.cityData = citys[currentIndex[0]];
					this.region.areaData = areas[currentIndex[0]][currentIndex[1]];
					this.region.currentIndex[0] = currentIndex[0];
					this.region.currentIndex[1] = 0;
					this.region.currentIndex[2] = 0;
				} else if (currentIndex[1] !== this.region.currentIndex[1]) {
					this.region.areaData = areas[currentIndex[0]][currentIndex[1]];
					this.region.currentIndex[0] = currentIndex[0];
					this.region.currentIndex[1] = currentIndex[1];
					this.region.currentIndex[2] = 0;
				} else if (currentIndex[2] !== this.region.currentIndex[2]) {
					this.region.currentIndex = currentIndex;
				}
			}
		}
	}
</script>

<style scoped>
	.custom-picker {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 1110;
	}

	.custom-picker-mask {
		height: 60%;
		background-color: rgba(0, 0, 0, 0.45);
	}

	.custom-picker-content {
		height: 40%;
		background-color: #ffffff;
		font-size: 32upx;
		color: #333333;
	}

	.custom-picker-bar-view {
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		padding: 0 40upx;
		border-bottom: 1upx solid #d9d9d9;
	}

	.custom-picker-view {
		height: calc(100% - 100upx);
	}

	.custom-picker-item {
		position: relative;
	}

	.custom-picker-item-text {
		position: absolute;
		top: 50%;
		transform: translateY(-50%%);
		-webkit-transform: translateY(-50%);
		width: 100%;
		text-align: center;
	}
</style>
