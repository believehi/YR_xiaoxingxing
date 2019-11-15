<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let her = 'https://xiaoxx.01.t1m.cn/yiru/xxx/';
			let postdata = function(data) {
				pos = new {
					loginMark: getloginMark(),
					token: gettoken(),
					data: data
				}
				return pos;
			};
			let getloginMark = function() {


				//AP
				//return APP-PLUS.uuid;
				//			
				//else{

				var mark = uni.getStorageSync('loginMark');
				if (mark == null) {
					mark = uni.setStorageSync('loginMark', 'wewerwew');
				}
				return mark;

				//}


			}
			let gettoken = function() {

				var token = uni.getStorageSync('token');
				if (token == null) {
					
				}
				return token;
			}
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		},


	}
</script>

<style>
	@import "./common/public.css";
	@import "./css/font-awesome.css";
	@import "./common/icon.css";
	/*每个页面公共css */
</style>
