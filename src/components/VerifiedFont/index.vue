<!--
  describe:
  1.引入
  2.接受属性:
    必填项:
      1.text: String, 验证字符
    可选项:
      1.width: Number | String,默认150
      2.height: Number | String,默认50
      3.dot: Number,背景点数量，默认20
      4.line: Nmuber,背景线数量,默认4
  3.描述:
    将图片以旋转木马的方式呈现并可拖拽旋转(也可以放入文本),最多36张，多了透视距离跟不了
-->
<template>
  <div id='VerifiedFont' ref='verify'>
    <canvas v-if="text" class="canvas" ref='cav'></canvas>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props:{
      width: {  // 宽
        type: [String, Number],
        default: 150
      },
      height: {  // 高
        type: [String, Number],
        default: 50
      },
      text: String,  // 验证文字
      dot:{  // 背景点数量
        type: Number,
        default: 20
      },
      line:{ // 背景线数量
        type: Number,
        default: 4
      }
    },
    computed:{
      w(){
        return ~~this.width
      },
      h(){
        return ~~this.height
      }
    },
    mounted(){
      this.init()
    },
    watch:{
      text(newVal, oldVal){
        if(this.ctx){
          this.ctx.clearRect(0, 0, this.w, this.h)
        }
        this.drawText();  // 画文字
        this.drawDot();  // 画点
        this.drawLine();  // 画线
      }
    },
    methods:{
      init(){
        this.initCanvas();  // 初始化画布
        this.drawText();  // 画文字
        this.drawDot();  // 画点
        this.drawLine();  // 画线
      },
      initCanvas(){  // 初始化画布
        this.canvas = this.$refs.cav
        this.ctx = this.canvas.getContext('2d')
        this.canvas.height = this.h
        this.canvas.width = this.w
      },
      drawText(){  // 画文字
        let textArray = this.text.split('')
        textArray.forEach((item,i) => {
          let fs = this.random(30,40);  // 字体大小
          let deg = this.random(-30,30);  // 旋转角度
          this.ctx.font = fs + "px KaiTi"  // 设置画笔字体样式
          this.ctx.fillStyle = this.randomCol()  // 设置填充颜色
          this.ctx.textBaseline = 'top'  // 设置画布文本基线(top即以文字顶端来确定位置)
          /* .save()保存当前画布状态，要和.restore()搭配使用
             .restore()将画布状态恢复到保存的状态*/
          this.ctx.save()
          this.ctx.translate(this.w / textArray.length * i +15,this.random(0,15))
          this.ctx.rotate(deg*Math.PI/180)  // rotate旋转的是弧度要用角度表示需要用deg*Math.PI/180
          this.ctx.fillText(textArray[i], 0, 0)
          this.ctx.restore()
        })
      },
      drawDot(){  // 画点
        for(let i = 0; i<this.dot; i++){
          this.ctx.beginPath()   // 开始一个新/或覆盖原先的路径
          this.ctx.fillStyle = this.randomCol()  // 设置填充颜色
          /* .arc() 创建弧/曲线，5个参数，
              圆中心x轴位置，圆中心y轴位置,半径,起始弧度，结束弧度,是否为顺时针方向(可选)
              Math.PI就是派,3.14,180度的弧度*/
          let _x = this.random(0,this.w)  // 圆心x坐标
          let _y = this.random(0,this.h)  // 圆心y坐标
          let _r = this.random(1,2)   // 圆半径
          this.ctx.arc(_x, _y, _r, 0, 2*Math.PI);
          // fill()是填充当前路径围成的闭合区间(没闭合也会自动将首位两端相连)
          // stroke()是绘制当前路径(比如此例中圆的线条),同样可以用strokeStyle设置颜色
          this.ctx.fill()
          this.ctx.closePath()
        }
      },
      drawLine(){  // 画线
        for(let i = 0; i < this.line; i++){
          this.ctx.beginPath()
          this.ctx.strokeStyle = this.randomCol()  // 设置绘制颜色
          this.ctx.lineWidth = 2  //  设置线条粗细
          let _x1 = this.random(0,this.w)  // 线条起始点x坐标
          let _y1 = this.random(0,this.h)  // 线条起始点y坐标
          let _x2 = this.random(0,this.w)  // 线条结束点x坐标
          let _y2 = this.random(0,this.h)  // 线条结束点y坐标
          this.ctx.moveTo(_x1, _y1)
          this.ctx.lineTo(_x2, _y2)
          this.ctx.stroke()
        }
      },
      random(min, max){  // 返回一个在区间[min,max]之间的随机整数
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      randomCol(){  // 返回一个随机颜色
        let r = this.random(0, 255)
        let g = this.random(0, 255)
        let b = this.random(0, 255)
        return `rgb(${r},${g},${b})`;
      }
    },
    components:{
    }
  }
</script>

<style lang="scss" scoped>
  .canvas{
    background: #f1f1f1;
  }
</style>
