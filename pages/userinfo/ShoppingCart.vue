<template>
	<view class="content">
		<view class="cart" :hidden="iscart">
			<view>购物车什么都没有，赶快去购物吧</view>
		</view>
		<view class="uni-sp-list" :hidden="!iscart">
			<view class="uni-sp-item" v-for="(item,index) in car" :key="index" :data-ShopId="item.ShopId">
				<!-- 选择按钮 -->
				<view class="checkbox">
					<image src="../../static/xz1.png" mode="" v-if="item.selected" @tap="selectList(index)"></image>
					<image src="../../static/xz.png" @tap="selectList(index)"></image>
				</view>
				<!-- 标题 -->
				<view class="uni-title">
					{{item.ShopName}}
				</view>
				<!-- 价格 -->
				<view class="uni-page">
					{{item.Integral}}分
				</view>
				<!-- 加减按钮 -->
				<uni-icon class="fa fa-minus-square-o" @tap="btn_minus(index)"></uni-icon>
				<!-- 数量 -->
				<text class="uni-number">{{item.Quantity}}</text>
				<uni-icon class="fa fa-plus-square-o" @tap="btn_add(index)"></uni-icon>
				<!-- 加减按钮结束 -->
			</view>
		</view>
		<!-- 价格合计 -->
		<view class="uni-hj-box">
			<view class="uni-hj">
				积分合计：{{totalPrice}}
			</view>
			<!-- <view class="uni-jx-but uni-qu-but" @tap="selectAll">
			     全选
			</view> -->
			<view class="uni-sc-but" @tap="sc_but">
				删除
			</view>
			<view class="uni-jx-but" @tap="js_but">
				结算
			</view>
		</view>
		<!-- 价格合计结束 -->
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				iscart: false,
				list: '',
				car_num: '', //商品价格
				num: '1', //数量
				totalPrice: 0, // 总价，初始为0
				quantity: '', //总数量
				selectAllStatus: true, // 全选状态，默认全选
				number: '', //总数量
				car: {}, //保存加入购物车的商品
				edit_show: "none",
				cid: '',
				arry: [],
			};
		},
		onShow() {
			helper.islogin(true);
			this.carlist();
		},
		methods: {
			//请求购物车列表
			carlist() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'shop/carlist',
					method: 'POST',
					data: helper.postdata({
						page: '1',
						num: '10000'
					}),
					success: res => {
						if (res.data.code == 200) {
							this.car = res.data.data.baseinfo;
							if (this.car.length > 0) {
								this.iscart = true;
								this.count_price();
							} else {
								this.totalPrice = '0'
								this.iscart = false;
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
			//绑定减的方法
			btn_minus(e) {
				//   // 获取点击的索引
				var index = e;
				// const obj = e.currentTarget.dataset.obj;
				// 获取商品数据
				var list = this.car;
				// 获取商品数量
				var num = list[index].Quantity;
				this.cid = list[index].ID;
				// 判断num小于等于1  return; 点击无效
				if (num <= 1) {
					uni.showToast({
						icon: 'none',
						title: '数量不能小于1！'
					});
					return false;
				}
				// else  num大于1  点击减按钮  数量--
				var Number1 = num - 1;
				list[index].Quantity = Number1;
				this.num_but(Number1)
				// 渲染页面
				this.car = list;
				this.count_price();
			},
			//绑定加数量事件
			btn_add(e) {
				var index = e; //获取点击的索引
				var list = this.car;
				// 获取商品数量
				var num = list[index].Quantity;
				// 点击递增
				var Number2 = num + 1;
				this.cid = list[index].ID;
				list[index].Quantity = Number2;
				// 重新渲染 ---显示新的数量
				this.num_but(Number2)
				this.car = list;
				this.count_price();
			},
			// 增加或减少商品数量
			num_but(num) {
				uni.request({
					url: helper.websiteUrl + 'shop/editcar',
					method: 'POST',
					data: helper.postdata({
						quantity: num,
						type: '1',
						cid: this.cid
					}),
					success: res => {
						if (res.data.code != 200) {
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
			// 勾选商品
			selectList(e) {
				var that = this;
				// 获取选中的索引
				var index = e;
				// 获取到商品列表数据
				var list = this.car;
				// 默认全选
				this.selectAllStatus = true;
				// 循环数组数据，判断----选中/未选中[selected]
				list[index].selected = !list[index].selected;
				// 如果数组数据全部为selected[true],全选
				for (var i = list.length - 1; i >= 0; i--) {
					if (!list[i].selected) {
						that.selectAllStatus = false;
						break;
					}
				}
				// 重新渲染数据
				this.car = list;
				this.selectAllStatus = this.selectAllStatus;
				// 计算积分
				this.count_price();
			},
			// 购物车全选
			// selectAll(e) {
			// 	// 全选ICON默认选中
			// 	var selectAllStatus = this.car.selected;
			// 	// true  -----   false
			// 	selectAllStatus = !selectAllStatus;
			// 	// 获取商品数据
			// 	var list = this.car;
			// 	// 循环遍历判断列表中的数据是否选中
			// 	for (let i = 0; i < list.length; i++) {
			// 		list[i].selected = selectAllStatus;
			// 	}
			// 	// 页面重新渲染
			// 	this.selectAllStatus = selectAllStatus;
			// 	this.car = list;
			// 	// 计算积分
			// 	this.count_price();
			// },
			// 计算积分
			count_price() {
				// 获取商品列表数据
				// 声明一个变量接收数组列表price
				var list = this.car;
				var total = 0;
				var quantity1 = 0;
				// 循环列表得到每个数据
				for (let i = 0; i < this.car.length; i++) {
					// 判断选中计算价格
					if (list[i].selected) {
						// 所有价格加起来 count_money
						total += list[i].Quantity * list[i].Integral;
						quantity1 += list[i].Quantity
					}
				}
				// 最后赋值到data中渲染到页面
				this.totalPrice = total.toFixed(0);
				this.quantity = quantity1;
			},
			//删除商品
			sc_but() {
				var _this = this;
				var cidarry = '';
				var IdArr2 = '';
				for (var i = 0; i < this.car.length; i++) {
					// 判断选中
					if (this.car[i].selected) {
						var cid = this.car[i].ID;
						var reg = /,$/gi; //此处是正则
						cidarry += cid + ",";
						IdArr2 = cidarry.replace(reg, "");
					}
				}
				uni.showModal({
					title: '提示',
					content: '是否确实删除选中的商品？',
					success: function(res) {
						if (res.confirm) {
							uni.request({
								url: helper.websiteUrl + 'shop/editcar',
								method: 'POST',
								data: helper.postdata({
									type: '2',
									cid: IdArr2
								}),
								success: res => {
									if (res.data.code == 200) {
										uni.showToast({
											icon: 'none',
											title: "成功删除"
										});
										_this.carlist()
									} else {
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
						}
					}
				});
			},
			//结算
			js_but() {
				var _this = this;

				for (var i = 0; i < this.car.length; i++) {
					// 判断选中
					if (this.car[i].selected) {
						// 所有价格加起来 count_money
						var listarry = {};
						listarry.ShopId = this.car[i].ShopId;
						listarry.Amount = this.car[i].Quantity;
						listarry.Expenditure = this.car[i].Integral;
						listarry.Details = this.car[i].ShopName;
						_this.arry.push(listarry)

					}
				}
				uni.showModal({
					title: '提示',
					content: '确定结算？',
					success: function(res) {
						if (res.confirm) {
							uni.request({
								url: helper.websiteUrl + 'shop/order',
								method: 'POST',
								data: helper.postdata({
									studentid: helper.getstate().userid,
									quantity: _this.quantity,
									sumamount: _this.totalPrice,
									orderitems: _this.arry,
								}),
								success: res => {
									if (res.data.code == 200) {
										uni.showToast({
											icon: 'none',
											title: '已完成兑换',
											duration: 1500
										});
										setTimeout(function() {
											_this.carlist()
										}, 1500);
									} else {
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
						}
					}
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

	image {
		display: block;
	}

	.uni-sp-list {
		margin-bottom: 130upx;
	}

	.cart {
		text-align: center;
		margin-top: 10%;
		font-size: 30upx;
	}

	.uni-sp-item {
		display: flex;
		align-items: center;
		padding: 5%;
		height: 50upx;
		border-bottom: solid 1px #e6e6e6;
		vertical-align: middle;
		background: #FFFFFF;
	}

	label {
		margin-top: -3upx;
	}

	checkbox {
		width: 45upx;
		height: 45upx;
		border-radius: 50%;
	}

	.fa {
		color: #009999;
		font-size: 40upx;
		margin-top: 7upx;
	}

	.fa-minus-square-o {
		margin-left: 20upx;
	}

	.uni-number {
		font-size: 26upx;
		width: 7%;
		text-align: center;
	}

	.uni-qu-but {
		background: #3ee459 !important;
	}

	.uni-title {
		font-size: 32upx;
		color: #000000;
		margin-left: 5.5%;
		width: 45%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-page {
		font-size: 30upx;
		width: 25%;
		text-align: right;
	}

	.uni-hj-box {
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
		height: 105upx;
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 32upx;
		line-height: 105upx;
		border-top: 1upx solid #eeeeee;
	}

	.uni-jx-but {
		width: 25%;
		height: 100%;
		text-align: center;
		color: #FFFFFF;
		letter-spacing: 15upx;
		text-indent: 15upx;
		background-color: #009999;
	}

	.uni-sc-but {
		width: 25%;
		height: 100%;
		text-align: center;
		color: #FFFFFF;
		letter-spacing: 15upx;
		text-indent: 15upx;
		background-color: #f02d4d;
	}

	.uni-hj {
		width: 50%;
		margin-left: 30upx;
	}

	/*checkbox 选项框大小  */
	.checkbox {
		width: 35upx;
		height: 35upx;
		border-radius: 50%;
		background-color: #FFFFFF;
		border: solid 2upx #cecece;
		overflow: hidden;
	}

	.checkbox image {
		width: 35upx;
		height: 35upx;
		border-radius: 50%;
	}

	#None {
		display: none;
	}

	#Show {
		display: block;
	}
</style>
