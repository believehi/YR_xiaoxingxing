<template>
	<view class="content">
		<!-- 头部 -->
		<view class="uni-top-content">
			<!-- 头像 -->
			<view class="uni-img">
				<image :src="qzinfo.images" mode=""></image>
			</view>
			<!-- 标题按钮 -->
			<view class="uni-content">
				<text>{{qzinfo.name}}</text>
				<text class="fu-title">{{qzinfo.Joincount}}人加入 · {{qzinfo.total}}篇日记 ·</text>
				<view class="uni-but-list">
					<!-- 管理后台 -->
					<!-- <view class="uni-gl-but">
						<uni-icon class="fa fa-cog"></uni-icon>
					</view> -->
					<!-- 打卡日记 -->
					<button @tap="actionSheetTap()">
						<image src="../../static/daka.png" mode=""></image>打卡
					</button>
					<!-- 分享 -->
					<button open-type="share">
						<uni-icon class="fa fa-share"></uni-icon>分享
					</button>
				</view>
			</view>
		</view>
		<!-- 头部结束 -->
		<!-- 选择显示内容 -->
		<view class="uni-xz-content">
			<!-- 选项栏 -->
			<view v-for="(item, index) in list" :key="index" :class="activeIndex == index ? 'active': ''" @tap="option(index)">
				{{item}}
			</view>
		</view>
		<!-- 选择显示内容结束 -->
		<!-- 内容 -->
		<view class="">
			<!-- 日记 -->
			<view class="uni-xz-left" :style="{display: activeIndex === 0 ? 'block' : 'none'}">
				<view class="ss-input">
					<input type="text" value="" v-model="crux" placeholder="想知道谁..."/> 
					<button @click="cruxBut()">搜索</button>
				</view>
				<view class="fs-text" v-show="daylist.length == 0">
						暂无日记
				</view>
				<view class="uni-xz-init" v-for="(items, index) in daylist" :key="index">
					<view class="uni-init">
						<view class="uni-init-img">
							<view>
								<image :src="items.HeadUrl" mode=""></image>
							</view>
							<image class="uni-init_icon" :src="items.Sex == 2 ? '../../static/nv.png' : '../../static/lan.png'" mode=""></image>
						</view>
						<view class="uni-init-con">
							<view class="init-text">
								<view class="init-text-main">
									<text>{{items.TrueName}}</text>
									<text>{{items.createtime}}</text>
									<text @tap="openDetails(items.Id)">{{items.contents}}</text>
								</view>
								<view class="init-text-zd" @tap="deteless(items.userid, items.Id)">···</view>
							</view>
							<view class="init-content">
								<block v-for="(item11, index11) in items.piclist" :key="index11">
									<image :src="item11" :style="{display: item11 !=='' ? 'inline-block' : 'none'}" mode="" @tap="previewImage(index11, items.piclist)"></image>
								</block>
								<video :src="items.Video" controls="controls" :style="{display: items.Video == '' ? 'none' : 'block'}"></video>
							</view>
							<view class="luyin" v-show="items.Music != ''">
								<text>录音音频</text>
								<view>
									<image src="../../static/bofan_03.png" mode="" v-show="inList[index] == true" @tap="startRecord(items.Music, index)"></image>
									<image src="../../static/bofan_04.png" mode="" v-show="inList[index] == false" @tap="stopRecord(index)"></image>
								</view>
							</view>
							<view class="dizhi" :style="{display: items.position == null ? 'none' : 'block'}">{{items.position}}</view>
						</view>
					</view>
					<!-- 图标 -->
					<view class="uni-init-icon">
						<view @tap="onLove(index, items.Id)">
							<image :src="items.Isfocus == 0 ? IsLove[0] : IsLove[1]" mode=""></image>
							<text>{{items.Isfocus == 0 ? '赞&emsp;': '已赞'}}</text>
						</view>
						<view @tap="onInput(index)">
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
							<image src="../../static/icon_01.png" mode=""></image>
							<text>{{items.follow}}&nbsp;人</text>
						</view>
						<view class="pinlun-in">
							<view v-for="(itempl,indexpl) in items.replylist" :key="indexpl">
								<text>{{itempl.TrueName}}:</text>
								<text>{{itempl.contents}} </text>
							</view>
						</view>
					</view>
					<view class="pinlunshuru" v-show="inputList[index] == true">
						<!-- 评论输入框 -->
						<input class="plsr_input" @input="onKeyInput" :value="ssContent" placeholder="想说点..." />
						<button @tap="fabupinlun(items.Id)">评论</button>
					</view>
				</view>
			</view>
			<!-- 成员 -->
			<view class="uni-xz-right" :style="{display: activeIndex === 1 ? 'block' : 'none'}">
				<view class="fs-text" v-show="memberlist.length == 0">
					暂无成员
				</view>
				<view class="uni-cy" v-for="(item3, index3) in memberlist" :key="index3">
					<view class="cy_img">
						<view>
							<image :src="item3.Headurl" mode=""></image>
						</view>
						<image class="cy_img-icon" :src="item3.Sex == 2 ? '../../static/nv.png': '../../static/lan.png'" mode=""></image>
					</view>
					<view class="cy_init">
						<text>{{item3.TrueName}}</text>
						<text>{{item3.Role == 1 ? "圈主" : "成员"}}</text>
					</view>
					<view class="cy_date">{{item3.JoinDate}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	let music = null;
	export default {
		data() {
			return {
				crux: '',
				inputList: [],
				inList: [],
				IsLove: ["../../static/icon_01.png", "../../static/icon_05.png"],
				sexImg: ["../../static/lan.png", "../../static/nv.png"],
				activeIndex: 0,
				list: ["日记", "成员"],
				pxid: '',
				qzinfo: '', //圈子信息
				daylist: '', //日记
				memberlist: '', //成员
				qzdata: 1,
				ssContent: '',
				num: 10
			}
		},
		onLoad(e) {
			this.pxid = e.id;
			this.qz(this.qzdata);
			helper.islogin(true); //判断是否登录
			music = uni.createInnerAudioContext();
			music.onEnded(() => {
				for (let j = 0; j < this.inList.length; j++) {
					this.inList[j] = true;
				};
				this.qz(this.qzdata);
				uni.showToast({
					icon: "none",
					title: "已播放完！",
					duration: 2000
				})
			})
		},
		onShow() {
			this.qz(this.qzdata);
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
			this.qz(this.qzdata);
		},
		//触底事件
		onReachBottom() {
			var tas1 = new String('5'); //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.qz(this.qzdata);
		},
		methods: {
			// 搜索
			cruxBut(){
				this.daylist = []
				this.qz(this.qzdata);
			},
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
							this.qz(1);
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
							this.daylist[val].Isfocus = this.daylist[val].Isfocus == 0 ? 1 : 0;
							this.daylist[val].Isfocus == 0 ? this.daylist[val].follow-- : this.daylist[val].follow++;
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
			option(value) {
				if (this.activeIndex == value) return
				this.activeIndex = value;
				this.qzdata = this.activeIndex + 1;
				this.qz(this.qzdata);
			},
			// 获取圈子信息
			qz(type) {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'circle/getbypxid',
					method: 'POST',
					data: helper.postdata({
						userid: helper.getstate().userid,
						Pxid: this.pxid,
						truename: this.crux,
						type: type,
						page: 1,
						num: this.num
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.qzinfo = res.data.data.baseinfo; //圈子信息
							if (this.qzinfo.images.indexOf('http') == -1) {
								this.qzinfo.images = helper.imgurl + this.qzinfo.images;
							}
							this.daylist = res.data.data.daylist || []; //日记
							this.memberlist = res.data.data.memberlist || []; //成员
							if (this.daylist != null) {
								for (var i = 0; i < this.daylist.length; i++) {
									if(this.daylist[i].Video !="" && this.daylist[i].Video !=null){
										if(this.daylist[i].Video.indexOf('http') ==-1)
										{
											this.daylist[i].Video = helper.imgurl  + this.daylist[i].Video;
										}
									}
									if(this.daylist[i].Music !="" && this.daylist[i].Music !=null){
										if(this.daylist[i].Music.indexOf('http') ==-1)
										{
											this.daylist[i].Music = helper.imgurl  + this.daylist[i].Music;
										}
									}
									if(this.daylist[i].piclist!=null){
										for (var j = 0; j < this.daylist[i].piclist.length; j++) {
											if (this.daylist[i].piclist[j].indexOf('http') == -1) {
												this.daylist[i].piclist[j] = helper.imgurl + this.daylist[i].piclist[j];
											}
										}
									}
								}
							}
							if (this.memberlist != null) {
								for (var i = 0; i < this.memberlist.length; i++) {
									if(this.memberlist[i].Headurl != null){
										if (this.memberlist[i].Headurl.indexOf('http') == -1) {
											this.memberlist[i].Headurl = helper.imgurl + this.memberlist[i].Headurl;
										}	
									}
								}
							}
							if (type == 1) {
								let newList = this.daylist.length;
								if (this.inList.length != newList) {
									this.inList = [];
									this.inputList = [];
									for (let k = 0; k < newList; k++) {
										this.inList.push(true);
										this.inputList.push(false);
									}
								}
							}
							if (this.qzinfo.daycount == null) {
								this.qzinfo.daycount = "0";
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							uni.hideLoading();
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
					},
				});
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
										_this.qz(_this.qzdata);
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
			// 显示input
			onInput(mid) {
				for (let i = 0; i < this.inputList.length; i++) {
					this.inputList[i] = false;
				};
				this.inputList[mid] = true;
				this.qz(this.qzdata);
			},
			// 性别选择
			bindPickerChange: function(e) {
				var index = e.target.value;
				this.fs[index] = parseInt(index) + 1;
			},
			df() {
				this.arr.push(this.fs)
			},
			// 预览图片
			previewImage: function(index, urls) {
				for (let j = 0; j < this.inList.length; j++) {
					this.inList[j] = true;
				}
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
				this.qz(this.qzdata);
				music.play();
				music.onPlay(() => {
					uni.showLoading({
						icon: "none",
						title: "播放中..."
					})
				});
			},
			stopRecord(ind) {
				this.inList[ind] = true;
				this.qz(this.qzdata);
				music.pause();
				// uni.showToast({
				// 	icon: "none",
				// 	title: "已暂停！"
				// })
			},
			// 跳转说说详情页
			openDetails(Id) {
				uni.navigateTo({
					url: '../index/dakaDetails?id=' + Id
				});
			},
			actionSheetTap() {
				var itemList = this.qzinfo.IsDk == 0 ? ['打卡日记'] : ['发表日记'];
				uni.showActionSheet({
					title: '打卡日记',
					itemList: itemList,
					success: (e) => {
						uni.navigateTo({
							url: '../index/dakariji?Id=' + this.qzinfo.Id
						});
					}
				})
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
	.uni-top-content {
		display: flex;
		align-items: center;
		padding: 5% 2%;
	}

	.uni-img {
		width: 170upx;
		height: 170upx;
		background-color: #333333;
		border-radius: 50%;
		overflow: hidden;
	}

	.uni-img image {
		width: 100%;
		height: 100%;
	}

	.uni-content {
		margin-left: 20upx;
	}

	.uni-content text {
		display: block;
		font-size: 30upx;
		color: #000000;
	}

	.uni-content text:nth-of-type(1) {
		font-weight: 600;
	}

	.uni-content .fu-title {
		font-size: 26upx;
		color: #999999;
		margin-top: 8upx;
	}

	.uni-but-list {
		margin-top: 10upx;
		display: flex;
	}

	.uni-but-list button {
		background-color: #006666;
		border-radius: 8upx;
		color: #FFFFFF;
		height: 54upx;
		min-width: 140upx;
		line-height: 54upx;
		margin: 0 15upx 0 0;
		font-size: 28upx;
		padding: 0 20upx;
		font-weight: 900;
	}

	.uni-but-list image {
		width: 26upx;
		height: 24upx;
		margin-right: 10upx;
	}

	.uni-but-list uni-icon {
		margin-right: 10upx;
	}

	.uni-xz-content {
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-top: solid 1upx #e6e6e6;
		border-bottom: solid 1upx #e6e6e6;
		padding: 2% 0;
	}

	.uni-xz-content view {
		text-align: center;
		color: #999999;
		font-size: 30upx;
		padding: 10upx;
		border-bottom: 5upx solid transparent;
	}

	.uni-xz-content .active {
		border-bottom: 5upx solid #006666;
		color: #333;
	}

	.fs-text {
		font-size: 36upx;
		color: #999;
		text-align: center;
		line-height: 100upx;
	}

	.uni-xz-init {
		width: 100%;
		border-bottom: 1upx solid #e6e6e6;
		padding: 32upx 20upx;
		width: 100%;
		box-sizing: border-box;
	}

	.uni-init {
		display: flex;
	}

	.uni-init-img {
		width: 90upx;
		height: 90upx;
		position: relative;
	}

	.uni-init-img view {
		border-radius: 50%;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.uni-init-img view image {
		height: 100%;
		width: 100%;
	}

	.uni-init_icon {
		position: absolute;
		width: 25upx;
		height: 25upx;
		right: 0;
		bottom: 0;
	}

	.uni-init-con {
		flex: 1;
		margin-left: 20upx;
		position: relative;
	}

	.init-text-main {
		width: 88%;
	}

	.init-text-main text {
		display: block;
	}

	.init-text-main text:nth-of-type(1) {
		font-size: 30upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 400upx;
	}

	.init-text-main text:nth-of-type(2) {
		color: #aaa;
		font-size: 24upx;
	}

	.init-text-main text:nth-of-type(3) {
		font-size: 28upx;
		margin-top: 12upx;
		color: #333333;
		line-height: 40upx;
	}

	.init-text-zd {
		position: absolute;
		padding: 0 20upx;
		right: 0;
		top: 0;
		color: #333;
	}

	.init-content {
		margin-top: 20upx;
		width: 420upx;
	}


	.luyin {
		width: 80%;
		height: 100upx;
		border-radius: 8upx;
		margin-top: 20upx;
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
		width: 60upx;
		height: 60upx;
		margin-right: 50upx;
	}

	.luyin image {
		width: 100%;
		height: 100%;
	}

	.dizhi {
		margin-top: 20upx;
		width: 80%;
		font-size: 24upx;
		color: #6A7484;
	}

	.init-content video {
		width: 400upx;
		margin-bottom: 10upx;
	}

	.init-content image {
		width: 120upx;
		height: 120upx;
		margin: 0 10upx 10upx 0;
	}

	.uni-init-icon {
		margin-top: 30upx;
		color: #999;
		padding: 0 60upx;
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


	.uni-xz-right {
		width: 100%;
	}

	.uni-cy {
		height: 120upx;
		padding: 20upx 30upx;
		border-bottom: 1upx solid #e6e6e6;
		color: #999;
		display: flex;
		align-items: center;
		position: relative;
	}

	.cy_img {
		width: 80upx;
		height: 80upx;
		position: relative;
	}

	.cy_img view {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.cy_img view image {
		width: 100%;
		height: 100%;
	}

	.cy_img-icon {
		position: absolute;
		width: 25upx;
		height: 25upx;
		right: 0;
		bottom: 0;
	}

	.cy_init {
		width: 400upx;
		margin-left: 30upx;
	}

	.cy_init text {
		display: block;
	}

	.cy_init text:nth-of-type(1) {
		font-size: 30upx;
		color: #333;
	}

	.cy_init text:nth-of-type(2) {
		font-size: 24upx;
	}

	.cy_date {
		position: absolute;
		top: 45upx;
		right: 30upx;
		font-size: 24upx;
		width: 150upx;
		text-align: center;
	}

	.tabBar-in {
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.tabBar {
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		border-radius: 10upx 10upx 0 0;
	}

	.tabBar view {
		height: 100upx;
		text-align: center;
		border-bottom: 1upx solid #E6E6E6;
	}

	.tabBar text {
		font-size: 36upx;
		line-height: 100upx;
	}

	.pinlunshuru {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 60upx;
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
	.ss-input {
		padding: 28rpx 80rpx 20rpx 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.ss-input input {
		flex: 1;
		padding-left: 10rpx;
		height: 50rpx;
		border: 1rpx solid #ccc;
		border-radius: 10rpx;
		color: #999;
		font-size: 30rpx;
	}
	.ss-input button {
		margin-left: 20rpx;
		width: 100rpx;
		height: 60rpx;
		font-size: 30rpx;
		line-height: 60rpx;
		margin-left: 20rpx;
		background: #006666;
		color: #fff;
		padding: 0;
		border-radius: 8rpx;
	}
</style>
