<!--
  describe:
  1.传入数据:
    选填项:
      1.Width: Number,画布宽度，默认800
      2.Height: Number,画布高度，默认600
      3.fontSize: Number,数字雨字体大小，默认20
      4.textContent: String,数字雨内容，默认小写a-z
      5.textColor: String,数字雨颜色
      6.backgroundColor： String,背景颜色，只能用rgba,并且透明度不能高，高了就没有拖影了
      7.speedA: Number,速度，1最快越大越慢
-->
<template>
  <canvas ref='digitalRain'></canvas>
</template>

<script>
  export default {
    name: 'digitalRain',
    data() {
      return {
        canvasCtx: null,
        canvas: null,
        columns: 0,
        rainDropPositionArray: [],
        speedCnt: 0
      }
    },
    props: {
      Width: {
        type: Number,
        default: 800
      },
      Height: {
        type: Number,
        default: 600
      },
      fontSize: {
        type: Number,
        default: 20
      },
      fontFamily: {
        type: String,
        default: 'arial'
      },
      textContent: {
        type: String,
        default: 'abcdefghijklmnopqrstuvwxyz'
      },
      textColor: {
        type: String,
        default: '#0F0',
      },
      backgroundColor: {
        type: String,
        default: 'rgba(0,0,0,0.1)',
      },
      speedA: {
        type: Number,
        default: 10,
      }
    },
    computed: {
      speed() {
        return parseInt(this.speedA)
      }
    },
    mounted: function() {
      this.initRAF();
      this.initCanvas();
      this.initRainDrop();
      this.animationUpdate();
    },
    methods: {
      initRAF() {
        /* requestAnimationFrame专门用于重绘实现动画
           与setTimeout类似，大概每秒重绘60次(60帧)
           但性能比setTimeout好的多，接受一个回调函数，即每次
           冲回前都会调用。
         */
        window.requestAnimationFrame = (function() { // 固定写法，复制粘贴就行了
          return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function(callback) { // 如果都没有就只能用性能最烂的setTimeout凑合
              window.setTimeout(callback, 1000 / 60);
            };
        })();
        window.cancelAnimationFrame = (function() { // 固定写法，复制粘贴就行了
          return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            function(id) {
              window.clearTimeout(id);
            };
        })();
      },
      initCanvas() {
        this.canvas = this.$refs.digitalRain;
        //需要判断获取到的canvas是否是真的canvas
        if (this.canvas.tagName.toLowerCase() !== 'canvas') {
          alert("Error! Invalid canvas! Please check the canvas's ref!");
          console.log('WDNMD,这你都能获取歪');
        }
        this.canvas.width = this.Width;
        this.canvas.height = this.Height;
        this.canvasCtx = this.canvas.getContext('2d'); // 目前唯一合法值就是2d，说不定未来canvas可以绘制3D了就可以传个3d进去
        // console.log(this.canvasCtx);
        this.canvasCtx.font = this.fontSize + 'px ' + this.fontFamily;  //设置文字属性
        this.columns = this.canvas.width / this.fontSize;
      },
      initRainDrop() {
        for (var i = 0; i < this.columns; i++) { // 下落列，有多少列填充多少个0
          this.rainDropPositionArray.push(0);
        }
      },
      animationUpdate() {
        this.speedCnt++;
        //speed为1最快，越大越慢
        if (this.speedCnt === this.speed) { // speedCnt 累加,等于speed时重置为0并进行一次重绘
          this.speedCnt = 0;
          // 先绘制一层背景
          // console.log(this.canvasCtx);
          this.canvasCtx.fillStyle = this.backgroundColor; // 将画笔颜色设置为背景颜色，不设置默认纯黑
          // fillRect进行绘制'已填色'的矩形，四个参数分别为x,y开始和结束坐标，fillRect多次调用会进行叠加
          // 直接将新一次图绘制到上一层之上，这样带透明的的背景就会层层加深，将以前绘制文字
          // 层层覆盖压低颜色,达到拖尾虚影的效果
          this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          // 再绘制一层文字
          this.canvasCtx.fillStyle = this.textColor; // 将画笔颜色设置为文字颜色
          for (var i = 0, len = this.rainDropPositionArray.length; i < len; i++) { // 按列绘制
            if (this.rainDropPositionArray[i] <= 0) {  // 初始下落时给个随机值达到不同步下落
              if (Math.random() > 0.9) {
                this.rainDropPositionArray[i]++;
              }
            }else{
              this.rainDropPositionArray[i]++; // 每列的数字每绘制一次，就加1，初始填充的为0，用于判断是否落到底部

              var randomTextIndex = Math.floor(Math.random() * this.textContent.length); // 从文本库中随机选中一个字符
              var randomText = this.textContent[randomTextIndex];

              var textYPostion = (this.rainDropPositionArray[i]-1) * this.fontSize; // 判断y轴绘制位置

              // fillText绘制文字,参数分别为:要绘制的文字,x轴位置,Y轴位置，同样是覆盖
              this.canvasCtx.fillText(randomText, i * this.fontSize, textYPostion);
              if (textYPostion > this.Height) { // 到达底部后重新归0
                this.rainDropPositionArray[i] = 0;
              }
            }
          }
        }
        window.requestAnimationFrame(this.animationUpdate); // 类似于setInterval,大概一秒运行60-75次
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
