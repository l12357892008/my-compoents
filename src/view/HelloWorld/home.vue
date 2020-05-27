<template>
  <div id="hello" class="flex_row_center">
    <div class="block flex_center hover_big" v-for="item in pages" :key='item.src' @click='go(item.src)'>
      <div style="text-align:center">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  import { Button } from '@/common/index.js'
  import format from '@/utils/format.js'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        pages: [
          {
            src: '/demo',
            name: '练习用',
          },
          {
            src: '/icon',
            name: '图标一览'
          },
          {
            src: '/magicBox',
            name: '旋转魔方'
          },
          {
            src: '/login',
            name: '登录界面'
          },
          {
            src: '/asdfsd',
            name: '静态404界面'
          },
          {
            src: '/404-2',
            name: '弹幕式404界面'
          },
          {
            src: '/digitalRain',
            name: '数字雨'
          },
          {
            src: '/gallery3D',
            name: '3D画廊'
          },
          {
            src: '/waterMark',
            name: '水印'
          },
          {
            src: '/svgFont',
            name: 'svg文字边框'
          },
          {
            src: '/7CSS',
            name: '7个不常用的CSS属性'
          },
          {
            src: '/VerifiedFont',
            name: '验证码文字'
          }
        ]
      }
    },
    mounted() {
      // function getLongestPath(root){   // 遍历树找最长结点
      //     if(!root) return [];
      //     var tempList = [];
      //     for(var i=0;i<root.children.length;i++){
      //     	var ret = getLongestPath(root.children[i]);
      //     	if(ret.length>tempList.length){
      //     	    tempList = ret.slice();
      //     	}
      //     }
      //     tempList.push(root.nodeName.toLowerCase());
      //     return tempList
      // }
      // console.log(window.document.getElementsByTagName('body')[0]);
      // let a = getLongestPath(window.document.getElementsByTagName('body')[0])
      // console.log(a);
    },
    methods: {
      go(src){
        this.$router.push(src);
      }
    },
    components: { Button }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #hello {
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .block{
    width: 150px;
    height: 150px;
    background: pink;
    flex: none;
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
