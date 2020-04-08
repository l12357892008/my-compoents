<template>
  <div id='hel' class="flex_col">
    hel
    <MapSearchBCDN></MapSearchBCDN><br/>
    <div class="flex flex_center">
      <magicBox width='300'/>
    </div>
  </div>
</template>

<script>
  import MapSearchBCDN from '@/components/MapSearchBCDN/index.vue'
  import magicBox from '@/components/magicBox/magicBox.vue'
  export default {
    data() {
      return {
      }
    },
    created(){
    },
    mounted(){
    },
    methods:{
    },
    components:{
      MapSearchBCDN,
      magicBox
    }
  }
</script>

<style scoped>
  #hel{
    height: 100%;
  }
</style>
