<template>
  <div id="WaterMark" class="flex_row">
    <waterMark color='pink' text='我就是水印'></waterMark>
    <div class="content flex flex_center">
      <div v-for="item in 35" :key="item">sdajflksadjfkljlksadjfklsadjfklsdajfklsdajfldjda</div>
    </div>
  </div>
</template>

<script>
import waterMark from '@/components/waterMark';
export default {
  components:{ waterMark }
};
</script>

<style lang='scss' scoped>
#WaterMark{
  background: white;
  min-height: 100vh;
  .content{
    z-index: 1;
  }
}
</style>