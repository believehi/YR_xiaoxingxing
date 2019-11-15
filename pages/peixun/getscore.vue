<template>
	<view class="content">
		<view class="title">
			{{pxname}}
		</view>
		<view class="fs-text" v-show="scorelist.length == 0">
			暂无数据
		</view>
		<view class="main" v-for="(item,index) in scorelist" :key="index">
			<view class="list">
				<view class="list-in">{{item.Contents}}</view>
				<view class="list-on">{{item.Result}}分</view>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				pxid:'',
				pxname:'',
				scorelist:[]
			}
		},
		onLoad(e) {
			this.pxid = e.pxid; //接收课程的id
			this.pxname = e.pxname
			helper.islogin(true);
			this.getscore();
		},
		onShow() {
			this.pxid = this.pxid; //接收课程的id
		},
		methods: {
			getscore(){
				uni.showLoading({
					mask: true,
					title: '查询中...'
				});
				uni.request({
					url: helper.websiteUrl + 'signuup/getscore',
					method: 'POST',
					data: helper.postdata({
						pxid: this.pxid,
						studentid: helper.getstate().userid,
						page:1,
						num:100
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.scorelist = res.data.data.baseinfo;
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
		width: 100%;
		height: 100%;
		color: #333;
		background: #eee;
	}
	.content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		color: #333;
	}
	
	.title {
		line-height: 150upx;
		text-align: center;
		font-weight: 600;
		background: #fff;
	}
	
	.fs-text {
		font-size: 36upx;
		color: #999;
		text-align: center;
		line-height: 100upx;
	}

	.main {
		/* padding: 20upx; */
	}

	.list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 8upx;
		line-height: 80upx;
		font-size: 34upx;
	}

	.list-in {
		width: 500upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}

	.list-on {
		
	}

</style>
