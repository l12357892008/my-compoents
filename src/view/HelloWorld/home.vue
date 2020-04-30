<template>
  <div id="hello" class="flex_row_center">
    <div class="block flex_center" v-for="item in pages" :key='item.src' @click='go(item.src)'>
      <div>{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  import { Button } from '@/common/index.js'
  import formatDate from '@/utils/formatDate.js'
  import formatMoney from '@/utils/formatMoney.js'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        pages: [
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
            name: '404界面'
          },
          {
            src: '/digitalRain',
            name: '数字雨'
          },
          {
            src: '/demo',
            name: '练习用',
          },
          {
            src: '/icon',
            name: '图标一览'
          }
        ]
      }
    },
    created() {
      // console.log(formatDate.format('2'));
      console.log(formatMoney.format());
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
    &:hover {
      background: skyblue;
      color: violet;
    }
  }
</style>
