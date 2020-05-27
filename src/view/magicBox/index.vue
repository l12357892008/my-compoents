<template>
  <div id='hel' class="flex_center">
    <magicBox width='300'/>
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

<style lang='scss' scoped>
#hel{
  background: skyblue;
}
</style>
