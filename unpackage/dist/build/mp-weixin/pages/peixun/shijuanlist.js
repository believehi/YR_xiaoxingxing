(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/peixun/shijuanlist"],{"56df":function(t,e,i){"use strict";var a=i("9320"),n=i.n(a);n.a},"7af8":function(t,e,i){"use strict";i("4651");var a=s(i("b0ce")),n=s(i("a9f1"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(n.default))},"7ff8":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"content"},[i("view",{staticClass:"cart",attrs:{hidden:t.iscart}},[i("view",[t._v("暂无数据")])]),i("view",{staticClass:"uni-kc-list",attrs:{hidden:!t.iscart}},t._l(t.kclist,function(e,a){return i("view",{key:a,staticClass:"uni-kc-item",attrs:{"data-sjid":e.ID,"data-ispg":e.ispg,eventid:"57370a1d-0-"+a},on:{tap:t.openkc}},[i("view",{staticClass:"uni-time"},[i("view",{staticClass:"time"},[t._v(t._s(e.ShiJuanName))]),i("text",[t._v("进入")])])])}))])},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},"8c46":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("f55d"));function n(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{kclist:{},iscart:!1,pxid:"",pftype:0}},onLoad:function(t){a.default.islogin(!0),this.pftype=t.pftype,2==t.pftype&&(this.pxid=t.pxid),this.wqpxlist()},onShow:function(){this.wqpxlist()},methods:{wqpxlist:function(){var e,i,n=this;t.showLoading({mask:!0,title:"加载中..."}),1==this.pftype?(e="SignuUp/getsyplist",i=a.default.postdata({userid:a.default.getstate().userid,page:1,num:10})):2==this.pftype&&(e="SignuUp/getpaperlist",i=a.default.postdata({userid:a.default.getstate().userid,id:this.pxid})),t.request({url:a.default.websiteUrl+e,method:"POST",data:i,success:function(e){200==e.data.code?(console.log(i),console.log(e.data.data),t.hideLoading(),n.kclist=e.data.data.baseinfo,n.kclist.length>0?n.iscart=!0:n.kclist=!1):(t.hideLoading(),t.showToast({icon:"none",title:e.data.info}),"未找到登录信息"==e.data.info&&t.reLaunch({url:"/pages/login/login"}))},fail:function(){t.hideLoading(),t.showToast({icon:"none",title:"网络异常,请重试！"})}})},openkc:function(e){0==e.currentTarget.dataset.ispg?t.navigateTo({url:"pingfen?sjid="+e.currentTarget.dataset.sjid}):t.showToast({icon:"none",title:"已进行评分,无法再次评分!"})}}};e.default=s}).call(this,i("543d")["default"])},9320:function(t,e,i){},a9f1:function(t,e,i){"use strict";i.r(e);var a=i("7ff8"),n=i("d6eb");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("56df");var u=i("2877"),o=Object(u["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=o.exports},d6eb:function(t,e,i){"use strict";i.r(e);var a=i("8c46"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a}},[["7af8","common/runtime","common/vendor"]]]);