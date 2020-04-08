<!-- -->
<template>
  <div id='wu'>
    <div @click="bb">刷新地图</div>
    <div style="width: 100%;height: 420px;">
      <MapDot :shop='shop' :addresses='addresses'  v-if='cc'></MapDot>
    </div>
  </div>
</template>

<script>
  import MapDot from '@/components/MapDot/index.vue'
  export default {
    data() {
      return {
        cc: true,
        shop: {
          lat: "30.663420",
          lng: "104.072329"
        },
        addresses:{
          lat: 30.655887,
          lng: 104.088094
        }

      }
    },
    created(){
    },
    mounted(){
    },
    inject:['reload'],
    methods:{
      async bb(){
        // this.reload()
        this.cc = false
        await this.$nextTick()
        this.cc = true
      }
    },
    components:{
      MapDot
    }
  }
</script>

<style lang='scss' scoped>
  #wu{
    width: 100%;
    height: 100%;
    background: yellow;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
