(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/peixun/getscore"],{"28a9":function(t,e,n){"use strict";n.r(e);var i=n("775b"),a=n("579f");for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);n("62c1");var o=n("2877"),u=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=u.exports},"423a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("f55d"));function a(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{pxid:"",pxname:"",scorelist:[]}},onLoad:function(t){this.pxid=t.pxid,this.pxname=t.pxname,i.default.islogin(!0),this.getscore()},onShow:function(){this.pxid=this.pxid},methods:{getscore:function(){var e=this;t.showLoading({mask:!0,title:"查询中..."}),t.request({url:i.default.websiteUrl+"signuup/getscore",method:"POST",data:i.default.postdata({pxid:this.pxid,studentid:i.default.getstate().userid,page:1,num:100}),success:function(n){200==n.data.code?(t.hideLoading(),e.scorelist=n.data.data.baseinfo):(t.hideLoading(),t.showToast({icon:"none",title:n.data.info}),"未找到登录信息"==n.data.info&&t.reLaunch({url:"/pages/login/login"}))},fail:function(){t.hideLoading(),t.showToast({icon:"none",title:"网络异常,请重试！"})}})}}};e.default=s}).call(this,n("543d")["default"])},"555b":function(t,e,n){"use strict";n("4651");var i=s(n("b0ce")),a=s(n("28a9"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(a.default))},"579f":function(t,e,n){"use strict";n.r(e);var i=n("423a"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e["default"]=a.a},"62c1":function(t,e,n){"use strict";var i=n("ea4b"),a=n.n(i);a.a},"775b":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"content"},[n("view",{staticClass:"title"},[t._v(t._s(t.pxname))]),n("view",{directives:[{name:"show",rawName:"v-show",value:0==t.scorelist.length,expression:"scorelist.length == 0"}],staticClass:"fs-text"},[t._v("暂无数据")]),t._l(t.scorelist,function(e,i){return n("view",{key:i,staticClass:"main"},[n("view",{staticClass:"list"},[n("view",{staticClass:"list-in"},[t._v(t._s(e.Contents))]),n("view",{staticClass:"list-on"},[t._v(t._s(e.Result)+"分")])])])})],2)},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},ea4b:function(t,e,n){}},[["555b","common/runtime","common/vendor"]]]);