<template>
  <div id="app">
    <transition name="fade1" mode="out-in">
      <router-view v-if="cc" style="flex: auto;"/>
    </transition>
  </div>
</template>

<script>
  import WebSocketClass from '@/utils/webSocket.js'
  import format from '@/utils/format.js'
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
    created() {
      this.init()
    },
    mounted() {
      // const socket = new WebSocketClass('ws://ws.maixiaobu.cn:8977?group=admin')
    },
    methods: {
      /**
       * @description 初始化
      */
      async init() {  // 初始化
        // let res = await this.getRouter()  // 获取路由
        // let res2 = await this.start(res.power)
        this.start();
      },
      async start(power) {
        // power.some(i => {
        //   return i.path === '/wu'
        // })  // true
        let newRoute = [
          {
            path: '/magicBox',
            name: 'magicBox',
            component: resolve => require(['@/view/magicBox/index'], resolve),
          },
        ]
        this.$router.options.routes = this.$router.options.routes.concat(newRoute)
        await this.$router.addRoutes(newRoute);
        // console.log(this.$router.options.routes);
        this.cc = true
      },
      async getRouter() {  // 获取路由权限
        try {
          let res = await this.$get('http://127.0.0.1:10086/cc')
          return res
        } catch (e) {
          this.$message({
            message: '连接失败,请稍后再试',
            type: 'error'
          })
          return e
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: rgb(245,245,245);
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
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

</style>
