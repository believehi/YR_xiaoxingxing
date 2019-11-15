<template>
	<view class="content">
		<view class="title">
			<view class="title-img">
				<image :src="baseinfo.Headurl" mode=""></image>
			</view>
			<view class="title-content">
				<view class="title-xm">{{baseinfo.TrueName}} </view>
				<view class="title-xq">{{baseinfo.SchoolName}}</view>
				<view class="title-xb">
					<image :src="baseinfo.sex !== 2 ? sexImg[0]: sexImg[1]" mode=""></image>
					<text>{{baseinfo.sex !== 2 ? sex[0]: sex[1]}}&emsp;{{baseinfo.Sheng}}{{baseinfo.Shi}}{{baseinfo.Qu}}</text>
				</view>
			</view>
			<view class="title-icon" @tap="bianji_but">编辑资料</view>
		</view>
		<view class="tabList">
			<view>
				<text>{{baseinfo.daycount}}</text>
				<text>日记</text>
			</view>
			<view @tap="Fensi()">
				<text>{{baseinfo.fans}}</text>
				<text>粉丝</text>
			</view>
			<view @tap="myquanzi()">
				<text>{{baseinfo.circle}}</text>
				<text>创建的圈子</text>
			</view>
			<view @tap="joinquanzi()">
				<text>{{baseinfo.joincircle}}</text>
				<text>加入的圈子</text>
			</view>
		</view>
		<!-- 打卡的圈子 -->
		<view class="list">
			<view class="list-in">打卡的圈子</view>
			<view class="list-on">
				<view class="list-li" v-for="(item, index) in catelist" :key="index">
					<view class="list-img" @tap="onskip(item.Id)">
						<!-- <image :src="item.images" mode=""></image> -->
						<text>{{item.name}}</text>
					</view>
					<view class="list-text">已打卡{{item.daycount}}天</view>
				</view>
			</view>
		</view>
		<!-- 日记 -->
		<!-- <view class="uni-rj">
			<view>日记</view>
			<view>
				<image src="../../static/icon_01.png" mode=""></image>
				<text>日记获赞99次</text>
			</view>
		</view> -->
		<!-- 主体列表 -->
		<view class="container">
			<view class="container-li-in" v-for="(items, index1) in followlist" :key="index1">
				<view class="container-li">
					<view class="container-img">
						<view>
							<image :src="items.HeadUrl" mode=""></image>
						</view>
						<image class="container-img_in" :src="items.Sex == 2 ? '../../static/nv.png': '../../static/lan.png'" mode=""></image>
					</view>
					<view class="uni-container">
						<text>{{items.TrueName}}</text>
						<text>{{items.AddTime}}</text>
						<text @tap="openDetails(items.Id)">{{items.contents}}</text>
						<text class="uni-gd" @tap="deteless(items.userid, items.Id)">···</text>
						<view class="uni-init">
							<block v-for="(item2, index2) in items.piclist" :key="index2">
								<image :src="item2" :style="{display: item2 == '' ? 'none' : 'inline-block'}" mode="" @tap="previewImage(index2, items.piclist)"></image>
							</block>
							<video :src="items.Video" controls="controls" :style="{display: items.Video == '' ? 'none' : 'block'}"></video>
						</view>
						<view class="luyin" v-show="items.Music != ''">
							<text>录音音频</text>
							<view>
								<image src="../../static/bofan_03.png" mode="" v-show="inList[index1] == true" @tap="startRecord(items.Music, index1)"></image>
								<image src="../../static/bofan_04.png" mode="" v-show="inList[index1] == false" @tap="stopRecord(index1)"></image>
							</view>
						</view>
						<view class="dizhi" :style="{display: items.position == null ? 'none' : 'block'}">{{items.position}}</view>
					</view>
				</view>
				<!-- 图标 -->
				<view class="uni-init-icon">
					<view @tap="onLove(index1, items.Id)">
						<image :src="items.Isfocus == 0 ? IsLove[0] : IsLove[1]" mode=""></image>
						<text>{{items.Isfocus == 0 ? '赞&emsp;': '已赞'}}</text>
					</view>
					<view @tap="onInput(index1)">
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
					<view class="dianZan" :style="{display: items.follow == 0 ? 'none': 'flex'}">
						<image :src="IsLove[0]" mode=""></image>
						<text>{{items.follow}}&nbsp;人</text>
					</view>
					<view class="pinlun-in">
						<view v-for="(itempl,indexpl) in items.replylist" :key="indexpl">
							<text>{{itempl.TrueName}}:</text>
							<text>{{itempl.contents}} </text>
						</view>
					</view>
				</view>
				<view class="pinlunshuru" v-show="inputList[index1] == true">
					<!-- 评论输入框 -->
					<input class="plsr_input" @input="onKeyInput" :value="ssContent" placeholder="想说点..." />
					<button @tap="fabupinlun(items.Id)">评论</button>
				</view>
				<!--  -->
				<view class="uni-but">
					<image :src="items.Cateurl" mode=""></image>
					<text>{{items.CateName}}</text>
					<image src="../../static/gd.png" mode="" @tap="onskip(items.categoryid)"></image>
				</view>
			</view>
			<view class="fs-text" v-show="folist == 0">
				暂无日记
			</view>
		</view>
	</view>
</template>

<script>
	let music = null;
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				folist: 1,
				inputList: [],
				inList: [],
				IsLove: ["../../static/icon_01.png", "../../static/icon_05.png"],
				sexImg: ["../../static/lan.png", "../../static/nv.png"],
				sex: ["男", "女"],
				baseinfo: '',
				catelist: '',
				followlist: '',
				ssContent: '',
				num: 5
			}
		},
		onShow(e) {
			this.qz();
			helper.islogin(true);
		},
		onLoad() {
			music = uni.createInnerAudioContext();
			music.onEnded(() => {
				for (let j = 0; j < this.inList.length; j++) {
					this.inList[j] = true;
				};
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
		// 下拉刷新
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			this.qz();
		},
		//触底事件
		onReachBottom() {
			var tas1 = new String('5'); //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.qz();
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
			onLove(val, fid) {
				uni.request({
					url: helper.websiteUrl + 'circle/followpost',
					method: 'POST',
					data: helper.postdata({
						uid: helper.getstate().userid,
						fid: fid
					}),
					success: res => {
						if (res.data.code == 200) {
							this.followlist[val].Isfocus = this.followlist[val].Isfocus == 0 ? 1 : 0;
							this.followlist[val].Isfocus == 0 ? this.followlist[val].follow-- : this.followlist[val].follow++;
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
					url: helper.websiteUrl + 'circle/getmyinfo',
					method: 'POST',
					data: helper.postdata({
						userid: helper.getstate().userid,
						page: "1",
						num: this.num
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.baseinfo = res.data.data.baseinfo; //圈子信息
							if (this.baseinfo.Headurl.indexOf('http') == -1) {
								this.baseinfo.Headurl = helper.imgurl + this.baseinfo.Headurl;
							}
							this.catelist = res.data.data.catelist; //日记
							this.followlist = res.data.data.followlist; //列表
							if (this.followlist) {
								for (var i = 0; i < this.followlist.length; i++) {
									if (this.followlist[i].Cateurl) {
										if (this.followlist[i].Cateurl.indexOf('http') == -1) {
											this.followlist[i].Cateurl = helper.imgurl + this.followlist[i].Cateurl;
										}
									}
									if (this.followlist[i].Music != "" && this.followlist[i].Music != null) {
										if (this.followlist[i].Music.indexOf('http') == -1) {
											this.followlist[i].Music = helper.imgurl + this.followlist[i].Music;
										}
									}
									if (this.followlist[i].Video != "" && this.followlist[i].Video != null) {
										if (this.followlist[i].Video.indexOf('http') == -1) {
											this.followlist[i].Video = helper.imgurl + this.followlist[i].Video;
										}
									}
									if (this.followlist[i].piclist) {
										for (var j = 0; j < this.followlist[i].piclist.length; j++) {
											if (this.followlist[i].piclist[j]) {
												if(this.followlist[i].piclist[j].indexOf('http') == -1){
													this.followlist[i].piclist[j] = helper.imgurl + this.followlist[i].piclist[j];
												}
											}
										}
									}

								}
							}
							let newList = this.folist = this.followlist.length;
							if (this.inList.length != newList) {
								this.inList = [];
								this.inputList = [];
								for (let i = 0; i < newList; i++) {
									this.inList.push(true);
									this.inputList.push(false);
								}
							}
							if (this.baseinfo.daycount == null) {
								this.baseinfo.daycount = "0";
							}
							if (this.baseinfo.Sheng == null) {
								this.baseinfo.Sheng = "";
							}
							if (this.baseinfo.Shi == null) {
								this.baseinfo.Shi = "";
							}
							if (this.baseinfo.Qu == null) {
								this.baseinfo.Qu = "";
							}
						} else {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							if (res.data.info == "未找到登录信息") {
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
			},
			// 显示input
			onInput(mid) {
				for (let i = 0; i < this.inputList.length; i++) {
					this.inputList[i] = false;
				};
				this.inputList[mid] = true;
				this.qz();
			},
			// 删除说说
			deteless(usid, psid) {
				let _this = this;
				if (usid == helper.getstate().userid) {
					uni.showActionSheet({
						title: '删除日记',
						itemList: ["删除日记"],
						success: (e) => {
							uni.showLoading({
								mask: true,
								title: '正在删除...'
							});
							uni.request({
								url: helper.websiteUrl + 'circle/deletpost',
								method: 'POST',
								data: helper.postdata({
									Postid: psid
								}),
								success: res => {
									if (res.data.code == 200) {
										uni.hideLoading();
										_this.qz();
										uni.showToast({
											icon: "none",
											title: "删除成功！"
										})
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
								}
							});
						}
					})
				} else {
					uni.showActionSheet({
						title: '日记详情',
						itemList: ["日记详情"],
						success: (e) => {
							_this.openDetails(psid);
						}
					})
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
				if (music.src != mic) music.stop();
				music.src = mic;
				for (let j = 0; j < this.inList.length; j++) {
					this.inList[j] = true;
				}
				this.inList[ind] = false;
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
				// this.inList[ind] = true;
				// this.qz();
				// music.pause();
				// uni.showToast({
				// 	icon: "none",
				// 	title: "已暂停！"
				// })
			},
			// 跳转说说详情页
			openDetails(Id) {
				uni.navigateTo({
					url: 'dakaDetails?id=' + Id
				});
			},
			bianji_but() {
				uni.navigateTo({
					url: '../userinfo/bianjixinxi'
				});
			},
			onskip(dataId) {
				uni.navigateTo({
					url: 'daka?id=' + dataId
				});
			},
			Fensi() {
				uni.navigateTo({
					url: 'Fensi'
				});
			},
			myquanzi() {
				uni.navigateTo({
					url: 'myquanzi'
				});
			},
			joinquanzi() {
				uni.navigateTo({
					url: 'joinquanzi'
				});
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
	.content {
		width: 100%;
		padding: 0 20upx;
		box-sizing: border-box;
		color: #333;
	}

	.title {
		width: 100%;
		display: flex;
		padding: 20upx;
		box-sizing: border-box;
		position: relative;
	}

	.title-img {
		width: 170upx;
		height: 170upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.title-img image {
		width: 100%;
		height: 100%;
	}

	.title-content {
		margin: 12upx 0 0 40upx;
		color: #999;
		font-size: 30upx;
	}

	.title-xm {
		font-weight: 600;
		font-size: 40upx;
		color: #333;
	}

	.title-xq {
		margin-top: 10upx;
		width: 300rpx;
	}

	.title-xb {
		margin-top: 10upx;
		display: flex;
		align-items: center;
	}

	.title-xb image {
		width: 32upx;
		height: 32upx;
	}

	.title-xb text {
		margin-left: 10upx;
	}

	.title-icon {
		position: absolute;
		right: 20upx;
		font-size: 30upx;
		top: 70upx;
		background-color: #00CCCB;
		color: #fff;
		padding: 10upx;
		border-radius: 10upx;
		box-shadow: 0 5upx #009999;
	}

	.tabList {
		width: 100%;
		min-height: 75rpx;
		display: flex;
		padding: 28upx 0;
		border-top: 1upx solid #eee;
	}

	.tabList view {
		flex: 1;
	}

	.tabList view text {
		display: block;
		text-align: center;
	}

	.tabList view text:nth-of-type(1) {
		font-weight: 600;
		font-size: 40upx;
	}

	.tabList view text:nth-of-type(2) {
		color: #999;
		font-size: 28upx;
	}

	.list {
		border-top: 1upx solid #eee;
		padding: 0 20upx 20upx;
		min-height: 268rpx;
	}

	.list-in {
		padding: 20upx 0;
		font-size: 36upx;
	}

	.list-on {
		width: 100%;
		overflow: auto;
		white-space: nowrap;
	}

	.list-on::-webkit-scrollbar {
		display: none;
	}

	.list-li {
		display: inline-block;
		font-size: 32upx;
		color: #fff;
		margin-right: 24upx;
	}

	.list-li:nth-last-of-type(1) {
		margin: 0;
	}

	.list-img {
		width: 150upx;
		height: 150upx;
		border-radius: 50%;
		background: #5CBDBD;
		position: relative;
		overflow: hidden;
		text-shadow: 2upx 4upx #006666;
		box-shadow: 0 1upx #006666;
		opacity: .8;
	}

	.list-img image {
		width: 100%;
		height: 100%;
	}

	.list-img text {
		position: absolute;
		top: 30upx;
		left: 30upx;
		line-height: 45upx;
		text-align: center;
		white-space: normal;
		font-size: 28upx;
		width: 90upx;
		height: 90upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.list-text {
		color: #999;
		line-height: 80upx;
		font-size: 28upx;
		text-align: center;
	}

	.uni-rj {
		border-top: 1upx solid #eee;
		padding: 40upx 20upx;
	}

	.uni-rj view {
		display: block;
	}

	.uni-rj view:nth-of-type(1) {
		font-size: 36upx;
	}

	.uni-rj view:nth-of-type(2) {
		font-size: 32upx;
		color: #999;
		margin-top: 30upx;
		display: flex;
		align-items: center;
	}

	.uni-rj image {
		height: 36upx;
		width: 36upx;
		margin-right: 10upx;
	}

	.container {
		min-height: 300rpx;
	}

	.fs-text {
		font-size: 36upx;
		color: #999;
		text-align: center;
		line-height: 200upx;
	}

	.container-li-in {
		border-top: 1upx solid #eee;
		padding-top: 40upx;
	}

	.container-li {
		width: 100%;
		display: flex;
		/* padding-bottom: 40upx; */
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
		padding: 0 20upx;
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
		/* max-height: 420upx;
		overflow: hidden; */
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
		justify-content: space-around;
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
		font-size: 24upx;
		color: #6A7484;
		width: 80%;
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
		/* height: 40upx; */
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
