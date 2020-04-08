<template>
  <div id="magicBox" ref='cc'>
    <div class="box">
      <div class="cc top flex_col" :style="{transform:`translateZ(${width/2}px)`}">
        <div class="flex_row flex" :class="{'ee':isee}" v-for="index in row" :key='index'>
          <div class="flex dd" v-for="index in row" :key='index'></div>
        </div>
      </div>
      <div class="cc bottom flex_col" :style="{transform:`translateZ(-${width/2}px) rotateX(180deg)`}">
        <div class="flex_row flex" :class="{'ee':isee}" v-for="index in row" :key='index'>
          <div class="flex dd" v-for="index in row" :key='index'></div>
        </div>
      </div>
      <div class="cc right flex_col">
        <div class="flex_row flex" :class="{'ee':isee}" v-for="index in row" :key='index'>
          <div class="flex dd" v-for="index in row" :key='index'></div>
        </div>
      </div>
      <div class="cc left flex_col">
        <div class="flex_row flex" :class="{'ee':isee}" v-for="index in row" :key='index'>
          <div class="flex dd" v-for="index in row" :key='index'></div>
        </div>
      </div>
      <div class="cc front flex_col">
        <div class="flex_row flex" :class="{'ee':isee}" v-for="index in row" :key='index'>
          <div class="flex dd" v-for="index in row" :key='index'></div>
        </div>
      </div>
      <div class="cc back flex_col">
        <div class="flex_row flex" :class="{'ee':isee}" v-for="index in row" :key='index'>
          <div class="flex dd" v-for="index in row" :key='index'></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        row: 3,  // 行列
        isee: true
      }
    },
    props:{
      width:[String,Number]
    },
    mounted() {
      this.$refs.cc.style.width = this.width + 'px'
      this.$refs.cc.style.height = this.width + 'px'
    },
    methods:{
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes frame1 {
    0%{
      transform: rotateX(0deg) rotateY(0deg);
    }
    100%{
      transform: rotateX(360deg) rotateY(360deg);
    }
  }

  @keyframes frame2 {
    0% {
      transform: translateZ(0px) scale(1) rotateZ(0deg);
    }
    35%{
      transform: translateZ(0px) scale(1) rotateZ(0deg);
    }
    55% {
      transform: translateZ(150px) scale(0.3) rotateZ(720deg);
    }
    85% {
      transform: translateZ(150px) scale(0.3) rotateZ(720deg);
    }
    100% {
      transform: translateZ(0px) scale(1) rotateZ(0deg);
    }
  }

  #magicBox {
    transition: all 0.5s;
  }
  .box{
    width: 100%;
    height: 100%;
    background: rgba(245,245,245,0);
    transform-style: preserve-3d;
    transform: rotateX(45deg) rotateZ(45deg);
    animation: frame1 3s linear infinite;
    .cc{
      width: 100%;
      height: 100%;
      position: absolute;
      transform-style: preserve-3d;
      .dd{
        box-sizing: border-box;
        border: 1px solid white;
        transition: all 2s;
        animation: frame2 3s ease-in-out infinite;
      }
      .ee:nth-child(1){
        .dd:nth-child(1){
          animation: frame2 3s ease-in-out infinite;
        }
        .dd:nth-child(2){
          animation: frame2 2s linear infinite;
        }
        .dd:nth-child(3){
          animation: frame2 4s ease-in infinite;
        }
      }
      .ee:nth-child(2){
        .dd:nth-child(1){
          animation: frame2 2s ease-in-out infinite;
        }
        .dd:nth-child(2){
          animation: frame2 4s linear infinite;
        }
        .dd:nth-child(3){
          animation: frame2 3s ease-in infinite;
        }
      }
      .ee:nth-child(3){
        .dd:nth-child(1){
          animation: frame2 4s ease-in-out infinite;
        }
        .dd:nth-child(2){
          animation: frame2 3s linear infinite;
        }
        .dd:nth-child(3){
          animation: frame2 2s ease-in infinite;
        }
      }
    }
    .top{
      .dd{
        background: green;
      }
    }
    .bottom{
      .dd{
        background: purple;
      }
    }
    .right{
      transform: translateY(-50%) rotateX(90deg);
      .dd{
        background: blue;
      }
    }
    .left{
      transform: translateY(50%) rotateX(270deg);
      .dd{
        background: violet;
      }
    }
    .back{
      transform: translateX(-50%) rotateY(270deg);
      .dd{
        background: red;
      }
    }
    .front{
      transform: translateX(50%) rotateY(90deg);
      .dd{
        background: yellow;
      }
    }
  }
</style>
