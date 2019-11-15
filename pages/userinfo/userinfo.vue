<template>
	<view class="content">
		<!-- 用户信息 -->
		<view class="uni-info-title">
			<!-- 头像 -->
			<view class="uni-user-img">
				<image :src="info.Headimgurl"></image>
			</view>
			<!-- 头像结束 -->
			<!-- 姓名与其他信息 -->
			<view class="uni-user-text">
				<view class="" :style="{display:postIds > 0 ? 'none' : 'block'}">姓名:{{info.TrueName}}</view>
				<view class="" :style="{display:postIds == 0 ? 'none' : 'block'}">姓名:{{info.Principal}}</view>
				<view class="uni-user-dz">地址:{{info.Sheng}}{{info.Shi}}{{info.Qu}}</view>
				<view class="" :style="{display:postIds == 0 ? 'none' : 'block'}">电话:{{info.Phone}}</view>

				<view class="" :style="{display:postIds > 0 ? 'none' : 'block'}">校长:{{info.Principal}}</view>
				<view class="uni-bj-but uni-bm" @tap="bianji_but">编辑信息</view>
				<view :style="{display:roleIds == 2 ? 'none':'inline-block'}">
					<view class="uni-bj-but" @tap="baominglist_but">报名信息</view>
				</view>
			</view>
			<!-- 姓名与其他信息结束 -->
		</view>
		<!-- 用户信息结束 -->
		<!-- 积分 -->
		<view class="uni-jf-box uni-back">
			<text class="">
				积分：{{info.Integral}}
			</text>
			<view class="uni-bj-but uni-bj-but1" @tap="DH_but">
				积分兑换
			</view>
			<view class="uni-bj-but uni-bj-but1" @tap="dd_but">
				订单查询
			</view>
		</view>
		<!-- 积分结束 -->
		<view class="uni-jf-box uni-back" :style="{display:postIds == 0 ? 'none' : 'block'}"> 
			<text id="jm">
				加盟时间：{{info.JoinTime}}
			</text>
		</view>
		<!-- 段位 -->
		<view class="uni-dw-box uni-back">
			<text>段位：</text>
			<view class="uni-lv-icon" v-for="(item,index) in items" :key="index">
				<uni-icon :class="info.Level >= item  ? 'icon4' : 'icon3'"></uni-icon>
				<text>LV{{item}}</text>
			</view>
		</view>
		<!-- 段位结束 -->
		<!-- 荣誉 -->
		<view class="uni-ry-box uni-back">
			<view class="uni-ry-bt">
				<view class="">荣誉:</view>
				<view class="">初</view>
				<view class="">进</view>
				<view class="">高</view>
			</view>
			<view class="cart" :hidden="iscart">
				<view>暂未获得荣誉，继续加油哦</view>
			</view>
			<view class="uni-ry-bt uni-ry-x" v-for="(item,index) in rongyulist" :key="index" :hidden="!iscart">
				<view class="">{{item.CurriculumName}}</view>
				<view>
					<uni-icon :class="item.CurriculumLeavel >= 1  ? 'icon6' : 'icon5'"></uni-icon>
				</view>
				<view>
					<uni-icon :class="item.CurriculumLeavel >= 2  ? 'icon7' : 'icon5'"></uni-icon>
				</view>
				<view>
					<uni-icon :class="item.CurriculumLeavel >= 3  ? 'icon8' : 'icon5'"></uni-icon>
				</view>
			</view>
		</view>
		<button @tap="logout" class="uni-bc-but">退出登录</button>
		<!-- 荣誉结束-->
		<!-- 留言咨询 -->
		<view class="ly-icon" @tap="zxMessage()">
			<image src="../../static/user-icon.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				info: {},
				Levels: '', //等级判断
				items: [1, 2, 3, 4, 5, 6, 7], //段位
				rongyulist: {}, //荣誉列表
				postIds: '',
				iscart:false,
				roleIds:2
			}
		},
		onLoad() {
			this.roleIds = helper.getstate().roleIds;
			helper.islogin(true);
			this.userinfo();
			
			
		},
		onShow() {
			this.userinfo();
		},
		methods: {
			logout() {
			
				helper.logout();
				uni.showToast({
					icon: 'none',
					title: '您已退出登陆'
				})
			},
			baominglist_but(){
				uni.navigateTo({
					url:'baominglist'
				})
			},
			//请求培训列表接口
			userinfo() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'user/getuserinfo',
					method: 'POST',
					data: helper.postdata({
						type: "1"
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.info = res.data.data.baseinfo;
							if(this.info.Headimgurl.indexOf('http') == -1){
								this.info.Headimgurl= helper.imgurl + this.info.Headimgurl;
							}
							this.rongyulist = res.data.data.rongyulist;
							if (this.rongyulist.length > 0) {
								this.iscart = true;
							} else {
								this.iscart = false;
							}
							this.Levels = this.info.Level + 1;
							this.postIds = helper.getstate().postIds;
							if (this.info.Sheng == null) {
								this.info.Sheng = "";
							}
							if (this.info.Shi == null) {
								this.info.Shi = "";
							}
							if (this.info.Qu == null) {
								this.info.Qu = "";
							}
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
					},
				});
			},
			//进入积分兑换页面
			DH_but() {
				uni.navigateTo({
					url: 'duihuan'
				});
			},
			//进入订单查询页面
			dd_but() {
				uni.navigateTo({
					url: 'MakeDeal'
				});
			},
			bianji_but() {
				uni.navigateTo({
					url: 'bianjixinxi'
				});
			},
			zxMessage() {
					uni.navigateTo({
						url: 'message'
					});
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
	.cart{
		text-align: center;
		font-size: 30upx;
		padding: 250upx 0;
	}

	#jm {
		width: 90%;
		text-align: left;
		padding-left: 4%;
	}
	.uni-bc-but {
		background-color: #FBB42B;
		border-radius: 10upx;
		font-size: 30upx;
		letter-spacing: 3upx;
		color: #FFFFFF;
		border: none;
		width: 250upx;
		height: 50upx;
		line-height: 50upx;
		margin: 50upx auto;
	}
	.content {
		padding: 0 2% 15upx;
	}
	
	.uni-info-title {
		position: relative;
	}

	.uni-back {
		margin-top: 1.2%;
		background: #FFFFFF;
		color: #bfbfbf;
	}

	.uni-info-box {
		padding: 1.5% 1%;
		display: flex;
		font-size: 26upx;
	}

	.uni-user-text {
		margin-left: 200upx;
		color: #666;
		font-size: 26upx;
		line-height: 36upx;
		padding: 15upx 0 10upx;
	}
	
	.uni-user-dz {
		display: inline-block;
		width: 100%;
	}

	.uni-bj-but {
		display: inline-block!important;
		width: 210upx;
		height: 56upx;
		background-color: #009999;
		border-radius: 8upx;
		text-align: center;
		line-height: 56upx;
		color: #FFFFFF;
		margin-top: 3%;
		font-size: 28upx;
		box-shadow: 0rem 5upx #006666;
	}
	
	.uni-bm {
		margin-right: 50upx;
	}

	.uni-user-img {
		position: absolute;
		top: 20upx;
		left: 10upx;
		width: 170upx;
		height: 170upx;
		background-color: #dddddd;
		border-radius: 50%;
		overflow: hidden;
	}

	.uni-user-img image {
		width: 100%;
		height: 100%;
	}

	.uni-jf-box {
		display: flex;
		align-items: center;
		font-size: 28upx;
		padding: 1.5% 0 2% 0;
	}

	.uni-bj-but1 {
		margin-top: 0% !important;
	}

	.uni-jf-box text {
		text-align: center;
		width: 200upx;
		font-size: 26upx;
		margin-top: 1%;
	}

	.uni-bj-but1:nth-child(3) {
		margin-left: 7%;
	}

	.uni-dw-box {
		font-size: 28upx;
		display: flex;
		align-items: center;
		padding: 1% 0;
	}

	.uni-dw-box text {
		width: 21%;
		text-align: center;
	}

	.uni-lv-icon {
		width: 40upx;
		text-align: center;
		position: relative;
		height: 68upx;
		margin-right: 29upx;
	}

	.uni-lv-icon text {
		font-size: 26upx;
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.uni-ry-bt {
		display: flex;
		align-items: center;
		padding: 1.7% 0;
	}

	.uni-ry-bt view {
		width: 25%;
		text-align: center;
		font-size: 28upx;
	}

	.uni-ry-x {
		background: url("http://xxxpv.01.t1m.cn/Img/page_x.png") no-repeat bottom;
		background-size: 100%;
	}
	
	.ly-icon {
		position: fixed;
		width: 120upx;
		height: 120upx;
		bottom: 80upx;
		right: 10upx;
		border-radius: 50%;
		overflow: hidden;
	}
	
	.ly-icon image {
		width: 100%;
		height: 100%;
		opacity: 0.8;
	}
</style>
