(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/peixun/wangqi"],{1371:function(t,i,n){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=e(n("f55d"));function e(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{indicatorDots:!1,autoplay:!0,interval:3e3,duration:500,pxid:"",mzlist1:{},IsCX:0,pxname:""}},onLoad:function(t){this.pxid=t.pxid,a.default.islogin(!0),this.mzlist()},onShow:function(){this.pxid=this.pxid,this.mzlist()},methods:{mzlist:function(){var i=this;t.showLoading({mask:!0,title:"加载中..."}),t.request({url:a.default.websiteUrl+"signuup/getnowpxinfo",method:"POST",data:a.default.postdata({userid:a.default.getstate().userid,id:this.pxid}),success:function(n){200==n.data.code?(t.hideLoading(),i.mzlist1=n.data.data.mzlist,i.IsCX=n.data.data.IsCX,i.pxname=n.data.data.baseinfo.TrainName):(t.hideLoading(),t.showToast({icon:"none",title:n.data.info}),"未找到登录信息"==n.data.info&&t.reLaunch({url:"/pages/login/login"}))},fail:function(){t.hideLoading(),t.showToast({icon:"none",title:"网络异常,请重试！"})}})},cf_but:function(){t.navigateTo({url:"getscore?pxid="+this.pxid+"&pxname="+this.pxname})},openpf:function(){0!=this.IsCX?t.navigateTo({url:"shijuanlist?pxid="+this.pxid+"&pftype=2"}):t.showToast({icon:"none",title:"您暂未参加本次培训！"})},openmz:function(){t.navigateTo({url:"meizhao?pxid="+this.pxid})},opensp:function(){t.navigateTo({url:"peixunsp?pxid="+this.pxid})},opendk:function(){t.navigateTo({url:"daka?id="+this.pxid})},jieyingpic:function(){t.navigateTo({url:"jieyingtupian?pxid="+this.pxid})}}};i.default=o}).call(this,n("543d")["default"])},"3d7f":function(t,i,n){"use strict";n.r(i);var a=n("1371"),e=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(i,t,function(){return a[t]})}(o);i["default"]=e.a},"8d30":function(t,i,n){"use strict";n("4651");var a=o(n("b0ce")),e=o(n("a820"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(e.default))},"8d43":function(t,i,n){"use strict";var a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("view",{staticClass:"content"},[n("view",{staticClass:"uni-jy"},[n("image",{attrs:{src:"../../static/jy_1.jpg",mode:"",eventid:"7d073168-0"},on:{tap:t.jieyingpic}})]),n("view",{staticClass:"uni-cf-box",attrs:{eventid:"7d073168-1"},on:{tap:t.cf_but}},[n("input",{attrs:{type:"text",value:"",disabled:"true",placeholder:"查分"}}),n("uni-icon",{staticClass:"fa fa-search",attrs:{mpcomid:"7d073168-0"}})],1),n("view",{staticClass:"uni-dk-box"},[n("image",{attrs:{src:"../../static/dk_1.jpg",mode:"",eventid:"7d073168-2"},on:{tap:t.opendk}}),n("image",{attrs:{src:"../../static/ds_1.jpg",mode:"",eventid:"7d073168-3"},on:{tap:t.openpf}})]),n("view",{staticClass:"uni-dk-box"},[n("image",{attrs:{src:"../../static/xy_1.jpg",mode:"",eventid:"7d073168-4"},on:{tap:t.opensp}}),n("image",{attrs:{src:"../../static/mz_1.jpg",mode:"",eventid:"7d073168-5"},on:{tap:t.openmz}})])])},e=[];n.d(i,"a",function(){return a}),n.d(i,"b",function(){return e})},a275:function(t,i,n){},a820:function(t,i,n){"use strict";n.r(i);var a=n("8d43"),e=n("3d7f");for(var o in e)"default"!==o&&function(t){n.d(i,t,function(){return e[t]})}(o);n("ec8b");var s=n("2877"),d=Object(s["a"])(e["default"],a["a"],a["b"],!1,null,null,null);i["default"]=d.exports},ec8b:function(t,i,n){"use strict";var a=n("a275"),e=n.n(a);e.a}},[["8d30","common/runtime","common/vendor"]]]);