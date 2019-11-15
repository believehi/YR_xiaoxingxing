<template>
	<view class="content">
		<!-- 作品 -->
		<view class="main" v-for="(item,index) in videolist" :key="index">
			<view class="uni-item">
				<video controls :src="item.Video" :id="item.ID" @fullscreenchange="fullchange($event, index)"></video>
				<view class="aaaa" @tap="bofan(item.ID, index)">
					<image :src="item.Pic" mode=""></image>
				</view>
			</view>
		</view>
		<view class="inif-on" v-if="videolist.length == 0">暂无视频</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	var dateUtils = require('../../common/util.js').dateUtils;
	export default {
		data() {
			return {
				vId: '',
				vContext: '',
				imgindex: true,
				videoContext: [],
				videolist: [],
				num: 10,
				pxid:''
			}
		},
		onLoad(e) {
			this.pxid = e.pxid;
			helper.islogin(true); //判断是否登录
			this.getpxsp();
		},
		onReady() {
			this.vContext = uni.createVideoContext(this.vId);
		},
		// 下拉刷新
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			this.getpxsp();
		},
		//触底事件
		onReachBottom() {
			var tas1 = new String('5'); //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.getpxsp();
		},
		methods: {
			//作品里面播放视频
			bofan(mid, index) {
				this.imgindex = false;
				this.vContext = uni.createVideoContext(mid);
				this.vContext.play();
				this.vContext.requestFullScreen({
					direction: 0
				});
			},
			fullchange(e, index){
				if(e.detail.fullScreen == false) {
					this.imgindex = true;
					this.vContext.stop();
				}
			},
			getpxsp() {
				// uni.showLoading({
				// 	mask: true,
				// 	title: '加载中...'
				// });
				uni.request({
					url: helper.websiteUrl + 'signuup/getvideolist',
					method: 'POST',
					data: helper.postdata({
						page:1,
						num:100,
						pxid:this.pxid
					}),
					success: res => {
						if (res.data.code == 200) {
							this.videolist = res.data.data;
							if(this.videolist){
								for(var i = 0;i<this.videolist.length;i++){
									this.videolist[i].Pic = helper.updurl(this.videolist[i].Pic);
									this.videolist[i].Video = helper.updurl(this.videolist[i].Video);
								}
							};
							uni.hideLoading();
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
			},
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #eeeeee;
	}
	
	.inif-on {
		font-size: 36upx;
		color: #666;
		text-align: center;
		line-height: 100upx;
	}
	
	.content {
		display: table;
		width: 100%;
		margin-top: 15upx;
	}
	
	.main {
		display: inline-block;
		width: 50%;
		height: 240upx;
		box-sizing: border-box;
		padding: 0 15upx;
	}
	
	.main-init {
		height: 1upx;
	}
	
	.uni-item {
		position: relative;
		background: #FFFFFF;
		width: 100%;
		height: 100%;
	}

	.uni-item video {
		width: 100%;
		height: 100%;
		/* display: none; */
	}

	.aaaa {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.aaaa image {
		width: 100%;
		height: 100%;
	}

</style>
