webpackJsonp([5],{"09yM":function(t,e){},"7gM3":function(t,e){},"991W":function(t,e){},LLhK:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("kV13"),c=n("rVsN"),r=n.n(c),a=n("lC5x"),s=n.n(a),i=n("J0Oq"),u=n.n(i),l=n("AA3o"),h=n.n(l),f=n("xSur"),d=n.n(f),p=(function(){function t(e){h()(this,t),this.heartCheck={num:3,start:function(t){var e=this.num;setTimeout(function(){try{t.ws.send("test"),0===--e&&t.ws.colse()}catch(t){console.log(t)}},3e5)}},this.ws=null,this.wsUrl=e,this.lockReconnect=!1,this.tt=null,this.createWebSocket()}d()(t,[{key:"createWebSocket",value:function(){try{this.ws=new WebSocket(this.wsUrl),this.init()}catch(t){console.log("连接错误:"+t),this.reconnect(this.wsUrl)}}},{key:"init",value:function(){var t=this;this.ws.onclose=function(){console.log("链接断开"),t.reconnect(t.wsUrl)},this.ws.onerror=function(){console.log("链接异常"),t.reconnect(t.wsUrl)},this.ws.onopen=function(){console.log("连接正常"),t.heartCheck.start(t)},this.ws.onmessage=function(e){console.log(e.data),t.heartCheck.start(t)}}},{key:"reconnect",value:function(t){var e=this;console.log("重连"),this.lockReconnect?console.log("重连接已锁，不做处理"):(this.lockReconnect=!0,setTimeout(function(){e.lockReconnect=!1,e.createWebSocket()},4e3))}}])}(),function(){function t(){h()(this,t)}d()(t,null,[{key:"format",value:function(t){var e=new Date(t),n=""+(e.getMonth()+1),o=""+e.getDate(),c=e.getFullYear(),r=e.getHours()+"",a=e.getSeconds()+"",s=e.getMinutes()+"";return n.length<2&&(n="0"+n),o.length<2&&(o="0"+o),r.length<2&&(r="0"+r),s.length<2&&(s="0"+s),a.length<2&&(a="0"+a),[c,n,o].join("-")+" "+[r,s,a].join(":")}}])}(),{name:"App",provide:function(){return{reload:this.reload}},data:function(){return{now:"",ss:0,texts:"",cc:!0}},mounted:function(){},methods:{cli:function(){var t=this;return u()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$options.methods.settime();case 2:return e.sent,e.prev=3,e.next=6,t.$get("");case 6:e.sent,e.next=11;break;case 9:e.prev=9,e.t0=e.catch(3);case 11:case"end":return e.stop()}},e,t,[[3,9]])}))()},reload:function(){var t=this;return u()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.cc=!1,e.next=3,t.$nextTick();case 3:t.cc=!0;case 4:case"end":return e.stop()}},e,t)}))()},settime:function(){return new r.a(function(t,e){setTimeout(function(){t("asf")},2e3)})}}}),m={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"flex_row_center"},[this._v("\n    head\n  ")]),this._v(" "),e("transition",{attrs:{name:"fade1",mode:"out-in"}},[this.cc?e("router-view"):this._e()],1)],1)},staticRenderFns:[]};var g=n("C7Lr")(p,m,!1,function(t){n("7gM3")},"data-v-0abf17cf",null).exports,w=n("5inH");o.default.use(w.a);var k=new w.a({routes:[{path:"/index",name:"HelloWorld",component:function(){return n.e(0).then(n.bind(null,"FTUa"))}},{path:"/login",name:"login",component:function(){return n.e(2).then(n.bind(null,"qcqH"))}},{path:"/hel",name:"hel",component:function(){return n.e(3).then(n.bind(null,"WdwF"))}},{path:"/wu",name:"wu",component:function(){return n.e(1).then(n.bind(null,"aYQm"))}}]}),v=n("b8UZ");o.default.use(v.a);var b=new v.a.Store({state:{autoCheck:!0},mutations:{changAutoCheck:function(t,e){t.autoCheck=e}},actions:{setAutoCheck:function(t,e){t.commit("changAutoCheck",e)}},getters:{getAutoCheck:function(t){return t.autoCheck}}}),x=n("4YfN"),y=n.n(x),C=n("I29D"),A=n.n(C),T=n("TcQY"),M=n.n(T);A.a.defaults.timeout=5e3,A.a.defaults.baseURL="http://www.4399.com",A.a.interceptors.response.use(function(t){return t},function(t){return t.message.includes("timeout")&&Object(T.Message)({message:"连接超时,请检查您的网络状况后刷新页面",type:"error"}),r.a.reject(t)});var W=n("Ginn"),_=n.n(W);n("09yM"),n("LLhK"),n("991W");o.default.config.productionTip=!1,o.default.use(M.a),o.default.use(_.a,{ak:"kj5X1TWZYyxA6d8LsTDT0MwiqNqsmlqw"}),o.default.prototype.$post=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=localStorage.getItem("token");return new r.a(function(o,c){A.a.post(t,y()({},e,{token:n})).then(function(t){o(t.data)},function(t){c(t)})})},o.default.prototype.$get=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new r.a(function(n,o){A.a.get(t,{params:e}).then(function(t){n(t.data)}).catch(function(t){o(t)})})},new o.default({el:"#app",router:k,store:b,components:{App:g},template:"<App/>"})}},["NHnr"]);
//# sourceMappingURL=app.15137ccf70038c39dc86.js.map