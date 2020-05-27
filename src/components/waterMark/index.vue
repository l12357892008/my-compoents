<!--
  describe:
  1.引入
  2.接受属性:
    必填项: 
      1.text: String, 水印文字
    可选项:
      1.row: Number/String, 列数,默认2
      2.col: Number/String, 行数,默认4
      3.rotate: Number/String, 文字旋转角度,默认20
      4.color: String, 水印文字颜色,默认浅灰
  3.描述:
    将图片以旋转木马的方式呈现并可拖拽旋转(也可以放入文本),最多36张，多了透视距离跟不了
-->
<template>
  <div class="watermark">
    <div
      class="wm"
      v-for="(i,index) in watermarkNum"
      :key="index"
      :style="`color:${color};transform: rotate(${rotate}deg);width:${wm_w}%;height:${wm_h}%;`"
    >{{text}}</div>
  </div>
</template>

<script>
export default {
  props:{
    row: { //行数
      type: [Number,String],
      default: 4
    },
    col: { //列数
      type: [Number,String],
      default: 2
    },
    rotate: { //文字旋转角度
      type: [Number,String],
      default: -20
    },
    color: { //水印文字颜色
      type: String,
      default: '#ccc'
    },
    text: { //水印文字
      type: String,
      default: '我是一个~小小的水印~'
    }
  },
  computed: {
    watermarkNum() {  // 水印数量
      return parseInt(this.row)*parseInt(this.col);
    },
    wm_w() { //水印宽度百分比
      return 100 / this.col;
    },
    wm_h() {  //水印高度百分比
      return 100 / this.row;
    }
  }
};
</script>

<style lang='scss' scoped>
.watermark {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 0;
  opacity: 0.7;
}
.wm {
  display: flex;
  justify-content: center;
  align-items: center;
}
.even{
  margin-top: 50px;
}
</style>