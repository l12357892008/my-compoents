<template>
  <div class="flex_center">
    <DigitalRain :Width="Width" :Height='Height' :speedA='2'></DigitalRain>
  </div>
</template>

<script>
  import DigitalRain from '@/components/DigitalRain/index.vue'
  export default {
    data() {
      return {
        jj: '爱神的箭疯狂练级啊了解撒法鲁克的撒娇法律可是大家撒开了房间啊收到了f十大' +
        '就发卡撒旦开发艰苦拉萨大家发的就撒开发两件大事了咖啡艰苦拉萨大家弗兰克氨基酸独立开发就爱上了打开解放立刻撒旦解放立刻时间分厘卡叫阿里',
      }
    },
    computed:{
      Width() {
        return document.body.clientWidth*0.95
      },
      Height() {
        return 0.45*this.Width
      }
    },
    mounted(){
    },
    methods:{
    },
    components:{ DigitalRain}
  }
</script>

<style lang="scss" scoped>
</style>
