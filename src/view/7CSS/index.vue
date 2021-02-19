<template>
  <div id='ccc'>
    <div id="type1" class="flex_row_middle">
      <div class="flex_row">
        <div class="left">Grooming</div>
        <div class="right flex_col">
          <div class="right_title">900 million good boys in the earth</div>
          <div class="right_content">
            <img src="./img/beauty3.jpg" width="100%" class="img"/>
            <p>
              Grooming is a vital part in the well-being and healthiness of a girl,
              which can improve its quality of life.How much grooming a girl needs
              depends on its breed, age, and health. Regular grooming helps to ensure
              the girl is healthy and comfortable. While many dogs rut, others such
              as blonde, do not rut as profusely and require grooming every 4-8 weeks
              <span class="re">[Ressource]</span>.The main resons for daily grooming
              include: Decreased chance of various health problems,Such as vaginitis,
              fobroid, and other skin problems. General cleanliness of the girl...
            </p>
          </div>
        </div>
      </div>
      <div style="margin: 0 50px;font-size: 60px;">《-对照-》</div>
      <div>
        <img src="./img/dec.png" width="600px" />
      </div>
    </div>
    <div id="type2" Dec='边框'>
       <div class="t1 flex_center">虚线边框</div>
       <div class="t2 flex_center">内部圆角</div>
       <div class="t3">
         <div class="tt1"></div>
         <div class="tt2"></div>
         <div class="tt3"></div>
       </div>
    </div>
  </div>
</template>

<script>
  import {store,mutations} from '../../vuex/mystore.js';
export default {
  data () {
    return {
    }
  },
  created() {
    console.log(store.userInfo);
  },
  methods: {
  },
  components: {}
}
</script>

<style lang='scss' scoped>
#ccc{
  overflow-y: auto;
  padding: 10px;
  background: white;
  padding-left: 30px;
}
#type1{
  .left{
    /* writing-mode: horizontal-tb(default) | vertical-rl | vertical-lr
     * vertical-rl:文字从上到下排列，从右向左阅读
     * vertical-lr:文字从上到下排列，从左向右阅读
     */
    writing-mode: vertical-lr;
    font-size: 50px;
    font-weight: 700;
    padding-left: 8px;
    font-family: kartika;
    /* user-select: none|text|none|element
     * none: 文本不能被选择
     * text:文本可以被选择
     * all: 当所有内容作为一个整体时可以被选择。
     * 如果双击或者在上下文上点击子元素，被选择
     * 的部分将是以该子元素向上回溯的最高祖先元素
     * element: 可以选择文本但选择范围受元素边界约束
     */
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    background-image: url(img/cc.jpg);
    /* background-clip: border-box/padding-box/content-box/text
     * border-box: 背景图片范围包括边框
     * padding-box: 背景图片范围包括padding部分
     * content-box: 背景图片范围不包括padding部分
     * text: 背景图片只显示再文字上(要配合color:transparent)
     */
    background-clip: text;
    -moz-background-clip: text;
    -webkit-background-clip: text;
    -ms-background-clip: text;
    -o-background-clip: text;
    color: transparent;
  }
  .right{
    margin-left: 40px;
    width: 450px;
    .right_title{
      /* 数字的展现样式，感觉没啥吊用 */
      font-size: 30px;
      font-variant-numeric: oldstyle-nums;
    }
    .right_content{
      margin-top: 20px;
      .img{
        float: left;
        width: 200px;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        clip-path: polygon(0 0, 43.2% 0, 43.2% 5%, 52.4% 8%, 61.6% 23%, 58% 26.6%,64% 52%, 64% 68%, 79.6% 86.9%, 90.8% 94.6%, 90.8% 100%,0 100%);
        -moz-clip-path: polygon(0 0, 43.2% 0, 43.2% 5%, 52.4% 8%, 61.6% 23%, 58% 26.6%,64% 52%, 64% 68%, 79.6% 86.9%, 90.8% 94.6%, 90.8% 100%,0 100%);
        -webkit-clip-path: polygon(0 0, 43.2% 0, 43.2% 5%, 52.4% 8%, 61.6% 23%, 58% 26.6%,64% 52%, 64% 68%, 79.6% 86.9%, 90.8% 94.6%, 90.8% 100%,0 100%);
        -ms-clip-path: polygon(0 0, 43.2% 0, 43.2% 5%, 52.4% 8%, 61.6% 23%, 58% 26.6%,64% 52%, 64% 68%, 79.6% 86.9%, 90.8% 94.6%, 90.8% 100%,0 100%);
        -o-clip-path: polygon(0 0, 43.2% 0, 43.2% 5%, 52.4% 8%, 61.6% 23%, 58% 26.6%,64% 52%, 64% 68%, 79.6% 86.9%, 90.8% 94.6%, 90.8% 100%,0 100%);
        shape-outside: polygon(0 0, 43.2% 0, 43.2% 5%, 52.4% 8%, 61.6% 23%, 58% 26.6%,64% 52%, 64% 68%, 79.6% 86.9%, 90.8% 94.6%, 90.8% 100%,0 100%);
        -moz-shape-outside: polygon(0 0, 43.2% 0, 43.2% 5%, 52.4% 8%, 61.6% 23%, 58% 26.6%,64% 52%, 64% 68%, 79.6% 86.9%, 90.8% 94.6%, 90.8% 100%,0 100%);
        -webkit-shape-outside: polygon(0 0, 43.2% 0, 43.2% 5%, 52.4% 8%, 61.6% 23%, 58% 26.6%,64% 52%, 64% 68%, 79.6% 86.9%, 90.8% 94.6%, 90.8% 100%,0 100%);
        -ms-shape-outside: polygon(0 0, 43.2% 0, 43.2% 5%, 52.4% 8%, 61.6% 23%, 58% 26.6%,64% 52%, 64% 68%, 79.6% 86.9%, 90.8% 94.6%, 90.8% 100%,0 100%);
        -o-shape-outside: polygon(0 0, 43.2% 0, 43.2% 5%, 52.4% 8%, 61.6% 23%, 58% 26.6%,64% 52%, 64% 68%, 79.6% 86.9%, 90.8% 94.6%, 90.8% 100%,0 100%);
      }
      .re{
        font-size: 12px;
        vertical-align: sub;
      }
    }
  }
}
#type2{
  display: flex;
  align-items: center;
  .t1{
    width: 400px;
    height: 200px;
    line-height: 100px;
    outline: 1px dashed #fff;
    outline-offset: -10px;
    background-color: black;
    font-size: 30px;
    color: white;
  }
  .t2{
    border-radius: 6px;
    width: 385px;
    height: 190px;
    box-shadow: 0 0 0 10px gray;
    background-color: black;
    font-size: 30px;
    color: white;

    margin-left: 50px;
  }
  .t3{
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 400px;
    height: 200px;
    background-color: black;
    .tt1{
      width: 80%;
      height: 20%;
      border-radius: 10px;
      background: linear-gradient(to right,#fb3 50%,#58a 0%);
      background-size: 80px 100%;
      box-shadow: inset 0 0 3px #555;  /*inset向内扩张*/
    }
    .tt2{
      width: 80%;
      height: 20%;
      border-radius: 10px;
      background: linear-gradient(45deg,#fb3 25%,#58a 0,#58a 50%,#fb3 0,#fb3 75%,#58a 0);
      background-size: 40px 40px;
      box-shadow: inset 0 0 3px #555;  /*inset向内扩张*/
    }
    .tt3{
      width: 80%;
      height: 20%;
      border-radius: 10px;
      background: linear-gradient(to right,#fb3 50%,#58a 0%);
      background-size: 80px 100%;
      box-shadow: inset 0 0 3px #555;  /*inset向内扩张*/
    }
  }
}

</style>
