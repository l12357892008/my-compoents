<!--
  describe:
  1.引入
  2.接受属性:
    必填项: 无
    可选项:
      1.disRotateY: Boolean,默认false，为true时不进行纵向旋转
  3.描述:
    将图片以旋转木马的方式呈现并可拖拽旋转(也可以放入文本),最多36张，多了透视距离跟不了
-->
<template>
  <div id="box" @mousedown.left="down">
    <div id="wrap" ref="box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: null,
      roX: -10, // 初始旋转角度
      roY: 0, // 初始旋转角度
      length: 0,  // 图片数量
    };
  },
  props: {
    disRotateY: Boolean
  },
  created(){
    if(this.$slots.default){ // 计算一共多少张图片
      this.length = (this.$slots.default.length + 1) / 2
    }
  },
  mounted() {
    /**不用定时函数没法触发初始动画,
     * 我也不知道为什么，
     * 我也很绝望
     */
    setTimeout(() => {
      this.init();
    }, 0);
  },
  computed:{ 
    double(){ // 以12张为标准进行倍率计算
      return (this.length / 12)
    },
    plv() {  // 透视距离
      let aa = this.double * 800 * 2
      return (aa < 800 ? 800 : aa)
    },
    Zshift() {  // z轴偏移量
      return (this.double * 350)
    }
  },
  methods: {
    init() {
      const box = this.$refs.box;
      const myImg = box.children; // 获取所有图片元素数组
      const deg = 360 / myImg.length; //每张图片需要旋转的度数
      box.style.transform = `perspective(${this.plv}px) rotateX(-15deg) rotateY(0deg)`
      // 旋转图片
      for (let i = 0; i < myImg.length; i++) {
        myImg[i].style.transform = `rotateY(${i * deg}deg) translateZ(${this.Zshift}px)`;
        myImg[i].style.transition = `all 1s ${(myImg.length - i - 1) * 0.1}s`; // 设置过度动画效果
        myImg[i].ondragstart = () => {
          // 禁用图片的拖拽功能
          return false;
        };
      }
    },
    /* 鼠标按下后事件处理 */
    down(e) {
      const box = this.$refs.box;
      let that = this;
      clearInterval(this.time);
      // 获取点击时鼠标相对于页面可视区域的位置
      this._x = (e || window.event).clientX;
      this._y = (e || window.event).clientY;
      // 鼠标移动事件,不要用vue的@mousemove，比原生卡
      document.onmousemove = function(e) {
        // 记录鼠标移动的哪个位置
        that.x = (e || window.event).clientX;
        that.y = (e || window.event).clientY;
        // 记录与一开始时的差值
        that.xN = that.x - that._x;
        that.yN = that.y - that._y;
        // 差值拼接到旋转的y里面去
        that.roX -= that.yN * 0.2; // 水平拖动应该时绕y轴旋转
        that.roY += that.xN * 0.2;
        if (!that.disRotateY) {
          box.style.transform = `perspective(${that.plv}px) rotateX(${that.roX}deg) rotateY(${that.roY}deg)`;
        } else {
          box.style.transform = `perspective(${that.plv}px) rotateX(-15deg) rotateY(${that.roY}deg)`;
        }
        // 修改_x,_y的值，否则会越转越快
        that._x = (e || window.event).clientX;
        that._y = (e || window.event).clientY;
      };
      /* 鼠标松开后清除鼠标移动事件,不要用vue的@mouseup,鼠标移到页面外松开不会触发 */
      document.onmouseup = function(e) {
        document.onmousemove = null;
        // 松开鼠标后利用setInterval制造惯性旋转
        that.time = setInterval(() => {
          // 无限乘以0.95使其接近0
          that.xN *= 0.95;
          that.yN *= 0.95;
          // 小于0.1时停止计时器
          if (Math.abs(that.xN) < 0.1 && Math.abs(that.yN) < 0.1) {
            clearInterval(that.time);
          }
          that.roX -= that.yN * 0.2; // 水平拖动应该时绕y轴旋转
          that.roY += that.xN * 0.2;
          if (!that.disRotateY) {
            box.style.transform = `perspective(${that.plv}px) rotateX(${that.roX}deg) rotateY(${that.roY}deg)`;
          } else {
            box.style.transform = `perspective(${that.plv}px) rotateX(-15deg) rotateY(${that.roY}deg)`;
          }
        }, 30);
      };
    }
  },
  components: {}
};
</script>

<style lang='scss' scoped>
#box {
  width: 100%;
  height: 100%;
  background-color: #000;
  padding: 100px 0;
  overflow: hidden;
}
#wrap {
  width: 133px;
  height: 200px;
  margin: 0 auto;
  position: relative;
  /* 设置子元素呈3d形态展现,有远近的感觉 */
  transform-style: preserve-3d;
  /* 设置透视距离,perspective 越大就相当于从越远的位置看，越小离的越近 */
  /* transform: perspective(800px) rotateX(-15deg) rotateY(0deg); */
  img {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
    box-shadow: 0 0 5px #fff; // 带一层虚影更有层次感
    // 倒影，看着高大上一些
    -webkit-box-reflect: below 10px -webkit-linear-gradient(transparent, transparent
          50%, rgba(0, 0, 0, 0.6));
  }
}
img {
  /* transform: rotateY(60deg); */
  width: 133px;
}
/* 设置无法选中文本，空白 */
* {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
}
</style>
