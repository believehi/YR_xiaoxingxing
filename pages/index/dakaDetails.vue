<template>
	<view class="container">
		<view class="container-li-in">
			<view class="container-li">
				<view class="container-img">
					<view>
						<image :src="baseinfo.HeadUrl" mode=""></image>
					</view>
					<image class="container-img_in" :src="baseinfo.Sex == 2 ? '../../static/nv.png': '../../static/lan.png'" mode=""></image>
				</view>
				<view class="uni-container">
					<text>{{baseinfo.TrueName}}</text>
					<text>{{baseinfo.createtime}}</text>
					<text>{{baseinfo.contents}}</text>
					<!-- <text class="uni-gd">···</text> -->
					<view class="uni-init">
						<block v-for="(item2, index2) in baseinfo.piclist" :key="index2">
							<image :src="item2" :style="{display: item2 == '' ? 'none' : 'inline-block'}" mode="" @tap="previewImage(index2, baseinfo.piclist)"></image>
						</block>
						<video :src="baseinfo.Video" controls="controls" :style="{display: baseinfo.Video == '' ? 'none' : 'block'}"></video>
					</view>
					<!-- <view class="luyin">
						<audio :src="baseinfo.Music" controls="controls" :style="{display: baseinfo.Music == '' ? 'none' : 'block'}"></audio>
					</view> -->
					<view class="luyin" v-show="baseinfo.Music != ''">
						<text>录音音频</text>
						<view>
							<image src="../../static/bofan_03.png" mode="" v-show="inList == true" @tap="startRecord(baseinfo.Music)"></image>
							<image src="../../static/bofan_04.png" mode="" v-show="inList == false" @tap="stopRecord()"></image>
						</view>
					</view>
					<view class="dizhi" :style="{display: baseinfo.position == null ? 'none' : 'block'}">{{baseinfo.position}}</view>
				</view>
			</view>
			<!-- 图标 -->
			<view class="uni-init-icon">
				<view @tap="onLove(baseinfo.Id)">
					<image :src="baseinfo.Isfocus == 0 ? IsLove[0] : IsLove[1]" mode=""></image>
					<text>{{baseinfo.Isfocus == 0 ? '赞&emsp;': '已赞'}}</text>
				</view>
				<view @tap="onInput()">
					<image src="../../static/icon_02.png" mode=""></image>
					<text>评论</text>
				</view>
				<view>
					<button class="fenxiang" open-type="share">
						<image src="../../static/icon_03.png" mode=""></image>
						<text>分享</text>
					</button>
				</view>
			</view>
			<!-- 评论区 -->
			<view class="pinlun">
				<view class="dianZan" :style="{display: baseinfo.follow == 0 ? 'none': 'flex'}">
					<image :src="IsLove[0]" mode=""></image>
					<text>{{baseinfo.follow}}&nbsp;人</text>
				</view>
				<view class="pinlun-in">
					<view v-for="(itempl,indexpl) in replylist" :key="indexpl">
						<text>{{itempl.TrueName}}:</text>
						<text>{{itempl.contents}} </text>
					</view>
				</view>
			</view>
			<view class="pinlunshuru" v-show="inputlist == true">
				<!-- 评论输入框 -->
				<input class="plsr_input" @input="onKeyInput" :value="ssContent" placeholder="想说点..." />
				<button @tap="fabupinlun(baseinfo.Id)">评论</button>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	var music = null;
	export default {
		data() {
			return {
				inputlist: false,
				inList: true,
				IsLove: ["../../static/icon_01.png", "../../static/icon_05.png"],
				sexImg: ["../../static/lan.png", "../../static/nv.png"],
				sex: ["男", "女"],
				postid: '',
				baseinfo: '',
				replylist: '',
				ssContent: ''
			}
		},
		onLoad(e) {
			this.postid = e.id;
			this.qz();
			helper.islogin(true);
			music = uni.createInnerAudioContext();
			music.onEnded(() => {
				this.inList = true
				this.qz();
				uni.showToast({
					icon: "none",
					title: "已播放完！",
					duration: 2000
				})
			})
		},
		onHide() {
			music.stop();
		},
		onBackPress() {
			music.stop();
		},
		methods: {
			onKeyInput: function(event) {
				this.ssContent = event.target.value
			},
			//发布评论
			fabupinlun(value) {
				if (this.ssContent == "" || this.ssContent == null) {
					uni.showToast({
						icon: 'none',
						title: '请输入评论内容!'
					});
					return;
				}
				uni.request({
					url: helper.websiteUrl + 'hotlive/addreply',
					method: 'POST',
					data: helper.postdata({
						topicid: value,
						userId: helper.getstate().userid,
						contents: this.ssContent,
						Isok: true,
						Lat: 0,
						lng: 0
					}),
					success: res => {
						if(res.data.info == "未找到登录信息") {
							uni.reLaunch({
								url: '/pages/login/login'
							});
						}
						if (res.data.code == 200) {
							this.ssId = '';
							this.ssContent = '';
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							this.qz();
							this.ssContent = '';
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							uni.hideLoading();
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
			// 点赞
			onLove(fid) {
				uni.request({
					url: helper.websiteUrl + 'circle/followpost',
					method: 'POST',
					data: helper.postdata({
						uid: helper.getstate().userid,
						fid: fid
					}),
					success: res => {
						if (res.data.code == 200) {
							this.baseinfo.Isfocus = this.baseinfo.Isfocus == 0 ? 1 : 0;
							this.baseinfo.Isfocus == 0 ? this.baseinfo.follow-- : this.baseinfo.follow++;
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							uni.hideLoading();
						};
						uni.hideLoading();
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
			// 获取圈子信息
			qz() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'circle/getpost',
					method: 'POST',
					data: helper.postdata({
						postid: this.postid,
						page: "1",
						num: 100
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.baseinfo = res.data.data.baseinfo; //列表
							this.replylist = res.data.data.replylist; //评论列表
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							uni.hideLoading();
						}
						uni.hideLoading();
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请重试！'
						});
					}
				});
			},
			// 
			onInput() {
				if (!this.inputlist) {
					this.inputlist = true;
					this.qz();
				}
			},
			// 预览图片
			previewImage: function(index, urls) {
				uni.previewImage({
					current: index,
					urls: urls
				})
			},
			// 录音
			startRecord(mic, ind) {
				// music.src = 'https://wdd.js.org/element-audio/static/falling-star.mp3';
				music.src = mic;
				this.inList = false;
				this.qz();
				music.play();
				music.onPlay(() => {
					uni.showLoading({
						icon: "none",
						title: "播放中..."
					})
				});
			},
			stopRecord(ind) {
				this.inList = true;
				this.qz();
				music.pause();
				// uni.showToast({
				// 	icon: "none",
				// 	title: "已暂停！"
				// })
			}
		},
		//分享
		onShareAppMessage() {
			uni.request({
				url: helper.websiteUrl + 'circle/addjf',
				method: 'POST',
				data: helper.postdata({
					
				}),
				success: res => {
					if (res.data.code == 200) {
						
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.info
						});
					}
				},
				fail: () => {
					uni.showToast({
						icon: 'none',
						title: '网络异常,请重试！',
						duration: 1500
					});
				},
			});
		}
	}
</script>

<style>
	.container {
		width: 100%;
		padding: 0 20upx 30upx;
		box-sizing: border-box;
	}

	.container-li-in {
		border-top: 1upx solid #eee;
		padding-top: 40upx;
	}

	.container-li {
		width: 100%;
		display: flex;
		padding-bottom: 40upx;
	}

	.container-img {
		width: 90upx;
		height: 90upx;
		margin-right: 30upx;
		position: relative;
	}

	.container-img view {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
	}

	.container-img view image {
		width: 100%;
		height: 100%;
	}

	.container-img_in {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 25upx;
		height: 25upx;
	}

	.uni-container {
		flex: 1;
		position: relative;
	}

	.uni-container text {
		display: block;
	}

	.uni-container text:nth-of-type(1) {
		width: 400upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 36upx;
		font-weight: 600;
	}

	.uni-container text:nth-of-type(2) {
		font-size: 30upx;
		margin: 10upx 0 15upx;
		color: #999;
	}

	.uni-container text:nth-of-type(3) {
		width: 500upx;
		font-size: 30upx;
		margin: 10upx 0 15upx;
		color: #999;
	}

	.uni-container .uni-gd {
		position: absolute;
		color: #999;
		right: 20upx;
		top: 0;
	}

	.pinlun {
		margin: 30upx 60upx;
		color: #666;
		padding: 0 20upx;
		font-size: 30upx;
		background-color: #eee;
		border-radius: 5upx;
	}

	.dianZan {
		padding: 20upx 0 10upx;
		display: flex;
		align-items: center;
	}

	.dianZan image {
		width: 28upx;
		height: 25upx;
	}

	.dianZan text {
		margin-left: 20upx;
		font-size: 24upx;
		color: #999;
	}

	.pinlun-in {
		font-size: 26upx;
		line-height: 40upx;
	}

	.pinlun-in view:nth-of-type(1) {
		border-top: 1upx solid #ddd;
		padding-top: 10upx;
	}

	.pinlun-in view:nth-last-of-type(1) {
		padding-bottom: 20upx;
	}

	.pinlun-in view text:nth-of-type(1) {
		color: #6A7484;
		margin-right: 10upx;
	}

	.uni-init {
		width: 420upx;
	}

	.uni-init video {
		width: 400upx;
		margin-bottom: 10upx;
	}

	.uni-init image {
		width: 120upx;
		height: 120upx;
		margin: 0 10upx 10upx 0;
	}

	.luyin {
		width: 80%;
		height: 100upx;
		border-radius: 8upx;
		margin-bottom: 20upx;
		background-color: #5CBDBD;
		box-shadow: 0 5upx #22A6A6;
		opacity: 0.75;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.luyin text {
		font-size: 26upx !important;
		color: #fff;
		margin-left: 50upx;
		text-shadow: 0 2upx #006666;
	}

	.luyin view {
		width: 75upx;
		height: 60upx;
		margin-right: 50upx;
	}

	.luyin image {
		width: 100%;
		height: 100%;
	}


	.dizhi {
		width: 80%;
		font-size: 24upx;
		color: #6A7484;
	}

	.uni-init-icon {
		margin-top: 30upx;
		color: #999;
		padding: 0 60upx 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.uni-init-icon view {
		width: 100upx;
		text-align: center;
	}

	.uni-init-icon view image {
		vertical-align: top;
		width: 30upx;
		height: 24upx;
		margin-right: 10upx;
		margin-top: 8upx;
	}

	.uni-init-icon text {
		display: inline-block;
		vertical-align: top;
		font-size: 28upx;
	}

	.fenxiang {
		padding: 0;
		color: #999;
		background: transparent;
		height: 50upx;
	}

	.fenxiang text {
		line-height: 36upx;
	}

	.uni-but {
		padding: 30upx 10upx 40upx;
		border-top: 1upx solid #eee;
		display: flex;
		align-items: center;
	}

	.uni-but image:nth-of-type(1) {
		width: 120upx;
		height: 120upx;
		background-color: #eee;
	}

	.uni-but image:nth-last-of-type(1) {
		width: 40upx;
		height: 40upx;
		padding: 20upx;
		margin-left: 10upx;
	}

	.uni-but text {
		line-height: 120upx;
		width: 450upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-left: 30upx;
		font-size: 36upx;
	}

	.pinlunshuru {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 60upx 30upx;
		box-sizing: border-box;
	}

	.plsr_input {
		flex: 1;
		width: 100%;
		height: 50upx;
		border: 1px solid #ccc;
		border-radius: 10upx;
		color: #999;
		font-size: 30upx;
		padding-left: 10upx;
	}

	.pinlunshuru button {
		width: 100upx;
		height: 60upx;
		font-size: 30upx;
		line-height: 60upx;
		margin-left: 20upx;
		background: #ccc;
		color: #333;
		padding: 0;
		border-radius: 8upx;
	}

	button:after {
		border: none;
	}
</style>
