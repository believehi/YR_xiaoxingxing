<template>
	<view class="main">
		<view class="content">
			<!-- 留言咨询 -->
			<view class="liuyan" v-show="zxIndex == 0">
				<textarea placeholder-style="color:#666" placeholder="请输入您咨询的问题" v-model="content"></textarea>
				<button @tap="zxSub()">提&emsp;交</button>
			</view>
			<!-- 咨询列表 -->
			<view class="list" v-show="zxIndex == 1">
				<view class="fs-text" v-show="baseinfo.length == 0">
					暂无留言
				</view>
				<block v-for="(item, index) in baseinfo" :key="index">
					<view class="list-on" @tap="messdetails(item.ReplyTime, item.Question, item.Answer, item.Examine)">
						<view class="list-date">{{item.ReplyTime}}</view>
						<view class="list-bar">
							<text>{{item.Question}}</text>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="footer">
			<view :class="zxIndex == 0 ? 'list-active' : ''" @tap="lyload()">
				留言咨询
			</view>
			<view :class="zxIndex == 1 ? 'list-active' : ''" @tap="lbload()">
				咨询列表
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				zxIndex: 0,
				content: '',
				uId: '',
				num: 10,
				baseinfo: ''
			}
		},
		onLoad() {
			helper.islogin(true);
		},
		// 下拉刷新
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			this.zxlist();
		},
		//触底事件
		onReachBottom() {
			var tas1 = new String('5'); //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.zxlist();
		},
		methods: {
			// 提交留言
			zxSub() {
				if (this.content == '') {
					uni.showToast({
						icon: 'none',
						title: "输入提交内容！"
					});
					return;
				}
				uni.showLoading({
					mask: true,
					title: '提交中...'
				});
				uni.request({
					url: helper.websiteUrl + 'signuup/savemessage',
					method: 'POST',
					data: helper.postdata({
						uId: helper.getstate().userid,
						question: this.content
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: "提交完成！"
							});
							setTimeout(function() {
								uni.switchTab({
									url: 'userinfo'
								});
							}, 200);
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
			// 获取留言列表
			zxlist() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'signuup/messagelist',
					method: 'POST',
					data: helper.postdata({
						studentid: helper.getstate().userid,
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
			lyload() {
				if (this.zxIndex == 0) return
				this.zxIndex = 0;
			},
			lbload() {
				if (this.zxIndex == 1) return
				this.zxIndex = 1;
				this.zxlist();
			},
			messdetails(ReplyTime, question, Answer, Examine) {
				uni.navigateTo({
					url: 'messdetails?ReplyTime=' + ReplyTime + '&question=' + question + '&Answer=' + Answer + '&Examine=' + Examine
				});
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #eee;
		color: #333;
	}
	
	.fs-text {
		font-size: 36upx;
		color: #999;
		text-align: center;
		line-height: 100upx;
	}

	.main {
		padding: 15upx 2% 120upx;
	}

	.main::-webkit-scrollbar {
		display: none;
	}

	.liuyan textarea {
		background: #fff;
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		color: #444;
		font-size: 32upx;
		line-height: 45upx;
		border-radius: 5upx;
	}

	.liuyan button {
		width: 300upx;
		height: 80upx;
		line-height: 80upx;
		padding: 0;
		margin: 30upx auto 0;
		outline: none;
		border: 0;
		background: #009999;
		color: #fff;
		font-size: 36upx;
	}

	.list {}

	.list-on {
		background: #fff;
		margin-bottom: 15upx;
		border-radius: 5upx;
	}

	.list-on view {
		padding: 0 20upx;
		border-bottom: 1upx solid #E6E6E6;
	}

	.list-on view:nth-last-of-type(1) {
		border-bottom: 0;
	}

	.list-date {
		font-size: 30upx;
		color: #454545;
		line-height: 80upx;
	}

	.list-bar {
		display: flex;
	}

	.list-bar text {
		width: 90%;
		height: 100%;
		font-size: 34upx;
		line-height: 150upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 120upx;
		background: #fff;
		display: flex;
	}

	.footer view {
		flex: 1;
		line-height: 120upx;
		text-align: center;
	}

	.list-active {
		background: #009999;
		color: #fff;
	}
</style>
