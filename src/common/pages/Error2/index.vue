<!--
  describe:
  动态弹幕式404页面
  直接在路由中添加路径指向该文件
  {
    path: '/404',
    name: 'Error2',
    component: () => import('@/common/pages/Error2')
  }
-->
<template>
  <div id="Error">
    <div class="head404 flex_center">
      <canvas id="canvas" ref="canv"></canvas>
    </div>
    <div class="tt flex_col_middle" style="height: 100%;">
      <div class="flex"></div>
      <div class="txtbg404" ref="txtbg404">
        <div class="txtbox">
          <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>
          <p class="paddingbox">请点击以下链接继续浏览网页</p>
          <p @click="$router.go(-1)" style="cursor:pointer;">》返回上一页面</p>
          <p @click="$router.replace('/')" style="cursor:pointer">》返回网站首页</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      keydown: null,  // 键盘按下函数，销毁时需要
      keyup: null,  // 键盘抬起函数
      requestID: null,  // window.requestAnimationFrame返回的id，销毁时需要
      ccb: null
    }
  },
  mounted() {
    this.initRAF();
    this.init();
  },
  beforeDestroy(){
    window.removeEventListener('keypress',this.keydown,true)   // 必须三个参数都一致才能成功销毁(艹，坑爹)
    window.removeEventListener('keyup',this.keyup,true)
    window.cancelAnimationFrame(this.requestID)
  },
  methods: {
    initRAF() {
      /* requestAnimationFrame专门用于重绘实现动画
       *与setTimeout类似，但性能比setTimeout好的多，
       *接受一个回调函数，大概15m后会调用。
      */
      window.requestAnimationFrame = (function() { // 适配不同浏览器固定写法，复制粘贴就行了
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          function(callback) { // 如果都没有就只能用性能最烂的setTimeout凑合
            window.setTimeout(callback, 1000 / 60);
          };
      })();
      window.cancelAnimationFrame = (function() { // 适配不同浏览器固定写法，复制粘贴就行了
        return window.cancelAnimationFrame ||
          window.webkitCancelAnimationFrame ||
          window.mozCancelAnimationFrame ||
          window.oCancelAnimationFrame ||
          function(id) {
            window.clearTimeout(id);
          };
      })();
    },
    init() {
      const that = this
      const w = window.innerWidth; // 网页可见区域宽，和document.body.offsetWidth相同...........吧
      const h = window.innerHeight;
      const canvas = this.$refs.canv;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d"); // 目前唯一合法值就是2d,说不定未来canvas可以绘制3D了就可以传个3d进去
      this.ccb = ctx

      const text_arr = ["page", "Not Found", "404", "找不到页面"]; //显示文字
      const text_num = 50; //页面要显示的文字个数
      const word_arr = []; //储存文字坐标等属性的数组
      const txt_color = '#fff'  // 文字颜色
      const font_family = 'KaiTi'  // 字体样式，楷体
      const txt_min_size = 10; //文字最小大小
      const txt_max_size = 50; //文字最大大小
      const txt_min_speed = 2; //弹幕最小速度
      const txt_max_speed = 3; //弹幕最大速度
      let keypress = false; //默认键盘未点击状态，点击键盘实现加速效果
      let stop = false; // 按空格暂停弹幕
      const acclerate = 3; //点击键盘加速倍率

      this.keydown = function(e) {
        if(e.keyCode === 32){
          stop = !stop
        }else{
          keypress = true;
        }
      }
      window.addEventListener(  // 监听键盘按下
        "keydown",
        this.keydown,
        true
      );
      this.keyup = function() {
        keypress = false;
      }
      window.addEventListener(  // 监听键盘松开
        "keyup",
        this.keyup,
        true
      );

      //生成一个min ~ (max + 1)之间的随机数   之后会向下取整
      // 注Math.random()生成范围为[0,1),1取开区间
      function random(min, max) {
        return Math.random() * (max - min + 1) + min;
      }
      // 生成所有文字的初始信息(坐标，内容，大小，速度)
      function initText() {
        for (let i = 0; i < text_num; i++) {
          let t = {
            x: random(-150, w),   // 范围弄扩到屏幕左侧以外，这样更有连贯性，不然刚开页面的时候可能太密集并出现一小段空屏
            y: random(0, h),
            text: text_arr[~~random(0, text_arr.length)],
            size: ~~random(txt_min_size, txt_max_size),
            speed: random(txt_min_speed,txt_max_speed)
          };
          word_arr.push(t);
        }
      }
      //在canvas绘制文字移动效果
      function draw() {
        if(!stop){ // 如果没暂停就重绘实现弹幕移动
          ctx.clearRect(0, 0, w, h);  // 把从(0,0)坐标到(x,y)坐标围成的矩形区域清空
          ctx.fillStyle = txt_color;  // 设置画笔颜色
          for (let i = 0; i < word_arr.length; i++) {
            //设置文字大小，样式
            ctx.font = word_arr[i].size + "px " +  font_family;
            // 测量文字宽度，设置好了文字大小才能测
            var t_w = ctx.measureText(word_arr[i].text);
            ctx.fillText(word_arr[i].text, word_arr[i].x, word_arr[i].y);
            if (keypress) {
              word_arr[i].x += word_arr[i].speed * acclerate;
            } else {
              word_arr[i].x += word_arr[i].speed;
            }
            //如果大于窗口宽度，那么重新返回，并且随机y轴位置和大小以及速度
            if (word_arr[i].x >= w) {
              word_arr[i].x = -t_w.width * 3;
              word_arr[i].y = random(0, h);
              word_arr[i].size = ~~random(txt_min_size, txt_max_size);
              word_arr[i].speed = random(txt_min_speed, txt_max_speed);
            }
          }
          that.requestID = window.requestAnimationFrame(draw);
        }else{
          that.requestID = window.requestAnimationFrame(draw);
        }
      }
      initText();
      draw();
    }
  }
};
</script>

<style scoped>
* {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
}
#Error {
  background: #494949;
}
.head404{
  position: fixed;
  z-index: 1;
  pointer-events: none;
  opacity: 0.5;
}
canvas {
  background: #494949;
  display: block;
}
.tt{
  z-index: 0;
}
.txtbg404 {
  width: 499px;
  height: 169px;
  background: url(./img/txtbg404.png) no-repeat;
}

.txtbg404 .txtbox {
  width: 390px;
  position: relative;
  top: 30px;
  left: 60px;
  color: #eee;
  font-size: 13px;
}

.txtbg404 .txtbox p {
  margin: 5px 0;
  line-height: 18px;
}

.txtbg404 .txtbox .paddingbox {
  padding-top: 15px;
}

.txtbg404 .txtbox p a {
  color: #eee;
  text-decoration: none;
}

.txtbg404 .txtbox p a:hover {
  color: #fc9d1d;
  text-decoration: underline;
}
</style>
