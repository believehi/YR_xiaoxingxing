(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/daka"],{"0659":function(t,i,e){"use strict";e("4651");var s=a(e("b0ce")),n=a(e("175f"));function a(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(n.default))},"0791":function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("view",{staticClass:"content"},[e("view",{staticClass:"uni-top-content"},[e("view",{staticClass:"uni-img"},[e("image",{attrs:{src:t.qzinfo.images,mode:""}})]),e("view",{staticClass:"uni-content"},[e("text",[t._v(t._s(t.qzinfo.name))]),e("text",{staticClass:"fu-title"},[t._v(t._s(t.qzinfo.Joincount)+"人加入 · "+t._s(t.qzinfo.total)+"篇日记 ·")]),e("view",{staticClass:"uni-but-list"},[e("button",{attrs:{eventid:"33b95855-0"},on:{tap:function(i){t.actionSheetTap()}}},[e("image",{attrs:{src:"../../static/daka.png",mode:""}}),t._v("打卡")]),e("button",{attrs:{"open-type":"share"}},[e("uni-icon",{staticClass:"fa fa-share",attrs:{mpcomid:"33b95855-0"}}),t._v("分享")],1)],1)])]),e("view",{staticClass:"uni-xz-content"},t._l(t.list,function(i,s){return e("view",{key:s,class:t.activeIndex==s?"active":"",attrs:{eventid:"33b95855-1-"+s},on:{tap:function(i){t.option(s)}}},[t._v(t._s(i))])})),e("view",{},[e("view",{staticClass:"uni-xz-left",style:{display:0===t.activeIndex?"block":"none"}},[e("view",{staticClass:"ss-input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.crux,expression:"crux"}],attrs:{type:"text",value:"",placeholder:"想知道谁...",eventid:"33b95855-2"},domProps:{value:t.crux},on:{input:function(i){i.target.composing||(t.crux=i.target.value)}}}),e("button",{attrs:{eventid:"33b95855-3"},on:{click:function(i){t.cruxBut()}}},[t._v("搜索")])],1),e("view",{directives:[{name:"show",rawName:"v-show",value:0==t.daylist.length,expression:"daylist.length == 0"}],staticClass:"fs-text"},[t._v("暂无日记")]),t._l(t.daylist,function(i,s){return e("view",{key:s,staticClass:"uni-xz-init"},[e("view",{staticClass:"uni-init"},[e("view",{staticClass:"uni-init-img"},[e("view",[e("image",{attrs:{src:i.HeadUrl,mode:""}})]),e("image",{staticClass:"uni-init_icon",attrs:{src:2==i.Sex?"../../static/nv.png":"../../static/lan.png",mode:""}})]),e("view",{staticClass:"uni-init-con"},[e("view",{staticClass:"init-text"},[e("view",{staticClass:"init-text-main"},[e("text",[t._v(t._s(i.TrueName))]),e("text",[t._v(t._s(i.createtime))]),e("text",{attrs:{eventid:"33b95855-4-"+s},on:{tap:function(e){t.openDetails(i.Id)}}},[t._v(t._s(i.contents))])]),e("view",{staticClass:"init-text-zd",attrs:{eventid:"33b95855-5-"+s},on:{tap:function(e){t.deteless(i.userid,i.Id)}}},[t._v("···")])]),e("view",{staticClass:"init-content"},[t._l(i.piclist,function(n,a){return e("block",{key:a},[e("image",{style:{display:""!==n?"inline-block":"none"},attrs:{src:n,mode:"",eventid:"33b95855-6-"+s+"-"+a},on:{tap:function(e){t.previewImage(a,i.piclist)}}})])}),e("video",{style:{display:""==i.Video?"none":"block"},attrs:{src:i.Video,controls:"controls",direction:"0"}})],2),e("view",{directives:[{name:"show",rawName:"v-show",value:""!=i.Music,expression:"items.Music != ''"}],staticClass:"luyin"},[e("text",[t._v("录音音频")]),e("view",[1==t.inList[s]?e("image",{attrs:{src:"../../static/bofan_03.png",mode:"",eventid:"33b95855-7-"+s},on:{tap:function(e){t.startRecord(i.Music,s)}}}):t._e(),0==t.inList[s]?e("image",{attrs:{src:"../../static/bofan_04.png",mode:"",eventid:"33b95855-8-"+s},on:{tap:function(i){t.stopRecord(s)}}}):t._e()])]),e("view",{staticClass:"dizhi",style:{display:null==i.position||""==i.position?"none":"block"}},[t._v(t._s(i.position))])])]),e("view",{staticClass:"uni-init-icon"},[e("view",{attrs:{eventid:"33b95855-9-"+s},on:{tap:function(e){t.onLove(s,i.Id)}}},[e("image",{attrs:{src:0==i.Isfocus?t.IsLove[0]:t.IsLove[1],mode:""}}),e("text",[t._v(t._s(0==i.Isfocus?"赞 ":"已赞"))])]),e("view",{attrs:{eventid:"33b95855-10-"+s},on:{tap:function(i){t.onInput(s)}}},[e("image",{attrs:{src:"../../static/icon_02.png",mode:""}}),e("text",[t._v("评论")])]),e("view",[e("button",{staticClass:"fenxiang",attrs:{"open-type":"share"}},[e("image",{attrs:{src:"../../static/icon_03.png",mode:""}}),e("text",[t._v("分享")])])],1)]),e("view",{staticClass:"pinlun"},[e("view",{staticClass:"dianZan",style:{display:0==i.follow?"none":"flex"}},[e("image",{attrs:{src:"../../static/icon_01.png",mode:""}}),e("text",[t._v(t._s(i.follow)+" 人")])]),e("view",{staticClass:"pinlun-in"},t._l(i.replylist,function(i,s){return e("view",{key:s},[e("text",[t._v(t._s(i.TrueName)+":")]),e("text",[t._v(t._s(i.contents))])])}))]),e("view",{directives:[{name:"show",rawName:"v-show",value:1==t.inputList[s],expression:"inputList[index] == true"}],staticClass:"pinlunshuru"},[e("input",{staticClass:"plsr_input",attrs:{value:t.ssContent,placeholder:"想说点...",eventid:"33b95855-11-"+s},on:{input:t.onKeyInput}}),e("button",{attrs:{eventid:"33b95855-12-"+s},on:{tap:function(e){t.fabupinlun(i.Id)}}},[t._v("评论")])],1)])})],2),e("view",{staticClass:"uni-xz-right",style:{display:1===t.activeIndex?"block":"none"}},[e("view",{directives:[{name:"show",rawName:"v-show",value:0==t.memberlist.length,expression:"memberlist.length == 0"}],staticClass:"fs-text"},[t._v("暂无成员")]),t._l(t.memberlist,function(i,s){return e("view",{key:s,staticClass:"uni-cy"},[e("view",{staticClass:"cy_img"},[e("view",[e("image",{attrs:{src:i.Headurl,mode:""}})]),e("image",{staticClass:"cy_img-icon",attrs:{src:2==i.Sex?"../../static/nv.png":"../../static/lan.png",mode:""}})]),e("view",{staticClass:"cy_init"},[e("text",[t._v(t._s(i.TrueName))]),e("text",[t._v(t._s(1==i.Role?"圈主":"成员"))])]),e("view",{staticClass:"cy_date"},[t._v(t._s(i.JoinDate))])])})],2)])])},n=[];e.d(i,"a",function(){return s}),e.d(i,"b",function(){return n})},"175f":function(t,i,e){"use strict";e.r(i);var s=e("0791"),n=e("2013");for(var a in n)"default"!==a&&function(t){e.d(i,t,function(){return n[t]})}(a);e("50cd");var o=e("2877"),l=Object(o["a"])(n["default"],s["a"],s["b"],!1,null,null,null);i["default"]=l.exports},"1de9":function(t,i,e){},2013:function(t,i,e){"use strict";e.r(i);var s=e("3447"),n=e.n(s);for(var a in s)"default"!==a&&function(t){e.d(i,t,function(){return s[t]})}(a);i["default"]=n.a},3447:function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=n(e("f55d"));function n(t){return t&&t.__esModule?t:{default:t}}var a=t.createInnerAudioContext(),o={data:function(){return{crux:"",inputList:[],inList:[],IsLove:["../../static/icon_01.png","../../static/icon_05.png"],sexImg:["../../static/lan.png","../../static/nv.png"],activeIndex:0,list:["日记","成员"],cateid:"",qzinfo:"",daylist:"",memberlist:"",qzdata:1,ssContent:"",num:10}},onLoad:function(i){var e=this;this.cateid=i.id,this.qz(this.qzdata),s.default.islogin(!0),a.onEnded(function(){for(var i=0;i<e.inList.length;i++)e.inList[i]=!0;e.qz(e.qzdata),t.showToast({icon:"none",title:"已播放完！",duration:2e3})}),a.onError(function(t){})},onShow:function(){this.qz(this.qzdata)},onHide:function(){a.stop()},onBackPress:function(){a.stop()},onPullDownRefresh:function(){t.stopPullDownRefresh(),this.qz(this.qzdata)},onReachBottom:function(){var t=new String("5");this.num=Number(this.num)+Number(t),this.qz(this.qzdata)},methods:{cruxBut:function(){this.daylist=[],this.qz(this.qzdata)},onKeyInput:function(t){this.ssContent=t.target.value},fabupinlun:function(i){var e=this;""!=this.ssContent&&null!=this.ssContent?t.request({url:s.default.websiteUrl+"hotlive/addreply",method:"POST",data:s.default.postdata({topicid:i,userId:s.default.getstate().userid,contents:this.ssContent,Isok:!0,Lat:0,lng:0}),success:function(i){200==i.data.code?(e.ssId="",e.ssContent="",t.showToast({icon:"none",title:i.data.info}),e.qz(1)):(t.hideLoading(),t.showToast({icon:"none",title:i.data.info}))},fail:function(){t.hideLoading(),t.showToast({icon:"none",title:"网络异常,请重试！"})}}):t.showToast({icon:"none",title:"请输入评论内容!"})},onLove:function(i,e){var n=this;t.request({url:s.default.websiteUrl+"circle/followpost",method:"POST",data:s.default.postdata({uid:s.default.getstate().userid,fid:e}),success:function(e){200==e.data.code?(n.daylist[i].Isfocus=0==n.daylist[i].Isfocus?1:0,0==n.daylist[i].Isfocus?n.daylist[i].follow--:n.daylist[i].follow++,t.showToast({icon:"none",title:e.data.info})):(t.showToast({icon:"none",title:e.data.info}),t.hideLoading()),t.hideLoading()},fail:function(){t.hideLoading(),t.showToast({icon:"none",title:"网络异常,请重试！"})}})},option:function(t){this.activeIndex!=t&&(this.activeIndex=t,this.qzdata=this.activeIndex+1,this.qz(this.qzdata))},qz:function(i){var e=this;t.showLoading({mask:!0,title:"加载中..."}),t.request({url:s.default.websiteUrl+"circle/getbycateid",method:"POST",data:s.default.postdata({userid:s.default.getstate().userid,cateid:this.cateid,truename:this.crux,type:i,page:1,num:this.num}),success:function(n){if(200==n.data.code){if(t.hideLoading(),e.qzinfo=n.data.data.baseinfo,-1==e.qzinfo.images.indexOf("http")&&(e.qzinfo.images=s.default.imgurl+e.qzinfo.images),e.daylist=n.data.data.daylist||[],e.memberlist=n.data.data.memberlist||[],null!=e.daylist)for(var a=0;a<e.daylist.length;a++)if(""!=e.daylist[a].Video&&null!=e.daylist[a].Video&&-1==e.daylist[a].Video.indexOf("http")&&(e.daylist[a].Video=s.default.imgurl+e.daylist[a].Video),""!=e.daylist[a].Music&&null!=e.daylist[a].Music&&-1==e.daylist[a].Music.indexOf("http")&&(e.daylist[a].Music=s.default.imgurl+e.daylist[a].Music),null!=e.daylist[a].piclist)for(var o=0;o<e.daylist[a].piclist.length;o++)-1==e.daylist[a].piclist[o].indexOf("http")&&(e.daylist[a].piclist[o]=s.default.imgurl+e.daylist[a].piclist[o]);if(null!=e.memberlist)for(a=0;a<e.memberlist.length;a++)null!=e.memberlist[a].Headurl&&-1==e.memberlist[a].Headurl.indexOf("http")&&(e.memberlist[a].Headurl=s.default.imgurl+e.memberlist[a].Headurl);if(1==i){var l=e.daylist.length;if(e.inList.length!=l){e.inList=[],e.inputList=[];for(var c=0;c<l;c++)e.inList.push(!0),e.inputList.push(!1)}}null==e.qzinfo.daycount&&(e.qzinfo.daycount="0")}else t.showToast({icon:"none",title:n.data.info}),t.hideLoading(),"未找到登录信息"==n.data.info&&t.reLaunch({url:"/pages/login/login"})},fail:function(){t.hideLoading(),t.showToast({icon:"none",title:"网络异常,请重试！"})}})},deteless:function(i,e){var n=this;i==s.default.getstate().userid?t.showActionSheet({title:"删除日记",itemList:["删除日记"],success:function(i){t.showLoading({mask:!0,title:"正在删除..."}),t.request({url:s.default.websiteUrl+"circle/deletpost",method:"POST",data:s.default.postdata({Postid:e}),success:function(i){200==i.data.code?(t.hideLoading(),n.qz(n.qzdata),t.showToast({icon:"none",title:"删除成功！"})):(t.hideLoading(),t.showToast({icon:"none",title:i.data.info}))},fail:function(){t.hideLoading(),t.showToast({icon:"none",title:"网络异常,请重试！"})}})}}):t.showActionSheet({title:"日记详情",itemList:["日记详情"],success:function(t){n.openDetails(e)}})},onInput:function(t){for(var i=0;i<this.inputList.length;i++)this.inputList[i]=!1;this.inputList[t]=!0,this.qz(this.qzdata)},previewImage:function(i,e){for(var s=0;s<this.inList.length;s++)this.inList[s]=!0;t.previewImage({current:i,urls:e})},startRecord:function(i,e){a.src!=i&&a.stop(),a.src=i;for(var s=0;s<this.inList.length;s++)this.inList[s]=!0;this.inList[e]=!1,this.qz(this.qzdata),a.play(),a.onPlay(function(){t.showLoading({icon:"none",title:"播放中..."})})},stopRecord:function(t){this.inList[t]=!0,this.qz(this.qzdata),a.pause()},openDetails:function(i){t.navigateTo({url:"dakaDetails?id="+i})},actionSheetTap:function(){var i=this,e=0==this.qzinfo.IsDk?["打卡日记"]:["发表日记"];t.showActionSheet({title:"打卡日记",itemList:e,success:function(e){t.navigateTo({url:"dakariji?Id="+i.qzinfo.Id})}})}},onShareAppMessage:function(){t.request({url:s.default.websiteUrl+"circle/addjf",method:"POST",data:s.default.postdata({}),success:function(i){200==i.data.code||t.showToast({icon:"none",title:i.data.info})},fail:function(){t.showToast({icon:"none",title:"网络异常,请重试！",duration:1500})}})}};i.default=o}).call(this,e("543d")["default"])},"50cd":function(t,i,e){"use strict";var s=e("1de9"),n=e.n(s);n.a}},[["0659","common/runtime","common/vendor"]]]);