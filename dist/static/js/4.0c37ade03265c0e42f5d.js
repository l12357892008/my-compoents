webpackJsonp([4],{QO3o:function(t,i){},"Y5W+":function(t,i){},fE7T:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e={data:function(){return{}},props:{width:{type:[String,Number],default:150},height:{type:[String,Number],default:50},text:String,dot:{type:Number,default:20},line:{type:Number,default:4}},computed:{w:function(){return~~this.width},h:function(){return~~this.height}},mounted:function(){this.init()},watch:{text:function(t,i){this.ctx&&this.ctx.clearRect(0,0,this.w,this.h),this.drawText(),this.drawDot(),this.drawLine()}},methods:{init:function(){this.initCanvas(),this.drawText(),this.drawDot(),this.drawLine()},initCanvas:function(){this.canvas=this.$refs.cav,this.ctx=this.canvas.getContext("2d"),this.canvas.height=this.h,this.canvas.width=this.w},drawText:function(){var t=this,i=this.text.split("");i.forEach(function(n,e){var s=t.random(30,40),r=t.random(-30,30);t.ctx.font=s+"px KaiTi",t.ctx.fillStyle=t.randomCol(),t.ctx.textBaseline="top",t.ctx.save(),t.ctx.translate(t.w/i.length*e+15,t.random(0,15)),t.ctx.rotate(r*Math.PI/180),t.ctx.fillText(i[e],0,0),t.ctx.restore()})},drawDot:function(){for(var t=0;t<this.dot;t++){this.ctx.beginPath(),this.ctx.fillStyle=this.randomCol();var i=this.random(0,this.w),n=this.random(0,this.h),e=this.random(1,2);this.ctx.arc(i,n,e,0,2*Math.PI),this.ctx.fill(),this.ctx.closePath()}},drawLine:function(){for(var t=0;t<this.line;t++){this.ctx.beginPath(),this.ctx.strokeStyle=this.randomCol(),this.ctx.lineWidth=2;var i=this.random(0,this.w),n=this.random(0,this.h),e=this.random(0,this.w),s=this.random(0,this.h);this.ctx.moveTo(i,n),this.ctx.lineTo(e,s),this.ctx.stroke()}},random:function(t,i){return Math.floor(Math.random()*(i-t+1)+t)},randomCol:function(){return"rgb("+this.random(0,255)+","+this.random(0,255)+","+this.random(0,255)+")"}},components:{}},s={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{ref:"verify",attrs:{id:"VerifiedFont"}},[this.text?i("canvas",{ref:"cav",staticClass:"canvas"}):this._e()])},staticRenderFns:[]};var r={data:function(){return{cc:"",ww:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",text:"cbfd"}},methods:{re:function(){for(var t=[],i=0;i<4;i++){var n=this.random(0,this.ww.length);t.push(this.ww[n])}t=t.join(""),this.text=t},random:function(t,i){return Math.floor(Math.random()*(i-t)+t)}},components:{VerifiedFont:n("C7Lr")(e,s,!1,function(t){n("QO3o")},"data-v-a15e5d4c",null).exports}},a={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"flex_center",attrs:{id:"VerifiedFontPage"}},[i("div",{staticClass:"flex_row_middle"},[i("VerifiedFont",{attrs:{text:this.text}}),this._v(" "),i("i",{staticClass:"my-icon-refresh-right",staticStyle:{"margin-left":"20px"},on:{click:this.re}})],1)])},staticRenderFns:[]};var h=n("C7Lr")(r,a,!1,function(t){n("Y5W+")},"data-v-7fc74c58",null);i.default=h.exports}});
//# sourceMappingURL=4.0c37ade03265c0e42f5d.js.map