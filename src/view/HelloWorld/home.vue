<template>
  <div id="hello" class="flex_row_center">
    <div class="block flex_center hover_big hover_blue" v-for="item in pages" :key='item.src' @click='go(item.src)'>
      <div style="text-align:center">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  import format from '@/utils/format.js';
  import {store,mutations} from '../../vuex/mystore.js';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        pages: [
          { name: '练习用', src: '/demo' },
          { name: '图标一览', src: '/icon' },
          { name: '旋转魔方', src: '/magicBox'  },
          { name: '登录界面', src: '/login'  },
          { name: '静态404界面', src: '/404' },
          { name: '弹幕式404界面', src: '/404-2' },
          { name: '数字雨', src: '/digitalRain' },
          { name: '3D画廊', src: '/gallery3D' },
          { name: '水印', src: '/waterMark' },
          { name: 'svg文字边框', src: '/svgFont' },
          { name: 'CSS3套路', src: '/7CSS' },
          { name: '验证码文字', src: '/VerifiedFont' },
          { name: '动画套路', src: '/animations' }
        ]
      }
    },
    mounted() {
      mutations.setUserInfo({
        name: 'sdafasdf',
      })
    },
    methods: {
      go(src){
        this.$router.push(src);
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #hello {
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 20px 50px;
  }
  .block{
    width: 150px;
    height: 150px;
    background: pink;
    flex: none;
    margin: 5px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    &:hover {
      background: skyblue;
      color: violet;
    }
  }
</style>
