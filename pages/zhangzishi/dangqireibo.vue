<template>
	<view class="content">
		<view class="uni-tx-box">
			<view class="uni-user-img">
				<image :src="baseinfo.Headimgurl" mode=""></image>
			</view>
			<view class="textcss">
				<text>{{baseinfo.Truename}}</text>
				<text>{{baseinfo.Address}}</text>
				<text>{{baseinfo.Provice}}{{baseinfo.City}}{{baseinfo.Area}}</text>
			</view>
			<button class="uni-icon" open-type="share">
				<uni-icon class="fa fa-share-square-o"></uni-icon>
			</button>
		</view>
		<view class="container">
			<!-- 选项栏 -->
			<view class="title">
				<view :class="activeIndex == 1 ? 'on' : ''" @tap="tabClick(1)">
					<text>{{baseinfo.ZPcount}}</text>
					<text>作品</text>
				</view>
				<view :class="activeIndex == 2 ? 'on' : ''" @tap="tabClick(2)">
					<text>{{baseinfo.SSCount}}</text>
					<text>说说</text>
				</view>
			</view>
			<!-- 内容 -->
			<view class="main">
				<!-- 作品 -->
				<view class="main-zp" v-show="activeIndex == 1">
					<view class="uni-item" v-for="(item,index) in topiclist" :key="index">
						<view>
							<video controls :src="item.Video" :id="item.Id" @fullscreenchange="fullchange($event, index)"></video>
							<image :src="item.pics" @tap="bofan(item.Id, index)"></image>
						</view>
					</view>
				</view>
				<!-- 说说 -->
				<view class="main-ss" v-show="activeIndex == 2">
					<view class="uni-item1" v-for="(item,index) in topiclist" :key="index">
						<!-- 头像 -->
						<view class="uni-info">
							<view class="uni-img">
								<image :src="item.HeadUrl" mode=""></image>
							</view>
							<text>{{item.TrueName}}</text>
						</view>
						<!-- 内容 -->
						<view class="item-content" @tap="zhiboDetails(item.Id)">{{item.contents}}</view>
						<!-- 图片 -->
						<view class="item-image" :style="{display:item.piclist ==null? 'none':'block'}">
							<view class="user-img" v-for="(item1,index1) in item.piclist" :key="index1">
								<image :src="item1" mode="" @tap="clearImg(index1, item.piclist)"></image>
							</view>
						</view>
						<!-- 点赞与回复 -->
						<view class="uni-icon-box">
							<text>{{item.createtime}}</text>
							<view class="icon-item">
								<image :src="item.Isfocus == 0 ? '../../static/icon_01.png' : '../../static/icon_05.png'" @tap="shoucang(item.Id,index)"></image>
								<image src="../../static/icon_02.png" @tap="onInput(index)"></image> <!-- 回复 -->
							</view>
						</view>
						<!-- 评论区 -->
						<view class="pinlun">
							<view class="dianZan" :style="{display: item.reply == 0 ? 'none': 'flex'}">
								<image src="../../static/icon_02.png" mode=""></image>
								<text>{{item.reply}}</text>
							</view>
							<view class="pinlun-in">
								<view v-for="(item2, index2) in item.replylist" :key="index2">
									<block v-if="item2.topicid == item.Id">
										<text>{{item2.TrueName}}:</text>
										<text>{{item2.contents}} </text>
									</block>
								</view>
							</view>
						</view>
						<view class="pinlunshuru" v-show="inputList[index] == true">
							<input class="plsr_input" @input="onKeyInput" :value="ssContent" placeholder="想说点..." />
							<button @tap="fabupinlun(item.Id)">评论</button>
						</view>
					</view>
				</view>
			</view>
		</view>
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
				inputList: [],
				list: ['作品', '说说'],
				activeIndex: 1,
				type: '1',
				baseinfo: '',
				topiclist: '',
				ssId: '',
				ssContent: '',
				num: 10
			}
		},
		onLoad() {
			helper.islogin(true); //判断是否登录
			this.userinfo(this.type)
		},
		onShow() {
			this.userinfo(this.type)
		},
		onReady() {
			this.vContext = uni.createVideoContext(this.vId);
		},
		// 下拉刷新
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			this.userinfo(this.type);
		},
		//触底事件
		onReachBottom() {
			var tas1 = new String('5'); //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.userinfo(this.type);
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
			fullchange(e, index) {
				if (e.detail.fullScreen == false) {
					this.imgindex = true;
					this.vContext.stop();
				}
			},
			tabClick(val) {
				if (this.activeIndex == val) return
				this.activeIndex = val;
				this.type = val;
				this.userinfo(this.type)
			},
			// 显示input
			onInput(mid) {
				for (let i = 0; i < this.inputList.length; i++) {
					this.inputList[i] = false;
				};
				this.inputList[mid] = true;
				this.userinfo(this.type)
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
							this.userinfo(2);
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
					},
				});
			},
			//点赞或者取消
			shoucang(tieziid, index) {
				uni.request({
					url: helper.websiteUrl + 'hotlive/followtopic',
					method: 'POST',
					data: helper.postdata({
						uid: helper.getstate().userid,
						fid: tieziid
					}),
					success: res => {
						if (res.data.code == 200) {
							this.topiclist[index].Isfocus = this.topiclist[index].Isfocus == 0 ? 1 : 0;
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							uni.hideLoading();
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
					},
				});
			},
			//请求培训列表接口
			userinfo(type) {
				// uni.showLoading({
				// 	mask: true,
				// 	title: '加载中...'
				// });
				uni.request({
					url: helper.websiteUrl + 'hotlive/hotlivelist',
					method: 'POST',
					data: helper.postdata({
						UserId: helper.getstate().userid,
						page: '1',
						Ctype: 1,
						rtype: type,
						num: this.num
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.baseinfo = res.data.data.baseinfo;
							if (this.baseinfo.Headimgurl.indexOf('http') == -1) {
								this.baseinfo.Headimgurl = helper.updurl(this.baseinfo.Headimgurl);
							}
							this.topiclist = res.data.data.topiclist;
							if (type == '1' && this.topiclist) {
								for (var i = 0; i < this.topiclist.length; i++) {
									this.topiclist[i].Video = helper.updurl(this.topiclist[i].Video);
									this.topiclist[i].pics = helper.updurl(this.topiclist[i].pics);
								}
							}
							if(type=='2' && this.topiclist){
								for(var i = 0;i < this.topiclist.length;i++){
									this.topiclist[i].HeadUrl =  helper.updurl(this.topiclist[i].HeadUrl);
									if(this.topiclist[i].piclist){
										for(var j= 0; j< this.topiclist[i].piclist.length;j++){
											this.topiclist[i].piclist[j] = helper.updurl(this.topiclist[i].piclist[j]);
										}
									}
								}
							}
							if (!this.baseinfo.ZPcount) {
								this.baseinfo.ZPcount = 0;
							}
							if (!this.baseinfo.SScount) {
								this.baseinfo.SScount = 0;
							}
							let newList = this.topiclist.length;
							if (this.inputList.length != newList) {
								this.inputList = [];
								for (let k = 0; k < newList; k++) {
									this.inputList.push(false);
								}
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
					},
				});
			},
			setTime: function(items) {
				var newItems = [];
				items.forEach((e) => {
					newItems.push({
						Content: e.Content,
						ID: e.ID,
						CreateDate: dateUtils.format(e.CreateDate),
						Title: e.Title
					});
				});
				return newItems;
			},
			// 放大图片
			clearImg(ind, imgsrc) {
				uni.previewImage({
					current: ind,
					urls: imgsrc
				})
			},
			zhiboDetails(id) {
				uni.navigateTo({
					url: '../peixun/zhiboDetails?id=' + id
				});
			}
		},
		//分享
		onShareAppMessage() {
			// return {
			// 	title: '分享',
			// 	path: ''
			// }
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #eeeeee;
	}

	.but-in {
		margin-top: 30upx;
		width: 50%;
		height: 70upx;
		line-height: 70upx;
		font-size: 28upx;
	}

	.uni-user-img {
		width: 170upx;
		height: 170upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.uni-user-img image {
		width: 100%;
		height: 100%;
	}

	.textcss {
		display: inline-block;
	}

	.textcss text {
		display: block;
		line-height: 48upx;
		font-size: 24upx;
		color: #999;
	}

	.textcss text:nth-of-type(1) {
		font-size: 36upx;
		color: #333;
		font-weight: 600;
	}

	.textcss text:nth-of-type(3) {
		line-height: 36upx;
	}

	.uni-tx-box {
		display: flex;
		align-items: center;
		background: #FFFFFF;
		padding: 3% 2%;
		position: relative;
	}

	.uni-tx-box text {
		margin-left: 25upx;
	}

	.uni-icon {
		position: absolute;
		right: 3%;
		top: 25upx;
		color: #bfbfbf;
		display: flex;
		align-items: center;
		font-size: 45upx;
		padding: 0;
		background: rgba(0, 0, 0, 0);
	}

	.uni-icon uni-icon:nth-child(2) {
		margin-left: 20upx;
		margin-top: 10upx;
	}

	.title {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		background: #FFFFFF;
		border-top: solid 1upx #e6e6e6;
		border-bottom: solid 1upx #e6e6e6;
		color: #666;
	}

	.title view {
		text-align: center;
		width: 50%;
		padding: 5upx 0;
		font-size: 30upx;
	}

	.title view text {
		display: block;
	}

	.title view text:nth-of-type(1) {
		font-size: 40upx;
		font-weight: 600;
	}

	.list_item {
		flex-grow: 1;
		box-sizing: border-box;
		height: 85rpx;
		font-size: 32rpx;
		text-align: center;
		line-height: 85rpx;
		border-bottom: 4rpx solid #eee;
	}

	.on {
		border-bottom: 5upx solid #e5004f;
		color: #e5004f;
	}

	.main {
		margin-top: 20upx;
	}

	.main-zp {
		display: table;
		width: 100%;
	}

	.uni-item {
		display: inline-block;
		width: 50%;
		height: 240upx;
		margin-bottom: 20upx;
		text-align: center;
		position: relative;
	}

	.uni-item view {
		width: 340upx;
		height: 240upx;
		border-radius: 8upx;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.uni-item video {
		width: 100%;
		height: 100%;
	}

	.uni-item image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.main-ss {
		background: #FFFFFF;
	}

	.uni-item1 {
		padding: 20upx 30upx;
		border-bottom: 1upx solid #e6e6e6;
	}

	.uni-info {
		display: flex;
		align-items: center;
	}

	.uni-img {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.uni-img image {
		width: 100%;
		height: 100%;
	}

	.uni-info text {
		font-size: 30upx;
		margin-left: 20upx;
		line-height: 80upx;
	}

	.item-content {
		color: #666;
		padding: 0 60upx 20upx 100upx;
		font-size: 26upx;
		line-height: 42upx;
	}

	.item-image {
		margin-left: 100upx;
		width: 500upx;
	}

	.user-img {
		display: inline-block;
		width: 150upx;
		height: 150upx;
		margin: 0 10upx 10upx 0;
		overflow: hidden;
	}

	.user-img image {
		width: 100%;
		height: 100%;
	}

	.uni-icon-box {
		margin: 0 60upx 0 100upx;
		display: flex;
		align-items: center;
		position: relative;
	}

	.uni-icon-box text {
		font-size: 26upx;
		color: #6A7484;
		line-height: 48upx;
	}

	.icon-item {
		position: absolute;
		right: 5upx;
	}

	.icon-item image {
		width: 36upx;
		height: 30upx;
		margin-left: 30upx;
	}

	.icon-item uni-icon:nth-child(2) {
		margin-left: 50upx;
	}

	.pinlun {
		margin: 20upx 60upx 20upx 100upx;
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

	.pinlunshuru {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 60upx 20upx 100upx;
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
