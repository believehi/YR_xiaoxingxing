<template>
	<view class="content">
		<view class="fs-text" v-show="baseinfo.length == 0">
			暂无粉丝
		</view>
		<view class="list" v-for="(item, index) in baseinfo" :key="index">
			<view class="list-img">
				<view>
					<image :src="item.Headurl" mode=""></image>
				</view>
				<image class="title-img_icon" :src="item.Sex == 2 ? '../../static/nv.png': '../../static/lan.png'" mode=""></image>
			</view>
			<view class="list-on">
				<text>{{item.TrueName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				baseinfo: '',
				num: 10
			}
		},
		onLoad() {
			this.fensi();
			helper.islogin(true);
		},
		// 下拉刷新
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			this.fensi();
		},
		//触底事件
		onReachBottom() {
			var tas1 = new String('5'); //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.fensi();
		},
		methods: {
			fensi() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'circle/getfanslist',
					method: 'POST',
					data: helper.postdata({
						userid: helper.getstate().userid,
						page: "1",
						num: this.num
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.baseinfo = res.data.data.baseinfo;
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
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		padding: 20upx 30upx;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		color: #333;
	}
	
	.fs-text {
		font-size: 36upx;
		color: #999;
		text-align: center;
		line-height: 100upx;
	}

	.list {
		display: flex;
		align-items: center;
		padding: 20upx 0;
		border-bottom: 2upx solid #E6E6E6;
	}

	.list-img {
		position: relative;
	}

	.list-img view {
		width: 90upx;
		height: 90upx;
		overflow: hidden;
		border-radius: 50%;
		background-color: #ccc;
	}

	.list-img view image {
		width: 100%;
		height: 100%;
	}

	.title-img_icon {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 30upx;
		height: 30upx;
	}

	.list-on {
		margin-left: 30upx;
	}

	.list-on text {
		font-size: 32upx;
	}
</style>
