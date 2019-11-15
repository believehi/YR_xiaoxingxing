<template>
	<view class="content">
		<view class="uni-tx-box">
			<view class="uni-user-img">
				<image :src="baseinfo.Headimgurl" mode=""></image>
			</view>
			<view class="textcss">
				<text>{{baseinfo.Truename}}</text>
				<text>{{baseinfo.Address}}</text>
			</view>
			<button class="uni-icon" open-type="share" @tap="onShareAppMessage()">
				<!-- <uni-icon class="fa fa-commenting-o"></uni-icon> -->
				<uni-icon class="fa fa-share-square-o"></uni-icon>
			</button>
		</view>
		<view class="container">
			<!-- 选项栏 -->
			<view class="title">
				<view v-for="(item,index) in list" :key="index" :class="activeIndex == index ? 'on' : ''" @tap="tabClick(index)">
					<block v-if="item=='作品'">
						<text>{{zpcount}}</text>
						<text>{{item}}</text>
					</block>
					<block v-if="item=='说说'">
						<text>{{sscount}}</text>
						<text>{{item}}</text>
					</block>
				</view>
			</view>
			<!-- 内容 -->
			<view class="content">
				<view :style="{display:activeIndex !== 0 ? 'none' : 'block'}">
					<view class="uni-item" v-for="(item,index) in topiclist" :key="index">
						<!-- <video  :id="'myvideo'+index" :src="item.Video" controls="true" @tap="bf_but(index)" :poster="item.pics"></video> -->
						<image :src="item.pics" @tap="bf_but(index,item.Video)"></image>
						<!-- <video :id="'myvideo'+index" :src="item.Video"></video> -->
					</view>
				</view>
				<button type="primary" style="display: none;">上传作品</button>
			</view>
			<view :style="{display:activeIndex !== 1 ? 'none' : 'block'}">
				<view class="uni-item1" v-for="(item,index) in topiclist" :key="index">
					<!-- 说说 -->
					<view class="uni-info">
						<view class="uni-img">
							<image :src="item.HeadUrl" mode=""></image>
						</view>
						<text>{{item.TrueName}}</text>
					</view>
					<view class="item-content">
						{{item.contents}}
					</view>
					<view class="item-image" :style="{display:item.piclist ==null? 'none':'block'}">
						<block v-for="(item1,index1) in item.piclist" :key="index1">
							<image class="user-img" :src="item1" mode=""></image>
						</block>
					</view>
					<!-- 点赞与回复 -->
					<view class="uni-icon-box">
						<text>15天前</text>
						<view class="icon-item">
							<image :src="item.Isfocus == 0 ? '../../static/icon_01.png' : '../../static/icon_05.png'" @tap="shoucang(item.Id,index)"></image>
							<image src="../../static/icon_02.png" @tap="onInput(index)"></image> <!-- 回复 -->
							<!-- <uni-icon class="fa fa-heart-o"></uni-icon> -->
							<!-- <uni-icon class="fa fa-comment-o"></uni-icon> -->
						</view>
					</view>
					<!-- 评论区 -->
					<!-- <view class="pinlun" :style="{display:item.replylist ==null? 'none':'block'}">
						<view class="dianZan">评论数: {{item.reply}}</view>
						<block v-for="(item2,index2) in pinlunlist" :key="index2">
							<block v-if="item2.topicid ==item.Id">
								<text>{{item2.TrueName}}: {{item2.contents}}</text>
							</block>
						</block>
					</view> -->
					<view class="pinlun">
						<view class="dianZan" :style="{display: item.reply == 0 ? 'none': 'flex'}">
							<image src="../../static/icon_02.png" mode=""></image>
							<text>{{item.reply}}</text>
						</view>
						<view class="pinlun-in">
							<view v-for="(item2,index2) in pinlunlist" :key="index2">
								<block v-if="item2.topicid == item.Id">
									<text>{{item2.TrueName}}:</text>
									<text>{{item2.contents}} </text>
								</block>
							</view>
						</view>
					</view>
					<view class="pinlunshuru" v-show="inputList[index] == true">
						<!-- 评论输入框 -->
						<!-- <input :id="ssId" type="text" :value="ssContent"  @blur="blur_input" @confirm="blur_input" v-model="pinlun" /> -->
						<input class="plsr_input" @input="onKeyInput" :value="ssContent" placeholder="想说点..." />
						<button @tap="fabupinlun(item.Id)">评论</button>
					</view>
				</view>
				<button class="but-in" type="primary" style="display: none;">发表说说</button>
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
				inputList: [],
				list: ['作品', '说说'],
				activeIndex: 0,
				type: '1',
				topiclist: '',
				baseinfo: '',
				zpcount: 0,
				sscount: 0,
				pinlunlist: [],
				ssId: '',
				ssContent: '',
				num: 10
			}
		},
		onLoad(e) {
			helper.islogin(true); //判断是否登录
			this.userinfo(this.type)
		},
		// onShow() {
		// 	helper.islogin(true); //判断是否登录
		// 	this.userinfo(this.type)
		// },
		// 下拉刷新
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			this.userinfo(this.type);
		},
		//触底事件
		// onReachBottom() {
		// 	var tas1 = new String('5'); //触底加载5条数据
		// 	this.num = Number(this.num) + Number(tas1);
		// 	this.userinfo(this.type);
		// },
		methods: {
			tabClick(val) {
				this.activeIndex = val;
				this.type = this.activeIndex + 1;
				this.userinfo(this.type)
			},
			//点击评论
			pinluntap(val) {
				this.ssId = val;
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
						if(res.data.info == "未找到登录信息") {
							uni.reLaunch({
								url: '/pages/login/login'
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
			//关闭软键盘
			blur_input() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			//作品里面播放视频
			bf_but(index, src) {
				uni.navigateTo({
				url: '../zhangzishi/PlayVideo?videosrc=' + src,
					// url: 'PlayVideo?videosrc=' + src
				});
				// var videoContext = uni.createVideoContext('myvideo' + index, this);
				// videoContext.requestFullScreen(); //执行全屏方法
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
				var replylisttype = 0;
				if (type == 2) {
					replylisttype = 2;
				}
				this.pinlunlist = [];
				this.topiclist = '';
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'hotlive/hotlivelist',
					method: 'POST',
					data: helper.postdata({
						Ctype: 2,
						UserId: helper.getstate().userid,
						page: '1',
						num: this.num,
						rtype: type,
						replylist: replylisttype
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.baseinfo = res.data.data.baseinfo;
							this.topiclist = res.data.data.topiclist;
							if (type == 1) {
								this.zpcount = res.data.data.baseinfo.ZPcount;
								this.sscount = res.data.data.baseinfo.SSCount;
							}
							for (var i = 0; i < res.data.data.topiclist.length; i++) {
								if (res.data.data.topiclist[i].replylist != null) {
									for (var j = 0; j < res.data.data.topiclist[i].replylist.length; j++) {
										this.pinlunlist.push(res.data.data.topiclist[i].replylist[j])
									}
								}
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
			//分享
			onShareAppMessage() {
				return {
					title: '分享',
					path: ''
				}
			}
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

	.uni-tx-box {
		display: flex;
		align-items: center;
		background: #FFFFFF;
		padding: 3% 2%;
		position: relative;
	}

	.uni-tx-box text {
		margin-left: 25upx;
		display: block;
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
		background: rgba(0,0,0,0);
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
		padding: 10px 0 5upx 0;
		margin-bottom: 5upx;
		color: #666;
	}

	.title view {
		text-align: center;
		padding: 0 10upx;
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

	.uni-item {
		display: inline-block;
		width: 230upx;
		height: 230upx;
		background: #FFFFFF;
		margin: 10upx 0 0 15upx;
	}

	.uni-item image {
		width: 100%;
		height: 100%;
	}

	.uni-info {
		display: flex;
		align-items: center;
	}

	.uni-item1 {
		background: #FFFFFF;
		border-bottom: 1upx solid #e6e6e6;
		padding: 10upx;
	}

	.uni-img {
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.uni-img image {
		width: 100%;
		height: 100%;
	}

	.uni-info text {
		font-size: 26upx;
		margin-left: 15upx;
	}

	.item-content {
		padding: 10upx 80upx 10upx;
		word-break: break-all;
		font-size: 26upx;
	}

	.item-image {
		padding-left: 80upx;
		width: 400upx;
		max-height: 400upx;
		overflow: hidden;
	}

	.user-img {
		width: 120upx;
		height: 120upx;
		margin: 0 10upx 10upx 0;
	}

	.uni-icon-box {
		margin: 0 80upx;
		display: flex;
		align-items: center;
		position: relative;
	}

	.uni-icon-box text {
		font-size: 26upx;
		color: #d1d0d0;
	}

	.textcss {}

	.textcss text {
		font-size: 26upx;
		color: #d1d0d0;
	}

	.icon-item {
		position: absolute;
		right: 20upx;
	}

	.icon-item image {
		width: 31upx;
		height: 31upx;
		margin-left: 20upx;
	}

	.icon-item uni-icon:nth-child(2) {
		margin-left: 50upx;
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

	.pinlunshuru {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 60upx 20upx;
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
		border-radius:8upx;
	}

	button:after {
		border: none;
	}
</style>
