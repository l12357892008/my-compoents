<!--
  describe:
  1.引入: import {当前组件名称} from '@/common/components/AAIndex'
  就搞了点样式，啥吊用没有
-->
<template>
  <div class="my-button-group">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MyButtonGroup',
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
  },
  components: {}
}
</script>

<style lang='scss' scoped>
@import '../AACSS/button-group.scss';
</style>
