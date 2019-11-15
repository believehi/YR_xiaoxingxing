const websiteUrl = 'https://xsh.newstaredu.cn/yiru/xxx/';
// const websiteUrl = 'https://xiaoxx.01.t1m.cn/yiru/xxx/';
const imgurl ='https://z.newstaredu.cn/xsh/';
const reg = /^0?(13|15|18|16|14|17|19)[0-9]{9}$/;
const now = Date.now || function() {
	return new Date().getTime();
};
const isArray = Array.isArray || function(obj) {
	return obj instanceof Array;
};
//判断手机号码是否正确
const checkmobile = function(mobile) {
	mobile = mobile || '';
	var reg = /^0?(13|15|18|16|14|17|19)[0-9]{9}$/;
	return (reg.test(mobile));
}

//判断身份证号码是否正确
const checkcard = function(card) {
	card = card || '';
	var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	return (reg.test(card));
}

//判断手机号码是否正确
const checkEmail = function(Email) {
	Email = Email || '';
	var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
	return (reg.test(Email));
}

//小程序端自动生成设备识别码
const customuuid = function() {
	var len = 29;
	var radix = 16; //基数
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [],
		i,
		shibeima='';
	// radix = radix || chars.length;
	// if (len) {
	// 	for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	// } else {
	// 	var r;
	// 	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	// 	uuid[14] = '4';
	// 	for (i = 0; i < 36; i++) {
	// 		if (!uuid[i]) {
	// 			r = 0 | Math.random() * 16;
	// 			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	// 		}
	// 	}
	// }
	for(i = 0;i<len;i++){
		shibeima +=chars[0 | Math.random() * radix];
	}
	// return 'MP_' + uuid.join('');
	return 'MP_' + shibeima;
}
//会员退出
const logout = function() {
	uni.removeStorageSync('sdlstate');
	uni.reLaunch({
		url: '/pages/login/login'
	});
}
//判断是否登陆，如果obj位false，则值判断，返回true或false，如果obj为true，则直接转跳到登陆页面
const islogin = function(obj) {
	var isok = false;
	var userState = getstate();
	// if (userState.userid && userState.userid != '') {
	// 	isok = true;
	// } else {
	// 	isok = false;
	// }
	if (!userState.userid || userState.userid == '') {
		isok = true;
	} else {
		isok = false;
	}
	if (isok) {
		uni.reLaunch({
			url: '/pages/login/login'
		});
	} else {
		return isok;
	}
}

// 生成四位数的随机数
const MathRand = function(len) {
	var Num = "";
	for (var i = 0; i < len; i++) {
		Num += Math.floor(Math.random() * 10);
	}
	return Num;
}

//获取会员缓存的信息
const getstate = function() {
	var state = uni.getStorageSync('sdlstate') || "{}";
	return JSON.parse(state);
}
//设置会员缓存信息
const setstate = function(userid, mobile, nickname,roleIds,postIds) {
	var state = this.getstate();
	state.userid = userid;
	state.mobile = mobile;
	state.nickname = nickname;
	state.roleIds = roleIds;
	state.postIds = postIds;
	uni.setStorageSync('sdlstate', JSON.stringify(state));
}

//统计封装的请求数据
const postdata = function(data) {
	var pos = {};
	pos.loginMark = getloginMark();
	pos.token = gettoken();
	pos.data = JSON.stringify(data);
	return pos;
};
//如果接口返回未找到登录信息则清空缓存并转跳到登陆页面
const goout = function(obj) {
	if (obj == '未找到登录信息' || obj == '登录信息已过期') {
		uni.removeStorageSync('sdlstate');
		uni.reLaunch({
			url: '/pages/login/login'
		});
	}
}

//获取设备识别码
const getloginMark = function() {

	// #ifdef MP-WEIXIN
	//uni.removeStorageSync('loginMark');
	var mark = uni.getStorageSync('loginMark');
	if (!mark) {
		mark = customuuid();
		// mark = "222222";
		uni.setStorageSync('loginMark', mark);
	}
	return mark;
	// #endif
	// #ifdef APP-PLUS
	return plus.device.uuid;
	// #endif

}
//获取令牌
const gettoken = function() {
	var token = uni.getStorageSync('token');
	if (token == null) {
		uni.showToast({
			icon: 'none',
			title: '请先登陆'
		});
		uni.redirectTo({
			url: 'login'
		});
		return;
	}
	return token;
}
//更改图片路径
const updurl = function(src){
	
	if(src!=""||src!=null){
		if(src.indexOf('http') == -1){
			src = imgurl + src;
		}
	}
	return src;
}

export default {
	websiteUrl,
	now,
	isArray,
	postdata,
	getloginMark,
	gettoken,
	customuuid,
	getstate,
	setstate,
	islogin,
	logout,
	checkmobile,
	checkcard,
	checkEmail,
	goout,
	MathRand,
	reg,
	imgurl,
	updurl
	
}
