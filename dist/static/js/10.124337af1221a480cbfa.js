webpackJsonp([10],{"5WPR":function(e,t){},z449:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={data:function(){return{keydown:null,keyup:null,requestID:null,ccb:null}},mounted:function(){this.initRAF(),this.init()},beforeDestroy:function(){window.removeEventListener("keypress",this.keydown,!0),window.removeEventListener("keyup",this.keyup,!0),window.cancelAnimationFrame(this.requestID)},methods:{initRAF:function(){window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)},window.cancelAnimationFrame=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||function(e){window.clearTimeout(e)}},init:function(){var e=this,t=this.$refs.txtbg404,n=window.innerWidth,i=window.innerHeight;t.style.left=n/2-230+"px";var o=this.$refs.canv;o.width=n,o.height=i;var r=o.getContext("2d");this.ccb=r;var a=["page","Not Found","404","找不到页面"],s=50,d=[],u="#fff",c="KaiTi",w=10,l=50,f=2,m=3,v=!1,p=!1,h=3;function y(e,t){return Math.random()*(t-e+1)+e}this.keydown=function(e){32===e.keyCode?p=!p:v=!0},window.addEventListener("keydown",this.keydown,!0),this.keyup=function(){v=!1},window.addEventListener("keyup",this.keyup,!0),function(){for(var e=0;e<s;e++){var t={x:y(-150,n),y:y(0,i),text:a[~~y(0,a.length)],size:~~y(w,l),speed:y(f,m)};d.push(t)}}(),function t(){if(p)e.requestID=window.requestAnimationFrame(t);else{r.clearRect(0,0,n,i),r.fillStyle=u;for(var o=0;o<d.length;o++){r.font=d[o].size+"px "+c;var a=r.measureText(d[o].text);r.fillText(d[o].text,d[o].x,d[o].y),d[o].x+=v?d[o].speed*h:d[o].speed,d[o].x>=n&&(d[o].x=3*-a.width,d[o].y=y(0,i),d[o].size=~~y(w,l),d[o].speed=y(f,m))}e.requestID=window.requestAnimationFrame(t)}}()}}},o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"Error"}},[n("div",{staticClass:"head404 flex_center"},[n("canvas",{ref:"canv",attrs:{id:"canvas"}})]),e._v(" "),n("div",{ref:"txtbg404",staticClass:"txtbg404"},[n("div",{staticClass:"txtbox"},[n("p",[e._v("对不起，您请求的页面不存在、或已被删除、或暂时不可用")]),e._v(" "),n("p",{staticClass:"paddingbox"},[e._v("请点击以下链接继续浏览网页")]),e._v(" "),n("p",{staticStyle:{cursor:"pointer"},on:{click:function(t){return e.$router.go(-1)}}},[e._v("》返回上一页面")]),e._v(" "),n("p",{staticStyle:{cursor:"pointer"},on:{click:function(t){return e.$router.replace("/")}}},[e._v("》返回网站首页")])])])])},staticRenderFns:[]};var r=n("C7Lr")(i,o,!1,function(e){n("5WPR")},"data-v-d3f10374",null);t.default=r.exports}});
//# sourceMappingURL=10.124337af1221a480cbfa.js.map