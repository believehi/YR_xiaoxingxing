(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/ziyuanxiazai"],{1065:function(t,i,e){"use strict";e.r(i);var n=e("14fb"),s=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(i,t,function(){return n[t]})}(a);i["default"]=s.a},"14fb":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=s(e("f55d"));function s(t){return t&&t.__esModule?t:{default:t}}var a={data:function(){return{kclist:{},kcid:"",jd:"",wz:"下载中"}},onLoad:function(t){this.kcid=t.kcid,n.default.islogin(!0),this.xz_but()},methods:{xz_but:function(){var i=this;t.showLoading({mask:!0,title:"加载中..."}),t.request({url:n.default.websiteUrl+"signuup/getfilesbyid",method:"POST",data:n.default.postdata({id:this.kcid}),success:function(e){200==e.data.code?(t.hideLoading(),i.kclist=e.data.data.baseinfo):(t.hideLoading(),t.showToast({icon:"none",title:e.data.info}),"未找到登录信息"==e.data.info&&t.reLaunch({url:"/pages/login/login"}))},fail:function(){t.showToast({icon:"none",title:"网络异常,请重试！",duration:1500})}})},zyxz_but:function(){if(""!=this.kclist.Files){var i=t.downloadFile({url:this.kclist.Files,success:function(i){200===i.statusCode?t.saveFile({tempFilePath:i.tempFilePath,success:function(i){var e=i.savedFilePath;t.getSavedFileList({success:function(t){}}),t.openDocument({filePath:e,success:function(t){}})}}):t.showToast({title:"下载失败，请重试",duration:1500})}});i.onProgressUpdate(function(i){t.showLoading({title:"下载中"+i.progress+"%"}),"100"==i.progress&&(t.hideLoading(),t.showToast({title:"下载完成",duration:1500}))})}else t.showToast({icon:"none",title:"暂未开通权限！"})}},onShareAppMessage:function(){}};i.default=a}).call(this,e("543d")["default"])},"3bdd":function(t,i,e){},4089:function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("view",{staticClass:"content"},[e("view",{staticClass:"uni-zy-box"},[e("view",{staticClass:"uni-wj"},[e("text",[t._v(t._s(t.kclist.TrainName))])]),e("button",{staticClass:"uni-icon",attrs:{"open-type":"share"}},[e("uni-icon",{staticClass:"fa fa-share-square-o",attrs:{mpcomid:"575b6e4c-0"}}),e("text",[t._v("分享")])],1)],1),e("view",{staticClass:"uni-jd"},[t._v(t._s(t.jd))]),e("view",{staticClass:"uni-xz-box",attrs:{eventid:"575b6e4c-0"},on:{tap:t.zyxz_but}},[e("view",{staticClass:"icon-box"},[e("uni-icon",{staticClass:"icon2",attrs:{mpcomid:"575b6e4c-1"}})],1),e("view",{staticClass:"text-box"},[t._v("参训资料包下载")])])])},s=[];e.d(i,"a",function(){return n}),e.d(i,"b",function(){return s})},"45bc":function(t,i,e){"use strict";e("4651");var n=a(e("b0ce")),s=a(e("dd1e"));function a(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(s.default))},7534:function(t,i,e){"use strict";var n=e("3bdd"),s=e.n(n);s.a},dd1e:function(t,i,e){"use strict";e.r(i);var n=e("4089"),s=e("1065");for(var a in s)"default"!==a&&function(t){e.d(i,t,function(){return s[t]})}(a);e("7534");var o=e("2877"),u=Object(o["a"])(s["default"],n["a"],n["b"],!1,null,null,null);i["default"]=u.exports}},[["45bc","common/runtime","common/vendor"]]]);