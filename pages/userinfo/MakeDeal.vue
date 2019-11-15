<template>
	<view class="content">
		<view class="cart" :hidden="iscart">
			<view>暂无订单记录</view>
		</view>
		<view class="uni-dd-list" :hidden="!iscart">
			<!-- 年份 -->
			<view class="uni-content-box" v-for="(item,index) in list" :key="index">
				<view class="uni-riqi">
					{{item.CreateTime}}
				</view>
				<view class="uni-content">
					<text class="uni-title">{{item.Details}}</text>
					<text class="uni-num">x{{item.Amount}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="uni-dd-list">
			年份
			<view class="uni-time">
				2019年4月
			</view>
			<view class="uni-content-box">
				<view class="uni-riqi">
					2019年4月28日
				</view>
				<view class="uni-content">
					<text class="uni-title">萨达萨达11</text>
					<text class="uni-num">x1</text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				list: {},//保存列表信息
				iscart: false
			}
		},
		onShow() {
			this.orderlist();
			helper.islogin(true);
		},
		methods: {
			orderlist() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'shop/orderlist',
					method: 'POST',
					data: helper.postdata({
						page: '1',
						num: '1000'
					}),
					success: res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							this.list = res.data.data.baseinfo;
							if (this.list.length > 0) {
								this.iscart = true;
							} else {
								this.iscart = false;
							}
						} else {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							if(res.data.info == "未找到登录信息") {
								uni.reLaunch({
									url: '/pages/login/login'
								});
							}
						}
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请重试！'
						});
					},
				});
			}
		}

	}
</script>

<style>
	page {
		width: 96%;
		height: 100%;
		background: #eeeeee;
		padding: 0 2%;
	}

	.content {
		padding-top: 10upx;
	}

	.cart {
		text-align: center;
		margin-top: 10%;
		font-size: 30upx;
	}

	.uni-time {
		font-size: 32upx;
		margin: 10upx 0;
		padding-left: 10upx;
	}

	.uni-content-box {
		margin-bottom: 10upx;
		background: #FFFFFF;
		border: 1upx solid #eeeeee;
	}

	.uni-riqi {
		padding: 2% 3%;
		color: #666666;
		font-size: 26upx;
		border-bottom: 1upx solid #eeeeee;
	}

	.uni-content {
		padding: 5% 3%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.uni-title {
		font-size: 32upx;
		color: #000000;
	}

	.uni-num {
		font-size: 28upx;
		color: #666666;
	}
</style>
