<template>
  <div id="app">
    <div class="flex_row_center">
      head
    </div>
    <transition name="fade1" mode="out-in">
      <router-view v-if="cc" />
    </transition>
  </div>
</template>

<script>
  import WebSocketClass from '@/utils/webSocket.js'
  import formatDate from '@/utils/formatDate.js'
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        now: '',
        ss: 0,
        texts: '',
        cc: true
      }
    },
    mounted() {
      // const socket = new WebSocketClass('ws://ws.maixiaobu.cn:8977?group=admin')
      // console.log(formatDate.format(new Date))
      // this.cli()
    },
    methods: {
      async cli() {
        let bb = await this.$options.methods.settime()
        // console.log(bb)
        // console.log('dd')
        try {
          let dd = await this.$get('')
          // console.log(dd)
        } catch (e) {
          // console.log('error:' + e)
        }
        // console.log('afsd')
      },
      async reload() {
        this.cc = false
        await this.$nextTick()
        this.cc = true
      },
      settime() {
        return new Promise((resolve, reject) => { // 必须要返回一个Promise ,await才会生效
          setTimeout(() => {
            resolve('asf')
          }, 2000)
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

  .fade1-enter,
  .fade1-leave-to {
    /* 动画效果 */
    opacity: 0;
  }

  .fade1-enter-active,
  .fade1-leave-active {
    transition: all .3s;
  }

  .fade1-enter-to,
  .fade1-leave {
    opacity: 1;
  }


  .amap-wrapper {
    width: 500px;
    height: 500px;
  }
</style>
