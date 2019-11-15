<template>
	<view class="content">
		<view class="uni-info-box">
			<!-- 头像 -->
			<view class="uni-img">
				<image :src="info.headurl" mode=""></image>
			</view>
			<!-- 头像结束 -->
			<!-- 昵称与积分 -->
			<view class="uni-user-name">
				<view>{{info.truename}}</view>
				<view>积分{{info.integral}}</view>
			</view>
			<!-- 昵称与积分结束 -->
			<!-- 购物车按钮 -->
			<view class="uni-but" @tap="Cart_but">
				<view class="uni-number">
					{{info.cartcount}}
				</view>
				<uni-icon class="icon9"></uni-icon>
				<text>购物车</text>
			</view>
			<!-- 购物车按钮结束 -->
		</view>
		<!-- 商品 -->
		<checkbox-group>
			<view class="uni-sp-list">
				<view class="uni-sp-item" v-for="(item,index) in prolist" :key="index" :data-id="item.ID" @tap="jr_but">
					<view class="uni-sp-img">
						<image :src="item.ShopPic" mode=""></image>
					</view>
					<view class="uni-sp-jf">
						<text>{{item.Integral}}积分</text>
						<label class="checkbox">
							<checkbox value="" :checked="item.IsAdd > 0   ? true : false" />
						</label>
					</view>
				</view>
			</view>
		</checkbox-group>
		<!-- 商品结束-->

	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				info: '', //保存用户数据
				prolist: {}, //商品数据
				studentid: '' //学生id
			}
		},
		onShow() {
			helper.islogin(true);
			this.shopinfo();
		},
		methods: {
			// 打开购物车页面
			Cart_but() {
				uni.navigateTo({
					url: 'ShoppingCart',
				});
			},
			//请求培训列表接口
			shopinfo() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'shop/getproduct',
					method: 'POST',
					data: helper.postdata({
						page: "1",
						num: "100",
					}),
					success: res => {
						if (res.data.code == 200) {
							this.info = res.data.data.baseinfo;
							if(this.info.headurl.indexOf('http')==-1){
								this.info.headurl = helper.imgurl + this.info.headurl;
							}
							this.studentid = res.data.data.baseinfo.userid;
							this.prolist = res.data.data.prolist;
							if(this.prolist!=null)
							{
								for(var i= 0;i<this.prolist.length;i++)
								{
									if(this.prolist[i].ShopPic.indexOf('http') ==-1)
									{
										this.prolist[i].ShopPic = helper.imgurl + this.prolist[i].ShopPic;
									}
								}
							}
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
			//加入购物车
			jr_but(e) {
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '是否确定加入购物车',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								mask: true,
								title: '加入中...'
							});
							uni.request({
								url: helper.websiteUrl + 'shop/addcar',
								method: 'POST',
								data: helper.postdata({
									productid: e.currentTarget.dataset.id,
									studentid: helper.getstate().userid,

								}),
								success: res => {
									if (res.data.code == 200) {
										uni.hideLoading();
										uni.showToast({
											icon: 'none',
											title: res.data.info
										});
										_this.shopinfo();
									} else {
										uni.hideLoading();
										uni.showToast({
											icon: 'none',
											title: res.data.info
										});
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
						} else if (res.cancel) {
							uni.showToast({
								icon: 'none',
								title: '已取消加入购物车。'
							});
						}
					}
				});

			}
		}
	}
</script>

<style>
	page {
		width: 96%;
		height: 100%;
		padding: 0 2%;
	}

	.uni-info-box {
		display: flex;
		align-items: center;
		padding: 2% 0;
		border-bottom: 1upx solid #edecec;

	}

	.uni-img {
		width: 170upx;
		height: 170upx;
		background-color: #dddddd;
		border-radius: 50%;
		overflow: hidden;
	}

	.uni-img image {
		width: 100%;
		height: 100%;
	}

	.uni-user-name {
		font-size: 28upx;
		color: #999;
		margin-left: 25upx;
		width: 40%;
		line-height: 50upx;
	}

	.uni-user-name view:nth-child(1) {
		font-size: 32upx;
		font-weight: 600;
		color: #666;
	}

	.uni-but {
		position: relative;
		width: 207upx;
		height: 54upx;
		background-color: #009999;
		border-radius: 8upx;
		text-align: center;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		font-size: 26upx;
		justify-content: center;
		box-shadow: 0rem 5upx #006666;
	}

	.uni-but text {
		margin-left: 15upx;
	}

	.uni-number {
		position: absolute;
		right: -13upx;
		top: -13upx;
		min-width: 39upx;
		height: 39upx;
		background-color: #ed1c24;
		border-radius: 50%;
		text-align: center;
		line-height: 39upx;
		font-size: 26upx;
	}

	.uni-sp-list {
		display: flex;
		flex-wrap: wrap;
		margin: 30upx 0 50upx;
	}

	.uni-sp-item {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20upx;
	}
	
	.uni-sp-img {
		width: 240upx;
		height: 300upx;
		border-radius: 10upx;
		overflow: hidden;
	}
	
	.uni-sp-img image {
		width: 100%;
		height: 100%;
	}

	.uni-sp-jf {
		width: 220upx;
		padding: 0 10upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30upx;
		line-height: 100upx;
		color: #666;
	}

	checkbox {
		width: 45upx;
		height: 45upx;
		border-radius: 50%;
	}

	/*checkbox 选项框大小  */
	checkbox .wx-checkbox-input {
		width: 43upx;
		height: 43upx;
		border-radius: 50%;
		background-color: #959595;
		border: solid 2upx #bfbfbf;
	}

	/*checkbox选中后样式  */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background-color: #87d424;
		border: solid 2upx #87d424;
	}

	/*checkbox选中后图标样式  */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		width: 28rpx;
		height: 28rpx;
		line-height: 28rpx;
		text-align: center;
		font-size: 22rpx;
		color: #fff;
		background-color: #87d424;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);

	}
</style>
