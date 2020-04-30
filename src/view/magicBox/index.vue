<template>
  <div id='hel' class="flex_col">
    <div class="flex flex_center">
      <magicBox width='300'/>
    </div>
  </div>
</template>

<script>
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
    components:{ magicBox }
  }
</script>

<style scoped>
  #hel{
    height: 100%;
  }
</style>
