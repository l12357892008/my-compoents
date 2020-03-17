<template>
  <div id="app">
    <div class="flex_row_center">
      head
    </div>
    <router-view/>
  </div>
</template>

<script>
  import WebSocketClass from '@/utils/webSocket.js'
  import formatDate from '@/utils/formatDate.js'
  export default {
    name: 'App',
    data() {
      return {
        now: '',
        ss: 0,
        texts: '',
      }
    },
    mounted() {
      // const socket = new WebSocketClass('ws://ws.maixiaobu.cn:8977?group=admin')
      // console.log(formatDate.format(new Date))
      this.cli()
    },
    methods:{
      async cli() {
        await this.$options.methods.settime().then(res => {
          console.log(res)
        })
        await this.$get('').then(res => {
          console.log('d')
        }).catch(rej => {
          console.log(rej)
        })
        console.log('afsd')
      },
      settime() {
        return new Promise((resolve, reject) => {  // 必须要返回一个Promise ,await才会生效
          setTimeout(() => {
            resolve('asf')
          },2000)
        })
      }
    },

  }
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: skyblue;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
