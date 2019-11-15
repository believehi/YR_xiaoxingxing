<template>
	<view class="content">
		<view class="list" v-for="(item, index) in baseinfo" :key="index">
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
				num: 10 ,
				mid:''
			}
		},
		onLoad(e) {
			helper.islogin(true);
			this.mid = e.pxid;
			this.fensi();
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
					url: helper.websiteUrl + 'signuup/gettbmlist',
					method: 'POST',
					data: helper.postdata({
						page: "1",
						num: this.num,
						mid:this.mid
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.baseinfo = res.data.data.baseinfo;
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							uni.hideLoading();
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
	.list {
		display: flex;
		align-items: center;
		padding: 20upx 0;
		border-bottom: 2upx solid #E6E6E6;
	}
</style>
